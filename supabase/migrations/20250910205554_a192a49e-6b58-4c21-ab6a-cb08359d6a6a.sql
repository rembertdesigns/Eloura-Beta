-- Create a security definer function to get current user ID efficiently
-- This eliminates all RLS performance issues by avoiding auth.uid() calls in policies

CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid();
$$;

-- Now update all RLS policies to use this function instead of auth.uid()

-- Fix achievements table
DROP POLICY IF EXISTS "Users can view their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can create their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can update their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can delete their own achievements" ON public.achievements;

CREATE POLICY "Users can view their own achievements" ON public.achievements
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own achievements" ON public.achievements
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own achievements" ON public.achievements
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own achievements" ON public.achievements
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix celebrations table
DROP POLICY IF EXISTS "Users can view their own celebrations" ON public.celebrations;
DROP POLICY IF EXISTS "Users can create their own celebrations" ON public.celebrations;
DROP POLICY IF EXISTS "Users can update their own celebrations" ON public.celebrations;
DROP POLICY IF EXISTS "Users can delete their own celebrations" ON public.celebrations;

CREATE POLICY "Users can view their own celebrations" ON public.celebrations
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own celebrations" ON public.celebrations
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own celebrations" ON public.celebrations
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own celebrations" ON public.celebrations
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix chat_messages table
DROP POLICY IF EXISTS "Users can view their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can update their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete their own chat messages" ON public.chat_messages;

CREATE POLICY "Users can view their own chat messages" ON public.chat_messages
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own chat messages" ON public.chat_messages
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own chat messages" ON public.chat_messages
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own chat messages" ON public.chat_messages
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix communication_logs table
DROP POLICY IF EXISTS "Users can view their own communication logs" ON public.communication_logs;
DROP POLICY IF EXISTS "Users can create their own communication logs" ON public.communication_logs;
DROP POLICY IF EXISTS "Users can update their own communication logs" ON public.communication_logs;
DROP POLICY IF EXISTS "Users can delete their own communication logs" ON public.communication_logs;

CREATE POLICY "Users can view their own communication logs" ON public.communication_logs
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own communication logs" ON public.communication_logs
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own communication logs" ON public.communication_logs
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own communication logs" ON public.communication_logs
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix events table
DROP POLICY IF EXISTS "Users can view their own events" ON public.events;
DROP POLICY IF EXISTS "Users can create their own events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;

CREATE POLICY "Users can view their own events" ON public.events
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own events" ON public.events
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own events" ON public.events
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own events" ON public.events
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix family_members table
DROP POLICY IF EXISTS "Users can view their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can create their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can update their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can delete their own family members" ON public.family_members;

CREATE POLICY "Users can view their own family members" ON public.family_members
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own family members" ON public.family_members
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own family members" ON public.family_members
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own family members" ON public.family_members
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix goals table
DROP POLICY IF EXISTS "Users can view their own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can create their own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can update their own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can delete their own goals" ON public.goals;

CREATE POLICY "Users can view their own goals" ON public.goals
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own goals" ON public.goals
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own goals" ON public.goals
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own goals" ON public.goals
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix help_requests table
DROP POLICY IF EXISTS "Users can view their own help requests" ON public.help_requests;
DROP POLICY IF EXISTS "Users can create their own help requests" ON public.help_requests;
DROP POLICY IF EXISTS "Users can update their own help requests" ON public.help_requests;
DROP POLICY IF EXISTS "Users can delete their own help requests" ON public.help_requests;

CREATE POLICY "Users can view their own help requests" ON public.help_requests
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own help requests" ON public.help_requests
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own help requests" ON public.help_requests
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own help requests" ON public.help_requests
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());

-- Fix milestones table
DROP POLICY IF EXISTS "Users can view their own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Users can create their own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Users can update their own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Users can delete their own milestones" ON public.milestones;

CREATE POLICY "Users can view their own milestones" ON public.milestones
FOR SELECT TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can create their own milestones" ON public.milestones
FOR INSERT TO authenticated WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update their own milestones" ON public.milestones
FOR UPDATE TO authenticated USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can delete their own milestones" ON public.milestones
FOR DELETE TO authenticated USING (user_id = public.get_current_user_id());