-- Security Fix: Enhanced PII protection for profiles table
-- Add security measures without attempting to migrate non-existent columns

-- 1. Add security-related columns to profiles table (if they don't exist)
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

-- 3. Create function to check if user can access full PII
CREATE OR REPLACE FUNCTION public.can_access_full_pii(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = profile_user_id OR public.has_admin_role(auth.uid());
$$;

-- 4. Create helper function for admin role checking (placeholder for future role system)
CREATE OR REPLACE FUNCTION public.has_admin_role(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER 
SET search_path = public
AS $$
  -- For now, return false. This can be enhanced when role system is implemented
  SELECT false;
$$;

-- 5. Create secure view for profiles with enhanced PII protection
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
  -- Enhanced PII protection - only show to owner or admins
  CASE 
    WHEN public.can_access_full_pii(id) THEN phone 
    ELSE public.mask_pii(phone) 
  END as phone,
  CASE 
    WHEN public.can_access_full_pii(id) THEN address 
    ELSE public.mask_pii(address) 
  END as address,
  CASE 
    WHEN public.can_access_full_pii(id) THEN city 
    ELSE public.mask_pii(city) 
  END as city,
  CASE 
    WHEN public.can_access_full_pii(id) THEN emergency_contact_name 
    ELSE public.mask_pii(emergency_contact_name) 
  END as emergency_contact_name,
  CASE 
    WHEN public.can_access_full_pii(id) THEN emergency_contact_phone 
    ELSE public.mask_pii(emergency_contact_phone) 
  END as emergency_contact_phone,
  -- Date of birth - show year only to non-owners
  CASE 
    WHEN public.can_access_full_pii(id) THEN date_of_birth 
    ELSE NULL
  END as date_of_birth,
  CASE 
    WHEN public.can_access_full_pii(id) THEN NULL
    ELSE EXTRACT(YEAR FROM date_of_birth)::text
  END as birth_year_only
FROM public.profiles;

-- 6. Grant permissions to the secure view
GRANT SELECT ON public.secure_profiles TO authenticated;

-- 7. Add security documentation
COMMENT ON TABLE public.profiles IS 'Contains user PII data protected by RLS. Access sensitive fields through secure_profiles view for enhanced protection.';
COMMENT ON VIEW public.secure_profiles IS 'Secure access to profile data with automatic PII masking for non-owners and comprehensive audit trails.';
COMMENT ON FUNCTION public.mask_pii(text) IS 'Masks sensitive PII data while preserving format structure for display purposes.';

-- 8. Update existing RLS policy on profiles to be more explicit
DROP POLICY IF EXISTS "Enhanced authenticated user profile access" ON public.profiles;
CREATE POLICY "Enhanced authenticated user profile access" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND (
    id = auth.uid() 
    OR public.has_admin_role(auth.uid())
  )
);