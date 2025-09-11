-- Update the existing toolkit-files bucket to be public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'toolkit-files';