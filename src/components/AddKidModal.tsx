
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Kid {
  id: string;
  name: string;
  age: number | null;
  grade: string | null;
  school: string | null;
  allergies: string | null;
  medical_notes: string | null;
  activities: string | null;
  special_needs: string | null;
}

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (kid: Kid) => void;
  editingKid: Kid | null;
}

const AddKidModal: React.FC<AddKidModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingKid
}) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    school: '',
    allergies: '',
    medical_notes: '',
    activities: '',
    special_needs: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    if (editingKid) {
      setFormData({
        name: editingKid.name,
        age: editingKid.age?.toString() || '',
        grade: editingKid.grade || '',
        school: editingKid.school || '',
        allergies: editingKid.allergies || '',
        medical_notes: editingKid.medical_notes || '',
        activities: editingKid.activities || '',
        special_needs: editingKid.special_needs || ''
      });
    } else {
      setFormData({
        name: '',
        age: '',
        grade: '',
        school: '',
        allergies: '',
        medical_notes: '',
        activities: '',
        special_needs: ''
      });
    }
  }, [editingKid, isOpen]);

  const handleInputChange = (field: string, value: string) => {
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
        description: "Please enter the child's name",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const kidData: Kid = {
        id: editingKid?.id || crypto.randomUUID(),
        name: formData.name.trim(),
        age: formData.age ? parseInt(formData.age) : null,
        grade: formData.grade.trim() || null,
        school: formData.school.trim() || null,
        allergies: formData.allergies.trim() || null,
        medical_notes: formData.medical_notes.trim() || null,
        activities: formData.activities.trim() || null,
        special_needs: formData.special_needs.trim() || null
      };

      onSave(kidData);
      toast({
        title: "Success",
        description: editingKid ? "Child information updated successfully" : "Child information added successfully",
      });

      onClose();
    } catch (error) {
      console.error('Error saving kid:', error);
      toast({
        title: "Error",
        description: "Failed to save child information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingKid ? 'Edit Child Information' : 'Add Child Information'}
          </DialogTitle>
          <DialogDescription>
            {editingKid 
              ? 'Update your child\'s information below.'
              : 'Add information about your child to help us provide better care coordination.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter child's name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="18"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                placeholder="e.g., Kindergarten, 3rd grade"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
              placeholder="School name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Activities & Interests</Label>
            <Input
              id="activities"
              value={formData.activities}
              onChange={(e) => handleInputChange('activities', e.target.value)}
              placeholder="e.g., Soccer, Piano, Art class"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              id="allergies"
              value={formData.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              placeholder="Food allergies, medications, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical_notes">Medical Notes</Label>
            <Textarea
              id="medical_notes"
              value={formData.medical_notes}
              onChange={(e) => handleInputChange('medical_notes', e.target.value)}
              placeholder="Any medical conditions, medications, or special care instructions..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_needs">Special Needs</Label>
            <Textarea
              id="special_needs"
              value={formData.special_needs}
              onChange={(e) => handleInputChange('special_needs', e.target.value)}
              placeholder="Any special accommodations or support needed..."
              rows={2}
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
                editingKid ? 'Update Child' : 'Add Child'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddKidModal;
