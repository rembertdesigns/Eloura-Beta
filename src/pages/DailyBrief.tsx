
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, Heart, Brain, Edit3, Pause, CheckCircle, User, MapPin, AlertTriangle, Target, TrendingUp, CalendarDays, Users, Star, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';
import MoodCheckPopup from '@/components/MoodCheckPopup';
import AddGoalModal from '@/components/AddGoalModal';
import QuickAddTask from '@/components/QuickAddTask';

const DailyBrief = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, title: "Exercise 3x weekly", category: "health", progress: 70, targetDate: "2024-01-31" },
    { id: 2, title: "Weekly family time", category: "family", progress: 85, targetDate: "ongoing" }
  ]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [tasks, setTasks] = useState([
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
  ]);

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

  const motivationalQuotes = [
    "Every small step counts toward your bigger goals.",
    "You're handling more than you know. Give yourself credit.",
    "Progress, not perfection.",
    "Your care makes a difference in so many lives."
  ];

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'childcare':
        return tasks.filter(task => task.category === 'childcare');
      case 'eldercare':
        return tasks.filter(task => task.category === 'eldercare');
      case 'household':
        return tasks.filter(task => task.category === 'household');
      case 'work':
        return tasks.filter(task => task.category === 'work');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  const connectionsCount = 4; // Mock data
  const activeGoalsCount = goals.length;

  const handleAddGoal = (goal: any) => {
    setGoals(prev => [...prev, goal]);
    toast({ title: "Goal added successfully!" });
  };

  const handleAddTask = (task: any) => {
    setTasks(prev => [...prev, task]);
    toast({ title: "Task added successfully!" });
  };

  const handleTaskToggle = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleStatusCardClick = (filter: string) => {
    setActiveFilter(filter);
    toast({ title: `Filtered to show ${filter === 'completed' ? 'completed tasks' : filter === 'pending' ? 'pending tasks' : filter}` });
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('text/plain', taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedTaskId = parseInt(e.dataTransfer.getData('text/plain'));
    const draggedTaskIndex = tasks.findIndex(task => task.id === draggedTaskId);
    
    if (draggedTaskIndex !== -1) {
      const newTasks = [...tasks];
      const [draggedTask] = newTasks.splice(draggedTaskIndex, 1);
      newTasks.splice(targetIndex, 0, draggedTask);
      setTasks(newTasks);
      toast({ title: "Task reordered!" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 1. Top Section (Header) */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-2">Daily Brief</h1>
              <p className="text-slate-600 mb-2">Tuesday, July 1, 2025</p>
              <p className="text-sm text-slate-500 italic">
                {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{completionPercentage}%</div>
                <div className="text-sm text-slate-600">Complete</div>
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
        </div>

        {/* 2. Celebrate Yourself (High Visibility) */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Star className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Celebrate Yourself</h3>
            </div>
            <div className="grid gap-2">
              {celebrations.map((celebration, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-green-700">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span>{celebration}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. Summary Status Bar (Clickable Filters) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activeFilter === 'completed' ? 'ring-2 ring-blue-500 bg-blue-100' : 'bg-blue-50'} border-blue-200`}
            onClick={() => handleStatusCardClick('completed')}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-blue-600">{completedTasks}</span>
              </div>
              <p className="text-sm text-slate-600">Tasks Done</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activeFilter === 'pending' ? 'ring-2 ring-orange-500 bg-orange-100' : 'bg-orange-50'} border-orange-200`}
            onClick={() => handleStatusCardClick('pending')}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-2xl font-bold text-orange-600">{pendingTasks}</span>
              </div>
              <p className="text-sm text-slate-600">Pending</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activeFilter === 'connections' ? 'ring-2 ring-green-500 bg-green-100' : 'bg-green-50'} border-green-200`}
            onClick={() => handleStatusCardClick('connections')}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-green-600">{connectionsCount}</span>
              </div>
              <p className="text-sm text-slate-600">Connections</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activeFilter === 'goals' ? 'ring-2 ring-purple-500 bg-purple-100' : 'bg-purple-50'} border-purple-200`}
            onClick={() => handleStatusCardClick('goals')}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-purple-600">{activeGoalsCount}</span>
              </div>
              <p className="text-sm text-slate-600">Active Goals</p>
            </CardContent>
          </Card>
        </div>

        {/* 4. Main Content (3-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Priorities & Upcoming (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
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

            {/* Upcoming This Week */}
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

          {/* Center Column - Task Overview (6 columns) */}
          <div className="lg:col-span-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <Target className="h-5 w-5 text-green-600" />
                    Task Overview
                  </CardTitle>
                  <Button 
                    size="sm" 
                    onClick={() => setShowQuickAddTask(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Quick Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredTasks.map((task, index) => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow group cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          onChange={() => handleTaskToggle(task.id)}
                          className="w-4 h-4 text-green-600 rounded cursor-pointer"
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
                              task.category === 'household' ? 'bg-blue-50 text-blue-700 border-blue-200' :
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
                  {filteredTasks.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <p>No tasks found for the selected filter.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Social Connection & Goals (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Social Connection - Moved up for importance */}
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

            {/* Your Goals */}
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
                  <div key={goal.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
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
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5. Footer Section */}
        <div className="mt-12 mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white min-h-[44px] px-6">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
          <Button variant="outline" className="min-h-[44px] px-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Day Complete
          </Button>
        </div>
      </div>
      
      {/* Modals */}
      <MoodCheckPopup 
        selectedMood={selectedMood}
        onMoodSelect={setSelectedMood}
        isOpen={showMoodPopup}
        onOpenChange={setShowMoodPopup}
      />

      <AddGoalModal 
        isOpen={showAddGoalModal}
        onOpenChange={setShowAddGoalModal}
        onAddGoal={handleAddGoal}
      />

      <QuickAddTask 
        isOpen={showQuickAddTask}
        onOpenChange={setShowQuickAddTask}
        onAddTask={handleAddTask}
      />
      
      <FeatureFooter />
    </div>
  );
};

export default DailyBrief;
