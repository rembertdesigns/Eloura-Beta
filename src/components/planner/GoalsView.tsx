
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, Users, Share, Plus, Filter, Calendar, TrendingUp, 
  Award, BookOpen, FileText, CheckCircle, Clock, Star,
  BarChart3, Zap, Heart, Edit3, Archive, Settings
} from 'lucide-react';
import AddGoalModal from '@/components/AddGoalModal';

const GoalsView = () => {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('active');

  const goals = [
    {
      id: 1,
      title: 'Complete Q4 project',
      description: 'Finalize all deliverables for the quarterly project milestone',
      category: 'Career',
      progress: 75,
      due: 'Dec 31',
      status: 'active',
      color: 'bg-blue-100 text-blue-700',
      motivation: 'This will advance my career and help me reach senior level',
      milestones: ['Research phase', 'Design mockups', 'Development', 'Testing'],
      streak: 12,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Exercise 3x per week',
      description: 'Maintain consistent exercise routine for better health',
      category: 'Health',
      progress: 60,
      due: 'Ongoing',
      status: 'active',
      color: 'bg-pink-100 text-pink-700',
      motivation: 'Stay healthy for my family and feel more energetic',
      milestones: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      streak: 8,
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      title: 'Family game night weekly',
      description: 'Spend quality time with family through games',
      category: 'Family',
      progress: 90,
      due: 'Weekly',
      status: 'active',
      color: 'bg-purple-100 text-purple-700',
      motivation: 'Strengthen family bonds and create lasting memories',
      milestones: ['Choose games', 'Set schedule', 'Make it routine', 'Track enjoyment'],
      streak: 15,
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'Learn new skill',
      description: 'Complete online course in data analysis',
      category: 'Personal',
      progress: 30,
      due: 'Mar 31',
      status: 'active',
      color: 'bg-green-100 text-green-700',
      motivation: 'Expand my skillset and increase job opportunities',
      milestones: ['Course enrollment', 'Module 1-3', 'Project work', 'Final assessment'],
      streak: 5,
      lastUpdated: '1 week ago'
    }
  ];

  const completedGoals = [
    {
      id: 5,
      title: 'Read 12 books this year',
      category: 'Personal',
      progress: 100,
      completedDate: 'Nov 15, 2024',
      color: 'bg-emerald-100 text-emerald-700'
    }
  ];

  const filteredGoals = goals.filter(goal => {
    const categoryMatch = filterCategory === 'all' || goal.category.toLowerCase() === filterCategory;
    const statusMatch = filterStatus === 'all' || goal.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const categories = ['all', 'career', 'health', 'family', 'personal'];
  const statuses = ['all', 'active', 'on-hold', 'completed'];

  const handleAddGoal = (goalData: any) => {
    console.log('New goal:', goalData);
    // Here you would typically save to database
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Goals & Achievements</h2>
          <p className="text-sm text-slate-600">Track progress towards what matters most</p>
        </div>
        <Button 
          onClick={() => setIsAddGoalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filters:</span>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Goals Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="planning">Planning & Breakdown</TabsTrigger>
          <TabsTrigger value="reflection">Reflection & Review</TabsTrigger>
        </TabsList>

        {/* Active Goals Tab */}
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredGoals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">{goal.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{goal.description}</p>
                      <Badge className={`text-xs ${goal.color} mb-2`}>
                        {goal.category}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Streak & Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">{goal.streak} day streak</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-slate-600">{goal.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Why this matters:</p>
                        <p className="text-sm text-slate-600">{goal.motivation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Target className="h-3 w-3 mr-1" />
                      Update Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Completed Goals Section */}
          {completedGoals.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Award className="h-5 w-5" />
                  Recently Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedGoals.map(goal => (
                    <div key={goal.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-emerald-800">{goal.title}</p>
                          <p className="text-sm text-emerald-600">Completed on {goal.completedDate}</p>
                        </div>
                      </div>
                      <Badge className={goal.color}>
                        {goal.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Planning & Breakdown Tab */}
        <TabsContent value="planning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Goal Planning & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {filteredGoals.map(goal => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">{goal.title}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Milestones:</p>
                      <div className="space-y-2">
                        {goal.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className={`h-4 w-4 ${index < 2 ? 'text-green-500' : 'text-slate-300'}`} />
                            <span className={`text-sm ${index < 2 ? 'text-slate-700 line-through' : 'text-slate-600'}`}>
                              {milestone}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Milestone
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        Resources
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reflection & Review Tab */}
        <TabsContent value="reflection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Progress Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">Weekly Progress Trend</p>
                    <p className="text-xs text-purple-600 mt-1">+12% improvement this week</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Consistency Score</p>
                    <p className="text-xs text-blue-600 mt-1">85% - Great job staying on track!</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Completed This Month</p>
                    <p className="text-xs text-green-600 mt-1">3 goals, 12 milestones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Reflection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-orange-600" />
                  Weekly Reflection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    What helped your progress this week?
                  </label>
                  <Textarea 
                    placeholder="Reflect on what worked well..."
                    className="min-h-20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    What were the main blockers?
                  </label>
                  <Textarea 
                    placeholder="Identify challenges and obstacles..."
                    className="min-h-20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Strategies for next week:
                  </label>
                  <Textarea 
                    placeholder="Plan your approach for the coming week..."
                    className="min-h-20"
                  />
                </div>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Save Reflection
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Goal Archive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-slate-600" />
                Goal History & Archive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600">View your completed and archived goals</p>
                <Button variant="outline" size="sm">
                  <Archive className="h-3 w-3 mr-1" />
                  View Archive
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-green-700">12</h4>
                  <p className="text-sm text-green-600">Goals Completed</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-blue-700">89%</h4>
                  <p className="text-sm text-blue-600">Success Rate</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-purple-700">247</h4>
                  <p className="text-sm text-purple-600">Days Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddGoalModal 
        isOpen={isAddGoalOpen}
        onOpenChange={setIsAddGoalOpen}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
};

export default GoalsView;
