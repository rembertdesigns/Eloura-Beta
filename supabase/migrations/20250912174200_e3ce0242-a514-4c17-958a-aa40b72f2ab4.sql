-- Fix security linter warnings from previous migration

-- 1. Fix function search path issue
CREATE OR REPLACE FUNCTION public.encrypt_pii(data text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- 2. Drop the problematic security definer view and recreate safely
DROP VIEW IF EXISTS public.safe_profiles;

-- 3. Create a secure function instead of a view for safe profile access
CREATE OR REPLACE FUNCTION public.get_safe_profile(profile_id uuid DEFAULT auth.uid())
RETURNS TABLE (
  id uuid,
  full_name text,
  avatar_url text,
  family_type text,
  pronouns text,
  household_name text,
  created_at timestamptz,
  updated_at timestamptz,
  phone_masked text,
  address_masked text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow users to access their own profile data
  IF profile_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Cannot access other users profiles';
  END IF;
  
  RETURN QUERY
  SELECT 
    p.id,
    p.full_name,
    p.avatar_url,
    p.family_type,
    p.pronouns,
    p.household_name,
    p.created_at,
    p.updated_at,
    p.phone as phone_masked,
    p.address as address_masked
  FROM public.profiles p
  WHERE p.id = profile_id AND p.id = auth.uid();
END;
$$;

-- 4. Update the log_security_event function to have proper search_path
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