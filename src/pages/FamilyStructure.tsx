
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowLeft, ArrowRight, Users, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AddFamilyMemberModal from '@/components/AddFamilyMemberModal';
import { Progress } from '@/components/ui/progress';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  date_of_birth: string | null;
  gender: string | null;
  notes: string | null;
  is_primary_caregiver: boolean;
}

const FamilyStructure = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Try to load from localStorage first for demo purposes
    const savedFamilyMembers = localStorage.getItem('familyMembers');
    if (savedFamilyMembers) {
      try {
        setFamilyMembers(JSON.parse(savedFamilyMembers));
        setLoading(false);
        return;
      } catch (e) {
        console.error('Error parsing saved family members:', e);
      }
    }

    // If user is authenticated, try to load from Supabase
    if (user) {
      fetchFamilyMembers();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFamilyMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFamilyMembers(data || []);
    } catch (error) {
      console.error('Error fetching family members:', error);
      toast({
        title: "Error",
        description: "Failed to load family members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      // Remove from local state
      const updatedMembers = familyMembers.filter(member => member.id !== memberId);
      setFamilyMembers(updatedMembers);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));

      // If user is authenticated, also remove from Supabase
      if (user) {
        const { error } = await supabase
          .from('family_members')
          .delete()
          .eq('id', memberId);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Family member removed successfully",
      });
    } catch (error) {
      console.error('Error deleting family member:', error);
      toast({
        title: "Error",
        description: "Failed to remove family member",
        variant: "destructive",
      });
    }
  };

  const handleMemberSaved = (savedMember: FamilyMember) => {
    let updatedMembers: FamilyMember[];
    
    if (editingMember) {
      updatedMembers = familyMembers.map(member => 
        member.id === savedMember.id ? savedMember : member
      );
    } else {
      updatedMembers = [...familyMembers, savedMember];
    }
    
    setFamilyMembers(updatedMembers);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));
    
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleContinue = async () => {
    try {
      setSaving(true);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
      
      // If user is authenticated, also update onboarding progress
      if (user) {
        const { error } = await supabase
          .from('user_onboarding')
          .update({ 
            completed_steps: ['family-type', 'personal-info', 'family-structure']
          })
          .eq('user_id', user?.id);

        if (error) {
          console.error('Error updating progress:', error);
        }
      }

      toast({
        title: "Family structure saved",
        description: "Moving to next step...",
      });

      // Navigate to next step (dashboard for now)
      navigate('/');
    } catch (error) {
      console.error('Error saving progress:', error);
      // Don't block the user from continuing for demo purposes
      toast({
        title: "Family structure saved locally",
        description: "Moving to next step...",
      });
      navigate('/');
    } finally {
      setSaving(false);
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'spouse':
      case 'partner':
        return '💑';
      case 'child':
      case 'son':
      case 'daughter':
        return '👶';
      case 'parent':
      case 'mother':
      case 'father':
        return '👨‍👩‍👧‍👦';
      default:
        return '👤';
    }
  };

  const formatAge = (dateOfBirth: string | null) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birth = new Date(dateOfBirth);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return `${age - 1} years old`;
    }
    return `${age} years old`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#223b0a]/30 border-t-[#223b0a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step 3 of 4</span>
            <span className="text-sm text-slate-600">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Family Structure</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            Add your family members so we can help you coordinate care and support for everyone
          </p>
        </div>

        {/* Family Members Grid */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Your Family</CardTitle>
                <CardDescription>
                  {familyMembers.length === 0 
                    ? "No family members added yet" 
                    : `${familyMembers.length} family member${familyMembers.length === 1 ? '' : 's'} added`}
                </CardDescription>
              </div>
              <Button
                onClick={handleAddMember}
                className="bg-[#223b0a] hover:bg-[#1a2e08] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {familyMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Start building your family structure</p>
                <Button
                  onClick={handleAddMember}
                  variant="outline"
                  className="border-[#223b0a] text-[#223b0a] hover:bg-[#223b0a] hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Family Member
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="relative p-4 border border-slate-200 rounded-xl hover:border-[#223b0a]/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getRelationshipIcon(member.relationship)}</span>
                        <div>
                          <h3 className="font-semibold text-slate-900">{member.name}</h3>
                          <p className="text-sm text-slate-600 capitalize">{member.relationship}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditMember(member)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMember(member.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {member.date_of_birth && (
                      <p className="text-sm text-slate-500 mb-2">
                        {formatAge(member.date_of_birth)}
                      </p>
                    )}
                    
                    {member.is_primary_caregiver && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#223b0a]/10 text-[#223b0a]">
                        Primary Caregiver
                      </span>
                    )}
                    
                    {member.notes && (
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {member.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/personal-info')}
            className="flex-1 sm:flex-none h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Info
          </Button>
          
          <div className="flex-1" />
          
          <Button
            onClick={handleContinue}
            disabled={saving}
            className="flex-1 sm:flex-none h-12 bg-[#223b0a] hover:bg-[#1a2e08] text-white px-8"
          >
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                Continue to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      <AddFamilyMemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleMemberSaved}
        editingMember={editingMember}
      />
    </div>
  );
};

// Helper functions
const getRelationshipIcon = (relationship: string) => {
  switch (relationship.toLowerCase()) {
    case 'spouse':
    case 'partner':
      return '💑';
    case 'child':
    case 'son':
    case 'daughter':
      return '👶';
    case 'parent':
    case 'mother':
    case 'father':
      return '👨‍👩‍👧‍👦';
    default:
      return '👤';
  }
};

const formatAge = (dateOfBirth: string | null) => {
  if (!dateOfBirth) return '';
  const today = new Date();
  const birth = new Date(dateOfBirth);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return `${age - 1} years old`;
  }
  return `${age} years old`;
};

export default FamilyStructure;
