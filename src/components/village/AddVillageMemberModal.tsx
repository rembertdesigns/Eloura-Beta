import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Upload, User, Clock, MapPin, Shield, Tag, MessageSquare, Languages, Monitor, Users } from 'lucide-react';
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
  profile_photo_url?: string;
  detailed_availability?: any;
  location?: string;
  neighborhood?: string;
  emergency_status?: string;
  trust_level?: string;
  extra_notes?: string;
  history_notes?: string;
  color_tag?: string;
  contact_preferences?: any;
  languages?: string[];
  support_type?: string;
  invited_as_user?: boolean;
  custom_role_descriptions?: any;
  custom_skill_descriptions?: any;
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
    status: 'Available',
    profile_photo_url: '',
    detailed_availability: {
      monday: { available: false, times: [] },
      tuesday: { available: false, times: [] },
      wednesday: { available: false, times: [] },
      thursday: { available: false, times: [] },
      friday: { available: false, times: [] },
      saturday: { available: false, times: [] },
      sunday: { available: false, times: [] }
    },
    location: '',
    neighborhood: '',
    emergency_status: '',
    trust_level: 'trusted',
    extra_notes: '',
    history_notes: '',
    color_tag: 'blue',
    contact_preferences: { phone: true, email: true, text: false },
    languages: [],
    support_type: 'both',
    invited_as_user: false,
    custom_role_descriptions: {},
    custom_skill_descriptions: {}
  });
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const groups = ['Family', 'Friends', 'Neighbors', 'Extended Family', 'Professional'];
  const relationships = ['Parent', 'Sibling', 'Child', 'Spouse/Partner', 'Grandparent', 'Aunt/Uncle', 'Cousin', 'Friend', 'Neighbor', 'Colleague', 'Babysitter', 'Tutor', 'Helper', 'Other'];
  const predefinedRoles = ['Childcare', 'Transportation', 'Meal Support', 'School Support', 'Emergency Contact', 'Pet Care'];
  const predefinedSkills = ['Cooking', 'Driving', 'First Aid', 'Tutoring', 'Pet Care', 'House Sitting', 'Crafts', 'Tech Support'];
  const colorOptions = ['blue', 'green', 'yellow', 'red', 'purple', 'pink', 'indigo', 'gray'];
  const emergencyStatuses = ['Primary Emergency Contact', 'Backup Emergency Contact', 'Medical Emergency', 'School Emergency', 'Not Emergency Contact'];
  const trustLevels = ['fully-trusted', 'trusted', 'getting-to-know', 'new'];
  const supportTypes = ['in-person', 'remote', 'both'];
  const commonLanguages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'];

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
        status: editingMember.status || 'Available',
        profile_photo_url: editingMember.profile_photo_url || '',
        detailed_availability: editingMember.detailed_availability || {
          monday: { available: false, times: [] },
          tuesday: { available: false, times: [] },
          wednesday: { available: false, times: [] },
          thursday: { available: false, times: [] },
          friday: { available: false, times: [] },
          saturday: { available: false, times: [] },
          sunday: { available: false, times: [] }
        },
        location: editingMember.location || '',
        neighborhood: editingMember.neighborhood || '',
        emergency_status: editingMember.emergency_status || '',
        trust_level: editingMember.trust_level || 'trusted',
        extra_notes: editingMember.extra_notes || '',
        history_notes: editingMember.history_notes || '',
        color_tag: editingMember.color_tag || 'blue',
        contact_preferences: editingMember.contact_preferences || { phone: true, email: true, text: false },
        languages: editingMember.languages || [],
        support_type: editingMember.support_type || 'both',
        invited_as_user: editingMember.invited_as_user || false,
        custom_role_descriptions: editingMember.custom_role_descriptions || {},
        custom_skill_descriptions: editingMember.custom_skill_descriptions || {}
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
        status: 'Available',
        profile_photo_url: '',
        detailed_availability: {
          monday: { available: false, times: [] },
          tuesday: { available: false, times: [] },
          wednesday: { available: false, times: [] },
          thursday: { available: false, times: [] },
          friday: { available: false, times: [] },
          saturday: { available: false, times: [] },
          sunday: { available: false, times: [] }
        },
        location: '',
        neighborhood: '',
        emergency_status: '',
        trust_level: 'trusted',
        extra_notes: '',
        history_notes: '',
        color_tag: 'blue',
        contact_preferences: { phone: true, email: true, text: false },
        languages: [],
        support_type: 'both',
        invited_as_user: false,
        custom_role_descriptions: {},
        custom_skill_descriptions: {}
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

  const addLanguage = (language: string) => {
    if (language && !formData.languages!.includes(language)) {
      setFormData(prev => ({ ...prev, languages: [...(prev.languages || []), language] }));
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({ ...prev, languages: prev.languages!.filter(l => l !== language) }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, profile_photo_url: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAvailability = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      detailed_availability: {
        ...prev.detailed_availability,
        [day]: {
          ...prev.detailed_availability![day],
          [field]: value
        }
      }
    }));
  };

  const updateContactPreference = (type: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      contact_preferences: {
        ...prev.contact_preferences,
        [type]: value
      }
    }));
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
          {/* Profile Photo Section */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={formData.profile_photo_url} />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label>Profile Photo</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
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
              <select
                id="relationship"
                value={formData.relationship}
                onChange={(e) => handleInputChange('relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select relationship...</option>
                {relationships.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
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

          {/* Location and Neighborhood */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location/Address
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Full address or general area"
              />
            </div>
            <div>
              <Label htmlFor="neighborhood">Neighborhood</Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                placeholder="e.g. Downtown, Suburbs"
              />
            </div>
          </div>

          {/* Group, Status, and Color Tag */}
          <div className="grid grid-cols-3 gap-4">
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
            <div>
              <Label htmlFor="color_tag">
                <Tag className="w-4 h-4 inline mr-1" />
                Color Tag
              </Label>
              <select
                id="color_tag"
                value={formData.color_tag}
                onChange={(e) => handleInputChange('color_tag', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {colorOptions.map(color => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Emergency Status and Trust Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergency_status">
                <Shield className="w-4 h-4 inline mr-1" />
                Emergency Status
              </Label>
              <select
                id="emergency_status"
                value={formData.emergency_status}
                onChange={(e) => handleInputChange('emergency_status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Not an emergency contact</option>
                {emergencyStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="trust_level">Trust Level</Label>
              <select
                id="trust_level"
                value={formData.trust_level}
                onChange={(e) => handleInputChange('trust_level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {trustLevels.map(level => (
                  <option key={level} value={level}>
                    {level.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
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

          {/* Support Type and Languages */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="support_type">
                <Monitor className="w-4 h-4 inline mr-1" />
                Support Type
              </Label>
              <select
                id="support_type"
                value={formData.support_type}
                onChange={(e) => handleInputChange('support_type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="both">Both In-person & Remote</option>
                <option value="in-person">In-person Only</option>
                <option value="remote">Remote Only</option>
              </select>
            </div>
            <div>
              <Label>
                <Languages className="w-4 h-4 inline mr-1" />
                Languages
              </Label>
              <div className="flex flex-wrap gap-1 mb-2">
                {formData.languages!.map((language, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {language}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(language)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select language...</option>
                  {commonLanguages.filter(lang => !formData.languages!.includes(lang)).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <Button type="button" variant="outline" size="sm" onClick={() => {
                  if (newLanguage) {
                    addLanguage(newLanguage);
                    setNewLanguage('');
                  }
                }}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Preferences */}
          <div>
            <Label>
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Contact Preferences
            </Label>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="phone-pref"
                  checked={formData.contact_preferences?.phone || false}
                  onCheckedChange={(checked) => updateContactPreference('phone', checked)}
                />
                <Label htmlFor="phone-pref">Phone calls</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-pref"
                  checked={formData.contact_preferences?.email || false}
                  onCheckedChange={(checked) => updateContactPreference('email', checked)}
                />
                <Label htmlFor="email-pref">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="text-pref"
                  checked={formData.contact_preferences?.text || false}
                  onCheckedChange={(checked) => updateContactPreference('text', checked)}
                />
                <Label htmlFor="text-pref">Text messages</Label>
              </div>
            </div>
          </div>

          {/* Detailed Availability */}
          <div>
            <Label>
              <Clock className="w-4 h-4 inline mr-1" />
              Detailed Availability
            </Label>
            <div className="space-y-2 mt-2">
              {Object.entries(formData.detailed_availability!).map(([day, dayData]: [string, any]) => (
                <div key={day} className="flex items-center gap-4 p-2 border rounded-md">
                  <div className="w-20">
                    <Label className="capitalize">{day}</Label>
                  </div>
                  <Switch
                    checked={dayData.available}
                    onCheckedChange={(checked) => updateAvailability(day, 'available', checked)}
                  />
                  {dayData.available && (
                    <Input
                      placeholder="e.g. 9am-5pm, evenings"
                      value={dayData.times.join(', ')}
                      onChange={(e) => updateAvailability(day, 'times', e.target.value.split(', '))}
                      className="flex-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

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

          {/* Additional Notes and History */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="extra_notes">Extra Notes</Label>
              <Textarea
                id="extra_notes"
                value={formData.extra_notes}
                onChange={(e) => handleInputChange('extra_notes', e.target.value)}
                placeholder="Any additional information, special considerations, or notes..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="history_notes">History & Past Interactions</Label>
              <Textarea
                id="history_notes"
                value={formData.history_notes}
                onChange={(e) => handleInputChange('history_notes', e.target.value)}
                placeholder="Track past help received, interactions, or important history..."
                rows={2}
              />
            </div>
          </div>

          {/* Invite as User */}
          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
            <Switch
              id="invite-user"
              checked={formData.invited_as_user || false}
              onCheckedChange={(checked) => handleInputChange('invited_as_user', checked)}
            />
            <div className="flex-1">
              <Label htmlFor="invite-user" className="font-medium">
                <Users className="w-4 h-4 inline mr-1" />
                Invite as App User
              </Label>
              <p className="text-sm text-gray-600">Send them an invitation to join the app and manage tasks together</p>
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