import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Star, Clock, Brain, Save } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  mentalLoad?: number;
  timeEstimate?: number;
  satisfaction?: number;
}

const TaskRating = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'School pickup', category: 'childcare', completed: true },
    { id: '2', title: 'Grocery shopping', category: 'household', completed: true },
    { id: '3', title: 'Doctor appointment', category: 'eldercare', completed: false },
    { id: '4', title: 'Yoga class', category: 'selfcare', completed: true },
    { id: '5', title: 'Meal prep', category: 'household', completed: false },
  ]);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const categoryColors = {
    childcare: 'bg-green-100 text-green-700',
    eldercare: 'bg-orange-100 text-orange-700',
    selfcare: 'bg-purple-100 text-purple-700',
    household: 'bg-blue-100 text-blue-700'
  };

  const updateTaskRating = (taskId: string, field: string, value: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
  };

  const saveRatings = (taskId: string) => {
    setActiveTaskId(null);
    // Here you would save to your backend/state management
    console.log('Saved ratings for task', taskId);
  };

  return (
    <Card className="card-warm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <Star className="h-5 w-5 text-yellow-600" />
          Rate Your Tasks
        </CardTitle>
        <p className="text-sm text-slate-500">Help us understand your mental load and time patterns</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border border-white/50 rounded-lg bg-white/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-slate-700">{task.title}</h4>
                <Badge className={categoryColors[task.category as keyof typeof categoryColors]}>
                  {task.category}
                </Badge>
                {task.completed && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Completed
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTaskId(activeTaskId === task.id ? null : task.id)}
                className="text-slate-600"
              >
                {activeTaskId === task.id ? 'Cancel' : 'Rate'}
              </Button>
            </div>

            {activeTaskId === task.id && (
              <div className="space-y-4 pt-4 border-t border-white/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <label className="text-sm font-medium text-slate-700">
                        Mental Load: {task.mentalLoad || 3}
                      </label>
                    </div>
                    <Slider
                      value={[task.mentalLoad || 3]}
                      onValueChange={(value) => updateTaskRating(task.id, 'mentalLoad', value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <label className="text-sm font-medium text-slate-700">
                        Time Taken: {task.timeEstimate || 30}min
                      </label>
                    </div>
                    <Slider
                      value={[task.timeEstimate || 30]}
                      onValueChange={(value) => updateTaskRating(task.id, 'timeEstimate', value[0])}
                      max={180}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>5min</span>
                      <span>3h</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <label className="text-sm font-medium text-slate-700">
                        Satisfaction: {task.satisfaction || 3}
                      </label>
                    </div>
                    <Slider
                      value={[task.satisfaction || 3]}
                      onValueChange={(value) => updateTaskRating(task.id, 'satisfaction', value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Poor</span>
                      <span>Great</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => saveRatings(task.id)}
                  size="sm"
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Rating
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskRating;