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
  completion_count?: number;
  current_streak?: number;
  best_streak?: number;
  last_completed_at?: string;
  is_recurring?: boolean;
  sharing_enabled?: boolean;
}

interface PlannerInsightsData {
  weekData: WeekData[];
  achievements: Achievement[];
  milestones: Milestone[];
  patterns: UserPattern[];
  timeAllocation: TimeAllocation;
  goals: Goal[];
  monthlyProductivity?: {
    productiveDays: number[];
    goalCompletionDays: number[];
    eventDays: number[];
  };
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
    monthlyProductivity: {
      productiveDays: [],
      goalCompletionDays: [],
      eventDays: []
    },
    loading: true,
    error: null,
  });
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
    category: 'all',
    status: 'all',
    type: 'all'
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

  const buildFilteredQueries = () => {
    const baseQuery = { eq: ['user_id', user.id] };
    const dateFilters: any[] = [];
    
    // Apply date range filter
    if (filters.dateRange?.from) {
      dateFilters.push(['gte', 'due_date', filters.dateRange.from.toISOString()]);
      dateFilters.push(['gte', 'start_time', filters.dateRange.from.toISOString()]);
      dateFilters.push(['gte', 'target_date', filters.dateRange.from.toISOString().split('T')[0]]);
    }
    if (filters.dateRange?.to) {
      dateFilters.push(['lte', 'due_date', filters.dateRange.to.toISOString()]);
      dateFilters.push(['lte', 'start_time', filters.dateRange.to.toISOString()]);
      dateFilters.push(['lte', 'target_date', filters.dateRange.to.toISOString().split('T')[0]]);
    }

    // Build search query
    let searchFilter = '';
    if (searchQuery.trim()) {
      searchFilter = `to_tsvector('english', title || ' ' || COALESCE(description, '')).@@.to_tsquery('english', '${searchQuery.trim().split(' ').join(' & ')}')`;
    }

    return { baseQuery, dateFilters, searchFilter };
  };

  const calculateMonthlyProductivity = (tasks: any[], goals: any[], events: any[]) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const monthlyData: {
      productiveDays: number[];
      goalCompletionDays: number[];
      eventDays: number[];
    } = {
      productiveDays: [],
      goalCompletionDays: [],
      eventDays: []
    };

    // Calculate for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const dayStr = dayDate.toISOString().split('T')[0];
      
      // Count completed tasks for this day (either completed on this day or due on this day and completed)
      const completedTasksForDay = tasks.filter(task => {
        if (!task.completed) return false;
        
        // Check if task was completed on this day
        const taskCompletedDate = task.updated_at ? new Date(task.updated_at).toISOString().split('T')[0] : null;
        const taskDueDate = task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : null;
        
        return taskCompletedDate === dayStr || (taskDueDate === dayStr && task.completed);
      }).length;

      // Count completed goals for this day  
      const completedGoalsForDay = goals.filter(goal => {
        if (!goal.is_completed) return false;
        
        const goalCompletedDate = goal.last_completed_at ? 
          new Date(goal.last_completed_at).toISOString().split('T')[0] : null;
        const goalTargetDate = goal.target_date ? 
          new Date(goal.target_date).toISOString().split('T')[0] : null;
          
        return goalCompletedDate === dayStr || (goalTargetDate === dayStr && goal.is_completed);
      }).length;

      // Count events for this day
      const eventsForDay = events.filter(event => {
        const eventDate = new Date(event.start_time).toISOString().split('T')[0];
        return eventDate === dayStr;
      }).length;

      // Determine day type based on activity (prioritize high productivity)
      if (completedTasksForDay >= 3) {
        monthlyData.productiveDays.push(day);
      } else if (completedGoalsForDay >= 1) {
        monthlyData.goalCompletionDays.push(day);
      } else if (eventsForDay > 0) {
        monthlyData.eventDays.push(day);
      }
    }

    return monthlyData;
  };

  const fetchAllData = async () => {
    if (!user) return;

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const { searchFilter, dateFilters } = buildFilteredQueries();

      // Build tasks query
      let tasksQuery = supabase.from('tasks').select('*').eq('user_id', user.id);
      if (searchQuery.trim()) {
        tasksQuery = tasksQuery.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      if (filters.category !== 'all') {
        tasksQuery = tasksQuery.eq('category', filters.category);
      }
      if (filters.status !== 'all') {
        if (filters.status === 'completed') {
          tasksQuery = tasksQuery.eq('completed', true);
        } else if (filters.status === 'pending') {
          tasksQuery = tasksQuery.eq('completed', false);
        } else if (filters.status === 'overdue') {
          tasksQuery = tasksQuery.eq('completed', false).lt('due_date', new Date().toISOString());
        }
      }
      if (filters.dateRange?.from) {
        tasksQuery = tasksQuery.gte('due_date', filters.dateRange.from.toISOString());
      }
      if (filters.dateRange?.to) {
        tasksQuery = tasksQuery.lte('due_date', filters.dateRange.to.toISOString());
      }

      // Build events query
      let eventsQuery = supabase.from('events').select('*').eq('user_id', user.id);
      if (searchQuery.trim()) {
        eventsQuery = eventsQuery.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      if (filters.category !== 'all') {
        eventsQuery = eventsQuery.eq('category', filters.category);
      }
      if (filters.dateRange?.from) {
        eventsQuery = eventsQuery.gte('start_time', filters.dateRange.from.toISOString());
      }
      if (filters.dateRange?.to) {
        eventsQuery = eventsQuery.lte('start_time', filters.dateRange.to.toISOString());
      }

      // Build goals query
      let goalsQuery = supabase.from('goals').select('*').eq('user_id', user.id);
      if (searchQuery.trim()) {
        goalsQuery = goalsQuery.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      if (filters.category !== 'all') {
        goalsQuery = goalsQuery.eq('category', filters.category);
      }
      if (filters.status !== 'all') {
        if (filters.status === 'completed') {
          goalsQuery = goalsQuery.eq('is_completed', true);
        } else if (filters.status === 'pending') {
          goalsQuery = goalsQuery.eq('is_completed', false);
        }
      }
      if (filters.dateRange?.from) {
        goalsQuery = goalsQuery.gte('target_date', filters.dateRange.from.toISOString().split('T')[0]);
      }
      if (filters.dateRange?.to) {
        goalsQuery = goalsQuery.lte('target_date', filters.dateRange.to.toISOString().split('T')[0]);
      }

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
        goalsQuery.order('created_at', { ascending: false }),
        tasksQuery.order('due_date', { ascending: true }),
        eventsQuery.order('start_time', { ascending: true })
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
      
      // Fetch monthly tasks and goals for productivity calculation
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
      
      const [
        { data: monthlyTasks, error: monthlyTasksError },
        { data: monthlyGoals, error: monthlyGoalsError },
        { data: monthlyEvents, error: monthlyEventsError }
      ] = await Promise.all([
        supabase.from('tasks').select('*').eq('user_id', user.id)
          .or(`and(updated_at.gte.${startOfMonth},updated_at.lte.${endOfMonth}),and(due_date.gte.${startOfMonth.split('T')[0]},due_date.lte.${endOfMonth.split('T')[0]})`),
        supabase.from('goals').select('*').eq('user_id', user.id)
          .or(`and(last_completed_at.gte.${startOfMonth.split('T')[0]},last_completed_at.lte.${endOfMonth.split('T')[0]}),and(target_date.gte.${startOfMonth.split('T')[0]},target_date.lte.${endOfMonth.split('T')[0]})`),
        supabase.from('events').select('*').eq('user_id', user.id)
          .gte('start_time', startOfMonth).lte('start_time', endOfMonth)
      ]);

      const monthlyProductivity = calculateMonthlyProductivity(
        monthlyTasks || [],
        monthlyGoals || [], 
        monthlyEvents || []
      );

      setData({
        achievements: achievements || [],
        milestones: milestones || [],
        patterns: patterns || [],
        timeAllocation,
        goals: goals || [],
        weekData,
        monthlyProductivity,
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

      // Refresh data immediately
      await fetchAllData();

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
    try {
      const updates: any = { progress };
      
      if (progress >= 100) {
        // Get current goal data for streak calculation
        const { data: currentGoal } = await supabase
          .from('goals')
          .select('*')
          .eq('id', goalId)
          .single();

        if (currentGoal) {
          const newCompletionCount = (currentGoal.completion_count || 0) + 1;
          const newCurrentStreak = (currentGoal.current_streak || 0) + 1;
          const newBestStreak = Math.max(newCurrentStreak, currentGoal.best_streak || 0);

          updates.is_completed = true;
          updates.completion_count = newCompletionCount;
          updates.current_streak = newCurrentStreak;
          updates.best_streak = newBestStreak;
          updates.last_completed_at = new Date().toISOString();

          // Record completion
          await supabase
            .from('goal_completions')
            .insert({
              user_id: user?.id,
              goal_id: goalId,
              streak_count: newCurrentStreak
            });

          // Log activity
          await supabase
            .from('goal_activity_log')
            .insert({
              user_id: user?.id,
              goal_id: goalId,
              activity_type: 'completed',
              activity_data: { 
                completion_count: newCompletionCount,
                streak: newCurrentStreak 
              }
            });
        }
      }
      
      const { error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', goalId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      await fetchAllData();
      
      toast({
        title: "Progress updated!",
        description: progress >= 100 ? "Congratulations on completing your goal!" : "Goal progress saved successfully.",
      });

      return updates.is_completed;
    } catch (error) {
      console.error('Error updating goal progress:', error);
      toast({
        title: "Error",
        description: "Failed to update goal progress.",
        variant: "destructive"
      });
      return false;
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

  // Add event function
  const addEvent = async (eventData: {
    title: string;
    description?: string;
    category: string;
    start_time: string;
    end_time?: string;
    location?: string;
    recurring?: boolean;
    recurrence_pattern?: string;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          user_id: user.id,
          ...eventData,
        }]);

      if (error) throw error;
      
      // Refresh data after adding
      await fetchAllData();

      toast({
        title: "Success",
        description: "Event added successfully",
      });

      return { success: true };

    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [user, searchQuery, filters]);

  const addGoalReflection = async (goalId: string, reflection: any) => {
    try {
      // Get the most recent completion for this goal
      const { data: completion } = await supabase
        .from('goal_completions')
        .select('id')
        .eq('goal_id', goalId)
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();

      if (!completion) throw new Error('No completion found for this goal');

      const { error } = await supabase
        .from('goal_reflections')
        .insert({
          user_id: user?.id,
          goal_id: goalId,
          completion_id: completion.id,
          ...reflection
        });

      if (error) throw error;

      toast({
        title: "Reflection saved!",
        description: "Your goal reflection has been recorded.",
      });
    } catch (error) {
      console.error('Error saving goal reflection:', error);
      toast({
        title: "Error",
        description: "Failed to save reflection.",
        variant: "destructive"
      });
    }
  };

  const restartGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          is_completed: false,
          progress: 0
        })
        .eq('id', goalId)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Log restart activity
      await supabase
        .from('goal_activity_log')
        .insert({
          user_id: user?.id,
          goal_id: goalId,
          activity_type: 'restarted',
          activity_data: {}
        });

      await fetchAllData();
      
      toast({
        title: "Goal restarted!",
        description: "Ready for another round!",
      });
    } catch (error) {
      console.error('Error restarting goal:', error);
      toast({
        title: "Error",
        description: "Failed to restart goal.",
        variant: "destructive"
      });
    }
  };

  const shareGoal = async (goalId: string) => {
    try {
      // Here you could implement sharing to village or social media
      // For now, we'll just log the share activity
      await supabase
        .from('goal_activity_log')
        .insert({
          user_id: user?.id,
          goal_id: goalId,
          activity_type: 'shared',
          activity_data: { shared_at: new Date().toISOString() }
        });

      toast({
        title: "Goal shared!",
        description: "Your achievement has been shared with your village!",
      });
    } catch (error) {
      console.error('Error sharing goal:', error);
      toast({
        title: "Error",
        description: "Failed to share goal.",
        variant: "destructive"
      });
    }
  };

  return {
    ...data,
    refetch: fetchAllData,
    saveReflection,
    updateGoalProgress,
    updateGoal,
    addGoal,
    addGoalReflection,
    restartGoal,
    shareGoal,
    addEvent,
    // Search and filter functionality
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
  };
};