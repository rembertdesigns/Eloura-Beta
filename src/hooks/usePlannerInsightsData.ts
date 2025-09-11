import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TimeAllocation {
  [key: string]: {
    hours: number;
    percentage: number;
    color: string;
  };
}

interface Achievement {
  id: string;
  achievement_name: string;
  description: string;
  icon: string;
  category: string;
  earned_date: string;
}

interface Milestone {
  id: string;
  title: string;
  description?: string;
  milestone_type: string;
  date: string;
  is_highlight: boolean;
}

interface UserPattern {
  id: string;
  pattern_type: string;
  pattern_name: string;
  pattern_value: string;
  pattern_description: string;
  confidence_score: number;
}

interface WeekData {
  day: string;
  tasks: Array<{
    time: string;
    title: string;
    category: string;
    color: string;
  }>;
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  progress: number;
  target_date: string;
  is_completed: boolean;
}

interface PlannerInsightsData {
  weekData: WeekData[];
  achievements: Achievement[];
  milestones: Milestone[];
  patterns: UserPattern[];
  timeAllocation: TimeAllocation;
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

export const usePlannerInsightsData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<PlannerInsightsData>({
    weekData: [],
    achievements: [],
    milestones: [],
    patterns: [],
    timeAllocation: {},
    goals: [],
    loading: true,
    error: null,
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Work': 'bg-blue-100 text-blue-700',
      'Personal': 'bg-green-100 text-green-700',
      'Family': 'bg-purple-100 text-purple-700',
      'Parenting': 'bg-yellow-100 text-yellow-700',
      'Health': 'bg-pink-100 text-pink-700',
      'Career': 'bg-blue-100 text-blue-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const generateWeekData = (tasks: any[], events: any[]) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    
    return days.map((day, index) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + index);
      
      const dayTasks = tasks.filter(task => {
        if (!task.due_date) return false;
        const taskDate = new Date(task.due_date);
        return taskDate.toDateString() === dayDate.toDateString();
      }).map(task => ({
        time: new Date(task.due_date).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit' 
        }),
        title: task.title,
        category: task.category || 'Personal',
        color: getCategoryColor(task.category || 'Personal')
      }));

      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate.toDateString() === dayDate.toDateString();
      }).map(event => ({
        time: new Date(event.start_time).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit' 
        }),
        title: event.title,
        category: event.category || 'Personal',
        color: getCategoryColor(event.category || 'Personal')
      }));

      return {
        day,
        tasks: [...dayTasks, ...dayEvents].sort((a, b) => 
          new Date(`1970/01/01 ${a.time}`).getTime() - new Date(`1970/01/01 ${b.time}`).getTime()
        )
      };
    });
  };

  const calculateTimeAllocation = (timeTracking: any[]) => {
    const allocation: { [key: string]: number } = {};
    const colors: { [key: string]: string } = {
      work: 'bg-blue-500',
      family: 'bg-purple-500',
      personal: 'bg-green-500',
      health: 'bg-orange-500',
    };

    timeTracking.forEach(entry => {
      allocation[entry.activity_type] = (allocation[entry.activity_type] || 0) + entry.duration_minutes;
    });

    const totalMinutes = Object.values(allocation).reduce((sum, minutes) => sum + minutes, 0);
    
    const result: TimeAllocation = {};
    Object.entries(allocation).forEach(([type, minutes]) => {
      result[type] = {
        hours: Math.round(minutes / 60),
        percentage: totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0,
        color: colors[type] || 'bg-gray-500'
      };
    });

    return result;
  };

  const fetchAllData = async () => {
    if (!user) return;

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const [
        { data: achievements, error: achievementsError },
        { data: milestones, error: milestonesError },
        { data: patterns, error: patternsError },
        { data: timeTracking, error: timeTrackingError },
        { data: goals, error: goalsError },
        { data: tasks, error: tasksError },
        { data: events, error: eventsError }
      ] = await Promise.all([
        supabase.from('achievements').select('*').eq('user_id', user.id).order('earned_date', { ascending: false }),
        supabase.from('milestones').select('*').eq('user_id', user.id).order('date', { ascending: false }),
        supabase.from('user_patterns').select('*').eq('user_id', user.id).order('date_computed', { ascending: false }),
        supabase.from('time_tracking').select('*').eq('user_id', user.id).gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('tasks').select('*').eq('user_id', user.id).gte('due_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).lte('due_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('events').select('*').eq('user_id', user.id).gte('start_time', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).lte('start_time', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      if (achievementsError) throw achievementsError;
      if (milestonesError) throw milestonesError;
      if (patternsError) throw patternsError;
      if (timeTrackingError) throw timeTrackingError;
      if (goalsError) throw goalsError;
      if (tasksError) throw tasksError;
      if (eventsError) throw eventsError;

      const timeAllocation = calculateTimeAllocation(timeTracking || []);
      const weekData = generateWeekData(tasks || [], events || []);

      setData({
        achievements: achievements || [],
        milestones: milestones || [],
        patterns: patterns || [],
        timeAllocation,
        goals: goals || [],
        weekData,
        loading: false,
        error: null,
      });

    } catch (error) {
      console.error('Error fetching planner insights data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data'
      }));
      toast({
        title: "Error",
        description: "Failed to load planner insights data",
        variant: "destructive",
      });
    }
  };

  const saveReflection = async (type: 'weekly' | 'monthly', data: {
    periodStart: string;
    periodEnd: string;
    wentWell?: string;
    challenges?: string;
    lessonsLearned?: string;
    nextPlans?: string;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('reflections').upsert({
        user_id: user.id,
        reflection_type: type,
        period_start: data.periodStart,
        period_end: data.periodEnd,
        went_well: data.wentWell,
        challenges: data.challenges,
        lessons_learned: data.lessonsLearned,
        next_plans: data.nextPlans,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} reflection saved`,
      });

    } catch (error) {
      console.error('Error saving reflection:', error);
      toast({
        title: "Error",
        description: "Failed to save reflection",
        variant: "destructive",
      });
    }
  };

  const updateGoal = async (goalId: string, updates: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('goals')
        .update({ 
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh data
      fetchAllData();

      toast({
        title: "Success",
        description: "Goal updated successfully",
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

  const updateGoalProgress = async (goalId: string, progress: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('goals')
        .update({ 
          progress,
          is_completed: progress >= 100,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh data
      fetchAllData();

      toast({
        title: "Success",
        description: "Goal progress updated",
      });

    } catch (error) {
      console.error('Error updating goal progress:', error);
      toast({
        title: "Error",
        description: "Failed to update goal progress",
        variant: "destructive",
      });
    }
  };

  const addGoal = async (goalData: {
    title: string;
    description?: string;
    category: string;
    target_date?: string;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('goals')
        .insert([{
          user_id: user.id,
          title: goalData.title,
          description: goalData.description,
          category: goalData.category,
          target_date: goalData.target_date,
          progress: 0,
          is_completed: false,
        }]);

      if (error) throw error;
      
      // Refresh data after adding
      fetchAllData();

      toast({
        title: "Success",
        description: "Goal added successfully",
      });

    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [user]);

  return {
    ...data,
    refetch: fetchAllData,
    saveReflection,
    updateGoalProgress,
    updateGoal,
    addGoal,
  };
};