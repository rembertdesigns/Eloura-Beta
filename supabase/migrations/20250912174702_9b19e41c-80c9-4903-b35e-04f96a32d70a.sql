-- Fix security warnings from PII protection migration
-- Address function search paths and security definer issues

-- 1. Fix mask_pii function search path
CREATE OR REPLACE FUNCTION public.mask_pii(data text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
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
  
  -- For other data, show first 2 and last 2 characters
  IF length(data) > 4 THEN
    RETURN substring(data from 1 for 2) || repeat('*', length(data) - 4) || substring(data from length(data) - 1);
  END IF;
  
  RETURN repeat('*', length(data));
END;
$$;

-- 2. Fix update_updated_at_column function search path  
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- 3. Fix update_conversation_last_message function search path
CREATE OR REPLACE FUNCTION public.update_conversation_last_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.conversations 
  SET 
    last_message = NEW.content,
    last_message_at = NEW.created_at,
    updated_at = now()
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$;

-- 4. Replace the secure view with a regular view (no security definer)
DROP VIEW IF EXISTS public.secure_profiles;

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
  -- Date of birth protection
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

-- 5. Re-grant permissions
GRANT SELECT ON public.secure_profiles TO authenticated;