-- Create templates table for custom help request templates
CREATE TABLE public.help_request_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_custom BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.help_request_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for templates
CREATE POLICY "Users can view their own templates" 
ON public.help_request_templates 
FOR SELECT 
USING (user_id = get_current_user_id());

CREATE POLICY "Users can create their own templates" 
ON public.help_request_templates 
FOR INSERT 
WITH CHECK (user_id = get_current_user_id());

CREATE POLICY "Users can update their own templates" 
ON public.help_request_templates 
FOR UPDATE 
USING (user_id = get_current_user_id());

CREATE POLICY "Users can delete their own templates" 
ON public.help_request_templates 
FOR DELETE 
USING (user_id = get_current_user_id());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_help_request_templates_updated_at
BEFORE UPDATE ON public.help_request_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default templates for all users (these will be available to everyone)
INSERT INTO public.help_request_templates (user_id, title, description, category, is_custom) VALUES
(gen_random_uuid(), 'Last-minute babysitter', 'Need someone to watch the kids for a few hours', 'Childcare', false),
(gen_random_uuid(), 'School pickup', 'Emergency school pickup needed', 'Transportation', false),
(gen_random_uuid(), 'Meal drop-off', 'Could use a meal delivery this week', 'Meals', false),
(gen_random_uuid(), 'Pet care', 'Need someone to watch/walk pets while away', 'Pet Care', false),
(gen_random_uuid(), 'Errand help', 'Need help with errands', 'Errands', false);