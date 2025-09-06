-- Create missing onboarding records for existing users
INSERT INTO public.user_onboarding (user_id, email, current_step, onboarding_completed, tour_completed)
VALUES 
  ('9cb29e3e-2647-47aa-bc6c-e81b910a55e1', 'chalker_linda@yahoo.com', 'intro', false, false),
  ('0ed02d82-2dea-487a-8f23-ac9c83d1e579', 'lindakijange@gmail.com', 'intro', false, false);

-- Create missing profile records for existing users  
INSERT INTO public.profiles (id, email)
VALUES 
  ('9cb29e3e-2647-47aa-bc6c-e81b910a55e1', 'chalker_linda@yahoo.com'),
  ('0ed02d82-2dea-487a-8f23-ac9c83d1e579', 'lindakijange@gmail.com');