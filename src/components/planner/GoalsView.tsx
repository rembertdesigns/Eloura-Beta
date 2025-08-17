
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Target, Users, Share, Plus, Calendar, Paperclip, Star, 
  TrendingUp, MessageSquare, Award, Filter, Archive, 
  Clock, CheckCircle, AlertCircle, Heart, Flame, ChevronDown,
  Edit, Trash2, ExternalLink, FileText
} from 'lucide-react';

const GoalsView = () => {
  const [activeGoalTab, setActiveGoalTab] = useState('active');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const goalTemplates = [
    { name: 'Health & Fitness', icon: Heart, goals: ['Exercise 3x per week', 'Drink 8 glasses of water daily', 'Get 8 hours of sleep'] },
    { name: 'Career Growth', icon: TrendingUp, goals: ['Complete certification', 'Learn new skill', 'Network with 5 professionals'] },
    { name: 'Family Time', icon: Users, goals: ['Weekly family dinner', 'Read bedtime stories daily', 'Plan monthly family outing'] },
    { name: 'Personal Development', icon: Star, goals: ['Read 2 books per month', 'Practice meditation daily', 'Learn new language'] }
  ];

  const goals = [
    {
      id: 1,
      title: 'Complete Q4 project',
      category: 'Career',
      priority: 'High',
      progress: 75,
      due: '2024-12-31',
      status: 'active',
      color: 'bg-blue-100 text-blue-700',
      motivation: 'Advance my career and increase my expertise in project management',
      subtasks: [
        { id: 1, title: 'Research requirements', completed: true },
        { id: 2, title: 'Create project plan', completed: true },
        { id: 3, title: 'Execute phase 1', completed: true },
        { id: 4, title: 'Execute phase 2', completed: false }
      ],
      streak: 12,
      lastUpdate: '2024-01-15',
      accountability: ['John Doe', 'Sarah Smith'],
      resources: [
        { type: 'link', title: 'Project Guidelines', url: '#' },
        { type: 'note', title: 'Meeting Notes', content: 'Key decisions from stakeholder meeting' }
      ],
      reflections: [
        { date: '2024-01-10', entry: 'Made good progress on phase 1. Team collaboration is strong.' },
        { date: '2024-01-05', entry: 'Initial planning went smoothly. Clear requirements help.' }
      ]
    },
    {
      id: 2,
      title: 'Exercise 3x per week',
      category: 'Health',
      priority: 'Medium',
      progress: 60,
      due: 'Ongoing',
      status: 'active',
      color: 'bg-pink-100 text-pink-700',
      motivation: 'Improve my physical health and energy levels for my family',
      subtasks: [
        { id: 1, title: 'Join gym', completed: true },
        { id: 2, title: 'Create workout schedule', completed: true },
        { id: 3, title: 'Track weekly progress', completed: false }
      ],
      streak: 8,
      lastUpdate: '2024-01-14',
      accountability: ['Personal Trainer'],
      resources: [
        { type: 'link', title: 'Workout Plan', url: '#' },
        { type: 'note', title: 'Progress Log', content: 'Week 1-2: Focus on building routine' }
      ],
      reflections: [
        { date: '2024-01-12', entry: 'Consistency is improving. Morning workouts work better for me.' }
      ]
    },
    {
      id: 3,
      title: 'Family game night weekly',
      category: 'Family',
      priority: 'High',
      progress: 90,
      due: 'Weekly',
      status: 'active',
      color: 'bg-purple-100 text-purple-700',
      motivation: 'Strengthen family bonds and create lasting memories with children',
      subtasks: [
        { id: 1, title: 'Buy board games', completed: true },
        { id: 2, title: 'Set weekly schedule', completed: true },
        { id: 3, title: 'Involve kids in planning', completed: true }
      ],
      streak: 15,
      lastUpdate: '2024-01-13',
      accountability: ['Spouse', 'Kids'],
      resources: [
        { type: 'link', title: 'Game Ideas', url: '#' },
        { type: 'note', title: 'Family Favorites', content: 'Monopoly, Scrabble, Uno are top picks' }
      ],
      reflections: [
        { date: '2024-01-08', entry: 'Kids love choosing the games. Great bonding time.' }
      ]
    }
  ];

  const archivedGoals = [
    {
      id: 4,
      title: 'Learn photography basics',
      category: 'Personal',
      progress: 100,
      completedDate: '2024-01-01',
      color: 'bg-green-100 text-green-700'
    }
  ];

  const categories = ['all', 'Career', 'Health', 'Family', 'Personal'];
  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['active', 'on-hold', 'completed'];

  const filteredGoals = goals.filter(goal => {
    const categoryMatch = filterCategory === 'all' || goal.category === filterCategory;
    const statusMatch = activeGoalTab === 'active' ? goal.status === 'active' : 
                       activeGoalTab === 'archived' ? goal.status === 'completed' : true;
    return categoryMatch && statusMatch;
  });

  const sortedGoals = [...filteredGoals].sort((a, b) => {
    switch (sortBy) {
      case 'progress': return b.progress - a.progress;
      case 'due': 
        // Handle non-date values like "Ongoing" and "Weekly"
        const dateA = new Date(a.due).getTime();
        const dateB = new Date(b.due).getTime();
        // If date is invalid (NaN), put it at the end
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateA - dateB;
      case 'priority': 
        const priorityOrder: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default: return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Goal Management</h2>
          <p className="text-slate-600">Track, plan, and achieve your goals</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="due">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddGoal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      <Tabs value={activeGoalTab} onValueChange={setActiveGoalTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="planning">Goal Planning</TabsTrigger>
          <TabsTrigger value="reflection">Reflection</TabsTrigger>
          <TabsTrigger value="archived">Archive</TabsTrigger>
        </TabsList>

        {/* Active Goals Tab */}
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedGoals.map((goal) => (
              <Card key={goal.id} className="card-warm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{goal.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${goal.color}`}>
                          {goal.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {goal.priority} Priority
                        </Badge>
                        {goal.streak && (
                          <div className="flex items-center gap-1 text-xs text-orange-600">
                            <Flame className="h-3 w-3" />
                            {goal.streak} day streak
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-semibold">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  {/* Motivation */}
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-slate-700">Why this matters</span>
                    </div>
                    <p className="text-sm text-slate-600">{goal.motivation}</p>
                  </div>

                  {/* Subtasks */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Milestones</h4>
                    <div className="space-y-1">
                      {goal.subtasks.slice(0, 3).map((subtask) => (
                        <div key={subtask.id} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${subtask.completed ? 'text-green-500' : 'text-slate-300'}`} />
                          <span className={subtask.completed ? 'line-through text-slate-500' : 'text-slate-700'}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accountability */}
                  {goal.accountability.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">
                        Accountability: {goal.accountability.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Due Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-600">Due: {goal.due}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Update Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Goal Planning Tab */}
        <TabsContent value="planning" className="space-y-6">
          {/* Goal Templates */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Goal Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goalTemplates.map((template, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <template.icon className="h-5 w-5 text-slate-600" />
                      <h4 className="font-medium text-slate-700">{template.name}</h4>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {template.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-slate-400 rounded-full" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Goal Planning */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle>Plan Your Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Goal Title</label>
                  <Input placeholder="What do you want to achieve?" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Why is this important to you?</label>
                <Textarea placeholder="Your personal motivation for this goal..." />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Break it down into steps</label>
                <div className="space-y-2">
                  <Input placeholder="Step 1..." />
                  <Input placeholder="Step 2..." />
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Step
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Target Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reflection Tab */}
        <TabsContent value="reflection" className="space-y-6">
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Weekly Reflection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">What helped your progress this week?</label>
                <Textarea placeholder="Reflect on what worked well..." />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">What were the main blockers?</label>
                <Textarea placeholder="What challenges did you face..." />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Strategies for next week</label>
                <Textarea placeholder="How will you improve next week..." />
              </div>
              <Button>Save Reflection</Button>
            </CardContent>
          </Card>

          {/* Progress Analytics */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Progress Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">3</div>
                  <div className="text-sm text-green-600">Goals Completed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">15</div>
                  <div className="text-sm text-orange-600">Best Streak</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">75%</div>
                  <div className="text-sm text-purple-600">Avg Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Archive Tab */}
        <TabsContent value="archived" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {archivedGoals.map((goal) => (
              <Card key={goal.id} className="card-warm opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-700">{goal.title}</h3>
                      <Badge className={`text-xs ${goal.color} mt-1`}>
                        {goal.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <Button variant="ghost" size="sm">
                        <Archive className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Completed: {goal.completedDate}</span>
                      <Button variant="outline" size="sm">
                        Revisit Goal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalsView;
