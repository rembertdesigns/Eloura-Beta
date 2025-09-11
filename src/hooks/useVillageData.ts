import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useVillageData = () => {
  const { user } = useAuth();
  const [villageMembers, setVillageMembers] = useState<any[]>([]);
  const [helpRequests, setHelpRequests] = useState<any[]>([]);
  const [communicationLogs, setCommunicationLogs] = useState<any[]>([]);
  const [delegationTasks, setDelegationTasks] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch village members
  const fetchVillageMembers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('village_members')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      console.log('Village members fetched:', data?.length || 0);
      setVillageMembers(data || []);
    } catch (err) {
      console.error('Error fetching village members:', err);
      setVillageMembers([]);
      setError('Failed to load village members');
    }
  };

  // Fetch help requests
  const fetchHelpRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('help_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Help requests fetched:', data?.length || 0);
      setHelpRequests(data || []);
    } catch (err) {
      console.error('Error fetching help requests:', err);
      setHelpRequests([]);
      setError('Failed to load help requests');
    }
  };

  // Fetch communication logs
  const fetchCommunicationLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('communication_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunicationLogs(data || []);
    } catch (err) {
      console.error('Error fetching communication logs:', err);
      setError('Failed to load communication logs');
    }
  };

  // Fetch delegation tasks (tasks assigned to village members)
  const fetchDelegationTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .not('village_member_id', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDelegationTasks(data || []);
    } catch (err) {
      console.error('Error fetching delegation tasks:', err);
      setError('Failed to load delegation tasks');
    }
  };

  // Add village member
  const addVillageMember = async (memberData: any) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('village_members')
        .insert([{
          user_id: user.id,
          ...memberData
        }])
        .select()
        .single();

      if (error) throw error;
      setVillageMembers(prev => [...prev, data]);
      return true;
    } catch (err) {
      console.error('Error adding village member:', err);
      setError('Failed to add village member');
      return false;
    }
  };

  // Add help request
  const addHelpRequest = async (requestData: any) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('help_requests')
        .insert([{
          user_id: user.id,
          ...requestData
        }])
        .select()
        .single();

      if (error) throw error;
      setHelpRequests(prev => [data, ...prev]);
      return true;
    } catch (err) {
      console.error('Error adding help request:', err);
      setError('Failed to add help request');
      return false;
    }
  };

  // Add communication log
  const addCommunicationLog = async (logData: any) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('communication_logs')
        .insert([{
          user_id: user.id,
          ...logData
        }])
        .select()
        .single();

      if (error) throw error;
      setCommunicationLogs(prev => [data, ...prev]);
      return true;
    } catch (err) {
      console.error('Error adding communication log:', err);
      setError('Failed to add communication log');
      return false;
    }
  };

  // Update task
  const updateTask = async (taskId: string, updates: any) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .eq('user_id', user.id)
        .select('*')
        .single();

      if (error) throw error;
      setDelegationTasks(prev => prev.map(task => 
        task.id === taskId ? data : task
      ));
      return true;
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
      return false;
    }
  };

  // Update village member
  const updateVillageMember = async (memberId: string, updates: any) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('village_members')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', memberId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Refresh the village members list
      await fetchVillageMembers();
      return true;
    } catch (err) {
      console.error('Error updating village member:', err);
      setError('Failed to update village member');
      return false;
    }
  };

  const updateHelpRequest = async (id: string, updates: any) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('help_requests')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Refresh the help requests list
      await fetchHelpRequests();
      return true;
    } catch (err) {
      console.error('Error updating help request:', err);
      setError('Failed to update help request');
      return false;
    }
  };

  const deleteHelpRequest = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('help_requests')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Refresh the help requests list
      await fetchHelpRequests();
      return true;
    } catch (err) {
      console.error('Error deleting help request:', err);
      setError('Failed to delete help request');
      return false;
    }
  };

  // Delete village member
  const deleteVillageMember = async (memberId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('village_members')
        .update({ is_active: false })
        .eq('id', memberId)
        .eq('user_id', user.id);

      if (error) throw error;
      setVillageMembers(prev => prev.filter(member => member.id !== memberId));
      return true;
    } catch (err) {
      console.error('Error deleting village member:', err);
      setError('Failed to delete village member');
      return false;
    }
  };

  // Fetch conversations
  const fetchConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('created_by', user.id)
        .order('last_message_at', { ascending: false });

      if (error) {
        console.log('No conversations found or table not accessible:', error);
        setConversations([]);
        return;
      }
      setConversations(data || []);
    } catch (err) {
      console.log('Conversations not available:', err);
      setConversations([]);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('sender_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.log('No messages found or table not accessible:', error);
        setMessages([]);
        return;
      }
      setMessages(data || []);
    } catch (err) {
      console.log('Messages not available:', err);
      setMessages([]);
    }
  };

  // Create conversation
  const createConversation = async (memberName: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          name: memberName,
          created_by: user.id,
          is_group: false
        })
        .select()
        .single();

      if (convError) throw convError;

      await fetchConversations();
      return conversation.id;
    } catch (err) {
      console.error('Error creating conversation:', err);
      throw err;
    }
  };

  // Send message
  const sendMessage = async (conversationId: string, content: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content
        });

      if (error) throw error;
      await fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  // Initialize data
  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        setError(null);
        
        // Clear all data first for new users
        setVillageMembers([]);
        setHelpRequests([]);
        setCommunicationLogs([]);
        setDelegationTasks([]);
        setConversations([]);
        setMessages([]);
        
        // Load critical data first
        try {
          await Promise.all([
            fetchVillageMembers(),
            fetchHelpRequests(),
            fetchCommunicationLogs(),
            fetchDelegationTasks()
          ]);
        } catch (err) {
          console.error('Error loading main data:', err);
          setError('Failed to load village data');
        }
        
        // Load optional messaging data (don't fail if these don't work)
        await Promise.all([
          fetchConversations(),
          fetchMessages()
        ]);
        
        setLoading(false);
      };
      loadData();
    }
  }, [user]);

  // Generate analytics from data
  const analytics = {
    totalMembers: villageMembers.length,
    activeTasks: delegationTasks.filter(task => task.status !== 'completed').length,
    openRequests: helpRequests.filter(request => request.status === 'open').length,
    completedTasks: delegationTasks.filter(task => task.status === 'completed').length,
    inProgressTasks: delegationTasks.filter(task => task.status === 'in_progress').length,
    recurringTasks: delegationTasks.filter(task => task.recurring).length,
    avgProgress: delegationTasks.length > 0 
      ? Math.round(delegationTasks.reduce((acc, task) => acc + (task.progress || 0), 0) / delegationTasks.length)
      : 0,
    topHelpers: villageMembers
      .map(member => {
        const helpCount = delegationTasks.filter(task => 
          task.village_member_id === member.id && task.status === 'completed'
        ).length;
        return { ...member, helpCount };
      })
      .sort((a, b) => b.helpCount - a.helpCount)
      .slice(0, 3)
  };

  return {
    villageMembers,
    helpRequests,
    communicationLogs,
    delegationTasks,
    conversations,
    messages,
    analytics,
    loading,
    error,
    addVillageMember,
    updateVillageMember,
    addHelpRequest,
    updateHelpRequest,
    deleteHelpRequest,
    addCommunicationLog,
    updateTask,
    deleteVillageMember,
    createConversation,
    sendMessage,
    refetch: () => {
      fetchVillageMembers();
      fetchHelpRequests();
      fetchCommunicationLogs();
      fetchDelegationTasks();
      fetchConversations();
      fetchMessages();
    }
  };
};