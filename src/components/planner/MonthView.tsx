
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Trophy, 
  Target, 
  TrendingUp, 
  Award,
  BarChart3,
  PieChart,
  Calendar,
  BookOpen,
  ChevronRight,
  Star,
  Flame,
  Edit3
} from 'lucide-react';

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

interface MonthViewProps {
  achievements: Achievement[];
  milestones: Milestone[];
  timeAllocation: TimeAllocation;
  goals: Goal[];
  patterns: UserPattern[];
  onSaveReflection: (type: 'weekly' | 'monthly', data: any) => Promise<void>;
}

const MonthView: React.FC<MonthViewProps> = ({ 
  achievements, 
  milestones, 
  timeAllocation, 
  goals, 
  patterns,
  onSaveReflection 
}) => {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [monthlyReflection, setMonthlyReflection] = useState('');

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const daysWithEvents = [5, 12, 18, 25]; // Days that have events
  const productiveDays = [3, 7, 9, 14, 16, 21, 23, 28]; // High productivity days
  const goalCompletionDays = [1, 8, 15, 22, 29]; // Days with goal completions

  const monthlyGoals = goals.map(goal => ({
    name: goal.title,
    progress: goal.progress,
    category: goal.category,
    status: goal.is_completed ? 'completed' : goal.progress > 70 ? 'ahead' : goal.progress < 30 ? 'behind' : 'on-track'
  }));

  const monthlyMilestones = milestones.map(milestone => ({
    date: new Date(milestone.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    title: milestone.title,
    type: milestone.milestone_type
  }));

  const monthlyBadges = achievements.slice(0, 4).map(achievement => ({
    name: achievement.achievement_name,
    description: achievement.description,
    icon: Star // Default icon, could be dynamic based on achievement.icon
  }));

  const productivityPattern = patterns.find(p => p.pattern_type === 'productivity_peak');
  const bestCategory = patterns.find(p => p.pattern_type === 'best_category');
  const streakRecord = patterns.find(p => p.pattern_type === 'streak_record');

  const handleSaveReflection = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    onSaveReflection('monthly', {
      periodStart: startOfMonth.toISOString().split('T')[0],
      periodEnd: endOfMonth.toISOString().split('T')[0],
      wentWell: monthlyReflection,
      nextPlans: monthlyReflection // Could separate this into different fields
    });
  };

  const getProductivityLevel = (day: number) => {
    if (productiveDays.includes(day)) return 'high';
    if (goalCompletionDays.includes(day)) return 'goal';
    if (daysWithEvents.includes(day)) return 'event';
    return 'normal';
  };

  const getProductivityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-500';
      case 'goal': return 'bg-purple-500';
      case 'event': return 'bg-blue-500';
      default: return 'bg-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Monthly Calendar */}
      <Card className="card-warm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <CalendarIcon className="h-5 w-5" />
            July 2024 - Productivity Heatmap
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>High Productivity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Goal Completion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Events</span>
            </div>
          </div>
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
              <div key={`empty-${i}`} className="h-16 bg-slate-50 rounded border"></div>
            ))}
            
            {monthDays.map((day) => {
              const productivityLevel = getProductivityLevel(day);
              return (
                <div
                  key={day}
                  className={`h-16 p-2 border rounded hover:bg-slate-50 transition-colors ${getProductivityColor(productivityLevel)} ${
                    productivityLevel !== 'normal' ? 'text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  <div className="font-medium">{day}</div>
                  {productivityLevel !== 'normal' && (
                    <div className="text-xs opacity-90">
                      {productivityLevel === 'high' && '🔥'}
                      {productivityLevel === 'goal' && '🎯'}
                      {productivityLevel === 'event' && '📅'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Insights Tabs */}
      <Card className="card-warm">
        <CardContent className="p-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals Progress</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Monthly Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-700">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      This Month's Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {monthlyMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg">
                        <div className="text-sm text-slate-500 font-medium min-w-[60px]">
                          {milestone.date.split(' ')[1]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700">{milestone.title}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {milestone.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Monthly Awards */}
                <Card className="bg-white/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-700">
                      <Award className="h-5 w-5 text-purple-600" />
                      Monthly Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {monthlyBadges.map((badge, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg">
                        <badge.icon className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700">{badge.name}</p>
                          <p className="text-xs text-slate-500">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Time Allocation Chart */}
              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    July Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(timeAllocation).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium text-slate-700">{category}</span>
                        <span className="text-sm text-slate-500">{data.hours}h ({data.percentage}%)</span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monthlyGoals.map((goal, index) => (
                  <Card key={index} className="bg-white/60">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-700">{goal.name}</h4>
                          <Badge 
                            variant={goal.status === 'completed' ? 'default' : 'outline'} 
                            className="mt-1"
                          >
                            {goal.category}
                          </Badge>
                        </div>
                        <Badge 
                          className={`ml-2 ${
                            goal.status === 'completed' ? 'bg-green-100 text-green-700' :
                            goal.status === 'ahead' ? 'bg-blue-100 text-blue-700' :
                            goal.status === 'behind' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productivityPattern && (
                  <Card className="bg-white/60">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-slate-700 mb-2">Peak Productivity</h4>
                      <p className="text-2xl font-bold text-green-600">{productivityPattern.pattern_value}</p>
                      <p className="text-sm text-slate-500">{productivityPattern.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
                <Card className="bg-white/60">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-700 mb-2">Goal Completion Rate</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {goals.length > 0 ? Math.round((goals.filter(g => g.is_completed).length / goals.length) * 100) : 0}%
                    </p>
                    <p className="text-sm text-slate-500">{goals.filter(g => g.is_completed).length} of {goals.length} goals</p>
                  </CardContent>
                </Card>
                {streakRecord && (
                  <Card className="bg-white/60">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-slate-700 mb-2">Streak Record</h4>
                      <p className="text-2xl font-bold text-purple-600">{streakRecord.pattern_value}</p>
                      <p className="text-sm text-slate-500">{streakRecord.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="text-slate-700">Monthly Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {productivityPattern && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">
                        <strong>Peak Performance:</strong> {productivityPattern.pattern_description}
                      </p>
                    </div>
                  )}
                  {bestCategory && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <strong>Best Category:</strong> {bestCategory.pattern_value} - {bestCategory.pattern_description}
                      </p>
                    </div>
                  )}
                  {streakRecord && (
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-700">
                        <strong>Streak Achievement:</strong> {streakRecord.pattern_value} - {streakRecord.pattern_description}
                      </p>
                    </div>
                  )}
                  {patterns.length === 0 && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Complete more tasks to see personalized monthly insights</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reflection" className="space-y-4">
              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <BookOpen className="h-5 w-5" />
                    Monthly Reflection & Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-700">What went well?</h4>
                      <Textarea 
                        placeholder="Reflect on your successes this month..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-700">What was challenging?</h4>
                      <Textarea 
                        placeholder="Note the obstacles you faced..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-700">Plans for next month</h4>
                      <Textarea 
                        placeholder="Set intentions for August..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-slate-700 mb-3">August Preview</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>Summer vacation - Aug 15-22</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Target className="h-4 w-4" />
                        <span>Q3 project deadline - Aug 30</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Award className="h-4 w-4" />
                        <span>Kids' back-to-school prep</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleSaveReflection}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Save Monthly Reflection
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthView;
