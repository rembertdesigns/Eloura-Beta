import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Target, User, Clock, Bell } from 'lucide-react';

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
    target_date: '',
    progress: 0,
    is_completed: false
  });

  const categories = [
    { value: 'health', label: 'Health & Wellness', color: 'bg-green-100 text-green-800' },
    { value: 'family', label: 'Family Time', color: 'bg-blue-100 text-blue-800' },
    { value: 'career', label: 'Career Growth', color: 'bg-purple-100 text-purple-800' },
    { value: 'personal', label: 'Personal Development', color: 'bg-orange-100 text-orange-800' },
    { value: 'care', label: 'Caregiving', color: 'bg-pink-100 text-pink-800' }
  ];

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'one-time', label: 'One-time goal' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalData.title || !goalData.category) return;

    const newGoal = {
      title: goalData.title,
      description: goalData.description || null,
      category: goalData.category,
      progress: 0,
      target_date: goalData.target_date || null,
      is_completed: false
    };

    onAddGoal(newGoal);
    setGoalData({
      title: '',
      description: '',
      category: '',
      target_date: '',
      progress: 0,
      is_completed: false
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Add New Goal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">What's your goal?</Label>
            <Input
              id="title"
              placeholder="e.g., Exercise 3 times per week"
              value={goalData.title}
              onChange={(e) => setGoalData(prev => ({ ...prev, title: e.target.value }))}
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
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                        <div className={`w-3 h-3 rounded-full ${cat.color.split(' ')[0]}`}></div>
                        {cat.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_date">Target date (optional)</Label>
              <Input
                id="target_date"
                type="date"
                value={goalData.target_date}
                onChange={(e) => setGoalData(prev => ({ ...prev, target_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
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