import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  urgent: boolean;
  status: string;
}

interface EditHelpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  request: HelpRequest | null;
  villageMembers: any[];
}

const EditHelpRequestModal: React.FC<EditHelpRequestModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  request,
  villageMembers
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    urgent: false,
    status: 'open'
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

  const timeOptions = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
    '7:00 PM', '8:00 PM', 'Morning', 'Afternoon', 'Evening', 'Flexible'
  ];

  const statusOptions = [
    { value: 'open', label: 'Open', color: 'bg-green-100 text-green-700' },
    { value: 'fulfilled', label: 'Fulfilled', color: 'bg-blue-100 text-blue-700' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700' }
  ];

  useEffect(() => {
    if (request) {
      setFormData({
        title: request.title || '',
        description: request.description || '',
        category: request.category || '',
        date: request.date || '',
        time: request.time || '',
        urgent: request.urgent || false,
        status: request.status || 'open'
      });
      
      if (request.date) {
        setSelectedDate(new Date(request.date));
      }
    }
  }, [request, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
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

    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Date is required", 
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        ...formData,
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : formData.date
      };
      
      const success = await onUpdate(request!.id, updateData);
      if (success) {
        toast({
          title: "Success",
          description: "Help request updated successfully"
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update help request",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!request) return;
    
    setLoading(true);
    try {
      const success = await onDelete(request.id);
      if (success) {
        toast({
          title: "Success",
          description: "Help request deleted successfully"
        });
        onClose();
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete help request",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Help Request</DialogTitle>
          <DialogDescription>
            Update your help request or change its status.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border shadow-sm z-10"
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
              <Label className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4" />
                Date Needed *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                Time (optional)
              </Label>
              <select
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select time...</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status and Urgent */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2 mt-6">
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
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Updating...' : 'Update Request'}
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={() => setShowDeleteConfirm(true)}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Delete Help Request</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this help request? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditHelpRequestModal;