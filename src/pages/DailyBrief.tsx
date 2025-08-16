
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Heart, Brain, Edit3, Pause, CheckCircle, User, MapPin, AlertTriangle, Target, TrendingUp, CalendarDays, Users, Star, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';
import MoodCheckPopup from '@/components/MoodCheckPopup';
import AddGoalModal from '@/components/AddGoalModal';

const DailyBrief = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, title: "Exercise 3x weekly", category: "health", progress: 70, targetDate: "2024-01-31" },
    { id: 2, title: "Weekly family time", category: "family", progress: 85, targetDate: "ongoing" }
  ]);
  const [activeFilter, setActiveFilter] = useState('all');

  const allTasks = [
    { id: 1, text: "Pick up Sarah from soccer practice", time: "3:30 PM", category: "childcare", completed: false, urgent: false },
    { id: 2, text: "Dad's blood pressure medication", time: "6:00 PM", category: "eldercare", completed: true, urgent: false },
    { id: 3, text: "Grocery shopping for dinner", time: "4:30 PM", category: "general", completed: false, urgent: false },
    { id: 4, text: "Emily's piano lesson", time: "4:00 PM", category: "childcare", completed: false, urgent: false },
    { id: 5, text: "Mom's doctor appointment", time: "2:00 PM", category: "eldercare", completed: false, urgent: false },
    { id: 6, text: "Team meeting", time: "10:00 AM", category: "work", completed: true, urgent: false },
    { id: 7, text: "Laundry and dishes", time: "7:00 PM", category: "household", completed: false, urgent: false },
    { id: 8, text: "Call mom about doctor's appointment", time: "10:00 AM", category: "eldercare", completed: false, urgent: true },
    { id: 9, text: "Submit project proposal", time: "End of day", category: "work", completed: false, urgent: false },
    { id: 10, text: "Pick up kids from school", time: "3:00 PM", category: "childcare", completed: false, urgent: false }
  ];

  const priorities = [
    { id: 1, text: "Call mom about doctor's appointment", time: "10:00 AM", urgent: true, type: "urgent" },
    { id: 2, text: "Submit project proposal", time: "End of day", urgent: false, type: "high" },
    { id: 3, text: "Pick up kids from school", time: "3:00 PM", urgent: false, type: "scheduled" }
  ];

  const upcomingEvents = [
    { day: "Wed", event: "Parent-teacher conference", priority: "high" },
    { day: "Thu", event: "Mom's grocery shopping", priority: "medium" },
    { day: "Fri", event: "Family movie night", priority: "low" },
    { day: "Sat", event: "Soccer tournament", priority: "high" }
  ];

  const celebrations = [
    "Completed all morning tasks on time",
    "Had a great call with mom yesterday",
    "Finished project proposal ahead of deadline"
  ];

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'childcare':
        return allTasks.filter(task => task.category === 'childcare').slice(0, 5);
      case 'eldercare':
        return allTasks.filter(task => task.category === 'eldercare').slice(0, 5);
      case 'household':
        return allTasks.filter(task => task.category === 'general').slice(0, 5);
      case 'work':
        return allTasks.filter(task => task.category === 'work').slice(0, 5);
      default:
        return allTasks.slice(0, 5);
    }
  };

  const topTasks = getFilteredTasks();
  const completedTasks = allTasks.filter(task => task.completed).length;
  const totalTasks = allTasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const handleAddGoal = (goal: any) => {
    setGoals(prev => [...prev, goal]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section with Progress moved to top */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-2">Daily Brief</h1>
              <p className="text-slate-600">Tuesday, July 1, 2025</p>
            </div>
            
            {/* Progress Section - Moved to top for better visibility */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{completionPercentage}%</div>
                <div className="text-sm text-slate-600">Tasks Complete</div>
              </div>
              <Button 
                onClick={() => setShowMoodPopup(true)}
                variant="outline" 
                className="flex items-center gap-2 border-orange-200 hover:bg-orange-50"
              >
                <Heart className="h-4 w-4 text-orange-500" />
                Check In
              </Button>
            </div>
          </div>

          {/* Celebrate Yourself Section */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Celebrate Yourself</h3>
              </div>
              <div className="space-y-2">
                {celebrations.map((celebration, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {celebration}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-600">{completedTasks}</span>
                </div>
                <p className="text-sm text-slate-600">Tasks Done</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</span>
                </div>
                <p className="text-sm text-slate-600">Pending</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <p className="text-sm text-slate-600">Connections</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-600">{goals.length}</span>
                </div>
                <p className="text-sm text-slate-600">Active Goals</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Priorities and Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Priorities and Upcoming Week - Visually Aligned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today's Priorities */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Today's Priorities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {priorities.map((priority) => (
                    <div key={priority.id} className={`p-3 rounded-lg border-l-4 ${
                      priority.type === 'urgent' ? 'bg-red-50 border-red-400' :
                      priority.type === 'high' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-blue-50 border-blue-400'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 text-sm">{priority.text}</p>
                          <p className="text-xs text-slate-600 mt-1">Due: {priority.time}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          priority.type === 'urgent' ? 'bg-red-100 text-red-700 border-red-200' :
                          priority.type === 'high' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-blue-100 text-blue-700 border-blue-200'
                        }`}>
                          {priority.type === 'urgent' ? 'Urgent' : priority.type === 'high' ? 'High' : 'Scheduled'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming This Week - Aligned with Priorities */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800">Upcoming This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        event.priority === 'high' ? 'bg-red-100' :
                        event.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <span className={`text-xs font-semibold ${
                          event.priority === 'high' ? 'text-red-700' :
                          event.priority === 'medium' ? 'text-yellow-700' : 'text-blue-700'
                        }`}>{event.day}</span>
                      </div>
                      <span className="text-sm text-slate-700 flex-1">{event.event}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Task Tabs */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <Target className="h-5 w-5 text-green-600" />
                  Tasks Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="childcare">👶 Kids</TabsTrigger>
                    <TabsTrigger value="eldercare">👴 Elder</TabsTrigger>
                    <TabsTrigger value="household">🏠 Home</TabsTrigger>
                    <TabsTrigger value="work">💼 Work</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeFilter} className="space-y-3">
                    {topTasks.map((task, index) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow group">
                        <div className="flex items-center gap-3 flex-1">
                          <input 
                            type="checkbox" 
                            checked={task.completed}
                            className="w-4 h-4 text-green-600 rounded"
                            readOnly
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {task.text}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-sm text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.time}
                              </p>
                              <Badge variant="outline" className={`text-xs ${
                                task.category === 'childcare' ? 'bg-green-50 text-green-700 border-green-200' : 
                                task.category === 'eldercare' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                                task.category === 'work' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                'bg-gray-50 text-gray-700 border-gray-200'
                              }`}>
                                {task.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {task.urgent && !task.completed && (
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs ml-2">
                            urgent
                          </Badge>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Goals and Social Connection */}
          <div className="space-y-6">
            {/* Social Connection */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <Users className="h-5 w-5 text-blue-600" />
                  Social Connection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white/60 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-1">Today's connections</p>
                  <p className="text-xs text-slate-600">Called mom, texted sister about weekend</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-1">Upcoming social time</p>
                  <p className="text-xs text-slate-600">Family movie night Friday</p>
                </div>
                <Button variant="outline" className="w-full text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Plan Connection Time
                </Button>
              </CardContent>
            </Card>

            {/* Goals Section */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <Target className="h-5 w-5 text-purple-600" />
                    Your Goals
                  </CardTitle>
                  <Button 
                    size="sm" 
                    onClick={() => setShowAddGoalModal(true)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 text-sm">{goal.title}</p>
                        <Badge variant="outline" className="text-xs mt-1 bg-purple-100 text-purple-700 border-purple-200">
                          {goal.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-1" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
              <Button variant="outline" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Day Complete
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mood Check Popup */}
      <MoodCheckPopup 
        selectedMood={selectedMood}
        onMoodSelect={setSelectedMood}
        isOpen={showMoodPopup}
        onOpenChange={setShowMoodPopup}
      />

      {/* Add Goal Modal */}
      <AddGoalModal 
        isOpen={showAddGoalModal}
        onOpenChange={setShowAddGoalModal}
        onAddGoal={handleAddGoal}
      />
      
      <FeatureFooter />
    </div>
  );
};

export default DailyBrief;
