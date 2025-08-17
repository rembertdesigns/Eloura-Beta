
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

const MonthView = () => {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [monthlyReflection, setMonthlyReflection] = useState('');

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const daysWithEvents = [5, 12, 18, 25]; // Days that have events
  const productiveDays = [3, 7, 9, 14, 16, 21, 23, 28]; // High productivity days
  const goalCompletionDays = [1, 8, 15, 22, 29]; // Days with goal completions

  const monthlyGoals = [
    { name: "Exercise 4x/week", progress: 70, category: "Health", status: "on-track" },
    { name: "Read 2 books", progress: 85, category: "Personal", status: "ahead" },
    { name: "Family dinner 5x/week", progress: 40, category: "Family", status: "behind" },
    { name: "Complete project milestone", progress: 100, category: "Work", status: "completed" }
  ];

  const monthlyMilestones = [
    { date: "July 5", title: "Completed Q2 project review", type: "work" },
    { date: "July 12", title: "10-week exercise streak milestone", type: "health" },
    { date: "July 18", title: "Emma's birthday celebration", type: "family" },
    { date: "July 25", title: "Finished reading 'Atomic Habits'", type: "personal" }
  ];

  const monthlyBadges = [
    { name: "Consistency Champion", description: "Logged in every day this month", icon: Star },
    { name: "Goal Crusher", description: "Completed 3 major goals", icon: Trophy },
    { name: "Family First", description: "Prioritized family time", icon: Award },
    { name: "Streak Keeper", description: "Maintained 4 habit streaks", icon: Flame }
  ];

  const timeAllocation = {
    work: { hours: 120, percentage: 60, color: "bg-blue-500" },
    family: { hours: 40, percentage: 20, color: "bg-green-500" },
    personal: { hours: 30, percentage: 15, color: "bg-purple-500" },
    health: { hours: 10, percentage: 5, color: "bg-orange-500" }
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
                <Card className="bg-white/60">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-700 mb-2">Peak Productivity</h4>
                    <p className="text-2xl font-bold text-green-600">Tuesday</p>
                    <p className="text-sm text-slate-500">85% task completion</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/60">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-700 mb-2">Goal Completion Rate</h4>
                    <p className="text-2xl font-bold text-blue-600">74%</p>
                    <p className="text-sm text-slate-500">3 of 4 monthly goals</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/60">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-700 mb-2">Streak Record</h4>
                    <p className="text-2xl font-bold text-purple-600">15 days</p>
                    <p className="text-sm text-slate-500">Exercise habit</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="text-slate-700">Monthly Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      <strong>Strong Performance:</strong> You completed 90% of work goals but only 40% of personal goals this month.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Pattern:</strong> Family activities have the highest satisfaction ratings (4.8/5 average).
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-700">
                      <strong>Opportunity:</strong> Consider shifting more personal goals to weekends when completion rates are higher.
                    </p>
                  </div>
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

                  <Button className="w-full">
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
