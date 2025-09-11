import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface PlanConnectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConnectionPlanned?: () => void;
}

const PlanConnectionModal: React.FC<PlanConnectionModalProps> = ({
  isOpen,
  onOpenChange,
  onConnectionPlanned
}) => {
  const { user } = useAuth();
  const [connectionData, setConnectionData] = useState({
    title: '',
    description: '',
    contact_name: '',
    connection_type: '',
    date: undefined as Date | undefined,
    time: '',
    location: ''
  });

  const connectionTypes = [
    { value: 'phone_call', label: '📞 Phone Call' },
    { value: 'video_call', label: '📹 Video Call' },
    { value: 'in_person', label: '👥 In Person' },
    { value: 'text_message', label: '💬 Text/Message' },
    { value: 'activity', label: '🎯 Activity Together' },
    { value: 'family_time', label: '👨‍👩‍👧‍👦 Family Time' }
  ];

  // Generate time options
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
    if (!connectionData.title || !connectionData.contact_name) return;

    try {
      // Combine date and time for the event
      let eventDateTime = null;
      if (connectionData.date && connectionData.time) {
        eventDateTime = new Date(connectionData.date);
        const [hour, minute] = connectionData.time.split(':');
        eventDateTime.setHours(parseInt(hour), parseInt(minute));
      } else if (connectionData.date) {
        eventDateTime = connectionData.date;
      }

      // Create an event for the planned connection
      const { error: eventError } = await supabase
        .from('events')
        .insert([
          {
            user_id: user?.id,
            title: connectionData.title,
            description: connectionData.description || null,
            start_time: eventDateTime ? eventDateTime.toISOString() : null,
            location: connectionData.location || null,
            category: 'social'
          }
        ]);

      if (eventError) {
        console.error('Error creating connection event:', eventError);
        toast({
          title: "Error",
          description: "Failed to plan connection. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Also log it as a communication plan
      const { error: logError } = await supabase
        .from('communication_logs')
        .insert([
          {
            user_id: user?.id,
            contact_name: connectionData.contact_name,
            type: connectionData.connection_type || 'planned',
            notes: `Planned: ${connectionData.title}${connectionData.description ? ` - ${connectionData.description}` : ''}`,
            category: 'planned'
          }
        ]);

      if (logError) {
        console.error('Error logging communication:', logError);
      }

      toast({
        title: "Connection Planned! 📅",
        description: `Your social connection with ${connectionData.contact_name} has been scheduled.`
      });

      // Reset form
      setConnectionData({
        title: '',
        description: '',
        contact_name: '',
        connection_type: '',
        date: undefined,
        time: '',
        location: ''
      });

      onOpenChange(false);
      onConnectionPlanned?.();
    } catch (error) {
      console.error('Error planning connection:', error);
      toast({
        title: "Error",
        description: "Failed to plan connection. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Plan Connection Time
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Connection Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Coffee with Sarah"
                value={connectionData.title}
                onChange={(e) => setConnectionData({ ...connectionData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contact_name">Who? *</Label>
              <Input
                id="contact_name"
                placeholder="e.g., Sarah, Mom, Family"
                value={connectionData.contact_name}
                onChange={(e) => setConnectionData({ ...connectionData, contact_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="connection_type">Type of Connection</Label>
            <Select value={connectionData.connection_type} onValueChange={(value) => setConnectionData({ ...connectionData, connection_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select connection type" />
              </SelectTrigger>
              <SelectContent>
                {connectionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Notes (Optional)</Label>
            <Textarea
              id="description"
              placeholder="e.g., Catch up on recent events, discuss weekend plans..."
              value={connectionData.description}
              onChange={(e) => setConnectionData({ ...connectionData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !connectionData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {connectionData.date ? format(connectionData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={connectionData.date}
                    onSelect={(date) => setConnectionData({ ...connectionData, date })}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Time (Optional)</Label>
              <Select value={connectionData.time} onValueChange={(value) => setConnectionData({ ...connectionData, time: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time">
                    <Clock className="mr-2 h-4 w-4" />
                    {connectionData.time ? timeOptions.find(t => t.value === connectionData.time)?.label : "Select time"}
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

          <div>
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              placeholder="e.g., Local cafe, My home, Video call"
              value={connectionData.location}
              onChange={(e) => setConnectionData({ ...connectionData, location: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!connectionData.title || !connectionData.contact_name}>
              Plan Connection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanConnectionModal;