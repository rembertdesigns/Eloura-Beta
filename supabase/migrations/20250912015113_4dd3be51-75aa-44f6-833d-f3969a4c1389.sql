-- Reset onboarding data for specific users to allow them to go through onboarding again
UPDATE user_onboarding 
SET 
  onboarding_completed = false,
  tour_completed = false,
  current_step = 'intro',
  challenges = '[]'::jsonb,
  priorities = '[]'::jsonb,
  first_name = NULL,
  last_name = NULL,
  date_of_birth = NULL,
  pronouns = NULL,
  family_type = NULL,
  household_name = NULL,
  phone = NULL,
  address = NULL,
  city = NULL,
  state = NULL,
  zip_code = NULL,
  emergency_contact_name = NULL,
  emergency_contact_phone = NULL,
  emergency_contact_relationship = NULL,
  completed_steps = '{}'::text[]
WHERE email IN ('info@rembertdesigns.co', 'richardrembert29@gmail.com');

-- Also reset their profiles to clear any onboarding-related data
UPDATE profiles 
SET 
  full_name = NULL,
  date_of_birth = NULL,
  pronouns = NULL,
  family_type = NULL,
  household_name = NULL,
  phone = NULL
WHERE email IN ('info@rembertdesigns.co', 'richardrembert29@gmail.com');