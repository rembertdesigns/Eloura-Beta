import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Users, 
  Lightbulb, 
  Heart, 
  Plus, 
  Bell, 
  FileText, 
  BarChart3, 
  Home,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GripVertical,
  Filter
} from 'lucide-react';
import FirstTimeDashboard from './FirstTimeDashboard';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

const Dashboard = () => {
  const [taskFilter, setTaskFilter] = useState('all');
  const { isOnboardingComplete, isTourComplete, loading } = useOnboardingStatus();

  // Show loading while checking status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // If onboarding not complete, redirect to onboarding (handled by app routing)
  // If onboarding complete but tour not complete, show first-time experience
  if (isOnboardingComplete && !isTourComplete) {
    return <FirstTimeDashboard />;
  }
  
  const mustDoTasks = [
    { id: 1, text: "Pick up kids from school", urgent: true, completed: false, assignedTo: "me" },
    { id: 2, text: "Call mom about doctor's appointment", urgent: true, completed: false, assignedTo: "me" },
    { id: 3, text: "Submit project proposal", urgent: false, completed: true, assignedTo: "me" },
    { id: 4, text: "Grocery shopping", urgent: false, completed: false, assignedTo: "partner" },
    { id: 5, text: "Schedule parent-teacher conference", urgent: false, completed: false, assignedTo: "me" }
  ];

  const todaysSchedule = [
    { time: "9:00 AM", event: "Team meeting", category: "work", color: "bg-blue-100 text-blue-700" },
    { time: "11:30 AM", event: "Doctor visit with mom", category: "family", color: "bg-green-100 text-green-700" },
    { time: "2:00 PM", event: "Kids pickup", category: "parenting", color: "bg-purple-100 text-purple-700" },
    { time: "4:00 PM", event: "Soccer practice", category: "parenting", color: "bg-purple-100 text-purple-700" },
    { time: "6:00 PM", event: "Family dinner", category: "family", color: "bg-green-100 text-green-700" }
  ];

  const taskCategories = [
    {
      title: "Caretaking",
      tasks: ["Mom's medication reminder", "Dad's physical therapy", "Kids' lunch prep"],
      color: "border-red-200 bg-red-50",
      assignedTo: "me"
    },
    {
      title: "Family & Parenting", 
      tasks: ["Soccer practice pickup", "Homework help", "Bedtime routine"],
      color: "border-green-200 bg-green-50",
      assignedTo: "me"
    },
    {
      title: "Essential Daily",
      tasks: ["Meal planning", "Laundry", "Groceries"],
      color: "border-purple-200 bg-purple-50",
      assignedTo: "partner"
    }
  ];

  const filteredTasks = taskCategories.filter(category => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'my-tasks') return category.assignedTo === 'me';
    if (taskFilter === 'others-tasks') return category.assignedTo !== 'me';
    return true;
  });

  const villageMembers = [
    { name: "Mom", status: "Available today", role: "Helper", initial: "M" },
    { name: "Sarah (neighbor)", status: "Carpool buddy", role: "Active", initial: "S" }
  ];

  const activeDelegations = [
    { task: "Grocery shopping", delegatedTo: "Partner", due: "Today 3 PM", status: "pending" },
    { task: "Laundry pickup", delegatedTo: "Mom", due: "Completed ✓", status: "completed" }
  ];

  const careCircle = [
    { item: "Mom's doctor visit", time: "Today 11:30 AM", status: "Needs attention", urgent: true },
    { item: "Dad's medication", time: "Refill due Tomorrow", status: "On track", urgent: false }
  ];

  const pendingCount = mustDoTasks.filter(task => !task.completed).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Good Morning, Linda</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-slate-600">Today's Balance:</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              1/5 - Take it easy
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Heart className="h-5 w-5" />
          <span className="text-sm font-medium">You're doing amazing!</span>
        </div>
      </div>

      {/* Daily Tip */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-1">💡 Tip</h3>
              <p className="text-sm text-slate-600">
                You have 2 urgent tasks today. Consider delegating grocery shopping to free up time for the important calls. 
                Remember to take a 10-minute break after your team meeting! 💙
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Plus className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-slate-800">Quick Add</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Task
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Event
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Delegate
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Reminder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid - Reorderable Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Must-Do Today */}
        <Card className="group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-slate-400 group-hover:text-slate-600 cursor-move" />
                <CardTitle className="text-lg font-medium text-slate-800">
                  <span className="text-blue-600 font-bold">1.</span> Must-Do Today
                </CardTitle>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {pendingCount} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {mustDoTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                <Checkbox 
                  checked={task.completed}
                  className={task.completed ? "data-[state=checked]:bg-green-500" : ""}
                />
                <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.text}
                </span>
                {task.urgent && !task.completed && (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                    urgent
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-slate-400 group-hover:text-slate-600 cursor-move" />
              <CardTitle className="text-lg font-medium text-slate-800">
                <span className="text-blue-600 font-bold">2.</span> Today's Schedule
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysSchedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-sm font-medium text-blue-600 w-16">
                  {item.time}
                </div>
                <div className="flex-1 text-sm text-slate-700">
                  {item.event}
                </div>
                <Badge className={`text-xs ${item.color} border-0`}>
                  {item.category}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-slate-800">
              <span className="text-blue-600 font-bold">3.</span> Tasks
            </CardTitle>
            <div className="flex items-center gap-2">
              {/* Task Filter Toggles */}
              <div className="flex bg-slate-100 rounded-lg p-1">
                <Button 
                  variant={taskFilter === 'all' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTaskFilter('all')}
                  className="text-xs px-3 py-1"
                >
                  All
                </Button>
                <Button 
                  variant={taskFilter === 'my-tasks' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTaskFilter('my-tasks')}
                  className="text-xs px-3 py-1"
                >
                  My Tasks
                </Button>
                <Button 
                  variant={taskFilter === 'others-tasks' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTaskFilter('others-tasks')}
                  className="text-xs px-3 py-1"
                >
                  Others' Tasks
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTasks.map((category, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${category.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-800">{category.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {category.assignedTo === 'me' ? 'Mine' : 'Delegated'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {category.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="text-sm text-slate-600 p-2 bg-white rounded">
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
