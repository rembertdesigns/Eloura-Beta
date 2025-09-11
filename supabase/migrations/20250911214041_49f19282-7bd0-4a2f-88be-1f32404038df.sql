-- Add any missing policies for toolkit-files bucket (ignore if they already exist)
DO $$ 
BEGIN
    -- Try to create the missing DELETE policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Users can delete their own toolkit files'
    ) THEN
        CREATE POLICY "Users can delete their own toolkit files" 
        ON storage.objects 
        FOR DELETE 
        USING (bucket_id = 'toolkit-files' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;

EXCEPTION 
    WHEN others THEN
        -- Policy already exists, continue
        NULL;
END $$;