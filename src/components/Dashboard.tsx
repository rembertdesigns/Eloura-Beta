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
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import QuickAddTaskModal from './QuickAddTaskModal';
import AddEventModal from './AddEventModal';
import AddReminderModal from './AddReminderModal';
import { format } from 'date-fns';

const Dashboard = () => {
  const [taskFilter, setTaskFilter] = useState('all');
  const [quickAddModal, setQuickAddModal] = useState<'task' | 'event' | 'reminder' | null>(null);
  const { isOnboardingComplete, isTourComplete, loading } = useOnboardingStatus();
  const { user } = useAuth();
  const { getFirstName } = useUserProfile();
  const {
    tasks,
    events,
    loading: dataLoading,
    addTask,
    addEvent,
    addReminder,
    toggleTaskCompletion,
    getRandomTip,
  } = useDashboardData();

  // Show loading while checking status
  if (loading || dataLoading) {
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

  // Filter tasks for display
  const mustDoTasks = tasks.filter(task => task.is_urgent || task.priority === 'high');
  const pendingCount = mustDoTasks.filter(task => !task.completed).length;
  
  // Get today's events formatted for display
  const todaysSchedule = events.map(event => ({
    time: format(new Date(event.start_time), 'h:mm a'),
    event: event.title,
    category: event.category || 'event',
    color: getCategoryColor(event.category),
    location: event.location,
  }));

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    const category = task.category || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const taskCategories = Object.entries(tasksByCategory).map(([category, categoryTasks]) => ({
    title: getCategoryTitle(category),
    tasks: categoryTasks,
    color: getCategoryBorderColor(category),
    assignedTo: 'me', // For now, all tasks are assigned to current user
  }));

  const filteredTaskCategories = taskCategories.filter(category => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'my-tasks') return category.assignedTo === 'me';
    if (taskFilter === 'others-tasks') return category.assignedTo !== 'me';
    return true;
  });

  // Get personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = getFirstName();
    if (hour < 12) return `Good Morning, ${name}`;
    if (hour < 17) return `Good Afternoon, ${name}`;
    return `Good Evening, ${name}`;
  };

  // Get random tip
  const currentTip = getRandomTip();

  // Helper functions
  function getCategoryColor(category?: string) {
    const colors = {
      work: 'bg-blue-100 text-blue-700',
      family: 'bg-green-100 text-green-700',
      parenting: 'bg-purple-100 text-purple-700',
      personal: 'bg-orange-100 text-orange-700',
      health: 'bg-pink-100 text-pink-700',
      default: 'bg-slate-100 text-slate-700',
    };
    return colors[category as keyof typeof colors] || colors.default;
  }

  function getCategoryTitle(category: string) {
    const titles = {
      caretaking: 'Caretaking',
      parenting: 'Family & Parenting',
      daily: 'Essential Daily',
      work: 'Work',
      personal: 'Personal',
      health: 'Health',
      uncategorized: 'Other Tasks',
    };
    return titles[category as keyof typeof titles] || category;
  }

  function getCategoryBorderColor(category: string) {
    const colors = {
      caretaking: 'border-red-200 bg-red-50',
      parenting: 'border-green-200 bg-green-50',
      daily: 'border-purple-200 bg-purple-50',
      work: 'border-blue-200 bg-blue-50',
      personal: 'border-orange-200 bg-orange-50',
      health: 'border-pink-200 bg-pink-50',
      uncategorized: 'border-slate-200 bg-slate-50',
    };
    return colors[category as keyof typeof colors] || colors.uncategorized;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-800">{getGreeting()}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-slate-600">Today's Balance:</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {pendingCount}/10 - {pendingCount <= 3 ? 'Take it easy' : pendingCount <= 6 ? 'Balanced day' : 'Busy day ahead'}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Heart className="h-5 w-5" />
          <span className="text-sm font-medium">You're doing amazing!</span>
        </div>
      </div>

      {/* Daily Tip */}
      {currentTip && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <Lightbulb className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">💡 Tip</h3>
                <p className="text-sm text-slate-600">
                  {currentTip.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Add */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Plus className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-slate-800">Quick Add</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => setQuickAddModal('task')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Task
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => setQuickAddModal('event')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Event
            </Button>
            <Button variant="outline" size="sm" className="justify-start" disabled>
              <Users className="h-4 w-4 mr-2" />
              Delegate
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => setQuickAddModal('reminder')}
            >
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
            {mustDoTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm">No urgent tasks today! 🎉</p>
                <p className="text-xs mt-1">Take it easy or get ahead on other tasks.</p>
              </div>
            ) : (
              mustDoTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={(checked) => toggleTaskCompletion(task.id, !!checked)}
                    className={task.completed ? "data-[state=checked]:bg-green-500" : ""}
                  />
                  <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.title}
                  </span>
                  {task.is_urgent && !task.completed && (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                      urgent
                    </Badge>
                  )}
                </div>
              ))
            )}
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
            {todaysSchedule.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">No events scheduled for today</p>
                <p className="text-xs mt-1">Perfect time to plan ahead or take it easy!</p>
              </div>
            ) : (
              todaysSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -m-2">
                  <div className="text-sm font-medium text-blue-600 w-16">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-700">{item.event}</div>
                    {item.location && (
                      <div className="text-xs text-slate-500 mt-1">{item.location}</div>
                    )}
                  </div>
                  <Badge className={`text-xs ${item.color} border-0`}>
                    {item.category}
                  </Badge>
                </div>
              ))
            )}
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
          {filteredTaskCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg mb-2">No tasks yet</p>
              <p className="text-sm mb-4">Get started by adding your first task above!</p>
              <Button onClick={() => setQuickAddModal('task')} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Task
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredTaskCategories.map((category, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${category.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-800">{category.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {category.assignedTo === 'me' ? 'Mine' : 'Delegated'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {category.tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-2 p-2 bg-white rounded">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={(checked) => toggleTaskCompletion(task.id, !!checked)}
                          className="h-4 w-4"
                        />
                        <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                          {task.title}
                        </span>
                        {task.is_urgent && !task.completed && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <QuickAddTaskModal
        isOpen={quickAddModal === 'task'}
        onOpenChange={(open) => !open && setQuickAddModal(null)}
        onAddTask={addTask}
      />
      <AddEventModal
        isOpen={quickAddModal === 'event'}
        onOpenChange={(open) => !open && setQuickAddModal(null)}
        onAddEvent={addEvent}
      />
      <AddReminderModal
        isOpen={quickAddModal === 'reminder'}
        onOpenChange={(open) => !open && setQuickAddModal(null)}
        onAddReminder={addReminder}
      />
    </div>
  );
};

export default Dashboard;
