-- Fix security issue: Restrict profiles access to authenticated users only
-- Drop existing policies that use 'public' role
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;  
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create new secure policies that explicitly require authentication
-- and ensure users can only access their own profile data

-- Policy for viewing own profile (SELECT)
CREATE POLICY "Authenticated users can view their own profile"
ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Policy for updating own profile (UPDATE) 
CREATE POLICY "Authenticated users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Policy for inserting own profile (INSERT)
CREATE POLICY "Authenticated users can insert their own profile" 
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Ensure RLS is enabled (it should be already, but let's be explicit)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;