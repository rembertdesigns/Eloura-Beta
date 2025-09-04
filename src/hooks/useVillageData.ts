import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useVillageData = () => {
  const { user } = useAuth();
  const [villageMembers, setVillageMembers] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [delegationTasks, setDelegationTasks] = useState([]);
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
      setVillageMembers(data || []);
    } catch (err) {
      console.error('Error fetching village members:', err);
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
      setHelpRequests(data || []);
    } catch (err) {
      console.error('Error fetching help requests:', err);
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
        .select(`
          *,
          village_members!village_member_id (
            name,
            relationship
          )
        `)
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
        .select(`
          *,
          village_members!village_member_id (
            name,
            relationship
          )
        `)
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

  // Initialize data
  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([
          fetchVillageMembers(),
          fetchHelpRequests(),
          fetchCommunicationLogs(),
          fetchDelegationTasks()
        ]);
        setLoading(false);
      };
      loadData();
    }
  }, [user]);

  // Initialize sample data if none exists
  useEffect(() => {
    const addSampleData = async () => {
      if (user && villageMembers.length === 0 && helpRequests.length === 0 && !loading) {
        // Add sample village members
        await addVillageMember({
          name: 'Mom (Patricia)',
          relationship: 'mother',
          rating: 5,
          rating_count: 5,
          description: 'Great with kids, loves to help with meals',
          phone: '(555) 123-4567',
          email: 'patricia@email.com',
          status: 'Available',
          skills: ['Cooking', 'Childcare', 'Transportation'],
          group_name: 'Family',
          recent_activity: 'Picked up groceries yesterday',
          roles: ['Childcare', 'Meal Support', 'Transportation'],
          is_online: true,
          avatar: 'M'
        });

        await addVillageMember({
          name: 'Mike (Partner)',
          relationship: 'partner',
          rating: 5,
          rating_count: 5,  
          description: 'Great with school stuff, weekend activities',
          phone: '(555) 456-7890',
          email: 'mike@email.com',
          status: 'Available evenings',
          skills: ['School Support', 'Sports', 'Tech Help'],
          group_name: 'Family',
          recent_activity: 'Helped with homework 2 hours ago',
          roles: ['School Support', 'Weekend Activities'],
          is_online: false,
          avatar: 'M'
        });

        // Add sample help requests
        await addHelpRequest({
          title: 'Need babysitter for date night',
          description: 'Looking for someone to watch the kids while we go out for our anniversary',
          category: 'Childcare',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '6:00 PM - 11:00 PM',
          status: 'open',
          urgent: false,
          responses_count: 2
        });

        await addHelpRequest({
          title: 'School pickup emergency',
          description: 'Stuck in meeting, need someone to pick up kids from school',
          category: 'Transportation',
          date: new Date().toISOString().split('T')[0],
          time: '3:15 PM',
          status: 'fulfilled',
          urgent: true,
          responses_count: 1
        });

        // Add sample communication logs
        await addCommunicationLog({
          contact_name: 'Mom (Patricia)',
          type: 'Phone call',
          notes: 'Called to check on her appointment. She\'s doing well and confirmed grocery pickup tomorrow.',
          category: 'Health'
        });

        await addCommunicationLog({
          contact_name: 'Mike (Partner)',
          type: 'Text message',
          notes: 'Confirmed soccer practice carpool. He\'ll pick up kids at 3 PM.',
          category: 'Transportation'
        });
      }
    };

    // Add delay to ensure data is loaded first
    const timer = setTimeout(() => {
      if (user && !loading) {
        addSampleData();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, loading, villageMembers.length, helpRequests.length]);

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
    analytics,
    loading,
    error,
    addVillageMember,
    addHelpRequest,
    addCommunicationLog,
    updateTask,
    deleteVillageMember,
    refetch: () => {
      fetchVillageMembers();
      fetchHelpRequests();
      fetchCommunicationLogs();
      fetchDelegationTasks();
    }
  };
};