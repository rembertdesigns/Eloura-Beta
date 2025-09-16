-- Fix the handle_new_user function to match current schema
-- The function is trying to insert email into user_onboarding table but that column doesn't exist

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  
  -- Initialize onboarding record (removed email column as it doesn't exist)
  INSERT INTO public.user_onboarding (user_id, current_step)
  VALUES (NEW.id, 'intro');
  
  RETURN NEW;
END;
$function$;