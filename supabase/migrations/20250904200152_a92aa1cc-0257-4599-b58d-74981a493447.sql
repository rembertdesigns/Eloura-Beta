-- Create toolkit items table
CREATE TABLE public.toolkit_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  item_type TEXT NOT NULL CHECK (item_type IN ('routine', 'document', 'checklist', 'notes', 'contacts', 'recipe')),
  category TEXT NOT NULL CHECK (category IN ('childcare', 'eldercare', 'emergency', 'meals')),
  attachments JSONB DEFAULT '[]'::jsonb,
  shared_with UUID[] DEFAULT ARRAY[]::UUID[],
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'shared', 'public')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.toolkit_items ENABLE ROW LEVEL SECURITY;

-- Create policies for toolkit items
CREATE POLICY "Users can view their own toolkit items" 
ON public.toolkit_items 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own toolkit items" 
ON public.toolkit_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own toolkit items" 
ON public.toolkit_items 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own toolkit items" 
ON public.toolkit_items 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for toolkit files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('toolkit-files', 'toolkit-files', false);

-- Create policies for toolkit file storage
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

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_toolkit_items_updated_at
BEFORE UPDATE ON public.toolkit_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_toolkit_items_user_id ON public.toolkit_items(user_id);
CREATE INDEX idx_toolkit_items_category ON public.toolkit_items(category);
CREATE INDEX idx_toolkit_items_type ON public.toolkit_items(item_type);