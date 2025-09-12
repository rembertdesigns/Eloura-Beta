-- Final security cleanup: Remove unnecessary security definer functions
-- These are causing linter warnings and aren't needed

-- Remove the get_safe_profile function (we use secure_profiles view instead)
DROP FUNCTION IF EXISTS public.get_safe_profile(uuid);

-- Remove validate_pii_update if it exists (we use secure_profiles view for protection)
DROP FUNCTION IF EXISTS public.validate_pii_update() CASCADE;

-- Update any other functions that don't need SECURITY DEFINER
-- The handle_new_user function needs to keep SECURITY DEFINER for auth triggers
-- The mask_pii function is already properly configured

-- Add final comment
COMMENT ON VIEW public.secure_profiles IS 'Secure profile view with PII masking. Replaces security definer functions for better security compliance.';