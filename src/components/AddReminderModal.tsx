import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddReminderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddReminder: (reminderData: any) => Promise<any>;
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({ isOpen, onOpenChange, onAddReminder }) => {
  const [reminderData, setReminderData] = useState({
    title: '',
    description: '',
    reminder_time: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderData.title || !reminderData.reminder_time) return;

    try {
      await onAddReminder({
        title: reminderData.title,
        description: reminderData.description || null,
        reminder_time: new Date(reminderData.reminder_time).toISOString(),
        completed: false,
      });

      // Reset form
      setReminderData({
        title: '',
        description: '',
        reminder_time: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Reminder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Reminder Title *</Label>
            <Input
              id="title"
              value={reminderData.title}
              onChange={(e) => setReminderData({ ...reminderData, title: e.target.value })}
              placeholder="Enter reminder title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={reminderData.description}
              onChange={(e) => setReminderData({ ...reminderData, description: e.target.value })}
              placeholder="Enter reminder description"
            />
          </div>

          <div>
            <Label htmlFor="reminder_time">Reminder Time *</Label>
            <Input
              id="reminder_time"
              type="datetime-local"
              value={reminderData.reminder_time}
              onChange={(e) => setReminderData({ ...reminderData, reminder_time: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!reminderData.title || !reminderData.reminder_time}>
              Add Reminder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderModal;