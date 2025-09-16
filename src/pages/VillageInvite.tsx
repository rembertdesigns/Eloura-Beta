import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Users, CheckCircle, AlertTriangle, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvitationData {
  id: string;
  inviter_id: string;
  invited_email: string;
  invited_name: string;
  role: string;
  personal_message?: string;
  status: string;
  expires_at: string;
  inviter_profile?: {
    full_name?: string;
    household_name?: string;
  };
}

const VillageInvite = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const inviteToken = searchParams.get('token');

  useEffect(() => {
    if (!inviteToken) {
      setError('Invalid invitation link');
      setLoading(false);
      return;
    }

    fetchInvitation();
  }, [inviteToken]);

  useEffect(() => {
    // If user is already logged in, check if they can accept the invitation
    if (user && invitation) {
      if (user.email === invitation.invited_email) {
        // Auto-accept if emails match
        handleAcceptInvitation();
      } else {
        setError('You must be signed in with the invited email address to accept this invitation.');
      }
    }
  }, [user, invitation]);

  const fetchInvitation = async () => {
    try {
      const { data, error } = await supabase
        .from('village_invitations')
        .select('*')
        .eq('invitation_token', inviteToken)
        .single();

      if (error || !data) {
        setError('Invitation not found or expired');
        return;
      }

      // Fetch inviter profile separately
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, household_name')
        .eq('id', data.inviter_id)
        .single();

      const invitationWithProfile = {
        ...data,
        inviter_profile: profileData || undefined
      };

      // Check if invitation is expired
      if (new Date(invitationWithProfile.expires_at) < new Date()) {
        setError('This invitation has expired');
        return;
      }

      // Check if already accepted
      if (invitationWithProfile.status !== 'pending') {
        setError(`This invitation has already been ${invitationWithProfile.status}`);
        return;
      }

      setInvitation(invitationWithProfile);
      setEmail(data.invited_email);
    } catch (err) {
      console.error('Error fetching invitation:', err);
      setError('Failed to load invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!invitation || !user) return;

    try {
      setAccepting(true);

      // Update invitation status
      const { error: inviteError } = await supabase
        .from('village_invitations')
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString(),
          accepted_by_user_id: user.id
        })
        .eq('id', invitation.id);

      if (inviteError) throw inviteError;

      // Add user to the inviter's village
      const { error: villageError } = await supabase
        .from('village_members')
        .insert({
          user_id: invitation.inviter_id,
          name: invitation.invited_name,
          email: invitation.invited_email,
          relationship: 'Invited Helper',
          roles: [invitation.role],
          status: 'Available',
          invited_as_user: true,
          group_name: 'Invited Members'
        });

      if (villageError) throw villageError;

      // Also add the inviter to the invitee's village (create reciprocal relationship)
      const { error: reciprocalError } = await supabase
        .from('village_members')
        .insert({
          user_id: user.id, // The invitee's user ID
          name: invitation.inviter_profile?.full_name || 'Family Member',
          email: '', // We don't store the inviter's email for privacy
          relationship: 'Family',
          roles: ['family'],
          status: 'Available',
          invited_as_user: false,
          group_name: 'Family & Friends'
        });

      if (reciprocalError) {
        console.error('Failed to create reciprocal village relationship:', reciprocalError);
        // Don't fail the whole process for this
      }

      // If inviter has a household, join it
      if (invitation.inviter_profile?.household_name) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            household_name: invitation.inviter_profile.household_name
          })
          .eq('id', user.id);

        if (profileError) {
          console.error('Failed to join household:', profileError);
          // Don't fail the whole process for this
        }
      }

      toast({
        title: "Welcome to the village!",
        description: `You've successfully joined ${invitation.inviter_profile?.full_name || 'the'}'s support network.`,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error accepting invitation:', err);
      toast({
        title: "Error",
        description: "Failed to accept invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAccepting(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invitation) return;

    try {
      setIsCreatingAccount(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `https://elouraapp.com/village-invite?token=${inviteToken}`,
          data: {
            full_name: invitation.invited_name,
            invitation_token: inviteToken
          }
        },
      });

      if (error) {
        toast({
          title: "Account Creation Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user && !data.session) {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account, then return to this page to complete the invitation.",
        });
      }
    } catch (err) {
      console.error('Error creating account:', err);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Invitation Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!invitation) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-6 shadow-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">You're Invited!</h1>
          <p className="text-slate-600">Join {invitation.inviter_profile?.full_name || 'a family'}'s village</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Invitation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">You're invited as:</p>
              <Badge variant="secondary" className="mt-1">{invitation.role}</Badge>
            </div>
            
            {invitation.inviter_profile?.household_name && (
              <div>
                <p className="text-sm text-muted-foreground">Household:</p>
                <p className="font-medium">{invitation.inviter_profile.household_name}</p>
              </div>
            )}

            {invitation.personal_message && (
              <div>
                <p className="text-sm text-muted-foreground">Personal message:</p>
                <p className="text-sm italic bg-muted p-3 rounded-lg mt-1">
                  "{invitation.personal_message}"
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground">Expires:</p>
              <p className="text-sm">
                {new Date(invitation.expires_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {user ? (
          // User is signed in
          user.email === invitation.invited_email ? (
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <h3 className="text-lg font-semibold">Ready to Join!</h3>
                  <p className="text-muted-foreground">
                    Click below to accept the invitation and join the village.
                  </p>
                  <Button 
                    onClick={handleAcceptInvitation} 
                    disabled={accepting}
                    className="w-full"
                  >
                    {accepting ? 'Joining...' : 'Accept Invitation'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert className="border-destructive bg-destructive/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You're signed in as a different email address. Please sign out and sign in with {invitation.invited_email} to accept this invitation.
              </AlertDescription>
            </Alert>
          )
        ) : (
          // User is not signed in - show account creation form
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create an account to join the village
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    This email was specified in the invitation
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Create Password</label>
                  <Input
                    type="password"
                    placeholder="Enter a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isCreatingAccount || !password}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isCreatingAccount ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Already have an account?
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/auth?email=${encodeURIComponent(email)}&returnTo=${encodeURIComponent(`https://elouraapp.com/village-invite?token=${inviteToken}`)}`)}
                  className="w-full"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Sign In Instead
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VillageInvite;