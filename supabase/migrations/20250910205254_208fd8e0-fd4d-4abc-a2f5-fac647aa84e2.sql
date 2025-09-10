-- Comprehensive fix for all RLS performance issues
-- Replace all direct auth.uid() calls with subqueries to prevent re-evaluation for each row

-- Fix achievements table
DROP POLICY IF EXISTS "Users can view their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can create their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can update their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can delete their own achievements" ON public.achievements;

CREATE POLICY "Users can view their own achievements" ON public.achievements
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own achievements" ON public.achievements
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own achievements" ON public.achievements
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own achievements" ON public.achievements
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix celebrations table
DROP POLICY IF EXISTS "Users can view their own celebrations" ON public.celebrations;
DROP POLICY IF EXISTS "Users can create their own celebrations" ON public.celebrations;
DROP POLICY IF EXISTS "Users can update their own celebrations" ON public.celebrations;
DROP POLICY IF EXISTS "Users can delete their own celebrations" ON public.celebrations;

CREATE POLICY "Users can view their own celebrations" ON public.celebrations
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own celebrations" ON public.celebrations
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own celebrations" ON public.celebrations
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own celebrations" ON public.celebrations
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix chat_messages table
DROP POLICY IF EXISTS "Users can view their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can update their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete their own chat messages" ON public.chat_messages;

CREATE POLICY "Users can view their own chat messages" ON public.chat_messages
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own chat messages" ON public.chat_messages
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own chat messages" ON public.chat_messages
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own chat messages" ON public.chat_messages
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix communication_logs table
DROP POLICY IF EXISTS "Users can view their own communication logs" ON public.communication_logs;
DROP POLICY IF EXISTS "Users can create their own communication logs" ON public.communication_logs;
DROP POLICY IF EXISTS "Users can update their own communication logs" ON public.communication_logs;
DROP POLICY IF EXISTS "Users can delete their own communication logs" ON public.communication_logs;

CREATE POLICY "Users can view their own communication logs" ON public.communication_logs
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own communication logs" ON public.communication_logs
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own communication logs" ON public.communication_logs
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own communication logs" ON public.communication_logs
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix events table
DROP POLICY IF EXISTS "Users can view their own events" ON public.events;
DROP POLICY IF EXISTS "Users can create their own events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;

CREATE POLICY "Users can view their own events" ON public.events
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own events" ON public.events
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own events" ON public.events
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own events" ON public.events
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix goals table
DROP POLICY IF EXISTS "Users can view their own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can create their own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can update their own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can delete their own goals" ON public.goals;

CREATE POLICY "Users can view their own goals" ON public.goals
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own goals" ON public.goals
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own goals" ON public.goals
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own goals" ON public.goals
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix help_requests table
DROP POLICY IF EXISTS "Users can view their own help requests" ON public.help_requests;
DROP POLICY IF EXISTS "Users can create their own help requests" ON public.help_requests;
DROP POLICY IF EXISTS "Users can update their own help requests" ON public.help_requests;
DROP POLICY IF EXISTS "Users can delete their own help requests" ON public.help_requests;

CREATE POLICY "Users can view their own help requests" ON public.help_requests
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own help requests" ON public.help_requests
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own help requests" ON public.help_requests
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own help requests" ON public.help_requests
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix milestones table
DROP POLICY IF EXISTS "Users can view their own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Users can create their own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Users can update their own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Users can delete their own milestones" ON public.milestones;

CREATE POLICY "Users can view their own milestones" ON public.milestones
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own milestones" ON public.milestones
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own milestones" ON public.milestones
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own milestones" ON public.milestones
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix reflections table
DROP POLICY IF EXISTS "Users can view their own reflections" ON public.reflections;
DROP POLICY IF EXISTS "Users can create their own reflections" ON public.reflections;
DROP POLICY IF EXISTS "Users can update their own reflections" ON public.reflections;
DROP POLICY IF EXISTS "Users can delete their own reflections" ON public.reflections;

