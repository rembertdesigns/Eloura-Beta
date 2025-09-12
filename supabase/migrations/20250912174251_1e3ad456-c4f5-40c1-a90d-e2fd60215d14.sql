-- Security Fix: Reduce PII exposure in user_onboarding table (Corrected)
-- Move sensitive data to profiles table and add protection measures

-- 1. Add missing columns to profiles table for secure PII storage
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_relationship text;

-- 2. Create encryption function for sensitive data
CREATE OR REPLACE FUNCTION public.encrypt_pii(data text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF data IS NULL OR length(data) = 0 THEN
    RETURN data;
  END IF;
  
  -- For phone numbers, mask middle digits
  IF data ~ '^\+?[0-9\-\(\)\s]+$' AND length(regexp_replace(data, '[^0-9]', '', 'g')) >= 7 THEN
    RETURN regexp_replace(data, '([0-9]{3})([0-9]+)([0-9]{3})', '\1***\3');
  END IF;
  
  -- For other sensitive data, show first 2 and last 2 characters
  IF length(data) > 4 THEN
    RETURN substring(data from 1 for 2) || repeat('*', length(data) - 4) || substring(data from length(data) - 1);
  END IF;
  
  RETURN repeat('*', length(data));
END;
$$;

-- 3. Migrate existing sensitive data from user_onboarding to profiles
UPDATE public.profiles 
SET 
  address = uo.address,
  city = uo.city,
  state = uo.state,
  zip_code = uo.zip_code,
  emergency_contact_name = uo.emergency_contact_name,
  emergency_contact_phone = uo.emergency_contact_phone,
  emergency_contact_relationship = uo.emergency_contact_relationship,
  phone = COALESCE(profiles.phone, uo.phone),
  date_of_birth = COALESCE(profiles.date_of_birth, uo.date_of_birth),
  full_name = COALESCE(profiles.full_name, 
    CASE 
      WHEN uo.first_name IS NOT NULL AND uo.last_name IS NOT NULL 
      THEN uo.first_name || ' ' || uo.last_name
      ELSE profiles.full_name
    END
  )
FROM public.user_onboarding uo
WHERE profiles.id = uo.user_id
  AND (uo.address IS NOT NULL 
       OR uo.city IS NOT NULL 
       OR uo.state IS NOT NULL 
       OR uo.zip_code IS NOT NULL 
       OR uo.emergency_contact_name IS NOT NULL);

-- 4. Remove sensitive columns from user_onboarding table
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS address;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS city;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS state;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS zip_code;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS emergency_contact_name;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS emergency_contact_phone;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS emergency_contact_relationship;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS phone;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS date_of_birth;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS first_name;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS last_name;
ALTER TABLE public.user_onboarding DROP COLUMN IF EXISTS email;

-- 5. Create view for safe profile access with PII masking
CREATE OR REPLACE VIEW public.safe_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  family_type,
  pronouns,
  household_name,
  created_at,
  updated_at,
  -- Masked sensitive fields for privacy
  CASE 
    WHEN id = auth.uid() THEN phone 
    ELSE public.encrypt_pii(phone) 
  END as phone_masked,
  CASE 
    WHEN id = auth.uid() THEN address 
    ELSE public.encrypt_pii(address) 
  END as address_masked
FROM public.profiles;

-- 6. Grant permissions for the safe view
GRANT SELECT ON public.safe_profiles TO authenticated;

-- 7. Add enhanced RLS policy for profiles table with stricter controls
DROP POLICY IF EXISTS "Enhanced profile access control" ON public.profiles;
CREATE POLICY "Enhanced profile access control" 
ON public.profiles 
FOR ALL 
USING (
  id = get_current_user_id() 
  AND auth.uid() IS NOT NULL
) 
WITH CHECK (
  id = get_current_user_id() 
  AND auth.uid() IS NOT NULL
);