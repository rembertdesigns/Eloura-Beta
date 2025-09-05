import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type ChatMessageDB = Tables<'chat_messages'>;

interface ChatMessage {
  id: string;
  user_id: string;
  session_id: string;
  message_content: string;
  sender: 'user' | 'assistant';
  created_at: string;
  updated_at: string;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID());
  const { user } = useAuth();
  const { toast } = useToast();

  // Load chat history for current session
  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data as ChatMessageDB[]).map(msg => ({
        ...msg,
        sender: msg.sender as 'user' | 'assistant'
      })) || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive",
      });
    }
  };

  // Send message to AI
  const sendMessage = async (messageContent: string) => {
    if (!user || !messageContent.trim()) return;

    setLoading(true);
    
    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      user_id: user.id,
      message_content: messageContent,
      sender: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      session_id: sessionId
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message: messageContent,
          sessionId: sessionId
        }
      });

      if (error) throw error;

      // Add AI response to UI
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        user_id: user.id,
        message_content: data.response,
        sender: 'assistant',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        session_id: sessionId
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Remove the user message from UI on error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
  };

  // Start new conversation
  const startNewConversation = () => {
    setSessionId(crypto.randomUUID());
    setMessages([]);
  };

  // Get recent conversations
  const getRecentConversations = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_id, message_content, created_at')
        .eq('user_id', user.id)
        .eq('sender', 'user')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Group by session_id and get the latest message for each session
      const conversationsMap = new Map();
      data?.forEach(msg => {
        if (!conversationsMap.has(msg.session_id)) {
          conversationsMap.set(msg.session_id, {
            session_id: msg.session_id,
            preview: msg.message_content.substring(0, 60) + '...',
            last_message_at: msg.created_at
          });
        }
      });

      return Array.from(conversationsMap.values()).slice(0, 10);
    } catch (error) {
      console.error('Error getting recent conversations:', error);
      return [];
    }
  };

  // Load conversation by session ID
  const loadConversation = async (conversationSessionId: string) => {
    setSessionId(conversationSessionId);
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_id', conversationSessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data as ChatMessageDB[]).map(msg => ({
        ...msg,
        sender: msg.sender as 'user' | 'assistant'
      })) || []);
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation",
        variant: "destructive",
      });
    }
  };

  // Load chat history when session or user changes
  useEffect(() => {
    if (user && sessionId) {
      loadChatHistory();
    }
  }, [user, sessionId]);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!user || !sessionId) return;

    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${user.id} AND session_id=eq.${sessionId}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessageDB;
          setMessages(current => {
            // Avoid duplicates
            if (current.some(msg => msg.id === newMessage.id)) {
              return current;
            }
            return [...current, {
              ...newMessage,
              sender: newMessage.sender as 'user' | 'assistant'
            }];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, sessionId]);

  return {
    messages,
    loading,
    sessionId,
    sendMessage,
    startNewConversation,
    getRecentConversations,
    loadConversation
  };
};