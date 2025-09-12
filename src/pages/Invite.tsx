import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, Users, Mail, Copy, Share2, X, MailOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Invite = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('helper');
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const roles = [
    { value: 'caregiver', label: 'Primary Caregiver', description: 'Full access to manage family care' },
    { value: 'helper', label: 'Helper', description: 'Can view schedules and help with tasks' },
    { value: 'family', label: 'Family Member', description: 'Access to family information and updates' },
    { value: 'emergency', label: 'Emergency Contact', description: 'Limited access for emergencies only' }
  ];

  const handleSendInvite = async () => {
    if (!name.trim() || !email.trim() || !user) return;
    
    try {
      setLoading(true);
      
      // Create invitation in database
      const { data: invitation, error: inviteError } = await supabase
        .from('village_invitations')
        .insert({
          inviter_id: user.id,
          invited_email: email.trim(),
          invited_name: name.trim(),
          role: selectedRole,
          personal_message: personalMessage.trim() || null
        })
        .select('*')
        .single();

      if (inviteError) throw inviteError;

      // Get inviter profile for email
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, household_name')
        .eq('id', user.id)
        .single();

      // Send invitation email
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'village-invitation',
          email: email.trim(),
          data: {
            invitedName: name.trim(),
            inviterName: profile?.full_name || user.user_metadata?.full_name || user.email || 'A family',
            inviterEmail: user.email,
            role: roles.find(r => r.value === selectedRole)?.label || selectedRole,
            personalMessage: personalMessage.trim() || `I'd love to have you as part of my support network on Eloura. This will help us coordinate and stay connected as we manage our household together.`,
            signupUrl: `${window.location.origin}/village-invite?token=${invitation.invitation_token}`
          }
        }
      });

      if (emailError) {
        console.error('Failed to send invitation email:', emailError);
        // Don't fail the whole operation if email fails
        toast({
          title: "Invitation created",
          description: `Invitation created for ${email}, but failed to send email. You can share the link manually.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Invite sent!",
          description: `Invitation sent to ${email}`,
        });
      }

      // Add to local state for display
      const newInvite = {
        id: invitation.id,
        email: email.trim(),
        role: selectedRole,
        status: 'pending',
        name: name.trim(),
        invitation_token: invitation.invitation_token,
        personal_message: personalMessage.trim()
      };
      
      setInvitedMembers([...invitedMembers, newInvite]);
      setName('');
      setEmail('');
      setPersonalMessage('');
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = () => {
    if (invitedMembers.length === 0) {
      toast({
        title: "No invitations",
        description: "Send an invitation first to get a shareable link.",
        variant: "destructive",
      });
      return;
    }
    
    const latestInvite = invitedMembers[invitedMembers.length - 1];
    const link = `${window.location.origin}/village-invite?token=${latestInvite.invitation_token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Invite link copied to clipboard",
    });
  };

  const removeInvite = (id: number) => {
    setInvitedMembers(invitedMembers.filter(member => member.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'declined': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'caregiver': return 'bg-purple-100 text-purple-700';
      case 'helper': return 'bg-blue-100 text-blue-700';
      case 'family': return 'bg-green-100 text-green-700';
      case 'emergency': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-3">
              <MailOpen className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold">
            Invite Your <span className="text-primary">Village</span> <span className="text-muted-foreground">(Optional)</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Is there anyone who helps you or could? We'll walk them through how they can support you.
          </p>
          
          {/* Continue to Summary Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/onboarding-summary')}
            className="mt-4"
          >
            Skip
          </Button>
        </div>

        <div className={`grid gap-8 ${invitedMembers.length > 0 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-md mx-auto'}`}>
          {/* Send Invites */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UserPlus className="h-5 w-5 text-primary" />
                Send Invitation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border shadow-lg z-50">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value} className="cursor-pointer hover:bg-accent">
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Personal Message (Optional)</label>
                  <Textarea
                    placeholder="Add a personal note to your invitation..."
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    className="w-full resize-none"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleSendInvite} 
                  className="w-full" 
                  disabled={!name.trim() || !email.trim() || loading}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {loading ? 'Sending...' : 'Send Invites'}
                </Button>

              {/* Share Link */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={copyInviteLink} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Invite Link
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Members - Only show when there are invited members */}
          {invitedMembers.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  Your Support Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invitedMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-card rounded-lg border"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {member.name}
                          </h4>
                          <Badge className={`${getStatusColor(member.status)} border-0 text-xs`}>
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getRoleColor(member.role)} border-0 text-xs`}>
                            {roles.find(r => r.value === member.role)?.label}
                          </Badge>
                          {member.personal_message && (
                            <Badge variant="outline" className="text-xs">
                              Has message
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInvite(member.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invite;
