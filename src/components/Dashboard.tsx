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

  // Show first-time experience if not onboarded
  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (!isOnboardingComplete && !loading) {
    return <FirstTimeDashboard />;
  }

  const handleQuickAdd = (type: 'task' | 'event' | 'reminder') => {
    setQuickAddModal(type);
  };

  const handleQuickAddSave = async (data: any) => {
    try {
      switch (quickAddModal) {
        case 'task':
          await addTask(data);
          break;
        case 'event':
          await addEvent(data);
          break;
        case 'reminder':
          await addReminder(data);
          break;
      }
      setQuickAddModal(null);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'today') return task.due_date === format(new Date(), 'yyyy-MM-dd');
    if (taskFilter === 'completed') return task.completed;
    if (taskFilter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Home className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Your personalized overview and daily command center</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {/* Show loading state */}
        {(loading || dataLoading) && (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-gray-500">Loading dashboard...</div>
          </div>
        )}

        {/* Main content */}
        {!loading && !dataLoading && (
          <>
            {/* Welcome Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome back, {getFirstName()}! 👋
              </h2>
              <p className="text-gray-600 text-sm">
                {getRandomTip()}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  onClick={() => handleQuickAdd('task')}
                  className="flex items-center gap-2 justify-start h-12"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
                <Button
                  onClick={() => handleQuickAdd('event')}
                  className="flex items-center gap-2 justify-start h-12"
                  variant="outline"
                >
                  <Calendar className="h-4 w-4" />
                  Add Event
                </Button>
                <Button
                  onClick={() => handleQuickAdd('reminder')}
                  className="flex items-center gap-2 justify-start h-12"
                  variant="outline"
                >
                  <Bell className="h-4 w-4" />
                  Add Reminder
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Tasks</p>
                      <p className="text-2xl font-bold">{tasks.length}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Events</p>
                      <p className="text-2xl font-bold">{events.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold">
                        {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
                <div className="flex gap-2">
                  <Button
                    variant={taskFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTaskFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={taskFilter === 'today' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTaskFilter('today')}
                  >
                    Today
                  </Button>
                  <Button
                    variant={taskFilter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTaskFilter('pending')}
                  >
                    Pending
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredTasks.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-500">No tasks found. Add your first task to get started!</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                          />
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            )}
                            {task.due_date && (
                              <div className="flex items-center gap-1 mt-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{task.due_date}</span>
                              </div>
                            )}
                          </div>
                          {task.priority && (
                            <Badge variant={
                              task.priority === 'high' ? 'destructive' :
                              task.priority === 'medium' ? 'default' : 'secondary'
                            }>
                              {task.priority}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Recent Events */}
            {events.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-2">
                  {events.slice(0, 3).map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            {event.description && (
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            )}
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{event.start_date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {quickAddModal && (
        <>
          {quickAddModal === 'task' && (
            <QuickAddTaskModal
              open={true}
              onClose={() => setQuickAddModal(null)}
              onSave={handleQuickAddSave}
            />
          )}
          {quickAddModal === 'event' && (
            <AddEventModal
              open={true}
              onClose={() => setQuickAddModal(null)}
              onSave={handleQuickAddSave}
            />
          )}
          {quickAddModal === 'reminder' && (
            <AddReminderModal
              open={true}
              onClose={() => setQuickAddModal(null)}
              onSave={handleQuickAddSave}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;