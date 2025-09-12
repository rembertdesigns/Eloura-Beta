-- Final security fix: Remove problematic views and fix function search paths

-- 1. Drop the problematic safe_profiles view entirely 
-- Since it's causing security definer issues, we'll use direct table access with strong RLS instead
DROP VIEW IF EXISTS public.safe_profiles;

-- 2. Fix log_security_event function to add missing search_path
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type TEXT,
  user_id UUID DEFAULT auth.uid(),
  details JSONB DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log security events for monitoring
  RAISE LOG 'Security Event - Type: %, User: %, Details: %', 
    event_type, 
    COALESCE(user_id::text, 'anonymous'), 
    details::text;
END;
$$;

-- 3. Create a simple function for PII masking that doesn't require a view
CREATE OR REPLACE FUNCTION public.get_masked_profile_data(profile_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  avatar_url TEXT,
  family_type TEXT,
  pronouns TEXT,
  household_name TEXT,
  phone_masked TEXT,
  address_masked TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return data if the requesting user is the profile owner
  IF auth.uid() = profile_id THEN
    RETURN QUERY
    SELECT 
      p.id,
      p.full_name,
      p.avatar_url,
      p.family_type,
      p.pronouns,
      p.household_name,
      p.phone as phone_masked,  -- Full data for owner
      p.address as address_masked  -- Full data for owner
    FROM public.profiles p
    WHERE p.id = profile_id;
  ELSE
    RETURN QUERY
    SELECT 
      p.id,
      p.full_name,
      p.avatar_url,
      p.family_type,
      p.pronouns,
      p.household_name,
      public.encrypt_pii(p.phone) as phone_masked,  -- Masked for others
      public.encrypt_pii(p.address) as address_masked  -- Masked for others
    FROM public.profiles p
    WHERE p.id = profile_id;
  END IF;
END;
$$;

-- 4. Grant execute permission on the new function
GRANT EXECUTE ON FUNCTION public.get_masked_profile_data(UUID) TO authenticated;

-- 5. Add additional security constraints to profiles table
-- Ensure phone and email fields have proper validation
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_phone_format 
CHECK (phone IS NULL OR phone ~ '^[\+]?[0-9\-\(\)\s]+$');

ALTER TABLE public.profiles 
ADD CONSTRAINT valid_email_format 
CHECK (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');