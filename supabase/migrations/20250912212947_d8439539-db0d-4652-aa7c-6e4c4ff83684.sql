-- Create village invitations table
CREATE TABLE public.village_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_email text NOT NULL,
  invited_name text NOT NULL,
  role text NOT NULL,
  invitation_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  personal_message text,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at timestamp with time zone,
  accepted_by_user_id uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.village_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view invitations they sent or received" 
ON public.village_invitations 
FOR SELECT 
USING (
  inviter_id = auth.uid() OR 
  invited_email = auth.email() OR 
  accepted_by_user_id = auth.uid()
);

CREATE POLICY "Users can create their own invitations" 
ON public.village_invitations 
FOR INSERT 
WITH CHECK (inviter_id = auth.uid());

CREATE POLICY "Users can update invitations they sent or were invited to" 
ON public.village_invitations 
FOR UPDATE 
USING (
  inviter_id = auth.uid() OR 
  invited_email = auth.email() OR 
  accepted_by_user_id = auth.uid()
);

-- Create trigger for updated_at
CREATE TRIGGER update_village_invitations_updated_at
BEFORE UPDATE ON public.village_invitations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookup by token
CREATE INDEX idx_village_invitations_token ON public.village_invitations(invitation_token);

-- Create index for faster lookup by email
CREATE INDEX idx_village_invitations_email ON public.village_invitations(invited_email);