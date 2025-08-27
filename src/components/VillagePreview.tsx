import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, X, Mail } from 'lucide-react';

interface Invite {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  sentAt: string;
}

const VillagePreview = () => {
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    const loadInvites = () => {
      const savedInvites = localStorage.getItem('pendingInvites');
      if (savedInvites) {
        setInvites(JSON.parse(savedInvites));
      }
    };

    loadInvites();
    
    // Listen for storage changes to update when new invites are added
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pendingInvites') {
        loadInvites();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for local changes (same tab)
    const interval = setInterval(loadInvites, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const removeInvite = (id: number) => {
    const updatedInvites = invites.filter(invite => invite.id !== id);
    setInvites(updatedInvites);
    localStorage.setItem('pendingInvites', JSON.stringify(updatedInvites));
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

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      'caregiver': 'Primary Caregiver',
      'helper': 'Helper',
      'family': 'Family Member',
      'emergency': 'Emergency Contact'
    };
    return roleMap[role] || role;
  };

  if (invites.length === 0) {
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
      {invites.map((invite) => (
        <div
          key={invite.id}
          className="flex items-center justify-between p-2 bg-card rounded-lg border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-xs truncate">
                {invite.name}
              </h4>
              <Badge className={`${getStatusColor(invite.status)} border-0 text-xs px-1.5 py-0.5`}>
                {invite.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{invite.email}</p>
            <Badge className={`${getRoleColor(invite.role)} border-0 text-xs mt-1 px-1.5 py-0.5`}>
              {getRoleLabel(invite.role)}
            </Badge>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeInvite(invite.id)}
            className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default VillagePreview;