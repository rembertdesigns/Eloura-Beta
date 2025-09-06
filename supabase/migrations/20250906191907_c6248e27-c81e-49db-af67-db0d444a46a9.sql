-- Reset onboarding status for test emails to allow fresh onboarding process
UPDATE user_onboarding 
SET 
  onboarding_completed = false,
  tour_completed = false,
  current_step = 'intro',
  completed_steps = ARRAY[]::text[]
WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com');

-- Also clear any profile data that might interfere with onboarding
UPDATE profiles 
SET 
  full_name = NULL,
  date_of_birth = NULL,
  family_type = NULL,
  household_name = NULL,
  pronouns = NULL,
  phone = NULL,
  avatar_url = NULL
WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com');