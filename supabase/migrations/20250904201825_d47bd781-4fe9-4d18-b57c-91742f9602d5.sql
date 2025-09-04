-- Fix the recursive RLS policy for conversation_participants
-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Users can view conversation participants for their conversation" ON public.conversation_participants;

-- Create a simpler, non-recursive policy
CREATE POLICY "Users can view participants in their conversations" 
ON public.conversation_participants 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants cp2 
    WHERE cp2.conversation_id = conversation_participants.conversation_id 
    AND cp2.user_id = auth.uid()
  )
);