import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, AlarmClock, CheckCircle2 } from 'lucide-react';

interface Task {
  time: string;
  title: string;
  category: string;
  color: string;
}

interface Reminder {
  id: string;
  time: string;
  title: string;
  completed: boolean;
}

interface DayDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dayName: string;
  date: Date;
  tasks: Task[];
  reminders: Reminder[];
  toggleReminderCompletion?: (reminderId: string, completed: boolean) => void;
}

const DayDetailModal: React.FC<DayDetailModalProps> = ({
  isOpen,
  onOpenChange,
  dayName,
  date,
  tasks,
  reminders,
  toggleReminderCompletion,
}) => {
  // Combine tasks and reminders, then sort by time
  const allItems = [
    ...tasks.map(task => ({
      ...task,
      type: 'task' as const,
      timeSort: convertTimeToSort(task.time)
    })),
    ...reminders.map(reminder => ({
      ...reminder,
      type: 'reminder' as const,
      timeSort: convertTimeToSort(reminder.time),
      category: 'reminder',
      color: 'yellow'
    }))
  ].sort((a, b) => a.timeSort - b.timeSort);

  // Convert time string to sortable number
  function convertTimeToSort(timeString: string): number {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period) {
      if (period.toUpperCase() === 'PM' && hours !== 12) hour24 += 12;
      if (period.toUpperCase() === 'AM' && hours === 12) hour24 = 0;
    }
    
    return hour24 * 100 + minutes;
  }

  const isToday = date.toDateString() === new Date().toDateString();
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <div className="flex flex-col">
              <span>{formattedDate}</span>
              {isToday && (
                <Badge variant="outline" className="w-fit text-xs mt-1">
                  Today
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {allItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No tasks or reminders for this day</p>
            </div>
          ) : (
            <div className="space-y-2">
              {allItems.map((item, index) => (
                <div
                  key={`${item.type}-${index}`}
                  className={`p-3 rounded-lg border ${
                    item.type === 'reminder' 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {item.type === 'reminder' ? (
                      <div className="flex items-center gap-2 mt-1">
                        {toggleReminderCompletion && (
                          <Checkbox 
                            checked={(item as any).completed}
                            onCheckedChange={(checked) => {
                              toggleReminderCompletion((item as any).id, !!checked);
                            }}
                            className="h-4 w-4"
                          />
                        )}
                        <AlarmClock className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                      </div>
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-medium text-sm ${
                          item.type === 'reminder' && (item as any).completed 
                            ? 'line-through text-gray-500' 
                            : 'text-gray-900'
                        }`}>
                          {item.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs flex-shrink-0 ${
                            item.type === 'reminder' ? 'bg-yellow-100' : 'bg-blue-100'
                          }`}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayDetailModal;