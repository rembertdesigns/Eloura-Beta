
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Share, Plus } from 'lucide-react';

const GoalsView = () => {
  const goals = [
    {
      title: 'Complete Q4 project',
      category: 'Career',
      progress: 75,
      due: 'Dec 31',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Exercise 3x per week',
      category: 'Health',
      progress: 60,
      due: 'Ongoing',
      color: 'bg-pink-100 text-pink-700'
    },
    {
      title: 'Family game night weekly',
      category: 'Family',
      progress: 90,
      due: 'Weekly',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'Learn new skill',
      category: 'Personal',
      progress: 30,
      due: 'Mar 31',
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal, index) => (
          <Card key={index} className="p-4 hover:shadow-sm transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-slate-700">{goal.title}</h3>
                <Badge className={`text-xs ${goal.color}`}>
                  {goal.category}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Due: {goal.due}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Update
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-dashed border-slate-300 p-8 text-center">
        <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700 mb-2">Set a New Goal</h3>
        <p className="text-slate-500 mb-4">Track your progress towards what matters most</p>
        <Button className="bg-slate-800 hover:bg-slate-900">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </Card>
    </div>
  );
};

export default GoalsView;
