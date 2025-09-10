-- Fix complex conversation-related RLS performance issues

-- Fix conversation_participants table - more complex policies
DROP POLICY IF EXISTS "Users can add participants to conversations they created" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can leave conversations" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can update their own participation" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.conversation_participants;

-- Create optimized policies for conversation_participants
CREATE POLICY "Users can add participants to conversations they created" 
ON public.conversation_participants
FOR INSERT
TO authenticated
WITH CHECK (
  (conversation_id IN ( 
    SELECT conversations.id
    FROM conversations
    WHERE conversations.created_by = (select auth.uid())
  )) OR (user_id = (select auth.uid()))
);

CREATE POLICY "Users can leave conversations"
ON public.conversation_participants
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own participation"
ON public.conversation_participants  
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can view participants in their conversations"
ON public.conversation_participants
FOR SELECT
TO authenticated
USING (
  (user_id = (select auth.uid())) OR 
  is_conversation_participant(conversation_id, (select auth.uid()))
);

-- Fix conversations table
DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update conversations they participate in" ON public.conversations;
DROP POLICY IF EXISTS "Users can view conversations they participate in" ON public.conversations;

-- Create optimized policies for conversations  
CREATE POLICY "Users can create conversations"
ON public.conversations
FOR INSERT
TO authenticated
WITH CHECK (created_by = (select auth.uid()));

CREATE POLICY "Users can update conversations they participate in"
ON public.conversations
FOR UPDATE  
TO authenticated
USING (
  id IN (
    SELECT conversation_participants.conversation_id
    FROM conversation_participants
    WHERE conversation_participants.user_id = (select auth.uid())
  )
);

CREATE POLICY "Users can view conversations they participate in" 
ON public.conversations
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT conversation_participants.conversation_id
    FROM conversation_participants  
    WHERE conversation_participants.user_id = (select auth.uid())
  )
);

-- Fix messages table
DROP POLICY IF EXISTS "Users can send messages to conversations they participate in" ON public.messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;

-- Create optimized policies for messages
CREATE POLICY "Users can send messages to conversations they participate in"
ON public.messages
FOR INSERT
TO authenticated  
WITH CHECK (
  ((select auth.uid()) = sender_id) AND 
  (conversation_id IN (
    SELECT conversation_participants.conversation_id
    FROM conversation_participants
    WHERE conversation_participants.user_id = (select auth.uid())
  ))
);

CREATE POLICY "Users can update their own messages"
ON public.messages
FOR UPDATE
TO authenticated
USING (sender_id = (select auth.uid()));

CREATE POLICY "Users can view messages in their conversations"
ON public.messages  
FOR SELECT
TO authenticated
USING (
  conversation_id IN (
    SELECT conversation_participants.conversation_id
    FROM conversation_participants
    WHERE conversation_participants.user_id = (select auth.uid())
  )
);