CREATE POLICY "Users can view their own reflections" ON public.reflections
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own reflections" ON public.reflections
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own reflections" ON public.reflections
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own reflections" ON public.reflections
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix reminders table
DROP POLICY IF EXISTS "Users can view their own reminders" ON public.reminders;
DROP POLICY IF EXISTS "Users can create their own reminders" ON public.reminders;
DROP POLICY IF EXISTS "Users can update their own reminders" ON public.reminders;
DROP POLICY IF EXISTS "Users can delete their own reminders" ON public.reminders;

CREATE POLICY "Users can view their own reminders" ON public.reminders
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own reminders" ON public.reminders
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own reminders" ON public.reminders
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own reminders" ON public.reminders
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix saved_content table
DROP POLICY IF EXISTS "Users can view their own saved content" ON public.saved_content;
DROP POLICY IF EXISTS "Users can create their own saved content" ON public.saved_content;
DROP POLICY IF EXISTS "Users can update their own saved content" ON public.saved_content;
DROP POLICY IF EXISTS "Users can delete their own saved content" ON public.saved_content;

CREATE POLICY "Users can view their own saved content" ON public.saved_content
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own saved content" ON public.saved_content
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own saved content" ON public.saved_content
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own saved content" ON public.saved_content
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix tasks table
DROP POLICY IF EXISTS "Users can view their own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can create their own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can update their own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can delete their own tasks" ON public.tasks;

CREATE POLICY "Users can view their own tasks" ON public.tasks
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own tasks" ON public.tasks
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own tasks" ON public.tasks
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own tasks" ON public.tasks
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix time_tracking table
DROP POLICY IF EXISTS "Users can view their own time tracking" ON public.time_tracking;
DROP POLICY IF EXISTS "Users can create their own time tracking" ON public.time_tracking;
DROP POLICY IF EXISTS "Users can update their own time tracking" ON public.time_tracking;
DROP POLICY IF EXISTS "Users can delete their own time tracking" ON public.time_tracking;

CREATE POLICY "Users can view their own time tracking" ON public.time_tracking
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own time tracking" ON public.time_tracking
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own time tracking" ON public.time_tracking
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own time tracking" ON public.time_tracking
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix toolkit_items table
DROP POLICY IF EXISTS "Users can view their own toolkit items" ON public.toolkit_items;
DROP POLICY IF EXISTS "Users can create their own toolkit items" ON public.toolkit_items;
DROP POLICY IF EXISTS "Users can update their own toolkit items" ON public.toolkit_items;
DROP POLICY IF EXISTS "Users can delete their own toolkit items" ON public.toolkit_items;

CREATE POLICY "Users can view their own toolkit items" ON public.toolkit_items
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own toolkit items" ON public.toolkit_items
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own toolkit items" ON public.toolkit_items
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own toolkit items" ON public.toolkit_items
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix user_patterns table
DROP POLICY IF EXISTS "Users can view their own patterns" ON public.user_patterns;
DROP POLICY IF EXISTS "Users can create their own patterns" ON public.user_patterns;
DROP POLICY IF EXISTS "Users can update their own patterns" ON public.user_patterns;
DROP POLICY IF EXISTS "Users can delete their own patterns" ON public.user_patterns;

CREATE POLICY "Users can view their own patterns" ON public.user_patterns
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own patterns" ON public.user_patterns
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own patterns" ON public.user_patterns
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own patterns" ON public.user_patterns
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix village_members table
DROP POLICY IF EXISTS "Users can view their own village members" ON public.village_members;
DROP POLICY IF EXISTS "Users can create their own village members" ON public.village_members;
DROP POLICY IF EXISTS "Users can update their own village members" ON public.village_members;
DROP POLICY IF EXISTS "Users can delete their own village members" ON public.village_members;

CREATE POLICY "Users can view their own village members" ON public.village_members
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own village members" ON public.village_members
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own village members" ON public.village_members
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own village members" ON public.village_members
FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

-- Fix user_preferences table
DROP POLICY IF EXISTS "Users can view their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can create their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;

CREATE POLICY "Users can view their own preferences" ON public.user_preferences
FOR SELECT TO authenticated USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own preferences" ON public.user_preferences
FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own preferences" ON public.user_preferences
FOR UPDATE TO authenticated USING (user_id = (select auth.uid()));