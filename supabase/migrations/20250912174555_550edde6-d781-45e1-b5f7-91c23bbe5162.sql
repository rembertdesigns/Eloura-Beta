-- Security Fix: Enhanced PII protection (Fixed Order)
-- Comprehensive protection for sensitive user data

-- 1. Add security columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city text;  
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_relationship text;

-- 2. Create PII masking function
CREATE OR REPLACE FUNCTION public.mask_pii(data text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF data IS NULL OR length(data) = 0 THEN
    RETURN data;
  END IF;
  
  -- For phone numbers, mask middle digits
  IF data ~ '^\+?[0-9\-\(\)\s]+$' AND length(regexp_replace(data, '[^0-9]', '', 'g')) >= 7 THEN
    RETURN regexp_replace(data, '([0-9]{3})([0-9]+)([0-9]{3})', '\1***\3');
  END IF;
  
  -- For other data, show first 2 and last 2 characters
  IF length(data) > 4 THEN
    RETURN substring(data from 1 for 2) || repeat('*', length(data) - 4) || substring(data from length(data) - 1);
  END IF;
  
  RETURN repeat('*', length(data));
END;
$$;

-- 3. Create secure view for profiles with PII protection
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
  -- Show full data only to the profile owner
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
  -- Date of birth protection - show birth year only to non-owners
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

-- 4. Grant access to secure view
GRANT SELECT ON public.secure_profiles TO authenticated;

-- 5. Add security documentation 
COMMENT ON TABLE public.profiles IS 'User profiles with PII protection. Use secure_profiles view for safer access.';
COMMENT ON VIEW public.secure_profiles IS 'Protected profile access with automatic PII masking for enhanced security.';
COMMENT ON FUNCTION public.mask_pii(text) IS 'Masks PII data while preserving basic format for display.';

-- 6. Create function for PII access logging
CREATE OR REPLACE FUNCTION public.log_pii_access(
  table_name text,
  accessed_user_id uuid,
  accessor_user_id uuid DEFAULT auth.uid()
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log PII access for security monitoring
  PERFORM public.log_security_event(
    'PII_ACCESS',
    accessor_user_id,
    jsonb_build_object(
      'table', table_name,
      'accessed_user', accessed_user_id,
      'timestamp', now(),
      'is_self_access', (accessor_user_id = accessed_user_id)
    )
  );
END;
$$;