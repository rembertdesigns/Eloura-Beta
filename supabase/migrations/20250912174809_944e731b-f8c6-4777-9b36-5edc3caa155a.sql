-- Clean up duplicate and problematic views
-- Remove old views and recreate properly without security definer issues

-- 1. Drop existing problematic views
DROP VIEW IF EXISTS public.safe_profiles CASCADE;
DROP VIEW IF EXISTS public.secure_profiles CASCADE;

-- 2. Check if encrypt_pii function exists and drop if necessary
DROP FUNCTION IF EXISTS public.encrypt_pii(text) CASCADE;

-- 3. Create clean, secure profile view with proper RLS integration
CREATE VIEW public.secure_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  family_type,
  pronouns,
  household_name,
  created_at,
  updated_at,
  -- Only show sensitive data to the profile owner
  CASE 
    WHEN id = auth.uid() THEN phone 
    ELSE public.mask_pii(phone) 
  END as phone,
  CASE 
    WHEN id = auth.uid() THEN address 
    ELSE public.mask_pii(address) 
  END as address,
  CASE 
    WHEN id = auth.uid() THEN city 
    ELSE public.mask_pii(city) 
  END as city,
  CASE 
    WHEN id = auth.uid() THEN state 
    ELSE public.mask_pii(state) 
  END as state,
  CASE 
    WHEN id = auth.uid() THEN zip_code 
    ELSE public.mask_pii(zip_code) 
  END as zip_code,
  CASE 
    WHEN id = auth.uid() THEN emergency_contact_name 
    ELSE public.mask_pii(emergency_contact_name) 
  END as emergency_contact_name,
  CASE 
    WHEN id = auth.uid() THEN emergency_contact_phone 
    ELSE public.mask_pii(emergency_contact_phone) 
  END as emergency_contact_phone,
  CASE 
    WHEN id = auth.uid() THEN emergency_contact_relationship 
    ELSE public.mask_pii(emergency_contact_relationship) 
  END as emergency_contact_relationship,
  CASE 
    WHEN id = auth.uid() THEN date_of_birth 
    ELSE NULL
  END as date_of_birth,
  CASE 
    WHEN id = auth.uid() THEN NULL
    WHEN date_of_birth IS NOT NULL THEN EXTRACT(YEAR FROM date_of_birth)::text
    ELSE NULL
  END as birth_year_only
FROM public.profiles;

-- 4. Grant proper permissions
GRANT SELECT ON public.secure_profiles TO authenticated;

-- 5. Add security documentation
COMMENT ON VIEW public.secure_profiles IS 'Secure profile access with automatic PII masking. Uses RLS policies from underlying profiles table.';