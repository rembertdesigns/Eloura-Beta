-- Add new fields to village_members table for enhanced functionality
ALTER TABLE village_members 
ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
ADD COLUMN IF NOT EXISTS detailed_availability JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS neighborhood TEXT,
ADD COLUMN IF NOT EXISTS emergency_status TEXT,
ADD COLUMN IF NOT EXISTS trust_level TEXT DEFAULT 'trusted',
ADD COLUMN IF NOT EXISTS extra_notes TEXT,
ADD COLUMN IF NOT EXISTS history_notes TEXT,
ADD COLUMN IF NOT EXISTS color_tag TEXT,
ADD COLUMN IF NOT EXISTS contact_preferences JSONB DEFAULT '{"phone": true, "email": true, "text": false}',
ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS support_type TEXT DEFAULT 'both', -- 'remote', 'in-person', 'both'
ADD COLUMN IF NOT EXISTS invited_as_user BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS invitation_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS custom_role_descriptions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS custom_skill_descriptions JSONB DEFAULT '{}';