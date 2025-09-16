-- First, clean up any orphaned records that reference non-existent users
DELETE FROM public.user_onboarding WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.goals WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.tasks WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.family_members WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.reminders WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.help_requests WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.celebrations WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.achievements WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.toolkit_items WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.chat_messages WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.reflections WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.milestones WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.saved_content WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.communication_logs WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.time_tracking WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.user_patterns WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.events WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.goal_completions WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.user_preferences WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.goal_activity_log WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.help_request_templates WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.priorities WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.goal_reflections WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.village_members WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.conversations WHERE created_by NOT IN (SELECT id FROM auth.users);

-- Fix existing constraints that have NO ACTION to CASCADE DELETE
ALTER TABLE public.family_members DROP CONSTRAINT IF EXISTS family_members_user_id_fkey;
ALTER TABLE public.family_members ADD CONSTRAINT family_members_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_onboarding DROP CONSTRAINT IF EXISTS user_onboarding_user_id_fkey;
ALTER TABLE public.user_onboarding ADD CONSTRAINT user_onboarding_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.village_invitations DROP CONSTRAINT IF EXISTS village_invitations_accepted_by_user_id_fkey;
ALTER TABLE public.village_invitations ADD CONSTRAINT village_invitations_accepted_by_user_id_fkey 
  FOREIGN KEY (accepted_by_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add missing foreign key constraints with CASCADE DELETE for all other tables
ALTER TABLE public.goals ADD CONSTRAINT goals_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.tasks ADD CONSTRAINT tasks_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.reminders ADD CONSTRAINT reminders_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.help_requests ADD CONSTRAINT help_requests_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.celebrations ADD CONSTRAINT celebrations_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.achievements ADD CONSTRAINT achievements_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.toolkit_items ADD CONSTRAINT toolkit_items_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.reflections ADD CONSTRAINT reflections_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.milestones ADD CONSTRAINT milestones_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.saved_content ADD CONSTRAINT saved_content_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.communication_logs ADD CONSTRAINT communication_logs_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.time_tracking ADD CONSTRAINT time_tracking_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_patterns ADD CONSTRAINT user_patterns_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.events ADD CONSTRAINT events_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.goal_completions ADD CONSTRAINT goal_completions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_preferences ADD CONSTRAINT user_preferences_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.goal_activity_log ADD CONSTRAINT goal_activity_log_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.help_request_templates ADD CONSTRAINT help_request_templates_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.priorities ADD CONSTRAINT priorities_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.goal_reflections ADD CONSTRAINT goal_reflections_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.village_members ADD CONSTRAINT village_members_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.conversations ADD CONSTRAINT conversations_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign keys for sender_id in messages table
ALTER TABLE public.messages ADD CONSTRAINT messages_sender_id_fkey 
  FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;