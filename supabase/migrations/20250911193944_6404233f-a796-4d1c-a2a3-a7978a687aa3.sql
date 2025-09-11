-- Add recurring functionality to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS recurring boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS recurrence_pattern text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS recurrence_end_date date DEFAULT NULL;

-- Add recurring functionality to reminders table  
ALTER TABLE public.reminders
ADD COLUMN IF NOT EXISTS recurring boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS recurrence_pattern text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS recurrence_end_date date DEFAULT NULL;

-- Add recurrence pattern to tasks table (it already has recurring boolean)
ALTER TABLE public.tasks
ADD COLUMN IF NOT EXISTS recurrence_pattern text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS recurrence_end_date date DEFAULT NULL;

-- Add comments to document the recurrence_pattern options
COMMENT ON COLUMN public.events.recurrence_pattern IS 'Options: daily, weekly, monthly, yearly';
COMMENT ON COLUMN public.reminders.recurrence_pattern IS 'Options: daily, weekly, monthly, yearly';
COMMENT ON COLUMN public.tasks.recurrence_pattern IS 'Options: daily, weekly, monthly, yearly';