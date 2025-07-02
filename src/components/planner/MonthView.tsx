
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';

const MonthView = () => {
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const daysWithEvents = [5, 12, 18, 25]; // Days that have events

  const getDayOfWeek = (day: number) => {
    // Simple calculation for demo - in real app you'd use proper date calculation
    const dayOfWeek = (day + 2) % 7; // Assuming 1st is Wednesday
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
  };

  return (
    <Card className="card-warm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <CalendarIcon className="h-5 w-5" />
          Monthly Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-slate-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: 3 }, (_, i) => (
            <div key={`empty-${i}`} className="h-20 bg-slate-50 rounded border"></div>
          ))}
          
          {monthDays.map((day) => (
            <div
              key={day}
              className={`h-20 p-2 border rounded hover:bg-slate-50 transition-colors ${
                daysWithEvents.includes(day) ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="font-medium text-slate-700">{day}</div>
              {daysWithEvents.includes(day) && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthView;
