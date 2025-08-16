import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

interface QuickAddTaskProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: any) => void;
}

const QuickAddTask = ({ isOpen, onOpenChange, onAddTask }: QuickAddTaskProps) => {
  const [taskData, setTaskData] = useState({
    text: '',
    time: '',
    category: '',
    urgent: false
  });

  const categories = [
    { value: 'childcare', label: '👶 Childcare' },
    { value: 'eldercare', label: '👴 Eldercare' },
    { value: 'household', label: '🏠 Household' },
    { value: 'work', label: '💼 Work' },
    { value: 'general', label: '📝 General' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskData.text) return;

    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false
    };

    onAddTask(newTask);
    setTaskData({ text: '', time: '', category: '', urgent: false });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-600" />
            Quick Add Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-text">What needs to be done?</Label>
            <Input
              id="task-text"
              placeholder="e.g., Pick up groceries"
              value={taskData.text}
              onChange={(e) => setTaskData(prev => ({ ...prev, text: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>When?</Label>
              <Input
                type="time"
                value={taskData.time}
                onChange={(e) => setTaskData(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={taskData.category} 
                onValueChange={(value) => setTaskData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="urgent"
              checked={taskData.urgent}
              onChange={(e) => setTaskData(prev => ({ ...prev, urgent: e.target.checked }))}
              className="w-4 h-4 text-red-600 rounded"
            />
            <Label htmlFor="urgent" className="text-sm">Mark as urgent</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!taskData.text}>
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddTask;