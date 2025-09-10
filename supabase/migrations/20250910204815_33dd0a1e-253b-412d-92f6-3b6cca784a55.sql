-- Fix RLS performance issues by using subqueries instead of direct auth.uid() calls
-- This prevents re-evaluation of auth functions for each row

-- Fix user_onboarding table policies
DROP POLICY IF EXISTS "Users can view their own onboarding data" ON public.user_onboarding;
DROP POLICY IF EXISTS "Users can create their own onboarding data" ON public.user_onboarding;
DROP POLICY IF EXISTS "Users can update their own onboarding data" ON public.user_onboarding;

-- Create optimized policies for user_onboarding
CREATE POLICY "Users can view their own onboarding data"
ON public.user_onboarding
FOR SELECT 
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own onboarding data"
ON public.user_onboarding
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own onboarding data"
ON public.user_onboarding
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()));

-- Fix family_members table policies
DROP POLICY IF EXISTS "Users can view their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can create their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can update their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can delete their own family members" ON public.family_members;

-- Create optimized policies for family_members
CREATE POLICY "Users can view their own family members"
ON public.family_members
FOR SELECT 
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own family members"
ON public.family_members
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own family members"
ON public.family_members
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own family members"
ON public.family_members
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));