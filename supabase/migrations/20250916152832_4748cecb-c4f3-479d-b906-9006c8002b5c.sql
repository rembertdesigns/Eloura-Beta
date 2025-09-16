-- First, drop the existing foreign key constraint
ALTER TABLE public.user_onboarding 
DROP CONSTRAINT IF EXISTS user_onboarding_user_id_fkey;

-- Recreate the foreign key constraint with CASCADE DELETE
ALTER TABLE public.user_onboarding 
ADD CONSTRAINT user_onboarding_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Also check and fix profiles table foreign key if needed
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Fix other tables that might have user_id references
-- Family members
ALTER TABLE public.family_members 
DROP CONSTRAINT IF EXISTS family_members_user_id_fkey;

ALTER TABLE public.family_members 
ADD CONSTRAINT family_members_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Goals table
ALTER TABLE public.goals 
DROP CONSTRAINT IF EXISTS goals_user_id_fkey;

ALTER TABLE public.goals 
ADD CONSTRAINT goals_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Tasks table
ALTER TABLE public.tasks 
DROP CONSTRAINT IF EXISTS tasks_user_id_fkey;

ALTER TABLE public.tasks 
ADD CONSTRAINT tasks_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- All other user-related tables that need cascade delete
ALTER TABLE public.reminders DROP CONSTRAINT IF EXISTS reminders_user_id_fkey;
ALTER TABLE public.reminders ADD CONSTRAINT reminders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.help_requests DROP CONSTRAINT IF EXISTS help_requests_user_id_fkey;
ALTER TABLE public.help_requests ADD CONSTRAINT help_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.village_invitations DROP CONSTRAINT IF EXISTS village_invitations_inviter_id_fkey;
ALTER TABLE public.village_invitations ADD CONSTRAINT village_invitations_inviter_id_fkey FOREIGN KEY (inviter_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.celebrations DROP CONSTRAINT IF EXISTS celebrations_user_id_fkey;
ALTER TABLE public.celebrations ADD CONSTRAINT celebrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.achievements DROP CONSTRAINT IF EXISTS achievements_user_id_fkey;
ALTER TABLE public.achievements ADD CONSTRAINT achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.tips DROP CONSTRAINT IF EXISTS tips_user_id_fkey;

ALTER TABLE public.toolkit_items DROP CONSTRAINT IF EXISTS toolkit_items_user_id_fkey;
ALTER TABLE public.toolkit_items ADD CONSTRAINT toolkit_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_user_id_fkey;
ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.reflections DROP CONSTRAINT IF EXISTS reflections_user_id_fkey;
ALTER TABLE public.reflections ADD CONSTRAINT reflections_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.milestones DROP CONSTRAINT IF EXISTS milestones_user_id_fkey;
ALTER TABLE public.milestones ADD CONSTRAINT milestones_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.saved_content DROP CONSTRAINT IF EXISTS saved_content_user_id_fkey;
ALTER TABLE public.saved_content ADD CONSTRAINT saved_content_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.communication_logs DROP CONSTRAINT IF EXISTS communication_logs_user_id_fkey;
ALTER TABLE public.communication_logs ADD CONSTRAINT communication_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.time_tracking DROP CONSTRAINT IF EXISTS time_tracking_user_id_fkey;
ALTER TABLE public.time_tracking ADD CONSTRAINT time_tracking_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_patterns DROP CONSTRAINT IF EXISTS user_patterns_user_id_fkey;
ALTER TABLE public.user_patterns ADD CONSTRAINT user_patterns_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_user_id_fkey;
ALTER TABLE public.events ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.goal_completions DROP CONSTRAINT IF EXISTS goal_completions_user_id_fkey;
ALTER TABLE public.goal_completions ADD CONSTRAINT goal_completions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_preferences DROP CONSTRAINT IF EXISTS user_preferences_user_id_fkey;
ALTER TABLE public.user_preferences ADD CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.goal_activity_log DROP CONSTRAINT IF EXISTS goal_activity_log_user_id_fkey;
ALTER TABLE public.goal_activity_log ADD CONSTRAINT goal_activity_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.help_request_templates DROP CONSTRAINT IF EXISTS help_request_templates_user_id_fkey;
ALTER TABLE public.help_request_templates ADD CONSTRAINT help_request_templates_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.priorities DROP CONSTRAINT IF EXISTS priorities_user_id_fkey;
ALTER TABLE public.priorities ADD CONSTRAINT priorities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.goal_reflections DROP CONSTRAINT IF EXISTS goal_reflections_user_id_fkey;
ALTER TABLE public.goal_reflections ADD CONSTRAINT goal_reflections_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.village_members DROP CONSTRAINT IF EXISTS village_members_user_id_fkey;
ALTER TABLE public.village_members ADD CONSTRAINT village_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;