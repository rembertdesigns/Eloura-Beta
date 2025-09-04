-- Create analytics and tracking tables for planner insights

-- Achievement types and milestones
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_type TEXT NOT NULL, -- 'Task Champion', 'Early Bird', 'Streak Keeper', etc.
  achievement_name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- lucide icon name
  earned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT, -- 'productivity', 'consistency', 'balance', etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Time tracking for tasks and activities
CREATE TABLE public.time_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL, -- 'work', 'family', 'personal', 'health', etc.
  activity_name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  task_id UUID, -- optional reference to tasks table
  event_id UUID, -- optional reference to events table
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Milestones and highlights
CREATE TABLE public.milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  milestone_type TEXT NOT NULL, -- 'work', 'family', 'personal', 'health'
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_highlight BOOLEAN DEFAULT false, -- for weekly/monthly highlights
  related_goal_id UUID, -- optional reference to goals table
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Weekly/Monthly reflections
CREATE TABLE public.reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  reflection_type TEXT NOT NULL, -- 'weekly', 'monthly'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  went_well TEXT,
  challenges TEXT,
  lessons_learned TEXT,
  next_plans TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User patterns and insights (computed data)
CREATE TABLE public.user_patterns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  pattern_type TEXT NOT NULL, -- 'productivity_peak', 'best_category', 'streak_record'
  pattern_name TEXT NOT NULL,
  pattern_value TEXT NOT NULL, -- the actual insight/value
  pattern_description TEXT,
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  date_computed DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_patterns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for achievements
CREATE POLICY "Users can view their own achievements"
ON public.achievements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own achievements"
ON public.achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own achievements"
ON public.achievements FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own achievements"
ON public.achievements FOR DELETE
USING (auth.uid() = user_id);

-- Create RLS policies for time_tracking
CREATE POLICY "Users can view their own time tracking"
ON public.time_tracking FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own time tracking"
ON public.time_tracking FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time tracking"
ON public.time_tracking FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own time tracking"
ON public.time_tracking FOR DELETE
USING (auth.uid() = user_id);

-- Create RLS policies for milestones
CREATE POLICY "Users can view their own milestones"
ON public.milestones FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own milestones"
ON public.milestones FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own milestones"
ON public.milestones FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own milestones"
ON public.milestones FOR DELETE
USING (auth.uid() = user_id);

-- Create RLS policies for reflections
CREATE POLICY "Users can view their own reflections"
ON public.reflections FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reflections"
ON public.reflections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reflections"
ON public.reflections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reflections"
ON public.reflections FOR DELETE
USING (auth.uid() = user_id);

-- Create RLS policies for user_patterns
CREATE POLICY "Users can view their own patterns"
ON public.user_patterns FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own patterns"
ON public.user_patterns FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patterns"
ON public.user_patterns FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own patterns"
ON public.user_patterns FOR DELETE
USING (auth.uid() = user_id);

-- Create updated_at triggers for all tables
CREATE TRIGGER update_achievements_updated_at
BEFORE UPDATE ON public.achievements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_time_tracking_updated_at
BEFORE UPDATE ON public.time_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_milestones_updated_at
BEFORE UPDATE ON public.milestones
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reflections_updated_at
BEFORE UPDATE ON public.reflections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_patterns_updated_at
BEFORE UPDATE ON public.user_patterns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for demonstration
INSERT INTO public.achievements (user_id, achievement_type, achievement_name, description, icon, category, earned_date) VALUES
('00000000-0000-0000-0000-000000000000', 'consistency', 'Task Champion', '18 tasks completed this week', 'Trophy', 'productivity', CURRENT_DATE - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000000', 'timing', 'Early Bird', 'Started tasks on time 85% of week', 'Star', 'consistency', CURRENT_DATE - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000000', 'balance', 'Balance Master', 'Equal time for work and family', 'CheckCircle2', 'balance', CURRENT_DATE);

INSERT INTO public.time_tracking (user_id, activity_type, activity_name, duration_minutes, date) VALUES
('00000000-0000-0000-0000-000000000000', 'work', 'Project work', 480, CURRENT_DATE),
('00000000-0000-0000-0000-000000000000', 'family', 'Family time', 300, CURRENT_DATE),
('00000000-0000-0000-0000-000000000000', 'personal', 'Exercise', 60, CURRENT_DATE),
('00000000-0000-0000-0000-000000000000', 'work', 'Meetings', 240, CURRENT_DATE - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000000', 'family', 'Kids activities', 180, CURRENT_DATE - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000000', 'personal', 'Reading', 45, CURRENT_DATE - INTERVAL '1 day');

INSERT INTO public.milestones (user_id, title, description, milestone_type, date, is_highlight) VALUES
('00000000-0000-0000-0000-000000000000', 'Completed project milestone', 'Finished Q4 project phase 1', 'work', CURRENT_DATE - INTERVAL '3 days', true),
('00000000-0000-0000-0000-000000000000', 'Family movie night', 'Enjoyed quality time with family', 'family', CURRENT_DATE - INTERVAL '1 day', true),
('00000000-0000-0000-0000-000000000000', 'Morning run streak: 5 days', 'Maintained exercise consistency', 'personal', CURRENT_DATE, true),
('00000000-0000-0000-0000-000000000000', '10-week exercise streak milestone', 'Reached fitness consistency goal', 'health', CURRENT_DATE - INTERVAL '5 days', true);

INSERT INTO public.user_patterns (user_id, pattern_type, pattern_name, pattern_value, pattern_description, confidence_score) VALUES
('00000000-0000-0000-0000-000000000000', 'productivity_peak', 'Peak Productivity', 'Tuesday mornings', '90% task completion rate', 0.85),
('00000000-0000-0000-0000-000000000000', 'best_category', 'Best Category', 'Personal Tasks', '85% weekly completion', 0.78),
('00000000-0000-0000-0000-000000000000', 'streak_record', 'Streak Record', '15 days', 'Exercise habit streak', 0.92);

-- Create indexes for better performance
CREATE INDEX idx_achievements_user_date ON public.achievements(user_id, earned_date DESC);
CREATE INDEX idx_time_tracking_user_date ON public.time_tracking(user_id, date DESC);
CREATE INDEX idx_milestones_user_date ON public.milestones(user_id, date DESC);
CREATE INDEX idx_reflections_user_period ON public.reflections(user_id, period_start DESC);
CREATE INDEX idx_user_patterns_user_type ON public.user_patterns(user_id, pattern_type);