-- Fix RLS performance issues for priorities table
-- Replace direct auth.uid() calls with subqueries to prevent re-evaluation for each row

-- Drop existing policies for priorities table
DROP POLICY IF EXISTS "Users can view their own priorities" ON public.priorities;
DROP POLICY IF EXISTS "Users can create their own priorities" ON public.priorities;
DROP POLICY IF EXISTS "Users can update their own priorities" ON public.priorities;
DROP POLICY IF EXISTS "Users can delete their own priorities" ON public.priorities;

-- Create optimized policies for priorities table
CREATE POLICY "Users can view their own priorities"
ON public.priorities
FOR SELECT 
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own priorities"
ON public.priorities
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own priorities"
ON public.priorities
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own priorities"
ON public.priorities
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));