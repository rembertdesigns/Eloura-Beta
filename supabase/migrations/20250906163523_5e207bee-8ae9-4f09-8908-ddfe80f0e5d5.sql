-- Fix infinite recursion in conversation_participants RLS policy
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.conversation_participants;

-- Create a new policy that avoids recursion by using a more direct approach
CREATE POLICY "Users can view participants in their conversations" 
ON public.conversation_participants 
FOR SELECT 
USING (
  -- User can see their own participation record
  user_id = auth.uid() 
  OR 
  -- User can see other participants if they are also a participant in the same conversation
  EXISTS (
    SELECT 1 FROM public.conversation_participants cp 
    WHERE cp.conversation_id = conversation_participants.conversation_id 
    AND cp.user_id = auth.uid()
  )
);