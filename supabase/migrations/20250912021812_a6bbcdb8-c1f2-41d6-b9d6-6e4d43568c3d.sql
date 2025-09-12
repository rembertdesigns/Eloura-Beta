-- Reset onboarding data for lindakijange@gmail.com
UPDATE public.user_onboarding 
SET 
  onboarding_completed = false,
  tour_completed = false,
  current_step = 'intro',
  completed_steps = '{}',
  updated_at = now()
WHERE email = 'lindakijange@gmail.com';