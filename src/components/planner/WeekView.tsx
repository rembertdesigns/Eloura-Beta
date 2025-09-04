
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Target, TrendingUp, Calendar, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';

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

  const handleSaveReflection = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    onSaveReflection('weekly', {
      periodStart: startOfWeek.toISOString().split('T')[0],
      periodEnd: endOfWeek.toISOString().split('T')[0],
      wentWell: weeklyReflection,
      nextPlans: nextWeekPlanning
    });
  };

  return (
    <div className="space-y-6">
      {/* Weekly Calendar Grid */}
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-700">This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weekData.map((day, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium text-center text-gray-700 py-2 border-b">{day.day}</h3>
                <div className="space-y-2">
                  {day.tasks.map((task, taskIndex) => (
                    <Card key={taskIndex} className="p-3 hover:shadow-sm transition-shadow">
                      <CardContent className="p-0">
                        <div className="text-xs text-gray-500 mb-1">{task.time}</div>
                        <div className="font-medium text-sm text-gray-700 mb-2">{task.title}</div>
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
        </CardContent>
      </Card>

      {/* Weekly Insights Tabs */}
      <Card className="shadow-2xl">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals Progress</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Weekly Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-700">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      This Week's Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {weeklyHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg">
                        <div className="text-sm text-gray-500 font-medium min-w-[60px]">
                          {highlight.date}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{highlight.title}</p>
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
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-700">
                      <Award className="h-5 w-5 text-purple-600" />
                      Weekly Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {weeklyAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg">
                        <achievement.icon className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{achievement.name}</p>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Time Allocation */}
              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Weekly Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(timeAllocation).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium text-gray-700">{category}</span>
                        <span className="text-sm text-gray-500">{data.hours}h ({data.percentage}%)</span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <div className="grid gap-4">
                {weeklyGoals.map((goal, index) => (
                  <Card key={index} className="bg-white/60">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-700">{goal.title}</h4>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {goal.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{goal.progress}%</span>
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

            <TabsContent value="patterns" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productivityPattern && (
                  <Card className="bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-green-700">Peak Productivity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium text-green-800">{productivityPattern.pattern_value}</p>
                      <p className="text-xs text-green-600">{productivityPattern.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
                
                {bestCategory && (
                  <Card className="bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-blue-700">Best Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium text-blue-800">{bestCategory.pattern_value}</p>
                      <p className="text-xs text-blue-600">{bestCategory.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
                
                {streakRecord && (
                  <Card className="bg-purple-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-purple-700">Streak Record</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium text-purple-800">{streakRecord.pattern_value}</p>
                      <p className="text-xs text-purple-600">{streakRecord.pattern_description}</p>
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
