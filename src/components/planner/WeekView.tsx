import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trophy, Award, Target, TrendingUp, Calendar, Clock, CheckCircle2, AlertCircle, Star, Plus, AlarmClock } from 'lucide-react';

interface WeekData {
  day: string;
  tasks: Array<{
    time: string;
    title: string;
    category: string;
    color: string;
  }>;
  reminders: Array<{
    id: string;
    time: string;
    title: string;
    completed: boolean;
  }>;
}

interface Achievement {
  id: string;
  achievement_name: string;
  description: string;
  icon: string;
  category: string;
  earned_date: string;
}

interface Milestone {
  id: string;
  title: string;
  description?: string;
  milestone_type: string;
  date: string;
  is_highlight: boolean;
}

interface TimeAllocation {
  [key: string]: {
    hours: number;
    percentage: number;
    color: string;
  };
}

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  target_value: number;
  current_value: number;
  due_date: string;
  status: string;
  streak_count: number;
  completion_rate: number;
}

interface UserPattern {
  id: string;
  pattern_type: string;
  description: string;
  best_time_category: string;
  productivity_score: number;
  insights: string[];
  trend: 'up' | 'down' | 'stable';
}

interface WeekViewProps {
  weekData: any[];
  achievements: any[];
  milestones: any[];
  timeAllocation: any;
  goals: any[];
  patterns: any[];
  onSaveReflection: (type: 'weekly' | 'monthly', data: any) => void;
  toggleReminderCompletion?: (reminderId: string, completed: boolean) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  weekData, 
  achievements, 
  milestones, 
  timeAllocation, 
  goals, 
  patterns,
  onSaveReflection,
  toggleReminderCompletion
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [weeklyReflection, setWeeklyReflection] = useState('');
  const [nextWeekPlanning, setNextWeekPlanning] = useState('');

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();
  
  // Get current month and week info
  const currentMonthYear = weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekOfMonth = Math.ceil(weekDates[0].getDate() / 7);

  // Prepare data for display
  const weekHighlights = milestones.slice(0, 3);
  const topAchievements = achievements.slice(0, 3);
  const activeGoals = goals.filter(goal => goal.status === 'active').slice(0, 3);

  const handleSaveReflection = () => {
    onSaveReflection('weekly', {
      weeklyReflection,
      nextWeekPlanning,
      date: new Date().toISOString()
    });
    setWeeklyReflection('');
    setNextWeekPlanning('');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Weekly Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Calendar - {currentMonthYear}, Week {weekOfMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const dayData = weekData.find(d => d.day === day) || { day, tasks: [], reminders: [] };
              const isToday = weekDates[index].toDateString() === new Date().toDateString();
              
              return (
                <div key={day} className={`p-2 md:p-3 rounded-lg border-2 ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500">{day}</div>
                    <div className={`text-sm md:text-base font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                      {weekDates[index].getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {dayData.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="text-xs p-1 rounded bg-white border">
                        <div className="font-medium truncate">{task.title}</div>
                        <div className="text-gray-500">{task.time}</div>
                      </div>
                    ))}
                    
                    {dayData.reminders && dayData.reminders.map((reminder, reminderIndex) => (
                      <div key={reminderIndex} className="text-xs p-1 rounded bg-yellow-50 border border-yellow-200 flex items-center gap-1">
                        {toggleReminderCompletion && (
                          <Checkbox 
                            checked={reminder.completed}
                            onCheckedChange={(checked) => {
                              toggleReminderCompletion(reminder.id, !!checked);
                            }}
                            className="h-3 w-3"
                          />
                        )}
                        <AlarmClock className="h-2 w-2 text-yellow-600 flex-shrink-0" />
                        <div className={`flex-1 ${reminder.completed ? 'line-through text-gray-500' : ''}`}>
                          <div className="font-medium truncate">{reminder.title}</div>
                          <div className="text-gray-500">{reminder.time}</div>
                        </div>
                      </div>
                    ))}
                    
                    {dayData.tasks.length === 0 && (!dayData.reminders || dayData.reminders.length === 0) && (
                      <div className="text-center py-4">
                        <Plus className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">No items</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Insights Tabs */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Weekly Highlights */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Weekly Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {weekHighlights.map((highlight) => (
                    <Card key={highlight.id} className="p-3">
                      <div className="text-sm font-medium">{highlight.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{highlight.description}</div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {highlight.milestone_type}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-gold-500" />
                  Recent Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {topAchievements.map((achievement) => (
                    <Card key={achievement.id} className="p-3">
                      <div className="text-sm font-medium">{achievement.achievement_name}</div>
                      <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {achievement.category}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Time Allocation */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Time Allocation This Week
                </h3>
                  <div className="space-y-3">
                    {Object.entries(timeAllocation as any).map(([category, data]: [string, any]) => (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{category}</span>
                          <span>{data.hours}h ({data.percentage}%)</span>
                        </div>
                        <Progress value={data.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Active Goals Progress
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeGoals.map((goal) => (
                  <Card key={goal.id} className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium">{goal.title}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {goal.category}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Streak: {goal.streak_count} days</span>
                        <span>Rate: {goal.completion_rate}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Personal Patterns & Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patterns.map((pattern) => (
                  <Card key={pattern.id} className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium capitalize">{pattern.pattern_type}</div>
                        <div className="text-xs text-gray-500 mt-1">{pattern.description}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-xs">
                          Best time: <span className="font-medium">{pattern.best_time_category}</span>
                        </div>
                        <Badge variant={pattern.trend === 'up' ? 'default' : pattern.trend === 'down' ? 'destructive' : 'secondary'} className="text-xs">
                          {pattern.trend}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Productivity Score</span>
                          <span>{pattern.productivity_score}/100</span>
                        </div>
                        <Progress value={pattern.productivity_score} className="h-2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reflection" className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Weekly Reflection & Planning</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    How was your week? What went well?
                  </label>
                  <Textarea
                    value={weeklyReflection}
                    onChange={(e) => setWeeklyReflection(e.target.value)}
                    placeholder="Reflect on your achievements, challenges, and lessons learned this week..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">
                    What are your priorities for next week?
                  </label>
                  <Textarea
                    value={nextWeekPlanning}
                    onChange={(e) => setNextWeekPlanning(e.target.value)}
                    placeholder="Set your intentions and key priorities for the upcoming week..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={handleSaveReflection}
                  className="w-full"
                  disabled={!weeklyReflection.trim() && !nextWeekPlanning.trim()}
                >
                  Save Weekly Reflection
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeekView;