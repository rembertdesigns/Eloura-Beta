import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Mail } from 'lucide-react';
import { useVillageData } from '@/hooks/useVillageData';

const VillagePreview = () => {
  const { villageMembers, loading } = useVillageData();

  // Filter members who were invited as users (show as pending invitations)
  const invitedMembers = villageMembers.filter(member => member.invited_as_user);

  if (loading) {
    return (
      <div className="text-center py-4 space-y-2">
        <div className="w-10 h-10 mx-auto bg-muted rounded-full flex items-center justify-center opacity-40">
          <Users className="h-5 w-5 text-muted-foreground animate-pulse" />
        </div>
        <p className="text-xs text-muted-foreground font-medium">Loading village...</p>
      </div>
    );
  }

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

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      'caregiver': 'Primary Caregiver',
      'helper': 'Helper',
      'family': 'Family Member',
      'emergency': 'Emergency Contact'
    };
    return roleMap[role] || role;
  };

  if (invitedMembers.length === 0) {
    return (
      <div className="text-center py-4 space-y-2">
        <div className="w-10 h-10 mx-auto bg-muted rounded-full flex items-center justify-center opacity-40">
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground font-medium">Your support network will appear here</p>
        <div className="bg-primary/5 border border-primary/20 rounded-md p-2 max-w-md mx-auto">
          <p className="text-xs text-primary font-medium">
            👥 Invite someone to build your village and share the household management!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {invitedMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-2 bg-card rounded-lg border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-xs truncate">
                {member.name}
              </h4>
              <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs px-1.5 py-0.5">
                Invitation Sent
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
            <div className="flex items-center gap-1 mt-1">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Email invitation sent</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VillagePreview;