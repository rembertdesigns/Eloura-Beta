import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Star, Clock, Brain, Save } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
  mentalLoad?: number;
  timeEstimate?: number;
  satisfaction?: number;
}

interface TaskRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedTasks: Task[];
  onSaveRatings: (taskId: number, ratings: { mentalLoad: number; timeEstimate: number; satisfaction: number }) => void;
}

const TaskRatingModal = ({ isOpen, onClose, completedTasks, onSaveRatings }: TaskRatingModalProps) => {
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: { mentalLoad: number; timeEstimate: number; satisfaction: number } }>({});

  const categoryColors = {
    childcare: 'bg-green-100 text-green-700',
    eldercare: 'bg-orange-100 text-orange-700',
    selfcare: 'bg-purple-100 text-purple-700',
    household: 'bg-blue-100 text-blue-700',
    work: 'bg-indigo-100 text-indigo-700',
    general: 'bg-gray-100 text-gray-700'
  };

  const updateTaskRating = (taskId: number, field: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value
      }
    }));
  };

  const getTaskRating = (taskId: number, field: string, defaultValue: number) => {
    return ratings[taskId]?.[field as keyof typeof ratings[number]] || defaultValue;
  };

  const saveRatings = (taskId: number) => {
    const taskRatings = ratings[taskId] || {
      mentalLoad: 3,
      timeEstimate: 30,
      satisfaction: 3
    };
    onSaveRatings(taskId, taskRatings);
    setActiveTaskId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Star className="h-5 w-5 text-yellow-600" />
            Rate Your Tasks
          </DialogTitle>
          <p className="text-sm text-gray-500">Help us understand your mental load and time patterns</p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {completedTasks.map((task) => (
            <div key={task.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-gray-700">{task.text}</h4>
                  <Badge className={categoryColors[task.category as keyof typeof categoryColors]}>
                    {task.category}
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Completed
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTaskId(activeTaskId === task.id ? null : task.id)}
                  className="text-gray-600"
                >
                  {activeTaskId === task.id ? 'Cancel' : 'Rate'}
                </Button>
              </div>

              {activeTaskId === task.id && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <label className="text-sm font-medium text-gray-700">
                          Mental Load: {getTaskRating(task.id, 'mentalLoad', 3)}
                        </label>
                      </div>
                      <Slider
                        value={[getTaskRating(task.id, 'mentalLoad', 3)]}
                        onValueChange={(value) => updateTaskRating(task.id, 'mentalLoad', value[0])}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <label className="text-sm font-medium text-gray-700">
                          Time Taken: {getTaskRating(task.id, 'timeEstimate', 30)}min
                        </label>
                      </div>
                      <Slider
                        value={[getTaskRating(task.id, 'timeEstimate', 30)]}
                        onValueChange={(value) => updateTaskRating(task.id, 'timeEstimate', value[0])}
                        max={180}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>5min</span>
                        <span>3h</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <label className="text-sm font-medium text-gray-700">
                          Satisfaction: {getTaskRating(task.id, 'satisfaction', 3)}
                        </label>
                      </div>
                      <Slider
                        value={[getTaskRating(task.id, 'satisfaction', 3)]}
                        onValueChange={(value) => updateTaskRating(task.id, 'satisfaction', value[0])}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskRatingModal;