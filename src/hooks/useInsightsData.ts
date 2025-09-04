import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TimeTracking {
  [key: string]: {
    hours: number;
    percentage: number;
    color: string;
  };
}

interface InsightItem {
  type: 'warning' | 'success' | 'info';
  text: string;
  action: string;
  source: string;
}

interface StressPattern {
  period: string;
  description: string;
  rating: string;
  recommendation: string;
  type: 'high' | 'smooth' | 'current';
}

interface InsightsData {
  timeTracking: TimeTracking;
  insights: InsightItem[];
  stressPatterns: StressPattern[];
  loading: boolean;
  error: string | null;
}

export const useInsightsData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<InsightsData>({
    timeTracking: {},
    insights: [],
    stressPatterns: [],
    loading: true,
    error: null,
  });

  const calculateTimeTracking = (timeTrackingData: any[]) => {
    const allocation: { [key: string]: number } = {};
    const colors: { [key: string]: string } = {
      childcare: 'bg-green-500',
      eldercare: 'bg-orange-500', 
      selfcare: 'bg-purple-500',
      household: 'bg-blue-500',
      work: 'bg-blue-600',
      personal: 'bg-green-600',
      family: 'bg-purple-600',
      health: 'bg-orange-600',
    };

    timeTrackingData.forEach(entry => {
      allocation[entry.activity_type] = (allocation[entry.activity_type] || 0) + entry.duration_minutes;
    });

    const totalMinutes = Object.values(allocation).reduce((sum, minutes) => sum + minutes, 0);
    
    const result: TimeTracking = {};
    Object.entries(allocation).forEach(([type, minutes]) => {
      result[type] = {
        hours: Math.round(minutes / 60),
        percentage: totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0,
        color: colors[type] || 'bg-gray-500'
      };
    });

    return result;
  };

  const generateInsights = (tasks: any[], patterns: any[]) => {
    const insights: InsightItem[] = [];

    // Analyze task completion patterns
    if (tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.completed);
      const completionRate = (completedTasks.length / tasks.length) * 100;

      if (completionRate > 80) {
        insights.push({
          type: 'success',
          text: `${completionRate.toFixed(1)}% task completion rate this week`,
          action: 'Keep up the great work!',
          source: `Based on ${tasks.length} tasks tracked`
        });
      } else if (completionRate < 50) {
        insights.push({
          type: 'warning', 
          text: `${completionRate.toFixed(1)}% task completion rate - below average`,
          action: 'Consider reducing task load or breaking into smaller steps',
          source: `Analysis of ${tasks.length} tasks this week`
        });
      }

      // Analyze overdue tasks
      const overdueTasks = tasks.filter(task => 
        !task.completed && task.due_date && new Date(task.due_date) < new Date()
      );

      if (overdueTasks.length > 0) {
        insights.push({
          type: 'warning',
          text: `${overdueTasks.length} overdue tasks need attention`,
          action: 'Reschedule or complete high-priority items first',
          source: 'Based on current task due dates'
        });
      }
    }

    // Add pattern-based insights
    patterns.forEach(pattern => {
      if (pattern.pattern_type === 'productivity' && pattern.confidence_score > 0.7) {
        insights.push({
          type: 'info',
          text: pattern.pattern_description,
          action: 'Leverage this pattern for better planning',
          source: `Pattern detected with ${Math.round(pattern.confidence_score * 100)}% confidence`
        });
      }
    });

    return insights;
  };

  const generateStressPatterns = (tasks: any[], timeTracking: any[]) => {
    const patterns: StressPattern[] = [];

    // Analyze task density by time period
    const tasksByHour: { [key: string]: number } = {};
    tasks.forEach(task => {
      if (task.due_date) {
        const hour = new Date(task.due_date).getHours();
        const period = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
        tasksByHour[period] = (tasksByHour[period] || 0) + 1;
      }
    });

    // Find high stress periods
    const maxTasks = Math.max(...Object.values(tasksByHour));
    Object.entries(tasksByHour).forEach(([period, count]) => {
      if (count === maxTasks && count > 3) {
        patterns.push({
          period: `${period.charAt(0).toUpperCase() + period.slice(1)}s`,
          description: `${count} tasks scheduled on average`,
          rating: 'High load detected',
          recommendation: 'Consider spreading tasks throughout the day',
          type: 'high'
        });
      } else if (count <= 2) {
        patterns.push({
          period: `${period.charAt(0).toUpperCase() + period.slice(1)}s`, 
          description: `${count} tasks scheduled on average`,
          rating: 'Manageable load',
          recommendation: 'Good time for additional activities',
          type: 'smooth'
        });
      }
    });

    // Current week analysis
    const thisWeekTasks = tasks.filter(task => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return taskDate >= weekStart;
    });

    patterns.push({
      period: 'This Week',
      description: `${thisWeekTasks.length} tasks planned`,
      rating: thisWeekTasks.length > 15 ? 'High' : thisWeekTasks.length > 8 ? 'Medium' : 'Low',
      recommendation: thisWeekTasks.length > 15 ? 'Consider postponing non-urgent tasks' : 'Well-balanced schedule',
      type: 'current'
    });

    return patterns;
  };

  const fetchInsightsData = async () => {
    if (!user) return;

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const [
        { data: timeTrackingData, error: timeError },
        { data: tasks, error: tasksError },
        { data: patterns, error: patternsError }
      ] = await Promise.all([
        supabase
          .from('time_tracking')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase
          .from('user_patterns')
          .select('*')
          .eq('user_id', user.id)
          .order('date_computed', { ascending: false })
          .limit(10)
      ]);

      if (timeError) throw timeError;
      if (tasksError) throw tasksError;
      if (patternsError) throw patternsError;

      const timeTracking = calculateTimeTracking(timeTrackingData || []);
      const insights = generateInsights(tasks || [], patterns || []);
      const stressPatterns = generateStressPatterns(tasks || [], timeTrackingData || []);

      setData({
        timeTracking,
        insights,
        stressPatterns,
        loading: false,
        error: null,
      });

    } catch (error) {
      console.error('Error fetching insights data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch insights data'
      }));
      toast({
        title: "Error",
        description: "Failed to load insights data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInsightsData();
  }, [user]);

  return {
    ...data,
    refetch: fetchInsightsData,
  };
};