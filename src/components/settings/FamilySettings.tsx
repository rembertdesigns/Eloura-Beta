
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Trash, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AddFamilyMemberModal from '@/components/AddFamilyMemberModal';

const FamilySettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchFamilyMembers();
  }, [user]);

  const fetchFamilyMembers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFamilyMembers(data || []);
    } catch (error) {
      console.error('Error fetching family members:', error);
      toast({
        title: "Error",
        description: "Failed to load family members",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMember = async (memberData: any) => {
    try {
      if (editingMember) {
        const { error } = await supabase
          .from('family_members')
          .update(memberData)
          .eq('id', editingMember.id)
          .eq('user_id', user.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Family member updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('family_members')
          .insert([{ ...memberData, user_id: user.id }]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Family member added successfully"
        });
      }

      await fetchFamilyMembers();
      setShowAddMember(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving family member:', error);
      toast({
        title: "Error",
        description: "Failed to save family member",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMember = async (member: any) => {
    if (member.is_primary_caregiver) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete the primary caregiver",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', member.id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Family member removed"
      });
      await fetchFamilyMembers();
    } catch (error) {
      console.error('Error deleting family member:', error);
      toast({
        title: "Error",
        description: "Failed to remove family member",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Family Members
            </CardTitle>
            <Button 
              onClick={() => setShowAddMember(true)}
              className="bg-[#223b0a] hover:bg-[#1a2e08]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {familyMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No family members added</h3>
              <p className="text-gray-600 mb-4">Add your family members to get started.</p>
              <Button 
                onClick={() => setShowAddMember(true)}
                className="bg-[#223b0a] hover:bg-[#1a2e08]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Family Member
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-slate-600">{member.relationship}</p>
                    </div>
                    {member.is_primary_caregiver && (
                      <Badge variant="secondary">Primary Caregiver</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingMember(member);
                        setShowAddMember(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!member.is_primary_caregiver && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteMember(member)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Phone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No emergency contacts</h3>
            <p className="text-gray-600 mb-4">Add emergency contacts for peace of mind.</p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Emergency Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddFamilyMemberModal
        isOpen={showAddMember}
        onClose={() => {
          setShowAddMember(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        editingMember={editingMember}
      />
    </div>
  );
};

export default FamilySettings;
