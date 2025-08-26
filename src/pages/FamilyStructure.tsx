import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowLeft, ArrowRight, Users, Edit, Trash2, UserPlus } from 'lucide-react';
import { Cat, Dog } from 'lucide-react';
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
  member_type?: 'human' | 'pet';
  pet_type?: string | null;
  breed?: string | null;
}
const FamilyStructure = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [householdName, setHouseholdName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Try to load from localStorage first for demo purposes
    const savedFamilyMembers = localStorage.getItem('familyMembers');
    const savedHouseholdName = localStorage.getItem('householdName') || '';
    setHouseholdName(savedHouseholdName);
    
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
      const {
        data,
        error
      } = await supabase.from('family_members').select('*').eq('user_id', user?.id).order('created_at', {
        ascending: true
      });
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
        const {
          error
        } = await supabase.from('family_members').delete().eq('id', memberId);
        if (error) throw error;
      }
      toast({
        title: "Success",
        description: "Family member removed successfully"
      });
    } catch (error) {
      console.error('Error deleting family member:', error);
      toast({
        title: "Error",
        description: "Failed to remove family member",
        variant: "destructive"
      });
    }
  };
  const handleMemberSaved = (savedMember: FamilyMember) => {
    let updatedMembers: FamilyMember[];
    if (editingMember) {
      updatedMembers = familyMembers.map(member => member.id === savedMember.id ? savedMember : member);
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
    // Check if at least one family member has been added
    if (familyMembers.length === 0) {
      toast({
        title: "Family members required",
        description: "Please add at least one family member before continuing",
        variant: "destructive"
      });
      return;
    }
    try {
      setSaving(true);

      // Save to localStorage for demo purposes
      localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
      localStorage.setItem('householdName', householdName);

      // If user is authenticated, also update onboarding progress
      if (user) {
        const {
          error
        } = await supabase.from('user_onboarding').update({
          completed_steps: ['family-type', 'personal-info', 'family-structure']
        }).eq('user_id', user?.id);
        if (error) {
          console.error('Error updating progress:', error);
        }
      }
      toast({
        title: "Family structure saved",
        description: "Moving to next step..."
      });

      // Navigate to top challenges
      navigate('/top-challenges');
    } catch (error) {
      console.error('Error saving progress:', error);
      // Don't block the user from continuing for demo purposes
      toast({
        title: "Family structure saved locally",
        description: "Moving to next step..."
      });
      navigate('/top-challenges');
    } finally {
      setSaving(false);
    }
  };
  const getMemberIcon = (member: FamilyMember) => {
    if (member.member_type === 'pet') {
      switch (member.pet_type?.toLowerCase()) {
        case 'dog':
          return <Dog className="h-6 w-6 text-amber-600" />;
        case 'cat':
          return <Cat className="h-6 w-6 text-gray-600" />;
        default:
          return '🐾';
      }
    }

    // Human relationship icons
    switch (member.relationship.toLowerCase()) {
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
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
      return `${age - 1} years old`;
    }
    return `${age} years old`;
  };
  const getDisplayLabel = (member: FamilyMember) => {
    if (member.member_type === 'pet') {
      return member.pet_type ? member.pet_type.charAt(0).toUpperCase() + member.pet_type.slice(1) : 'Pet';
    }
    return member.relationship.charAt(0).toUpperCase() + member.relationship.slice(1);
  };

  // Separate humans and pets for better organization
  const humans = familyMembers.filter(member => member.member_type !== 'pet');
  const pets = familyMembers.filter(member => member.member_type === 'pet');
  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>;
  }
  return <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-4xl w-full sm:my-8">
        {/* Progress */}
        

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <Users className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">Family Structure</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto px-2 sm:px-0">
            Add your family members and pets so we can help you coordinate care and support for everyone
          </p>
        </div>

        {/* Household Name */}
        <Card className="shadow-lg border-border bg-card mb-4 sm:mb-6">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">Household Name</CardTitle>
            <CardDescription className="text-sm">
              Give your household a name (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <input
              type="text"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              placeholder="e.g., The Smith Family, Our Happy Home"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </CardContent>
        </Card>

        {/* Add Member Button - Fixed position for mobile */}
        <div className="fixed bottom-4 right-4 z-40 sm:hidden">
          <Button onClick={handleAddMember} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-xl">
            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {/* Family Members */}
        <Card className="shadow-lg border-border bg-card mb-4 sm:mb-6">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Family Members</CardTitle>
                <CardDescription className="text-sm">
                  {humans.length === 0 ? "No family members added yet" : `${humans.length} family member${humans.length === 1 ? '' : 's'} added`}
                </CardDescription>
              </div>
              <Button onClick={handleAddMember} className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {humans.length === 0 ? <div className="text-center py-6 sm:py-8">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Start building your family structure</p>
                <Button onClick={handleAddMember} variant="outline" className="sm:hidden text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Family Member
                </Button>
              </div> : <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {humans.map(member => <div key={member.id} className="relative p-3 sm:p-4 border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-200 bg-card shadow-sm">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <span className="text-xl sm:text-2xl">{getMemberIcon(member)}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-card-foreground truncate text-sm sm:text-base">{member.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">{getDisplayLabel(member)}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => handleEditMember(member)} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteMember(member.id)} className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive/90">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {member.date_of_birth && <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        {formatAge(member.date_of_birth)}
                      </p>}
                    
                    {member.is_primary_caregiver && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Primary Caregiver
                      </span>}
                    
                    {member.notes && <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                        {member.notes}
                      </p>}
                  </div>)}
              </div>}
          </CardContent>
        </Card>

        {/* Pets */}
        {pets.length > 0 && <Card className="shadow-lg border-border bg-card mb-4 sm:mb-6">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <span>🐾</span>
                    Pets
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {pets.length} pet{pets.length === 1 ? '' : 's'} in your family
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pets.map(pet => <div key={pet.id} className="relative p-3 sm:p-4 border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-200 bg-card shadow-sm">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <span className="text-xl sm:text-2xl">{getMemberIcon(pet)}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-card-foreground truncate text-sm sm:text-base">{pet.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">{getDisplayLabel(pet)}</p>
                          {pet.breed && <p className="text-xs text-muted-foreground/80 truncate">{pet.breed}</p>}
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => handleEditMember(pet)} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteMember(pet.id)} className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive/90">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {pet.date_of_birth && <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        {formatAge(pet.date_of_birth)}
                      </p>}
                    
                    {pet.notes && <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                        {pet.notes}
                      </p>}
                  </div>)}
              </div>
            </CardContent>
          </Card>}

        {/* Navigation - Add padding bottom for mobile FAB */}
        <div className="flex flex-col sm:flex-row gap-3 pb-16 sm:pb-0">
          <Button variant="outline" onClick={() => navigate('/personal-info')} className="flex-1 sm:flex-none h-10 sm:h-12 text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Info
          </Button>
          
          <div className="flex-1" />
          
          <Button onClick={handleContinue} disabled={saving || familyMembers.length === 0} className="flex-1 sm:flex-none h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
            {saving ? <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Saving...</span>
              </div> : <>
                Continue to Challenges
                <ArrowRight className="h-4 w-4 ml-2" />
              </>}
          </Button>
        </div>

        {/* Requirement Notice */}
        {familyMembers.length === 0 && <div className="text-center mt-3 sm:mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
            <p className="text-amber-800 text-xs sm:text-sm">
              <strong>Note:</strong> You must add at least one family member to continue to the next step.
            </p>
          </div>}
      </div>

      <AddFamilyMemberModal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
      setEditingMember(null);
    }} onSave={handleMemberSaved} editingMember={editingMember} />
    </div>;
};
export default FamilyStructure;