-- Fix security linter warnings introduced by previous migration
-- Address Security Definer View and Function Search Path issues

-- 1. Fix the safe_profiles view to remove SECURITY DEFINER properties
DROP VIEW IF EXISTS public.safe_profiles;

-- Recreate view without SECURITY DEFINER (using standard view)
CREATE VIEW public.safe_profiles AS
SELECT 
  id,
  full_name,
  avatar_url, 
  family_type,
  pronouns,
  household_name,
  created_at,
  updated_at,
  -- Only show full data to the owner, masked to others
  CASE 
    WHEN id = auth.uid() THEN phone 
    ELSE public.encrypt_pii(phone) 
  END as phone_display,
  CASE 
    WHEN id = auth.uid() THEN address 
    ELSE public.encrypt_pii(address) 
  END as address_display
FROM public.profiles
WHERE id = auth.uid(); -- Add WHERE clause to ensure users only see their own data

-- 2. Fix encrypt_pii function by adding proper search_path
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

-- 3. Fix validate_pii_update function by adding proper search_path
CREATE OR REPLACE FUNCTION public.validate_pii_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log PII updates for security monitoring
  PERFORM public.log_security_event(
    'PII_UPDATE',
    NEW.id,
    jsonb_build_object(
      'table', 'profiles',
      'updated_fields', ARRAY(
        SELECT key FROM jsonb_each_text(to_jsonb(NEW)) 
        WHERE key IN ('phone', 'address', 'emergency_contact_name', 'emergency_contact_phone')
        AND to_jsonb(NEW)->>key IS DISTINCT FROM to_jsonb(OLD)->>key
      ),
      'timestamp', now()
    )
  );
  
  RETURN NEW;
END;
$$;

-- 4. Grant appropriate permissions for the corrected view
GRANT SELECT ON public.safe_profiles TO authenticated;

-- 5. Add RLS policy for the safe_profiles view (even though it's user-restricted)
ALTER VIEW public.safe_profiles SET (security_barrier = true);