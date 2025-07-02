
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WeekView = () => {
  const weekData = [
    {
      day: 'Mon',
      tasks: [
        { time: '9:00 AM', title: 'Team standup', category: 'Work', color: 'bg-blue-100 text-blue-700' },
        { time: '6:00 PM', title: 'Grocery shopping', category: 'Personal', color: 'bg-green-100 text-green-700' }
      ]
    },
    {
      day: 'Tue',
      tasks: [
        { time: '11:00 AM', title: "Mom's doctor visit", category: 'Family', color: 'bg-purple-100 text-purple-700' }
      ]
    },
    {
      day: 'Wed',
      tasks: [
        { time: '4:00 PM', title: 'Kids soccer practice', category: 'Parenting', color: 'bg-yellow-100 text-yellow-700' }
      ]
    },
    {
      day: 'Thu',
      tasks: [
        { time: '5:00 PM', title: 'Project deadline', category: 'Work', color: 'bg-blue-100 text-blue-700' }
      ]
    },
    {
      day: 'Fri',
      tasks: [
        { time: '5:30 PM', title: 'Family dinner prep', category: 'Personal', color: 'bg-green-100 text-green-700' }
      ]
    },
    {
      day: 'Sat',
      tasks: [
        { time: '10:00 AM', title: 'Weekend planning', category: 'Family', color: 'bg-purple-100 text-purple-700' }
      ]
    },
    {
      day: 'Sun',
      tasks: []
    }
  ];

  return (
    <div className="grid grid-cols-7 gap-4">
      {weekData.map((day, index) => (
        <div key={index} className="space-y-2">
          <h3 className="font-medium text-center text-slate-700 py-2 border-b">{day.day}</h3>
          <div className="space-y-2">
            {day.tasks.map((task, taskIndex) => (
              <Card key={taskIndex} className="p-3 hover:shadow-sm transition-shadow">
                <CardContent className="p-0">
                  <div className="text-xs text-slate-500 mb-1">{task.time}</div>
                  <div className="font-medium text-sm text-slate-700 mb-2">{task.title}</div>
                  <Badge className={`text-xs ${task.color}`}>
                    {task.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
