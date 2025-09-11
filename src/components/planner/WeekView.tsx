
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Target, TrendingUp, Calendar, Clock, CheckCircle2, AlertCircle, Star, Plus } from 'lucide-react';

interface WeekData {
  day: string;
  tasks: Array<{
    time: string;
    title: string;
    category: string;
    color: string;
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
  target_date: string;
  is_completed: boolean;
}

interface UserPattern {
  id: string;
  pattern_type: string;
  pattern_name: string;
  pattern_value: string;
  pattern_description: string;
  confidence_score: number;
}

interface WeekViewProps {
  weekData: WeekData[];
  achievements: Achievement[];
  milestones: Milestone[];
  timeAllocation: TimeAllocation;
  goals: Goal[];
  patterns: UserPattern[];
  onSaveReflection: (type: 'weekly' | 'monthly', data: any) => Promise<void>;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  weekData, 
  achievements, 
  milestones, 
  timeAllocation, 
  goals, 
  patterns,
  onSaveReflection 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [weeklyReflection, setWeeklyReflection] = useState('');
  const [nextWeekPlanning, setNextWeekPlanning] = useState('');

  const weeklyHighlights = milestones.map(milestone => ({
    date: new Date(milestone.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    title: milestone.title,
    type: milestone.milestone_type
  }));

  const weeklyAchievements = achievements.slice(0, 3).map(achievement => ({
    icon: Trophy, // Default icon, could be dynamic based on achievement.icon
    name: achievement.achievement_name,
    description: achievement.description
  }));

  const weeklyGoals = goals.slice(0, 3).map(goal => ({
    title: goal.title,
    progress: goal.progress,
    status: goal.is_completed ? 'completed' : goal.progress > 70 ? 'on-track' : 'needs-attention',
    category: goal.category
  }));

  const productivityPattern = patterns.find(p => p.pattern_type === 'productivity_peak');
  const bestCategory = patterns.find(p => p.pattern_type === 'best_category');
  const streakRecord = patterns.find(p => p.pattern_type === 'streak_record');

  const getCurrentWeekDates = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
    
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();

  const handleSaveReflection = () => {
    const startOfWeek = weekDates[0];
    const endOfWeek = weekDates[6];

    onSaveReflection('weekly', {
      periodStart: startOfWeek.toISOString().split('T')[0],
      periodEnd: endOfWeek.toISOString().split('T')[0],
      wentWell: weeklyReflection,
      nextPlans: nextWeekPlanning
    });
  };

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Weekly Calendar Grid */}
      <Card className="bg-white/60">
        <CardContent className="p-4 md:p-6">
          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-gray-700 font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid Content */}
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, index) => {
              const dayData = weekData.find((_, i) => i === index) || { day: '', tasks: [] };
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} className="min-h-[80px] md:min-h-[120px]">
                  <div className={`border rounded-lg p-2 h-full transition-colors ${
                    isToday ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayData.tasks.slice(0, 2).map((task, taskIndex) => (
                        <div key={taskIndex} className="text-xs p-1 bg-white rounded border shadow-sm">
                          <div className="font-medium text-gray-700 truncate">{task.title}</div>
                          <div className="text-gray-500">{task.time}</div>
                          <div className={`text-xs px-1 py-0.5 rounded text-center mt-0.5 ${task.color}`}>
                            {task.category}
                          </div>
                        </div>
                      ))}
                      {dayData.tasks.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayData.tasks.length - 2} more
                        </div>
                      )}
                      {dayData.tasks.length === 0 && (
                        <div className="flex items-center justify-center h-8">
                          <Plus className="h-4 w-4 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Insights Tabs - Mobile Optimized */}
      <Card className="shadow-lg md:shadow-2xl">
        <CardContent className="p-3 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Mobile: Compact horizontal tabs */}
            <div className="md:hidden mb-3">
              <TabsList className="grid w-full grid-cols-4 h-10">
                <TabsTrigger value="overview" className="text-xs px-1 min-touch-target">Overview</TabsTrigger>
                <TabsTrigger value="goals" className="text-xs px-1 min-touch-target">Goals</TabsTrigger>
                <TabsTrigger value="patterns" className="text-xs px-1 min-touch-target">Patterns</TabsTrigger>
                <TabsTrigger value="reflection" className="text-xs px-1 min-touch-target">Reflect</TabsTrigger>
              </TabsList>
            </div>

            {/* Desktop: Standard tabs */}
            <div className="hidden md:block">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="goals">Goals Progress</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
                <TabsTrigger value="reflection">Reflection</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-3 md:space-y-6">
              {/* Weekly Highlights */}
              <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2">
                <Card className="bg-white/60">
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                      <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
                      This Week's Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {weeklyHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/80 rounded-lg">
                        <div className="text-xs md:text-sm text-gray-500 font-medium min-w-[50px] md:min-w-[60px]">
                          {highlight.date}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-gray-700 truncate">{highlight.title}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {highlight.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Weekly Achievements */}
                <Card className="bg-white/60">
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                      <Award className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      Weekly Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {weeklyAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/80 rounded-lg">
                        <achievement.icon className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-gray-700 truncate">{achievement.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Time Allocation - Mobile Optimized */}
              <Card className="bg-white/60">
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                    Weekly Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-4">
                  {Object.entries(timeAllocation).map(([category, data]) => (
                    <div key={category} className="space-y-1 md:space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium text-gray-700 text-sm">{category}</span>
                        <span className="text-xs md:text-sm text-gray-500">{data.hours}h ({data.percentage}%)</span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-2 md:space-y-4">
              <div className="grid gap-2 md:gap-4">
                {weeklyGoals.map((goal, index) => (
                  <Card key={index} className="bg-white/60">
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start justify-between mb-2 md:mb-3 gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-700 text-sm md:text-base truncate">{goal.title}</h4>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {goal.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs md:text-sm text-gray-500">{goal.progress}%</span>
                          {goal.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          {goal.status === 'needs-attention' && <AlertCircle className="h-4 w-4 text-orange-500" />}
                          {goal.status === 'on-track' && <Target className="h-4 w-4 text-blue-500" />}
                        </div>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-3 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                {productivityPattern && (
                  <Card className="bg-green-50">
                    <CardHeader className="pb-2 md:pb-3">
                      <CardTitle className="text-xs md:text-sm text-green-700">Peak Productivity</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-lg font-medium text-green-800">{productivityPattern.pattern_value}</p>
                      <p className="text-xs text-green-600 line-clamp-2">{productivityPattern.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
                
                {bestCategory && (
                  <Card className="bg-blue-50">
                    <CardHeader className="pb-2 md:pb-3">
                      <CardTitle className="text-xs md:text-sm text-blue-700">Best Category</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-lg font-medium text-blue-800">{bestCategory.pattern_value}</p>
                      <p className="text-xs text-blue-600 line-clamp-2">{bestCategory.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
                
                {streakRecord && (
                  <Card className="bg-purple-50">
                    <CardHeader className="pb-2 md:pb-3">
                      <CardTitle className="text-xs md:text-sm text-purple-700">Streak Record</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-lg font-medium text-purple-800">{streakRecord.pattern_value}</p>
                      <p className="text-xs text-purple-600 line-clamp-2">{streakRecord.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Weekly Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {productivityPattern && (
                    <div className="p-3 bg-white/80 rounded-lg">
                      <p className="text-sm text-gray-700">{productivityPattern.pattern_description}</p>
                      <p className="text-xs text-gray-500 mt-1">Peak time: {productivityPattern.pattern_value}</p>
                    </div>
                  )}
                  {bestCategory && (
                    <div className="p-3 bg-white/80 rounded-lg">
                      <p className="text-sm text-gray-700">Your strongest category: {bestCategory.pattern_value}</p>
                      <p className="text-xs text-gray-500 mt-1">{bestCategory.pattern_description}</p>
                    </div>
                  )}
                  {patterns.length === 0 && (
                    <div className="p-3 bg-white/80 rounded-lg">
                      <p className="text-sm text-gray-500">Complete more tasks to see personalized insights</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reflection" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-5 w-5 text-green-600" />
                      This Week's Reflection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="What went well this week? What could be improved? Any key learnings?"
                      className="min-h-[120px] resize-none"
                      value={weeklyReflection}
                      onChange={(e) => setWeeklyReflection(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-700">
                      <Target className="h-5 w-5 text-blue-600" />
                      Next Week Planning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="What are your priorities for next week? Any adjustments to make based on this week?"
                      className="min-h-[120px] resize-none"
                      value={nextWeekPlanning}
                      onChange={(e) => setNextWeekPlanning(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleSaveReflection} className="px-8">
                  Save Weekly Reflection
                </Button>
              </div>

              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="text-gray-700">Upcoming Week Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">No upcoming events scheduled. Add events to see them here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeekView;
