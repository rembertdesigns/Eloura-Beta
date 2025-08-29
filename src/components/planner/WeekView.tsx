
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Trophy, Award, Target, TrendingUp, Calendar, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';

const WeekView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const weekData = [
    {
      day: 'Mon',
      tasks: [
        { time: '9:00 AM', title: 'Team standup', category: 'Work', color: 'bg-blue-100 text-blue-700' },
        { time: '6:00 PM', title: 'Grocery shopping', category: 'Personal', color: 'bg-green-100 text-green-700' }
      ]
    },
    {
      day: 'Tue',
      tasks: [
        { time: '11:00 AM', title: "Mom's doctor visit", category: 'Family', color: 'bg-purple-100 text-purple-700' }
      ]
    },
    {
      day: 'Wed',
      tasks: [
        { time: '4:00 PM', title: 'Kids soccer practice', category: 'Parenting', color: 'bg-yellow-100 text-yellow-700' }
      ]
    },
    {
      day: 'Thu',
      tasks: [
        { time: '5:00 PM', title: 'Project deadline', category: 'Work', color: 'bg-blue-100 text-blue-700' }
      ]
    },
    {
      day: 'Fri',
      tasks: [
        { time: '5:30 PM', title: 'Family dinner prep', category: 'Personal', color: 'bg-green-100 text-green-700' }
      ]
    },
    {
      day: 'Sat',
      tasks: [
        { time: '10:00 AM', title: 'Weekend planning', category: 'Family', color: 'bg-purple-100 text-purple-700' }
      ]
    },
    {
      day: 'Sun',
      tasks: []
    }
  ];

  const weeklyHighlights = [
    { date: 'Mon 15', title: 'Completed project milestone', type: 'Work' },
    { date: 'Wed 17', title: 'Family movie night', type: 'Family' },
    { date: 'Fri 19', title: 'Morning run streak: 5 days', type: 'Personal' }
  ];

  const weeklyAchievements = [
    { icon: Trophy, name: 'Task Champion', description: '18 tasks completed this week' },
    { icon: Star, name: 'Early Bird', description: 'Started tasks on time 85% of week' },
    { icon: CheckCircle2, name: 'Balance Master', description: 'Equal time for work and family' }
  ];

  const weeklyGoals = [
    { title: 'Complete quarterly review', progress: 75, status: 'on-track', category: 'Work' },
    { title: 'Plan summer vacation', progress: 40, status: 'needs-attention', category: 'Family' },
    { title: 'Exercise 4 times', progress: 100, status: 'completed', category: 'Personal' }
  ];

  const timeAllocation = {
    work: { hours: 32, percentage: 48, color: "bg-blue-500" },
    family: { hours: 25, percentage: 37, color: "bg-purple-500" },
    personal: { hours: 10, percentage: 15, color: "bg-green-500" }
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
                <Card className="bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-700">Peak Productivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-green-800">Tuesday mornings</p>
                    <p className="text-xs text-green-600">90% task completion rate</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-blue-700">Best Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-blue-800">Personal Tasks</p>
                    <p className="text-xs text-blue-600">85% weekly completion</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-purple-700">Streak Record</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-purple-800">5 days</p>
                    <p className="text-xs text-purple-600">Morning routine completion</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Weekly Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-white/80 rounded-lg">
                    <p className="text-sm text-gray-700">You're most productive on Tuesday and Wednesday mornings</p>
                    <p className="text-xs text-gray-500 mt-1">Consider scheduling important tasks during these times</p>
                  </div>
                  <div className="p-3 bg-white/80 rounded-lg">
                    <p className="text-sm text-gray-700">Friday evenings show lower completion rates</p>
                    <p className="text-xs text-gray-500 mt-1">Try moving non-urgent tasks to earlier in the week</p>
                  </div>
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
                    />
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/60">
                <CardHeader>
                  <CardTitle className="text-gray-700">Upcoming Week Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white/80 rounded">
                      <span className="text-xs text-gray-500 min-w-[60px]">Mon 22</span>
                      <span className="text-sm text-gray-700">Team meeting & project kickoff</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white/80 rounded">
                      <span className="text-xs text-gray-500 min-w-[60px]">Wed 24</span>
                      <span className="text-sm text-gray-700">Parent-teacher conference</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white/80 rounded">
                      <span className="text-xs text-gray-500 min-w-[60px]">Sat 27</span>
                      <span className="text-sm text-gray-700">Family weekend trip</span>
                    </div>
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
