-- Add tour_completed field to user_onboarding table
ALTER TABLE public.user_onboarding 
ADD COLUMN tour_completed boolean DEFAULT false;