import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Target, CalendarIcon, Clock, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddGoalModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: any) => void;
}

const AddGoalModal = ({ isOpen, onOpenChange, onAddGoal }: AddGoalModalProps) => {
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    category: '',
    target_date: undefined as Date | undefined,
    milestone_frequency: '',
    progress: 0,
    is_completed: false
  });

  const categories = [
    { value: 'health', label: '💚 Health & Wellness', color: 'bg-green-100 text-green-800' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family Time', color: 'bg-blue-100 text-blue-800' },
    { value: 'career', label: '💼 Career Growth', color: 'bg-purple-100 text-purple-800' },
    { value: 'personal', label: '🌟 Personal Development', color: 'bg-orange-100 text-orange-800' },
    { value: 'care', label: '🤲 Caregiving', color: 'bg-pink-100 text-pink-800' },
    { value: 'financial', label: '💰 Financial', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'home', label: '🏠 Home & Organization', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const milestoneFrequencies = [
    { value: 'weekly', label: 'Weekly Check-ins' },
    { value: 'bi-weekly', label: 'Bi-weekly Progress' },
    { value: 'monthly', label: 'Monthly Milestones' },
    { value: 'quarterly', label: 'Quarterly Review' },
    { value: 'custom', label: 'Custom Timeline' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalData.title || !goalData.category) return;

    const newGoal = {
      title: goalData.title,
      description: goalData.description || null,
      category: goalData.category,
      progress: 0,
      target_date: goalData.target_date ? goalData.target_date.toISOString().split('T')[0] : null,
      is_completed: false
    };

    onAddGoal(newGoal);
    setGoalData({
      title: '',
      description: '',
      category: '',
      target_date: undefined,
      milestone_frequency: '',
      progress: 0,
      is_completed: false
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Add New Goal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">What's your goal?</Label>
            <Input
              id="title"
              placeholder="e.g., Exercise 3 times per week"
              value={goalData.title}
              onChange={(e) => setGoalData(prev => ({ ...prev, title: e.target.value }))}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about your goal..."
              value={goalData.description}
              onChange={(e) => setGoalData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={goalData.category} 
                onValueChange={(value) => setGoalData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <span>{cat.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target date (optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !goalData.target_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {goalData.target_date ? format(goalData.target_date, "PPP") : "Pick a target date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={goalData.target_date}
                    onSelect={(date) => setGoalData({ ...goalData, target_date: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Milestone Frequency (optional)</Label>
              <Select 
                value={goalData.milestone_frequency} 
                onValueChange={(value) => setGoalData(prev => ({ ...prev, milestone_frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often to check progress?">
                    <Repeat className="mr-2 h-4 w-4" />
                    {goalData.milestone_frequency ? 
                      milestoneFrequencies.find(f => f.value === goalData.milestone_frequency)?.label : 
                      "How often to check progress?"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {milestoneFrequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Goal Preview */}
          {goalData.title && goalData.category && (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Goal Preview:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{goalData.title}</span>
                </div>
                {goalData.description && (
                  <p className="text-sm text-gray-600 pl-6">{goalData.description}</p>
                )}
                <div className="flex items-center gap-2 pl-6">
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.value === goalData.category)?.label}
                  </Badge>
                  {goalData.target_date && (
                    <Badge variant="outline" className="text-xs">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Due {format(goalData.target_date, "MMM d, yyyy")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!goalData.title || !goalData.category}>
              Add Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;