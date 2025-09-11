-- Create goal completions table to track multiple completions of the same goal
CREATE TABLE public.goal_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_id UUID NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  streak_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.goal_completions ENABLE ROW LEVEL SECURITY;

-- Create policies for goal completions
CREATE POLICY "Users can create their own goal completions" 
ON public.goal_completions 
FOR INSERT 
WITH CHECK (user_id = get_current_user_id());

CREATE POLICY "Users can view their own goal completions" 
ON public.goal_completions 
FOR SELECT 
USING (user_id = get_current_user_id());

CREATE POLICY "Users can update their own goal completions" 
ON public.goal_completions 
FOR UPDATE 
USING (user_id = get_current_user_id());

CREATE POLICY "Users can delete their own goal completions" 
ON public.goal_completions 
FOR DELETE 
USING (user_id = get_current_user_id());

-- Create goal reflections table for completion reflections
CREATE TABLE public.goal_reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_id UUID NOT NULL,
  completion_id UUID NOT NULL,
  reflection_text TEXT,
  what_helped TEXT,
  challenges_faced TEXT,
  lessons_learned TEXT,
  would_do_again BOOLEAN DEFAULT true,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.goal_reflections ENABLE ROW LEVEL SECURITY;

-- Create policies for goal reflections
CREATE POLICY "Users can create their own goal reflections" 
ON public.goal_reflections 
FOR INSERT 
WITH CHECK (user_id = get_current_user_id());

CREATE POLICY "Users can view their own goal reflections" 
ON public.goal_reflections 
FOR SELECT 
USING (user_id = get_current_user_id());

CREATE POLICY "Users can update their own goal reflections" 
ON public.goal_reflections 
FOR UPDATE 
USING (user_id = get_current_user_id());

CREATE POLICY "Users can delete their own goal reflections" 
ON public.goal_reflections 
FOR DELETE 
USING (user_id = get_current_user_id());

-- Create goal activity log table
CREATE TABLE public.goal_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_id UUID NOT NULL,
  activity_type TEXT NOT NULL, -- 'created', 'updated', 'completed', 'restarted', 'shared', 'progress_updated'
  activity_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.goal_activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for goal activity log
CREATE POLICY "Users can create their own goal activity logs" 
ON public.goal_activity_log 
FOR INSERT 
WITH CHECK (user_id = get_current_user_id());

CREATE POLICY "Users can view their own goal activity logs" 
ON public.goal_activity_log 
FOR SELECT 
USING (user_id = get_current_user_id());

-- Add columns to existing goals table for better tracking
ALTER TABLE public.goals 
ADD COLUMN completion_count INTEGER DEFAULT 0,
ADD COLUMN current_streak INTEGER DEFAULT 0,
ADD COLUMN best_streak INTEGER DEFAULT 0,
ADD COLUMN last_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN is_recurring BOOLEAN DEFAULT false,
ADD COLUMN sharing_enabled BOOLEAN DEFAULT true;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_goal_reflections_updated_at
BEFORE UPDATE ON public.goal_reflections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();