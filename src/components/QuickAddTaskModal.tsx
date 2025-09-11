import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface QuickAddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (taskData: any) => Promise<any>;
}

const QuickAddTaskModal: React.FC<QuickAddTaskModalProps> = ({ isOpen, onOpenChange, onAddTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'normal',
    is_urgent: false,
    due_date: undefined as Date | undefined,
    due_time: '',
  });

  const categories = [
    { value: 'caretaking', label: 'Caretaking' },
    { value: 'parenting', label: 'Family & Parenting' },
    { value: 'daily', label: 'Essential Daily' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health' },
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
  ];

  // Generate time options for 24-hour format
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
        options.push({ value: time24, label: time12 });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskData.title) return;

    try {
      // Combine date and time for due_date if both provided
      let dueDateTime = null;
      if (taskData.due_date && taskData.due_time) {
        dueDateTime = new Date(taskData.due_date);
        const [hour, minute] = taskData.due_time.split(':');
        dueDateTime.setHours(parseInt(hour), parseInt(minute));
      } else if (taskData.due_date) {
        dueDateTime = taskData.due_date;
      }

      await onAddTask({
        title: taskData.title,
        description: taskData.description || null,
        category: taskData.category || null,
        priority: taskData.priority,
        is_urgent: taskData.is_urgent,
        completed: false,
        due_date: dueDateTime ? dueDateTime.toISOString() : null,
        assigned_to: null,
        delegated_to: null,
      });

      // Reset form
      setTaskData({
        title: '',
        description: '',
        category: '',
        priority: 'normal',
        is_urgent: false,
        due_date: undefined,
        due_time: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setTaskData({ ...taskData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={taskData.priority} onValueChange={(value) => setTaskData({ ...taskData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !taskData.due_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {taskData.due_date ? format(taskData.due_date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={taskData.due_date}
                    onSelect={(date) => setTaskData({ ...taskData, due_date: date })}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Due Time</Label>
              <Select value={taskData.due_time} onValueChange={(value) => setTaskData({ ...taskData, due_time: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time">
                    <Clock className="mr-2 h-4 w-4" />
                    {taskData.due_time ? timeOptions.find(t => t.value === taskData.due_time)?.label : "Select time"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_urgent"
              checked={taskData.is_urgent}
              onCheckedChange={(checked) => setTaskData({ ...taskData, is_urgent: !!checked })}
            />
            <Label htmlFor="is_urgent">Mark as urgent</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!taskData.title}>
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddTaskModal;