import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category?: string;
  progress: number;
  target_date?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface VillageMember {
  id: string;
  name: string;
  relationship?: string;
  contact_info?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Priority {
  id: string;
  title: string;
  description?: string;
  priority_type: 'urgent' | 'high' | 'medium' | 'low';
  due_time?: string;
  is_completed: boolean;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Celebration {
  id: string;
  title: string;
  description?: string;
  date: string;
  is_acknowledged: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority: string;
  is_urgent: boolean;
  completed: boolean;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunicationLog {
  id: string;
  contact_name: string;
  type: string;
  notes: string;
  category?: string;
  logged_by?: string;
  created_at: string;
}

export interface SocialEvent {
  id: string;
  title: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  category?: string;
  created_at: string;
}

export const useDailyBriefData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [villageMembers, setVillageMembers] = useState<VillageMember[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);
  const [socialEvents, setSocialEvents] = useState<SocialEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Motivational quotes array
  const motivationalQuotes = [
    "Every small step counts toward your bigger goals.",
    "You're handling more than you know. Give yourself credit.",
    "Progress, not perfection.",
    "Your care makes a difference in so many lives.",
    "Today is a new opportunity to show up for yourself and your family.",
    "Small acts of care create big waves of love.",
    "You're exactly where you need to be right now.",
    "Taking care of others starts with taking care of yourself."
  ];

  // Fetch all daily brief data
  const fetchAllData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch tasks for today
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

      const [tasksResult, goalsResult, villageResult, prioritiesResult, celebrationsResult, communicationResult, socialEventsResult] = await Promise.all([
        // Tasks (incomplete tasks or tasks completed today)
        supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .or(`completed.eq.false,and(completed.eq.true,updated_at.gte.${new Date().toISOString().split('T')[0]})`)
          .order('created_at', { ascending: false }),
        
        // Goals
        supabase
          .from('goals')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_completed', false)
          .order('created_at', { ascending: false }),
        
        // Village members
        supabase
          .from('village_members')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .order('name', { ascending: true }),
        
        // Today's priorities
        supabase
          .from('priorities')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', new Date().toISOString().split('T')[0])
          .order('priority_type', { ascending: true }),
        
        // Recent celebrations
        supabase
          .from('celebrations')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          .order('created_at', { ascending: false })
          .limit(5),
          
        // Recent communication logs (last 7 days)
        supabase
          .from('communication_logs')
          .select('*')
          .eq('user_id', user.id)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: false })
          .limit(10),
          
        // Upcoming social events (next 30 days)
        supabase
          .from('events')
          .select('*')
          .eq('user_id', user.id)
          .eq('category', 'social')
          .gte('start_time', new Date().toISOString())
          .lte('start_time', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())
          .order('start_time', { ascending: true })
          .limit(5)
      ]);

      if (tasksResult.error) throw tasksResult.error;
      if (goalsResult.error) throw goalsResult.error;
      if (villageResult.error) throw villageResult.error;
      if (prioritiesResult.error) throw prioritiesResult.error;
      if (celebrationsResult.error) throw celebrationsResult.error;
      if (communicationResult.error) throw communicationResult.error;
      if (socialEventsResult.error) throw socialEventsResult.error;

      setTasks(tasksResult.data || []);
      setGoals(goalsResult.data || []);
      setVillageMembers(villageResult.data || []);
      setPriorities((prioritiesResult.data || []).map(p => ({
        ...p,
        priority_type: p.priority_type as 'urgent' | 'high' | 'medium' | 'low'
      })));
      setCelebrations(celebrationsResult.data || []);
      setCommunicationLogs(communicationResult.data || []);
      setSocialEvents(socialEventsResult.data || []);
    } catch (error) {
      console.error('Error fetching daily brief data:', error);
      toast({
        title: "Error",
        description: "Failed to load daily brief data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new goal
  const addGoal = async (goalData: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{ ...goalData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Goal added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
      });
    }
  };

  // Add new task
  const addTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Task added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, completed } : task
        )
      );

      // Create celebration for completed task
      if (completed) {
        const completedTask = tasks.find(t => t.id === taskId);
        if (completedTask) {
          await addCelebration(`Completed: ${completedTask.title}`, 'Great job finishing this task!');
        }
      }

      toast({
        title: completed ? "Task completed!" : "Task uncompleted",
        description: completed ? "Great job! 🎉" : "Task marked as incomplete",
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  // Update goal progress
  const updateGoalProgress = async (goalId: string, progress: number, isCompleted?: boolean) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ progress, is_completed: isCompleted || false })
        .eq('id', goalId);

      if (error) throw error;

      setGoals(prev => 
        prev.map(goal => 
          goal.id === goalId ? { ...goal, progress, is_completed: isCompleted || false } : goal
        )
      );

      if (isCompleted) {
        const completedGoal = goals.find(g => g.id === goalId);
        if (completedGoal) {
          await addCelebration(`Goal achieved: ${completedGoal.title}`, 'Congratulations on reaching your goal!');
        }
      }

      toast({
        title: "Goal updated!",
        description: isCompleted ? "Congratulations on achieving your goal! 🎉" : "Progress updated",
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive",
      });
    }
  };

  // Add celebration
  const addCelebration = async (title: string, description?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('celebrations')
        .insert([{
          user_id: user.id,
          title,
          description,
          date: new Date().toISOString().split('T')[0],
          is_acknowledged: false
        }])
        .select()
        .single();

      if (error) throw error;

      setCelebrations(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding celebration:', error);
    }
  };

  // Get random motivational quote
  const getRandomQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  };

  // Calculate stats
  const getStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed).length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const activeGoalsCount = goals.length;
    const villageCount = villageMembers.length;

    return {
      completedTasks,
      pendingTasks,
      totalTasks,
      completionPercentage,
      activeGoalsCount,
      villageCount
    };
  };

  // Get filtered tasks based on category or status
  const getFilteredTasks = (filter: string) => {
    switch (filter) {
      case 'today':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'childcare':
        return tasks.filter(task => task.category === 'parenting');
      case 'eldercare':
        return tasks.filter(task => task.category === 'caretaking');
      case 'household':
        return tasks.filter(task => task.category === 'daily');
      case 'work':
        return tasks.filter(task => task.category === 'work');
      case 'village':
        return tasks.filter(task => task.category === 'parenting' || task.category === 'caretaking');
      case 'goals':
        return tasks.filter(task => task.category === 'work' || task.category === 'personal');
      default:
        return tasks;
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [user]);

  return {
    tasks,
    goals,
    villageMembers,
    priorities,
    celebrations,
    communicationLogs,
    socialEvents,
    loading,
    addGoal,
    addTask,
    toggleTaskCompletion,
    updateGoalProgress,
    addCelebration,
    getRandomQuote,
    getStats,
    getFilteredTasks,
    refetch: fetchAllData,
  };
};