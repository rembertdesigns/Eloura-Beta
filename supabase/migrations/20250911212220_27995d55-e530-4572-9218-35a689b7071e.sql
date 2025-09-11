-- Update RLS policy for templates to allow viewing default templates
DROP POLICY "Users can view their own templates" ON public.help_request_templates;

CREATE POLICY "Users can view templates" 
ON public.help_request_templates 
FOR SELECT 
USING (user_id = get_current_user_id() OR is_custom = false);

-- Insert default templates with a system user ID for global access
DELETE FROM public.help_request_templates WHERE is_custom = false;

INSERT INTO public.help_request_templates (user_id, title, description, category, is_custom) VALUES
('00000000-0000-0000-0000-000000000000'::uuid, 'Last-minute babysitter', 'Need someone to watch the kids for a few hours', 'Childcare', false),
('00000000-0000-0000-0000-000000000000'::uuid, 'School pickup', 'Emergency school pickup needed', 'Transportation', false),
('00000000-0000-0000-0000-000000000000'::uuid, 'Meal drop-off', 'Could use a meal delivery this week', 'Meals', false),
('00000000-0000-0000-0000-000000000000'::uuid, 'Pet care', 'Need someone to watch/walk pets while away', 'Pet Care', false),
('00000000-0000-0000-0000-000000000000'::uuid, 'Errand help', 'Need help with errands', 'Errands', false);