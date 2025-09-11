
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
  Edit3,
  Plus
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

  // Get current month data
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Calculate first day of month and how many days it has
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const daysWithEvents: number[] = []; // No dummy events
  const productiveDays: number[] = []; // No dummy productivity days
  const goalCompletionDays: number[] = []; // No dummy goal completion days

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
    <div className="space-y-3 md:space-y-6">
      {/* Monthly Calendar - Mobile Optimized */}
      <Card className="card-warm">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 md:gap-3 text-slate-700 text-base md:text-lg">
            <CalendarIcon className="h-4 w-4 md:h-5 md:w-5" />
            {firstDayOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Productivity Overview
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-slate-600">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded"></div>
              <span>High Productivity</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded"></div>
              <span>Goal Completion</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded"></div>
              <span>Events</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-slate-600 py-1 md:py-2 text-xs md:text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }, (_, i) => (
              <div key={`empty-${i}`} className="h-12 md:h-16 bg-slate-50 rounded border"></div>
            ))}
            
            {monthDays.map((day) => {
              const productivityLevel = getProductivityLevel(day);
              return (
                <div
                  key={day}
                  className={`h-12 md:h-16 p-1 md:p-2 border rounded hover:bg-slate-50 transition-colors ${getProductivityColor(productivityLevel)} ${
                    productivityLevel !== 'normal' ? 'text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  <div className="font-medium text-xs md:text-sm">{day}</div>
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

      {/* Monthly Insights Tabs - Mobile Optimized */}
      <Card className="card-warm">
        <CardContent className="p-3 md:p-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
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
              {/* Monthly Highlights */}
              <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2">
                <Card className="bg-white/60">
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                      <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
                      This Month's Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {monthlyMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/80 rounded-lg">
                        <div className="text-xs md:text-sm text-slate-500 font-medium min-w-[40px] md:min-w-[60px]">
                          {milestone.date.split(' ')[1]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-slate-700 truncate">{milestone.title}</p>
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
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                      <Award className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      Monthly Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {monthlyBadges.map((badge, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/80 rounded-lg">
                        <badge.icon className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-slate-700 truncate">{badge.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-2">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Time Allocation Chart - Mobile Optimized */}
              <Card className="bg-white/60">
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                    <PieChart className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                    Monthly Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-4">
                  {Object.entries(timeAllocation).map(([category, data]) => (
                    <div key={category} className="space-y-1 md:space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium text-slate-700 text-sm">{category}</span>
                        <span className="text-xs md:text-sm text-slate-500">{data.hours}h ({data.percentage}%)</span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-2 md:space-y-4">
              <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2">
                {monthlyGoals.map((goal, index) => (
                  <Card key={index} className="bg-white/60">
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start justify-between mb-2 md:mb-3 gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-700 text-sm md:text-base truncate">{goal.name}</h4>
                          <Badge 
                            variant={goal.status === 'completed' ? 'default' : 'outline'} 
                            className="mt-1 text-xs"
                          >
                            {goal.category}
                          </Badge>
                        </div>
                        <Badge 
                          className={`ml-2 text-xs flex-shrink-0 ${
                            goal.status === 'completed' ? 'bg-green-100 text-green-700' :
                            goal.status === 'ahead' ? 'bg-blue-100 text-blue-700' :
                            goal.status === 'behind' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <div className="flex justify-between text-xs md:text-sm">
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

            <TabsContent value="patterns" className="space-y-2 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                {productivityPattern && (
                  <Card className="bg-white/60">
                    <CardContent className="p-3 md:p-4">
                      <h4 className="font-medium text-slate-700 mb-2 text-sm">Peak Productivity</h4>
                      <p className="text-lg md:text-2xl font-bold text-green-600">{productivityPattern.pattern_value}</p>
                      <p className="text-xs md:text-sm text-slate-500 line-clamp-2">{productivityPattern.pattern_description}</p>
                    </CardContent>
                  </Card>
                )}
                <Card className="bg-white/60">
                  <CardContent className="p-3 md:p-4">
                    <h4 className="font-medium text-slate-700 mb-2 text-sm">Goal Completion Rate</h4>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {goals.length > 0 ? Math.round((goals.filter(g => g.is_completed).length / goals.length) * 100) : 0}%
                    </p>
                    <p className="text-xs md:text-sm text-slate-500">{goals.filter(g => g.is_completed).length} of {goals.length} goals</p>
                  </CardContent>
                </Card>
                {streakRecord && (
                  <Card className="bg-white/60">
                    <CardContent className="p-3 md:p-4">
                      <h4 className="font-medium text-slate-700 mb-2 text-sm">Streak Record</h4>
                      <p className="text-lg md:text-2xl font-bold text-purple-600">{streakRecord.pattern_value}</p>
                      <p className="text-xs md:text-sm text-slate-500 line-clamp-2">{streakRecord.pattern_description}</p>
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
                    <h4 className="font-medium text-slate-700 mb-3">Upcoming Events</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-500">No upcoming events scheduled. Add events to see them here.</p>
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
      {/* Floating Add Button - Mobile Only */}
      <div className="fixed bottom-20 right-4 md:hidden z-40">
        <Button
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700 min-touch-target touch-manipulation"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default MonthView;
