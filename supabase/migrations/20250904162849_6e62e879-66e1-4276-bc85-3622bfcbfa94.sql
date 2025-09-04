-- Create help_requests table
CREATE TABLE public.help_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  urgent BOOLEAN DEFAULT false,
  responses_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for help_requests
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for help_requests
CREATE POLICY "Users can create their own help requests" 
ON public.help_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own help requests" 
ON public.help_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own help requests" 
ON public.help_requests 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own help requests" 
ON public.help_requests 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create communication_logs table
CREATE TABLE public.communication_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  village_member_id UUID,
  contact_name TEXT NOT NULL,
  type TEXT NOT NULL,
  notes TEXT NOT NULL,
  category TEXT,
  logged_by TEXT DEFAULT 'You',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for communication_logs
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for communication_logs
CREATE POLICY "Users can create their own communication logs" 
ON public.communication_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own communication logs" 
ON public.communication_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own communication logs" 
ON public.communication_logs 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own communication logs" 
ON public.communication_logs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update village_members table with additional fields
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 0;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Available';
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS skills TEXT[];
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS group_name TEXT;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS recent_activity TEXT;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS roles TEXT[];
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE public.village_members ADD COLUMN IF NOT EXISTS avatar TEXT;

-- Update tasks table for village delegation
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS village_member_id UUID;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS attachments TEXT[];
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS last_update TEXT;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS recurring BOOLEAN DEFAULT false;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Create triggers for updated_at
CREATE TRIGGER update_help_requests_updated_at
  BEFORE UPDATE ON public.help_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_communication_logs_updated_at
  BEFORE UPDATE ON public.communication_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();