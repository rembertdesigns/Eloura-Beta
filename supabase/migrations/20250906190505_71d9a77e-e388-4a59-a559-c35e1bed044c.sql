-- Clear onboarding data for test users to reset their onboarding status
DELETE FROM user_onboarding WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com', 'info@rembertdesigns.co');

-- Clear profile data for test users
DELETE FROM profiles WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com', 'info@rembertdesigns.co');

-- Clear any other user-specific data that might interfere with onboarding testing
DELETE FROM family_members WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com', 'info@rembertdesigns.co')
);

DELETE FROM tasks WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com', 'info@rembertdesigns.co')
);

DELETE FROM goals WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com', 'info@rembertdesigns.co')
);

DELETE FROM village_members WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN ('chalker_linda@yahoo.com', 'lindakijange@gmail.com', 'info@rembertdesigns.co')
);