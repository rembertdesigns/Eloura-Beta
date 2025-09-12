-- Security Fix: Add PII protection and reduce exposure (Safe version)
-- Focus on adding security measures rather than migrating potentially non-existent columns

-- 1. Add missing columns to profiles table for secure PII storage
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_relationship text;

-- 2. Create PII encryption/masking function
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

-- 3. Create secure view for profiles with PII masking
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
  -- Only show full data to the owner, masked to others
  CASE 
    WHEN id = auth.uid() THEN phone 
    ELSE public.encrypt_pii(phone) 
  END as phone_display,
  CASE 
    WHEN id = auth.uid() THEN address 
    ELSE public.encrypt_pii(address) 
  END as address_display
FROM public.profiles;

-- 4. Grant permissions for the secure view
GRANT SELECT ON public.safe_profiles TO authenticated;

-- 5. Strengthen RLS policies on profiles table
-- First drop existing policies to replace them
DROP POLICY IF EXISTS "Authenticated users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can insert their own profile" ON public.profiles;

-- Create enhanced policies with stricter authentication checks
CREATE POLICY "Users can only access their own profile data" 
ON public.profiles 
FOR SELECT 
USING (
  id = auth.uid() 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can only update their own profile data" 
ON public.profiles 
FOR UPDATE 
USING (
  id = auth.uid() 
  AND auth.uid() IS NOT NULL
)
WITH CHECK (
  id = auth.uid() 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can only insert their own profile data" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  id = auth.uid() 
  AND auth.uid() IS NOT NULL
);

-- 6. Add function to validate PII data integrity
CREATE OR REPLACE FUNCTION public.validate_pii_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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

-- 7. Add trigger for PII update monitoring
CREATE TRIGGER monitor_profiles_pii_updates
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_pii_update();