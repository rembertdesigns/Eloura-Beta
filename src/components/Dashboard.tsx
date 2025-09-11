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
      work: 'bg-primary/10 text-primary',
      family: 'bg-secondary/10 text-secondary-foreground',
      parenting: 'bg-accent/10 text-accent-foreground',
      personal: 'bg-muted text-muted-foreground',
      health: 'bg-destructive/10 text-destructive',
      default: 'bg-muted/50 text-muted-foreground',
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
      caretaking: 'border-destructive/20 bg-destructive/5',
      parenting: 'border-primary/20 bg-primary/5',
      daily: 'border-accent/20 bg-accent/5',
      work: 'border-primary/20 bg-primary/5',
      personal: 'border-secondary/20 bg-secondary/5',
      health: 'border-destructive/20 bg-destructive/5',
      uncategorized: 'border-muted bg-muted/5',
    };
    return colors[category as keyof typeof colors] || colors.uncategorized;
  }

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 pb-safe">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-3xl font-light text-foreground truncate">{getGreeting()}</h1>
          <div className="flex items-center gap-2 md:gap-4 mt-2 flex-wrap">
            <span className="text-muted-foreground text-sm md:text-base">Today's Balance:</span>
            <Badge variant="outline" className="bg-accent text-accent-foreground border-border text-xs md:text-sm">
              {pendingCount}/10 - {pendingCount <= 3 ? 'Take it easy' : pendingCount <= 6 ? 'Balanced day' : 'Busy day ahead'}
            </Badge>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-primary">
          <Heart className="h-5 w-5" />
          <span className="text-sm font-medium">You're doing amazing!</span>
        </div>
      </div>

      {/* Daily Tip */}
      {currentTip && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <Lightbulb className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-card-foreground mb-1 text-sm md:text-base">💡 Tip</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {currentTip.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Add - Mobile Optimized */}
      <Card className="md:block hidden">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-2 mb-3">
            <Plus className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <h3 className="font-medium text-card-foreground text-sm md:text-base">Quick Add</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start min-touch-target touch-manipulation"
              onClick={() => setQuickAddModal('task')}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">Task</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start min-touch-target touch-manipulation"
              onClick={() => setQuickAddModal('event')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">Event</span>
            </Button>
            <Button variant="outline" size="sm" className="justify-start min-touch-target touch-manipulation" disabled>
              <Users className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">Delegate</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start min-touch-target touch-manipulation"
              onClick={() => setQuickAddModal('reminder')}
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">Reminder</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Quick Add Bar */}
      <Card className="md:hidden block sticky top-3 z-10 shadow-lg">
        <CardContent className="p-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Plus className="h-4 w-4 text-primary" />
              <span className="font-medium text-card-foreground text-sm">Quick Add</span>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="min-touch-target touch-manipulation px-2"
                onClick={() => setQuickAddModal('task')}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="min-touch-target touch-manipulation px-2"
                onClick={() => setQuickAddModal('event')}
              >
                <Calendar className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="min-touch-target touch-manipulation px-2"
                onClick={() => setQuickAddModal('reminder')}
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid - Responsive Cards */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
        {/* Must-Do Today */}
        <Card className="group">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-foreground cursor-move hidden md:block" />
                <CardTitle className="text-base md:text-lg font-medium text-card-foreground truncate">
                  <span className="text-primary font-bold">1.</span> Must-Do Today
                </CardTitle>
              </div>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                {pendingCount} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {mustDoTasks.length === 0 ? (
              <div className="text-center py-4 md:py-8 text-muted-foreground">
                <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs md:text-sm">No urgent tasks today! 🎉</p>
                <p className="text-xs mt-1 hidden md:block">Take it easy or get ahead on other tasks.</p>
              </div>
            ) : (
              mustDoTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent min-touch-target">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={(checked) => toggleTaskCompletion(task.id, !!checked)}
                    className={`min-touch-target ${task.completed ? "data-[state=checked]:bg-primary" : ""}`}
                  />
                  <span className={`flex-1 text-xs md:text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                    {task.title}
                  </span>
                  {task.is_urgent && !task.completed && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
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
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center gap-2 min-w-0">
              <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-foreground cursor-move hidden md:block" />
              <CardTitle className="text-base md:text-lg font-medium text-card-foreground truncate">
                <span className="text-primary font-bold">2.</span> Today's Schedule
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            {todaysSchedule.length === 0 ? (
              <div className="text-center py-4 md:py-8 text-muted-foreground">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2" />
                <p className="text-xs md:text-sm">No events scheduled for today</p>
                <p className="text-xs mt-1 hidden md:block">Perfect time to plan ahead or take it easy!</p>
              </div>
            ) : (
              todaysSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-4 cursor-pointer hover:bg-accent p-2 rounded-lg -m-2 min-touch-target">
                  <div className="text-xs md:text-sm font-medium text-primary w-12 md:w-16 flex-shrink-0">
                    {item.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm text-card-foreground truncate">{item.event}</div>
                    {item.location && (
                      <div className="text-xs text-muted-foreground mt-1 truncate">{item.location}</div>
                    )}
                  </div>
                  <Badge className={`text-xs ${item.color} border-0 hidden md:inline-flex`}>
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
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-2">
            <CardTitle className="text-base md:text-lg font-medium text-card-foreground">
              <span className="text-primary font-bold">3.</span> Tasks
            </CardTitle>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              {/* Task Filter Toggles */}
              <div className="flex bg-muted rounded-lg p-1">
                <Button 
                  variant={taskFilter === 'all' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTaskFilter('all')}
                  className="text-xs px-2 md:px-3 py-1 min-touch-target touch-manipulation"
                >
                  All
                </Button>
                <Button 
                  variant={taskFilter === 'my-tasks' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTaskFilter('my-tasks')}
                  className="text-xs px-2 md:px-3 py-1 min-touch-target touch-manipulation"
                >
                  My Tasks
                </Button>
                <Button 
                  variant={taskFilter === 'others-tasks' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTaskFilter('others-tasks')}
                  className="text-xs px-2 md:px-3 py-1 min-touch-target touch-manipulation"
                >
                  Others' Tasks
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hidden md:flex">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTaskCategories.length === 0 ? (
            <div className="text-center py-6 md:py-12 text-muted-foreground">
              <FileText className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4" />
              <p className="text-sm md:text-lg mb-2">No tasks yet</p>
              <p className="text-xs md:text-sm mb-4">Get started by adding your first task!</p>
              <Button 
                onClick={() => setQuickAddModal('task')} 
                size="sm" 
                className="min-touch-target touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Task
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredTaskCategories.map((category, index) => (
                <div key={index} className={`p-3 md:p-4 rounded-lg border-2 ${category.color}`}>
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <h4 className="font-medium text-card-foreground text-sm md:text-base truncate">{category.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {category.assignedTo === 'me' ? 'Mine' : 'Delegated'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {category.tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-2 p-2 bg-card rounded min-touch-target">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={(checked) => toggleTaskCompletion(task.id, !!checked)}
                          className="h-4 w-4 min-touch-target"
                        />
                        <span className={`flex-1 text-xs md:text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                          {task.title}
                        </span>
                        {task.is_urgent && !task.completed && (
                          <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
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

      {/* Floating Action Button - Mobile Only */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button
          onClick={() => setQuickAddModal('task')}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl min-touch-target touch-manipulation bg-primary hover:bg-primary/90"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

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
