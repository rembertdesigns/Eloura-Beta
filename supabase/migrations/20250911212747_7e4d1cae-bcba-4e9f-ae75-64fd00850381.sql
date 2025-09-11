-- Enable realtime for saved_content table
ALTER TABLE public.saved_content REPLICA IDENTITY FULL;

-- Add the table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.saved_content;