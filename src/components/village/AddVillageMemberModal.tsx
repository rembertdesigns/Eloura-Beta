import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VillageMember {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  description: string;
  group_name: string;
  roles: string[];
  skills: string[];
  status: string;
}

interface AddVillageMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: VillageMember) => void;
  editingMember?: any;
}

const AddVillageMemberModal: React.FC<AddVillageMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingMember
}) => {
  const [formData, setFormData] = useState<VillageMember>({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    description: '',
    group_name: '',
    roles: [],
    skills: [],
    status: 'Available'
  });
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const groups = ['Family', 'Friends', 'Neighbors', 'Extended Family', 'Professional'];
  const predefinedRoles = ['Childcare', 'Transportation', 'Meal Support', 'School Support', 'Emergency Contact', 'Pet Care'];
  const predefinedSkills = ['Cooking', 'Driving', 'First Aid', 'Tutoring', 'Pet Care', 'House Sitting', 'Crafts', 'Tech Support'];

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name || '',
        relationship: editingMember.relationship || '',
        phone: editingMember.phone || '',
        email: editingMember.email || '',
        description: editingMember.description || '',
        group_name: editingMember.group_name || '',
        roles: editingMember.roles || [],
        skills: editingMember.skills || [],
        status: editingMember.status || 'Available'
      });
    } else {
      setFormData({
        name: '',
        relationship: '',
        phone: '',
        email: '',
        description: '',
        group_name: '',
        roles: [],
        skills: [],
        status: 'Available'
      });
    }
  }, [editingMember, isOpen]);

  const handleInputChange = (field: keyof VillageMember, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRole = (role: string) => {
    if (role && !formData.roles.includes(role)) {
      setFormData(prev => ({ ...prev, roles: [...prev.roles, role] }));
    }
  };

  const removeRole = (role: string) => {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter(r => r !== role) }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      toast({
        title: "Success",
        description: editingMember ? "Village member updated successfully" : "Village member added successfully"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save village member",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingMember ? 'Edit Village Member' : 'Add Village Member'}</DialogTitle>
          <DialogDescription>
            Add someone to your support network who can help with various needs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={formData.relationship}
                onChange={(e) => handleInputChange('relationship', e.target.value)}
                placeholder="e.g. Sister, Neighbor, Friend"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Group and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="group">Group</Label>
              <select
                id="group"
                value={formData.group_name}
                onChange={(e) => handleInputChange('group_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select group...</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Available evenings">Available evenings</option>
                <option value="Available weekdays">Available weekdays</option>
                <option value="Busy">Busy</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of how they help or their availability..."
              rows={3}
            />
          </div>

          {/* Roles */}
          <div>
            <Label>Roles</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.roles.map((role, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {role}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeRole(role)} />
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {predefinedRoles.filter(role => !formData.roles.includes(role)).map(role => (
                <Badge 
                  key={role} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => addRole(role)}
                >
                  + {role}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Add custom role..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addRole(newRole);
                    setNewRole('');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => { addRole(newRole); setNewRole(''); }}>
                Add
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {predefinedSkills.filter(skill => !formData.skills.includes(skill)).map(skill => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => addSkill(skill)}
                >
                  + {skill}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add custom skill..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(newSkill);
                    setNewSkill('');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => { addSkill(newSkill); setNewSkill(''); }}>
                Add
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVillageMemberModal;