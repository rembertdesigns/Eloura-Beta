import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority: string;
  is_urgent: boolean;
  completed: boolean;
  due_date?: string;
  assigned_to?: string;
  delegated_to?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  category?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  reminder_time: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tip {
  id: string;
  content: string;
  category?: string;
  is_active: boolean;
  created_at: string;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (tasksError) throw tasksError;

      // Fetch events for today
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .gte('start_time', startOfDay)
        .lte('start_time', endOfDay)
        .order('start_time', { ascending: true });

      if (eventsError) throw eventsError;

      // Fetch reminders
      const { data: remindersData, error: remindersError } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('reminder_time', { ascending: true });

      if (remindersError) throw remindersError;

      // Fetch tips
      const { data: tipsData, error: tipsError } = await supabase
        .from('tips')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (tipsError) throw tipsError;

      setTasks(tasksData || []);
      setEvents(eventsData || []);
      setReminders(remindersData || []);
      setTips(tipsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  // Add new event
  const addEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...eventData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setEvents(prev => [...prev, data].sort((a, b) => 
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      ));
      toast({
        title: "Success",
        description: "Event added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
    }
  };

  // Add new reminder
  const addReminder = async (reminderData: Omit<Reminder, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reminders')
        .insert([{ ...reminderData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setReminders(prev => [...prev, data].sort((a, b) => 
        new Date(a.reminder_time).getTime() - new Date(b.reminder_time).getTime()
      ));
      toast({
        title: "Success",
        description: "Reminder added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding reminder:', error);
      toast({
        title: "Error",
        description: "Failed to add reminder",
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

  // Get random tip
  const getRandomTip = () => {
    if (tips.length === 0) return null;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  return {
    tasks,
    events,
    reminders,
    tips,
    loading,
    addTask,
    addEvent,
    addReminder,
    toggleTaskCompletion,
    getRandomTip,
    refetch: fetchDashboardData,
  };
};