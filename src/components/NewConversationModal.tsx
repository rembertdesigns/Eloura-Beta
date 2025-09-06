import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Users, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface NewConversationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConversationCreated: (conversationId: string) => void;
}

export const NewConversationModal: React.FC<NewConversationModalProps> = ({
  open,
  onOpenChange,
  onConversationCreated,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversationName, setConversationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch available profiles to message
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user || !open) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, email, avatar_url')
          .neq('id', user.id); // Exclude current user

        if (error) throw error;
        
        setProfiles(data || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user, open]);

  // Filter profiles based on search
  const filteredProfiles = profiles.filter(profile => {
    const name = profile.full_name || profile.email || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleProfileSelection = (profile: Profile) => {
    setSelectedProfiles(prev => {
      const isSelected = prev.some(p => p.id === profile.id);
      if (isSelected) {
        return prev.filter(p => p.id !== profile.id);
      } else {
        return [...prev, profile];
      }
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayName = (profile: Profile) => {
    return profile.full_name || profile.email || 'Unknown User';
  };

  const createConversation = async () => {
    if (!user || selectedProfiles.length === 0) return;

    setCreating(true);
    try {
      const isGroup = selectedProfiles.length > 1;
      const name = isGroup ? conversationName.trim() || `Group with ${selectedProfiles.map(p => getDisplayName(p).split(' ')[0]).join(', ')}` : null;

      // Create conversation
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          created_by: user.id,
          name,
          is_group: isGroup,
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      // Add participants (including creator)
      const participantIds = [user.id, ...selectedProfiles.map(p => p.id)];
      const participants = participantIds.map(userId => ({
        conversation_id: conversation.id,
        user_id: userId,
      }));

      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert(participants);

      if (participantsError) throw participantsError;

      toast({
        title: "Success",
        description: "Conversation created successfully",
      });

      // Reset form
      setSelectedProfiles([]);
      setConversationName('');
      setSearchQuery('');
      
      // Close modal and notify parent
      onOpenChange(false);
      onConversationCreated(conversation.id);

    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const isGroup = selectedProfiles.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Start New Conversation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Selected users */}
          {selectedProfiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Selected:</span>
                <Badge variant="secondary">{selectedProfiles.length} member{selectedProfiles.length > 1 ? 's' : ''}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProfiles.map(profile => (
                  <Badge
                    key={profile.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleProfileSelection(profile)}
                  >
                    {getDisplayName(profile)} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Group name input for multiple users */}
          {isGroup && (
            <div>
              <label className="text-sm font-medium">Group Name (optional)</label>
              <Input
                placeholder="Enter group name..."
                value={conversationName}
                onChange={(e) => setConversationName(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          {/* Users list */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {loading ? (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">Loading members...</p>
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No members found</p>
              </div>
            ) : (
              filteredProfiles.map(profile => {
                const isSelected = selectedProfiles.some(p => p.id === profile.id);
                const displayName = getDisplayName(profile);
                
                return (
                  <div
                    key={profile.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleProfileSelection(profile)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{displayName}</p>
                      {profile.email && profile.full_name && (
                        <p className="text-xs text-gray-500">{profile.email}</p>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={createConversation}
              disabled={selectedProfiles.length === 0 || creating}
              className="flex-1"
            >
              {creating ? 'Creating...' : `Start ${isGroup ? 'Group' : 'Chat'}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};