-- Fix security warning: Function search path mutable
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  
  -- Initialize onboarding record
  INSERT INTO public.user_onboarding (user_id, email, current_step)
  VALUES (NEW.id, NEW.email, 'intro');
  
  RETURN NEW;
END;
$$;