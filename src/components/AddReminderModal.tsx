import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddReminderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddReminder: (reminderData: any) => Promise<any>;
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({ isOpen, onOpenChange, onAddReminder }) => {
  const [reminderData, setReminderData] = useState({
    title: '',
    description: '',
    recurring: false,
    recurrence_pattern: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date>();

  // Generate time options for full 24 hours
  const timeOptions = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
    '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];

  const recurrenceOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const convertTimeToDate = (date: Date, timeString: string) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : 
                         period === 'AM' && hours === 12 ? 0 : hours;
    
    const newDate = new Date(date);
    newDate.setHours(adjustedHours, minutes, 0, 0);
    return newDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderData.title || !selectedDate || !selectedTime) return;

    try {
      const reminderDateTime = convertTimeToDate(selectedDate, selectedTime);
      
      await onAddReminder({
        title: reminderData.title,
        description: reminderData.description || null,
        reminder_time: reminderDateTime.toISOString(),
        completed: false,
        recurring: reminderData.recurring,
        recurrence_pattern: reminderData.recurring ? reminderData.recurrence_pattern : null,
        recurrence_end_date: reminderData.recurring && recurrenceEndDate ? recurrenceEndDate.toISOString().split('T')[0] : null,
      });

      // Reset form
      setReminderData({
        title: '',
        description: '',
        recurring: false,
        recurrence_pattern: '',
      });
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setRecurrenceEndDate(undefined);
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Reminder Date *</Label>
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
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
              <Label>Reminder Time *</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!reminderData.title || !selectedDate || !selectedTime}>
              Add Reminder
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={reminderData.recurring}
                onCheckedChange={(checked) => setReminderData({ ...reminderData, recurring: !!checked })}
              />
              <Label htmlFor="recurring" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Make this reminder recurring
              </Label>
            </div>

            {reminderData.recurring && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div>
                  <Label>Repeat Pattern</Label>
                  <Select value={reminderData.recurrence_pattern} onValueChange={(value) => setReminderData({ ...reminderData, recurrence_pattern: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      {recurrenceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>End Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !recurrenceEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={recurrenceEndDate}
                        onSelect={setRecurrenceEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderModal;