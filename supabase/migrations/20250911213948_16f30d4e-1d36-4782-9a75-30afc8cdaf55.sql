-- Create toolkit-files storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('toolkit-files', 'toolkit-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for toolkit-files bucket
CREATE POLICY "Users can view their own toolkit files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'toolkit-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own toolkit files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'toolkit-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own toolkit files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'toolkit-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own toolkit files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'toolkit-files' AND auth.uid()::text = (storage.foldername(name))[1]);