import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ConversationData {
  id: string;
  name: string | null;
  is_group: boolean;
  last_message: string | null;
  last_message_at: string;
  unread_count: number;
  is_pinned: boolean;
  participant_info?: {
    name: string;
    avatar: string;
  };
}

export interface MessageData {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_read: boolean;
  is_sent: boolean;
}

export const useMessagesData = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const fetchConversations = async () => {
    if (!user?.id) return;

    try {
      // Get conversations the user participates in
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          is_pinned,
          conversations!inner(
            id,
            name,
            is_group,
            last_message,
            last_message_at
          )
        `)
        .eq('user_id', user.id);

      if (participantError) throw participantError;

      // For each conversation, get unread message count and participant info
      const conversationsWithDetails = await Promise.all(
        (participantData || []).map(async (participant) => {
          const conversation = participant.conversations;
          
          // Get unread count
          const { data: lastRead } = await supabase
            .from('conversation_participants')
            .select('last_read_at')
            .eq('conversation_id', conversation.id)
            .eq('user_id', user.id)
            .single();

          const { count: unreadCount } = await supabase
            .from('messages')
            .select('id', { count: 'exact' })
            .eq('conversation_id', conversation.id)
            .gt('created_at', lastRead?.last_read_at || '1970-01-01');

          // Get participant info for 1-on-1 conversations
          let participantInfo = null;
          if (!conversation.is_group) {
            const { data: otherParticipants } = await supabase
              .from('conversation_participants')
              .select('user_id')
              .eq('conversation_id', conversation.id)
              .neq('user_id', user.id)
              .limit(1);

            if (otherParticipants?.[0]) {
              // Try to get user info from village_members first, then fall back to profiles
              const { data: villageMembers } = await supabase
                .from('village_members')
                .select('name')
                .eq('user_id', user.id)
                .limit(1);

              const { data: profiles } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', otherParticipants[0].user_id)
                .limit(1);

              const userName = villageMembers?.[0]?.name || profiles?.[0]?.full_name || 'Unknown User';
              participantInfo = {
                name: userName,
                avatar: userName[0] || 'U'
              };
            }
          }

          return {
            id: conversation.id,
            name: conversation.is_group ? conversation.name : participantInfo?.name || 'Unknown',
            is_group: conversation.is_group,
            last_message: conversation.last_message,
            last_message_at: conversation.last_message_at,
            unread_count: unreadCount || 0,
            is_pinned: participant.is_pinned,
            participant_info: participantInfo
          };
        })
      );

      setConversations(conversationsWithDetails);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const messagesWithSentStatus = (data || []).map(message => ({
        ...message,
        is_sent: message.sender_id === user.id
      }));

      setMessages(messagesWithSentStatus);

      // Mark messages as read
      await supabase
        .from('conversation_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content.trim()
        });

      if (error) throw error;

      // Refresh messages for this conversation
      fetchMessages(conversationId);
      
      // Refresh conversations to update last message
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const togglePin = async (conversationId: string) => {
    if (!user?.id) return;

    try {
      const conversation = conversations.find(c => c.id === conversationId);
      if (!conversation) return;

      const { error } = await supabase
        .from('conversation_participants')
        .update({ is_pinned: !conversation.is_pinned })
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh conversations
      fetchConversations();
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const createConversation = async (participantIds: string[], groupName?: string) => {
    if (!user?.id) return;

    try {
      const isGroup = participantIds.length > 1;
      
      // Create conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          created_by: user.id,
          name: isGroup ? groupName : null,
          is_group: isGroup
        })
        .select()
        .single();

      if (convError) throw convError;

      // Add all participants including creator
      const allParticipants = [user.id, ...participantIds];
      const participants = allParticipants.map(userId => ({
        conversation_id: conversation.id,
        user_id: userId
      }));

      const { error: participantError } = await supabase
        .from('conversation_participants')
        .insert(participants);

      if (participantError) throw participantError;

      // Refresh conversations
      fetchConversations();
      
      return conversation.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          // Refresh messages if it's for the selected conversation
          if (payload.new.conversation_id === selectedConversationId) {
            fetchMessages(selectedConversationId);
          }
          // Always refresh conversations to update last message
          fetchConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversation_participants',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, selectedConversationId]);

  // Initial data fetch
  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetchConversations().finally(() => setLoading(false));
    }
  }, [user?.id]);

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  return {
    conversations,
    messages,
    loading,
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    togglePin,
    createConversation,
    fetchConversations
  };
};