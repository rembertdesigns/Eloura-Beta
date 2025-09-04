-- Enhanced onboarding database schema with comprehensive data storage

-- Add missing fields to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pronouns TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS household_name TEXT;

-- Add comprehensive fields to user_onboarding table
ALTER TABLE public.user_onboarding ADD COLUMN IF NOT EXISTS pronouns TEXT;
ALTER TABLE public.user_onboarding ADD COLUMN IF NOT EXISTS household_name TEXT;
ALTER TABLE public.user_onboarding ADD COLUMN IF NOT EXISTS challenges JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.user_onboarding ADD COLUMN IF NOT EXISTS priorities JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.user_onboarding ADD COLUMN IF NOT EXISTS current_step TEXT DEFAULT 'intro';
ALTER TABLE public.user_onboarding ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('profile-photos', 'profile-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for profile photos
CREATE POLICY "Users can view profile photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can upload their own profile photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own profile photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Update the handle_new_user function to include onboarding initialization
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
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