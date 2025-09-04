import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Conversation {
  id: string;
  name: string | null;
  is_group: boolean;
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  participant_count?: number;
  other_participant_name?: string;
  is_pinned?: boolean;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  is_sent?: boolean;
}

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch conversations for current user
  const fetchConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          is_pinned,
          conversations!inner (
            id,
            name,
            is_group,
            last_message,
            last_message_at,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id)
        .order('last_message_at', { ascending: false, foreignTable: 'conversations' });

      if (error) throw error;

      const formattedConversations: Conversation[] = data?.map(item => ({
        id: item.conversations.id,
        name: item.conversations.name,
        is_group: item.conversations.is_group,
        last_message: item.conversations.last_message,
        last_message_at: item.conversations.last_message_at,
        created_at: item.conversations.created_at,
        updated_at: item.conversations.updated_at,
        is_pinned: item.is_pinned,
        unread_count: 0, // TODO: Calculate unread count
      })) || [];

      setConversations(formattedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (conversationId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages: Message[] = data?.map(message => ({
        ...message,
        is_sent: message.sender_id === user.id,
      })) || [];

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  // Send a new message
  const sendMessage = async (conversationId: string, content: string) => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content.trim(),
        });

      if (error) throw error;

      // Refresh messages after sending
      await fetchMessages(conversationId);
      await fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  // Create a new conversation (kept for compatibility)
  const createConversation = async (participantIds: string[], name?: string, isGroup: boolean = false) => {
    if (!user) return;

    try {
      // Create conversation
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          created_by: user.id,
          name,
          is_group: isGroup,
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      // Add participants (including creator)
      const participants = [...participantIds, user.id].map(userId => ({
        conversation_id: conversation.id,
        user_id: userId,
      }));

      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert(participants);

      if (participantsError) throw participantsError;

      await fetchConversations();
      return conversation.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
    }
  };

  // Toggle pin status
  const togglePin = async (conversationId: string) => {
    if (!user) return;

    try {
      const currentConversation = conversations.find(c => c.id === conversationId);
      const newPinStatus = !currentConversation?.is_pinned;

      const { error } = await supabase
        .from('conversation_participants')
        .update({ is_pinned: newPinStatus })
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchConversations();
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast({
        title: "Error",
        description: "Failed to update conversation",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const messagesChannel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = {
            ...payload.new,
            is_sent: payload.new.sender_id === user.id,
          } as Message;
          
          setMessages(prev => [...prev, newMessage]);
          fetchConversations(); // Update conversation list with new last message
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [user]);

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchConversations();
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  return {
    conversations,
    messages,
    loading,
    fetchMessages,
    sendMessage,
    createConversation,
    togglePin,
  };
};