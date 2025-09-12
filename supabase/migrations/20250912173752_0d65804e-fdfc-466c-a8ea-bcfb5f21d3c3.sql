-- Security Improvement Plan: Phase 1 - Content Protection
-- Fix high-priority RLS policy issues

-- 1. Update tips table policy to require authentication
DROP POLICY IF EXISTS "Anyone can view active tips" ON public.tips;

CREATE POLICY "Authenticated users can view active tips" 
ON public.tips 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND is_active = true
);

-- 2. Update help request templates policy to require authentication
DROP POLICY IF EXISTS "Users can view templates" ON public.help_request_templates;

CREATE POLICY "Authenticated users can view templates" 
ON public.help_request_templates 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND (
    user_id = get_current_user_id() 
    OR is_custom = false
  )
);

-- 3. Add security logging function for audit trails
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
  -- For now, we'll use a simple approach since we don't have a security_logs table
  -- This can be expanded later with proper audit logging
  RAISE LOG 'Security Event - Type: %, User: %, Details: %', 
    event_type, 
    COALESCE(user_id::text, 'anonymous'), 
    details::text;
END;
$$;