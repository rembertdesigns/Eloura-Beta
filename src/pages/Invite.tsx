import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, Mail, Copy, Share2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Invite = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('helper');
  const [invitedMembers, setInvitedMembers] = useState([
    {
      id: 1,
      email: 'sarah@email.com',
      role: 'caregiver',
      status: 'accepted',
      name: 'Sarah Johnson'
    },
    {
      id: 2,
      email: 'mom.smith@email.com',
      role: 'family',
      status: 'pending',
      name: 'Mom'
    }
  ]);
  const { toast } = useToast();

  const roles = [
    { value: 'caregiver', label: 'Primary Caregiver', description: 'Full access to manage family care' },
    { value: 'helper', label: 'Helper', description: 'Can view schedules and help with tasks' },
    { value: 'family', label: 'Family Member', description: 'Access to family information and updates' },
    { value: 'emergency', label: 'Emergency Contact', description: 'Limited access for emergencies only' }
  ];

  const handleSendInvite = () => {
    if (!email.trim()) return;
    
    const newInvite = {
      id: Date.now(),
      email: email.trim(),
      role: selectedRole,
      status: 'pending',
      name: email.split('@')[0]
    };
    
    setInvitedMembers([...invitedMembers, newInvite]);
    setEmail('');
    
    toast({
      title: "Invite sent!",
      description: `Invitation sent to ${email}`,
    });
  };

  const copyInviteLink = () => {
    const link = `${window.location.origin}/join?invite=abc123`;
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full p-3">
              <Users className="h-6 w-6 sm:h-7 sm:w-7" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Invites */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UserPlus className="h-5 w-5 text-primary" />
                Send Invitation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <div className="space-y-2">
                  {roles.map((role) => (
                    <div
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedRole === role.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedRole === role.value
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/30'
                        }`}>
                          {selectedRole === role.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSendInvite} className="w-full" disabled={!email.trim()}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invites
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

          {/* Current Members */}
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
                      <Badge className={`${getRoleColor(member.role)} border-0 text-xs mt-1`}>
                        {roles.find(r => r.value === member.role)?.label}
                      </Badge>
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
                
                {invitedMembers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p>No team members yet</p>
                    <p className="text-sm">Start by inviting someone to help</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Invite;
