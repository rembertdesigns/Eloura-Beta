
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface AddFamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: FamilyMember) => void;
  editingMember: FamilyMember | null;
}

const AddFamilyMemberModal: React.FC<AddFamilyMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingMember
}) => {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    date_of_birth: '',
    gender: '',
    notes: '',
    is_primary_caregiver: false,
    member_type: 'human' as 'human' | 'pet',
    pet_type: '',
    breed: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name,
        relationship: editingMember.relationship,
        date_of_birth: editingMember.date_of_birth || '',
        gender: editingMember.gender || '',
        notes: editingMember.notes || '',
        is_primary_caregiver: editingMember.is_primary_caregiver,
        member_type: editingMember.member_type || 'human',
        pet_type: editingMember.pet_type || '',
        breed: editingMember.breed || ''
      });
    } else {
      setFormData({
        name: '',
        relationship: '',
        date_of_birth: '',
        gender: '',
        notes: '',
        is_primary_caregiver: false,
        member_type: 'human',
        pet_type: '',
        breed: ''
      });
    }
  }, [editingMember, isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the name",
        variant: "destructive",
      });
      return;
    }

    // For pets, we don't require relationship but set a default
    const relationshipValue = formData.member_type === 'pet' 
      ? (formData.relationship || 'pet') 
      : formData.relationship;

    if (formData.member_type === 'human' && !relationshipValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in the relationship",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const memberData = {
        id: editingMember?.id || crypto.randomUUID(),
        name: formData.name.trim(),
        relationship: relationshipValue,
        date_of_birth: formData.date_of_birth || null,
        gender: formData.gender || null,
        notes: formData.notes.trim() || null,
        is_primary_caregiver: formData.member_type === 'human' ? formData.is_primary_caregiver : false,
        member_type: formData.member_type,
        pet_type: formData.member_type === 'pet' ? formData.pet_type || null : null,
        breed: formData.member_type === 'pet' ? formData.breed || null : null
      };

      // For demo purposes, we'll work with localStorage
      // In a real app with authentication, this would go to Supabase
      onSave(memberData);
      
      toast({
        title: "Success",
        description: `${formData.member_type === 'pet' ? 'Pet' : 'Family member'} ${editingMember ? 'updated' : 'added'} successfully`,
      });

      onClose();
    } catch (error) {
      console.error('Error saving family member:', error);
      toast({
        title: "Error",
        description: `Failed to save ${formData.member_type === 'pet' ? 'pet' : 'family member'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'partner', label: 'Partner' },
    { value: 'child', label: 'Child' },
    { value: 'son', label: 'Son' },
    { value: 'daughter', label: 'Daughter' },
    { value: 'parent', label: 'Parent' },
    { value: 'mother', label: 'Mother' },
    { value: 'father', label: 'Father' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'brother', label: 'Brother' },
    { value: 'sister', label: 'Sister' },
    { value: 'grandparent', label: 'Grandparent' },
    { value: 'grandchild', label: 'Grandchild' },
    { value: 'other', label: 'Other' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const petTypeOptions = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'fish', label: 'Fish' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'guinea-pig', label: 'Guinea Pig' },
    { value: 'reptile', label: 'Reptile' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingMember 
              ? `Edit ${editingMember.member_type === 'pet' ? 'Pet' : 'Family Member'}` 
              : 'Add Family Member or Pet'}
          </DialogTitle>
          <DialogDescription>
            {editingMember 
              ? `Update the ${editingMember.member_type === 'pet' ? 'pet' : 'family member'} information below.`
              : 'Add a new family member or pet to your care network.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member_type">Type</Label>
            <Select 
              value={formData.member_type} 
              onValueChange={(value: 'human' | 'pet') => handleInputChange('member_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human">Family Member</SelectItem>
                <SelectItem value="pet">Pet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={formData.member_type === 'pet' ? "Enter pet's name" : "Enter full name"}
              required
            />
          </div>

          {formData.member_type === 'human' && (
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship *</Label>
              <Select 
                value={formData.relationship} 
                onValueChange={(value) => handleInputChange('relationship', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.member_type === 'pet' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="pet_type">Pet Type</Label>
                <Select 
                  value={formData.pet_type} 
                  onValueChange={(value) => handleInputChange('pet_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {petTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  placeholder="Enter breed (optional)"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="date_of_birth">
              {formData.member_type === 'pet' ? 'Date of Birth (or adoption)' : 'Date of Birth'}
            </Label>
            <Input
              id="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => handleInputChange('gender', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender (optional)" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.member_type === 'human' && (
            <div className="flex items-center space-x-2">
              <Switch
                id="is_primary_caregiver"
                checked={formData.is_primary_caregiver}
                onCheckedChange={(checked) => handleInputChange('is_primary_caregiver', checked)}
              />
              <Label htmlFor="is_primary_caregiver" className="text-sm">
                Primary caregiver for this family member
              </Label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder={
                formData.member_type === 'pet' 
                  ? "Any special needs, medical conditions, or care instructions..."
                  : "Any additional notes or special considerations..."
              }
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#223b0a] hover:bg-[#1a2e08] text-white"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                editingMember ? `Update ${formData.member_type === 'pet' ? 'Pet' : 'Member'}` : `Add ${formData.member_type === 'pet' ? 'Pet' : 'Member'}`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFamilyMemberModal;
