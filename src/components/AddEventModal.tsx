import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddEventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEvent: (eventData: any) => Promise<any>;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onOpenChange, onAddEvent }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    start_date: undefined as Date | undefined,
    start_time: '',
    end_date: undefined as Date | undefined,
    end_time: '',
    category: '',
    location: '',
  });

  const categories = [
    { value: 'work', label: 'Work' },
    { value: 'family', label: 'Family' },
    { value: 'parenting', label: 'Parenting' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health' },
    { value: 'social', label: 'Social' },
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
    if (!eventData.title || !eventData.start_date || !eventData.start_time) return;

    try {
      // Combine date and time for start_time
      const startDateTime = new Date(eventData.start_date);
      const [startHour, startMinute] = eventData.start_time.split(':');
      startDateTime.setHours(parseInt(startHour), parseInt(startMinute));

      // Combine date and time for end_time if provided
      let endDateTime = null;
      if (eventData.end_date && eventData.end_time) {
        endDateTime = new Date(eventData.end_date);
        const [endHour, endMinute] = eventData.end_time.split(':');
        endDateTime.setHours(parseInt(endHour), parseInt(endMinute));
      }

      await onAddEvent({
        title: eventData.title,
        description: eventData.description || null,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime ? endDateTime.toISOString() : null,
        category: eventData.category || null,
        location: eventData.location || null,
      });

      // Reset form
      setEventData({
        title: '',
        description: '',
        start_date: undefined,
        start_time: '',
        end_date: undefined,
        end_time: '',
        category: '',
        location: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              placeholder="Enter event description"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !eventData.start_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventData.start_date ? format(eventData.start_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={eventData.start_date}
                      onSelect={(date) => setEventData({ ...eventData, start_date: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Start Time *</Label>
                <Select value={eventData.start_time} onValueChange={(value) => setEventData({ ...eventData, start_time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time">
                      <Clock className="mr-2 h-4 w-4" />
                      {eventData.start_time ? timeOptions.find(t => t.value === eventData.start_time)?.label : "Select time"}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !eventData.end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventData.end_date ? format(eventData.end_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={eventData.end_date}
                      onSelect={(date) => setEventData({ ...eventData, end_date: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Time</Label>
                <Select value={eventData.end_time} onValueChange={(value) => setEventData({ ...eventData, end_time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time">
                      <Clock className="mr-2 h-4 w-4" />
                      {eventData.end_time ? timeOptions.find(t => t.value === eventData.end_time)?.label : "Select time"}
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
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setEventData({ ...eventData, category: value })}>
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={eventData.location}
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              placeholder="Enter location"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!eventData.title || !eventData.start_date || !eventData.start_time}>
              Add Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;