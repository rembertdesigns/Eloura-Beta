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

-- 2. Create PII masking function for data protection
CREATE OR REPLACE FUNCTION public.mask_pii(data text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Return masked version of sensitive data
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
WHERE profiles.id = uo.user_id;

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

-- 5. Create secure view for profiles with PII protection
CREATE OR REPLACE VIEW public.secure_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  family_type,
  pronouns,
  household_name,
  created_at,
  updated_at,
  -- Only show full PII to the user themselves
  CASE 
    WHEN id = auth.uid() THEN phone 
    ELSE public.mask_pii(phone) 
  END as phone,
  CASE 
    WHEN id = auth.uid() THEN address 
    ELSE public.mask_pii(address) 
  END as address,
  CASE 
    WHEN id = auth.uid() THEN emergency_contact_name 
    ELSE public.mask_pii(emergency_contact_name) 
  END as emergency_contact_name
FROM public.profiles;

-- 6. Grant permissions to the secure view
GRANT SELECT ON public.secure_profiles TO authenticated;

-- 7. Add comment documenting the security model
COMMENT ON TABLE public.profiles IS 'Contains user PII data with RLS protection. Sensitive fields should be accessed through secure_profiles view when possible.';
COMMENT ON VIEW public.secure_profiles IS 'Secure access to profile data with PII masking for non-owners.';