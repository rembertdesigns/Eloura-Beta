import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import DayDetailModal from './DayDetailModal';
import { 
  Trophy, 
  Award, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Plus, 
  AlarmClock,
  PieChart,
  BarChart3,
  BookOpen,
  Edit3,
  Flame
} from 'lucide-react';

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
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [weeklyReflection, setWeeklyReflection] = useState('');
  const [weeklyPlanning, setWeeklyPlanning] = useState('');
  const [weeklyChallenges, setWeeklyChallenges] = useState('');
  const [selectedDay, setSelectedDay] = useState<{
    dayName: string;
    date: Date;
    tasks: any[];
    reminders: any[];
  } | null>(null);
  
  const isMobile = useIsMobile();

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
  const weeklyMilestones = milestones.map(milestone => ({
    date: new Date(milestone.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
    title: milestone.title,
    type: milestone.milestone_type
  }));

  const weeklyBadges = achievements.slice(0, 4).map(achievement => ({
    name: achievement.achievement_name,
    description: achievement.description,
    icon: Star
  }));

  const weeklyGoals = goals.map(goal => ({
    name: goal.title,
    progress: goal.progress,
    category: goal.category,
    status: goal.is_completed ? 'completed' : goal.progress > 70 ? 'ahead' : goal.progress < 30 ? 'behind' : 'on-track'
  }));

  const productivityPattern = patterns.find(p => p.pattern_type === 'productivity_peak');
  const bestCategory = patterns.find(p => p.pattern_type === 'best_category');
  const streakRecord = patterns.find(p => p.pattern_type === 'streak_record');

  const handleSaveReflection = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    onSaveReflection('weekly', {
      periodStart: startOfWeek.toISOString().split('T')[0],
      periodEnd: endOfWeek.toISOString().split('T')[0],
      wentWell: weeklyReflection,
      challenges: weeklyChallenges,
      nextPlans: weeklyPlanning
    });
    
    setWeeklyReflection('');
    setWeeklyChallenges('');
    setWeeklyPlanning('');
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
          {isMobile ? (
            // Mobile: Simplified horizontal layout with day numbers and task counts
            <div className="grid grid-cols-7 gap-0.5 px-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const dayData = weekData.find(d => d.day === day) || { day, tasks: [], reminders: [] };
                const isToday = weekDates[index].toDateString() === new Date().toDateString();
                const totalItems = dayData.tasks.length + (dayData.reminders?.length || 0);
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay({
                      dayName: day,
                      date: weekDates[index],
                      tasks: dayData.tasks,
                      reminders: dayData.reminders || []
                    })}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    } min-h-[70px] touch-manipulation`}
                  >
                    <div className="text-center">
                      <div className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                        {weekDates[index].getDate()}
                      </div>
                      {totalItems > 0 && (
                        <div className={`text-xs mt-1 px-1.5 py-0.5 rounded-full ${
                          isToday ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {totalItems}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // Desktop/Tablet: Full detailed grid layout
            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const dayData = weekData.find(d => d.day === day) || { day, tasks: [], reminders: [] };
                const isToday = weekDates[index].toDateString() === new Date().toDateString();
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay({
                      dayName: day,
                      date: weekDates[index],
                      tasks: dayData.tasks,
                      reminders: dayData.reminders || []
                    })}
                    className={`p-2 md:p-3 rounded-lg border-2 text-left transition-all hover:border-gray-400 ${
                      isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
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
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Insights Tabs - Mobile Optimized */}
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
              {/* Weekly Highlights */}
              <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2">
                <Card className="bg-white/60">
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                      <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
                      This Week's Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {weeklyMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/80 rounded-lg">
                        <div className="text-xs md:text-sm text-slate-500 font-medium min-w-[40px] md:min-w-[60px]">
                          {milestone.date}
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

                {/* Weekly Achievements */}
                <Card className="bg-white/60">
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                      <Award className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      Weekly Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {weeklyBadges.map((badge, index) => (
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
                    Weekly Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-4">
                  {Object.entries(timeAllocation).map(([category, data]: [string, any]) => (
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
                {weeklyGoals.map((goal, index) => (
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
                  <CardTitle className="text-slate-700">Weekly Insights</CardTitle>
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
                        <strong>Streak Achievement:</strong> {streakRecord.pattern_description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reflection" className="space-y-2 md:space-y-4">
              <Card className="bg-white/60">
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                    <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                    Weekly Reflection & Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div>
                    <label className="text-sm md:text-base font-medium text-slate-700 block mb-2">
                      What went well?
                    </label>
                    <Textarea
                      value={weeklyReflection}
                      onChange={(e) => setWeeklyReflection(e.target.value)}
                      placeholder="Reflect on your successes this week..."
                      className="min-h-[80px] md:min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm md:text-base font-medium text-slate-700 block mb-2">
                      What was challenging?
                    </label>
                    <Textarea
                      value={weeklyChallenges}
                      onChange={(e) => setWeeklyChallenges(e.target.value)}
                      placeholder="Note the obstacles you faced..."
                      className="min-h-[80px] md:min-h-[100px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm md:text-base font-medium text-slate-700 block mb-2">
                      Plans for next week
                    </label>
                    <Textarea
                      value={weeklyPlanning}
                      onChange={(e) => setWeeklyPlanning(e.target.value)}
                      placeholder="Set intentions for next week..."
                      className="min-h-[80px] md:min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm md:text-base font-medium text-slate-700 mb-2">Upcoming Events</h4>
                    <div className="text-xs md:text-sm text-slate-500 p-3 bg-slate-50 rounded-lg border">
                      No upcoming events scheduled. Add events to see them here.
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSaveReflection}
                    className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white min-h-[44px] touch-manipulation"
                    disabled={!weeklyReflection.trim() && !weeklyChallenges.trim() && !weeklyPlanning.trim()}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Save Weekly Reflection
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Day Detail Modal */}
      <DayDetailModal
        isOpen={!!selectedDay}
        onOpenChange={(open) => !open && setSelectedDay(null)}
        dayName={selectedDay?.dayName || ''}
        date={selectedDay?.date || new Date()}
        tasks={selectedDay?.tasks || []}
        reminders={selectedDay?.reminders || []}
        toggleReminderCompletion={toggleReminderCompletion}
      />
    </div>
  );
};

export default WeekView;