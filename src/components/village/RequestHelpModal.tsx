import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HelpRequest {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  urgent: boolean;
}

interface RequestHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: HelpRequest) => void;
  villageMembers: any[];
}

const RequestHelpModal: React.FC<RequestHelpModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  villageMembers
}) => {
  const [formData, setFormData] = useState<HelpRequest>({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    urgent: false
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    'Childcare',
    'Transportation', 
    'Meals',
    'Errands',
    'Pet Care',
    'House Sitting',
    'Emergency',
    'Other'
  ];

  const quickTemplates = [
    {
      title: "Last-minute babysitter",
      category: "Childcare",
      description: "Need someone to watch the kids for a few hours"
    },
    {
      title: "School pickup",
      category: "Transportation", 
      description: "Emergency school pickup needed"
    },
    {
      title: "Meal drop-off",
      category: "Meals",
      description: "Could use a meal delivery this week"
    },
    {
      title: "Pet care",
      category: "Pet Care",
      description: "Need someone to watch/walk pets while away"
    }
  ];

  const handleInputChange = (field: keyof HelpRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const useTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      title: template.title,
      category: template.category,
      description: template.description
    }));
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Error", 
        description: "Category is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.date) {
      toast({
        title: "Error",
        description: "Date is required", 
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Help request sent to your village"
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        date: '',
        time: '',
        urgent: false
      });
      setSelectedMembers([]);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send help request",
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
          <DialogTitle>Request Help from Your Village</DialogTitle>
          <DialogDescription>
            Let your support network know what kind of help you need.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Templates */}
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block">Quick Templates</Label>
          <div className="grid grid-cols-2 gap-2">
            {quickTemplates.map((template, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => useTemplate(template)}
                className="text-left justify-start h-auto p-3"
              >
                <div>
                  <div className="font-medium text-sm">{template.title}</div>
                  <div className="text-xs text-gray-500">{template.category}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="What do you need help with?"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select category...</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
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
              placeholder="Provide more details about what you need..."
              rows={3}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Needed *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time (optional)
              </Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                placeholder="e.g. 3:00 PM or flexible"
              />
            </div>
          </div>

          {/* Urgent checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={formData.urgent}
              onCheckedChange={(checked) => handleInputChange('urgent', checked)}
            />
            <Label htmlFor="urgent" className="flex items-center gap-2 cursor-pointer">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              This is urgent
            </Label>
          </div>

          {/* Village Members Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Send to specific members (optional)
            </Label>
            <div className="max-h-32 overflow-y-auto border rounded-md p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-members"
                  checked={selectedMembers.length === 0}
                  onCheckedChange={(checked) => {
                    if (checked) setSelectedMembers([]);
                  }}
                />
                <Label htmlFor="all-members" className="cursor-pointer font-medium">
                  Send to all members
                </Label>
              </div>
              {villageMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={member.id}
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => toggleMemberSelection(member.id)}
                  />
                  <Label htmlFor={member.id} className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span>{member.name}</span>
                      <div className="flex gap-1">
                        {member.roles?.slice(0, 2).map((role: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Sending...' : 'Send Help Request'}
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

export default RequestHelpModal;