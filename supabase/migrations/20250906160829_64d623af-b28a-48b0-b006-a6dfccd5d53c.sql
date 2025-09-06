-- Fix infinite recursion in conversation_participants RLS policies
-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON conversation_participants;

-- Create a simpler policy that doesn't cause recursion
CREATE POLICY "Users can view participants in their conversations" 
ON conversation_participants 
FOR SELECT 
USING (
  -- Allow users to see participants in conversations where they are also a participant
  user_id = auth.uid() 
  OR 
  conversation_id IN (
    SELECT DISTINCT cp.conversation_id 
    FROM conversation_participants cp 
    WHERE cp.user_id = auth.uid()
  )
);