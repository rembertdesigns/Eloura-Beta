-- Clean up orphaned records first
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

-- Fix existing constraints by dropping and recreating with CASCADE
DO $$
BEGIN
  -- Fix family_members constraint
  IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
             WHERE constraint_name = 'family_members_user_id_fkey' 
             AND table_name = 'family_members') THEN
    ALTER TABLE public.family_members DROP CONSTRAINT family_members_user_id_fkey;
  END IF;
  ALTER TABLE public.family_members ADD CONSTRAINT family_members_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

  -- Fix user_onboarding constraint
  IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
             WHERE constraint_name = 'user_onboarding_user_id_fkey' 
             AND table_name = 'user_onboarding') THEN
    ALTER TABLE public.user_onboarding DROP CONSTRAINT user_onboarding_user_id_fkey;
  END IF;
  ALTER TABLE public.user_onboarding ADD CONSTRAINT user_onboarding_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

  -- Fix village_invitations accepted_by_user_id constraint
  IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
             WHERE constraint_name = 'village_invitations_accepted_by_user_id_fkey' 
             AND table_name = 'village_invitations') THEN
    ALTER TABLE public.village_invitations DROP CONSTRAINT village_invitations_accepted_by_user_id_fkey;
  END IF;
  ALTER TABLE public.village_invitations ADD CONSTRAINT village_invitations_accepted_by_user_id_fkey 
    FOREIGN KEY (accepted_by_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

  -- Add constraints only if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'goals_user_id_fkey' 
                 AND table_name = 'goals') THEN
    ALTER TABLE public.goals ADD CONSTRAINT goals_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'tasks_user_id_fkey' 
                 AND table_name = 'tasks') THEN
    ALTER TABLE public.tasks ADD CONSTRAINT tasks_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'reminders_user_id_fkey' 
                 AND table_name = 'reminders') THEN
    ALTER TABLE public.reminders ADD CONSTRAINT reminders_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'help_requests_user_id_fkey' 
                 AND table_name = 'help_requests') THEN
    ALTER TABLE public.help_requests ADD CONSTRAINT help_requests_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'messages_sender_id_fkey' 
                 AND table_name = 'messages') THEN
    ALTER TABLE public.messages ADD CONSTRAINT messages_sender_id_fkey 
      FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  -- Add remaining constraints
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'celebrations_user_id_fkey' 
                 AND table_name = 'celebrations') THEN
    ALTER TABLE public.celebrations ADD CONSTRAINT celebrations_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'achievements_user_id_fkey' 
                 AND table_name = 'achievements') THEN
    ALTER TABLE public.achievements ADD CONSTRAINT achievements_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                 WHERE constraint_name = 'conversations_created_by_fkey' 
                 AND table_name = 'conversations') THEN
    ALTER TABLE public.conversations ADD CONSTRAINT conversations_created_by_fkey 
      FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;