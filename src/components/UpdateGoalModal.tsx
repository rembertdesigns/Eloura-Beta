import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Target, CalendarIcon, Clock, Repeat, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  progress: number;
  target_date?: string;
  is_completed: boolean;
}

interface UpdateGoalModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onUpdateGoal: (goalId: string, updates: any) => Promise<void>;
}

const UpdateGoalModal = ({ isOpen, onOpenChange, goal, onUpdateGoal }: UpdateGoalModalProps) => {
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    category: '',
    progress: 0,
    target_date: undefined as Date | undefined,
    notes: '',
    priority: 'medium',
    is_recurring: false,
    recurrence_pattern: '',
    is_completed: false
  });

  useEffect(() => {
    if (goal) {
      setGoalData({
        title: goal.title || '',
        description: goal.description || '',
        category: goal.category || '',
        progress: goal.progress || 0,
        target_date: goal.target_date ? new Date(goal.target_date) : undefined,
        notes: '',
        priority: goal.progress > 70 ? 'high' : goal.progress > 30 ? 'medium' : 'low',
        is_recurring: false,
        recurrence_pattern: '',
        is_completed: goal.is_completed || false
      });
    }
  }, [goal]);

  const categories = [
    { value: 'health', label: '💚 Health & Wellness', color: 'bg-green-100 text-green-800' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family Time', color: 'bg-blue-100 text-blue-800' },
    { value: 'career', label: '💼 Career Growth', color: 'bg-purple-100 text-purple-800' },
    { value: 'personal', label: '🌟 Personal Development', color: 'bg-orange-100 text-orange-800' },
    { value: 'care', label: '🤲 Caregiving', color: 'bg-pink-100 text-pink-800' },
    { value: 'financial', label: '💰 Financial', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'home', label: '🏠 Home & Organization', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' }
  ];

  const recurrencePatterns = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const getCategoryProgressLogic = (category: string, progress: number) => {
    const categoryLogic = {
      health: {
        excellent: progress >= 80,
        good: progress >= 60,
        warning: progress < 40,
        message: progress >= 80 ? 'Excellent health progress!' : 
                progress >= 60 ? 'Good health habits forming' :
                progress >= 40 ? 'Keep building those healthy habits' : 'Time to focus on your health goals'
      },
      career: {
        excellent: progress >= 85,
        good: progress >= 65,
        warning: progress < 45,
        message: progress >= 85 ? 'Outstanding career growth!' : 
                progress >= 65 ? 'Strong career development' :
                progress >= 45 ? 'Steady career progress' : 'Career goals need attention'
      },
      financial: {
        excellent: progress >= 90,
        good: progress >= 70,
        warning: progress < 50,
        message: progress >= 90 ? 'Exceptional financial progress!' : 
                progress >= 70 ? 'Good financial discipline' :
                progress >= 50 ? 'Financial goals on track' : 'Financial goals need focus'
      },
      family: {
        excellent: progress >= 75,
        good: progress >= 55,
        warning: progress < 35,
        message: progress >= 75 ? 'Amazing family connections!' : 
                progress >= 55 ? 'Quality family time happening' :
                progress >= 35 ? 'Family goals progressing' : 'Family time needs priority'
      },
      personal: {
        excellent: progress >= 80,
        good: progress >= 60,
        warning: progress < 40,
        message: progress >= 80 ? 'Great personal growth!' : 
                progress >= 60 ? 'Personal development on track' :
                progress >= 40 ? 'Making personal progress' : 'Personal goals need attention'
      }
    };

    return categoryLogic[category as keyof typeof categoryLogic] || categoryLogic.personal;
  };

  const getProgressBarColor = (category: string, progress: number) => {
    const logic = getCategoryProgressLogic(category, progress);
    if (logic.excellent) return 'bg-green-500';
    if (logic.good) return 'bg-blue-500';
    if (logic.warning) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;

    const updates = {
      title: goalData.title,
      description: goalData.description || null,
      category: goalData.category,
      progress: goalData.progress,
      target_date: goalData.target_date ? goalData.target_date.toISOString().split('T')[0] : null,
      is_completed: goalData.is_completed || goalData.progress >= 100
    };

    await onUpdateGoal(goal.id, updates);
    onOpenChange(false);
  };

  const progressLogic = goalData.category ? getCategoryProgressLogic(goalData.category, goalData.progress) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Update Goal Progress
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={goalData.title}
                  onChange={(e) => setGoalData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Update your goal description..."
                  value={goalData.description}
                  onChange={(e) => setGoalData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="resize-none"
                />
              </div>

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
                <Label>Priority Level</Label>
                <Select 
                  value={goalData.priority} 
                  onValueChange={(value) => setGoalData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <Badge variant="outline" className="text-xs">
                          {priority.label}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Progress: {goalData.progress}%</Label>
                <Slider
                  value={[goalData.progress]}
                  onValueChange={(value) => setGoalData(prev => ({ ...prev, progress: value[0] }))}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="relative">
                  <Progress 
                    value={goalData.progress} 
                    className="h-3"
                  />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getProgressBarColor(goalData.category, goalData.progress)}`}
                    style={{ width: `${goalData.progress}%` }}
                  />
                </div>
                {progressLogic && (
                  <div className={`p-3 rounded-lg border-l-4 ${
                    progressLogic.excellent ? 'bg-green-50 border-green-500' :
                    progressLogic.good ? 'bg-blue-50 border-blue-500' :
                    progressLogic.warning ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                  }`}>
                    <div className="flex items-center gap-2">
                      {progressLogic.excellent ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                       progressLogic.good ? <TrendingUp className="h-4 w-4 text-blue-600" /> :
                       <AlertCircle className="h-4 w-4 text-red-600" />}
                      <span className="text-sm font-medium">{progressLogic.message}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Target Date</Label>
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

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="recurring"
                    checked={goalData.is_recurring}
                    onCheckedChange={(checked) => setGoalData(prev => ({ ...prev, is_recurring: checked }))}
                  />
                  <Label htmlFor="recurring">Make this goal recurring</Label>
                </div>

                {goalData.is_recurring && (
                  <Select 
                    value={goalData.recurrence_pattern} 
                    onValueChange={(value) => setGoalData(prev => ({ ...prev, recurrence_pattern: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How often to repeat?">
                        <Repeat className="mr-2 h-4 w-4" />
                        {goalData.recurrence_pattern ? 
                          recurrencePatterns.find(p => p.value === goalData.recurrence_pattern)?.label : 
                          "How often to repeat?"
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {recurrencePatterns.map((pattern) => (
                        <SelectItem key={pattern.value} value={pattern.value}>
                          {pattern.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="completed"
                  checked={goalData.is_completed || goalData.progress >= 100}
                  onCheckedChange={(checked) => setGoalData(prev => ({ 
                    ...prev, 
                    is_completed: checked,
                    progress: checked ? 100 : prev.progress 
                  }))}
                />
                <Label htmlFor="completed">Mark as completed</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Progress Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about your progress, challenges, or achievements..."
              value={goalData.notes}
              onChange={(e) => setGoalData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Goal Preview */}
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Updated Goal Preview:</h4>
            <div className="space-y-3">
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
                <Badge variant="outline" className="text-xs">
                  {priorities.find(p => p.value === goalData.priority)?.label}
                </Badge>
                {goalData.target_date && (
                  <Badge variant="outline" className="text-xs">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    Due {format(goalData.target_date, "MMM d, yyyy")}
                  </Badge>
                )}
                {goalData.is_recurring && (
                  <Badge variant="outline" className="text-xs">
                    <Repeat className="h-3 w-3 mr-1" />
                    {recurrencePatterns.find(p => p.value === goalData.recurrence_pattern)?.label}
                  </Badge>
                )}
              </div>
              <div className="pl-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{goalData.progress}%</span>
                </div>
                <div className="relative">
                  <Progress value={goalData.progress} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressBarColor(goalData.category, goalData.progress)}`}
                    style={{ width: `${goalData.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!goalData.title || !goalData.category}>
              Update Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGoalModal;