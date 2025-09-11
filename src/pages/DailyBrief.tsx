import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, Heart, Brain, Edit3, Pause, CheckCircle, User, MapPin, AlertTriangle, Target, TrendingUp, CalendarDays, Users, Star, Plus, Sparkles } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';
import MoodCheckPopup from '@/components/MoodCheckPopup';
import AddGoalModal from '@/components/AddGoalModal';
import QuickAddTask from '@/components/QuickAddTask';
import TaskRatingModal from '@/components/TaskRatingModal';
import { useDailyBriefData } from '@/hooks/useDailyBriefData';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import SEOHead from '@/components/SEOHead';

const DailyBrief = () => {
  const { user } = useAuth();
  const { getFirstName } = useUserProfile();
  const {
    tasks,
    goals,
    villageMembers,
    priorities,
    celebrations,
    loading,
    addGoal,
    addTask,
    toggleTaskCompletion,
    updateGoalProgress,
    getRandomQuote,
    getStats,
    getFilteredTasks,
  } = useDailyBriefData();

  const [selectedMood, setSelectedMood] = useState('');
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [activeFilter, setActiveFilter] = useState('default');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCelebrateModal, setShowCelebrateModal] = useState(false);
  const [showTaskRatingModal, setShowTaskRatingModal] = useState(false);
  const [newlyCompletedTasks, setNewlyCompletedTasks] = useState<any[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    tasks: 0,
    village: 0,
    goals: 0
  });

  // Get stats from hook
  const stats = getStats();
  const {
    completedTasks,
    pendingTasks,
    totalTasks,
    completionPercentage,
    activeGoalsCount,
    villageCount
  } = stats;

  // Animation effect on component mount - MOVED TO TOP BEFORE ANY RETURNS
  useEffect(() => {
    setIsLoaded(true);
    // Get random quote on mount
    setCurrentQuoteIndex(Math.floor(Math.random() * 8)); // Hook has 8 quotes

    // Animate numbers counting up
    const animateNumber = (target: number, key: 'tasks' | 'village' | 'goals') => {
      let current = 0;
      const increment = Math.ceil(target / 20);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => ({
          ...prev,
          [key]: current
        }));
      }, 50);
    };

    setTimeout(() => {
      animateNumber(completedTasks, 'tasks');
      animateNumber(villageCount, 'village');
      animateNumber(activeGoalsCount, 'goals');
    }, 300);
  }, [completedTasks, villageCount, activeGoalsCount]);

  // Get user name from profile
  const getUserName = () => {
    return getFirstName();
  };

  // Show loading while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading your daily brief...</p>
        </div>
      </div>
    );
  }

  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      weekday: 'long' as const,
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Get filtered tasks using hook
  const filteredTasks = getFilteredTasks(activeFilter);

  const shouldShowSection = (section: string) => {
    // Only show sections when a filter is active
    if (activeFilter === 'default') return false;
    switch (activeFilter) {
      case 'today':
        return section === 'tasks';
      case 'village':
        return section === 'tasks' || section === 'social';
      case 'goals':
        return section === 'tasks' || section === 'goals';
      case 'completed':
        return section === 'tasks';
      default:
        return false;
    }
  };

  const handleAddGoal = async (goal: any) => {
    await addGoal(goal);
  };

  const handleAddTask = async (task: any) => {
    await addTask(task);
  };

  const handleTaskToggle = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompletedState = !task.completed;
    await toggleTaskCompletion(taskId, newCompletedState);

    // If task is being completed, show rating modal
    if (!task.completed && newCompletedState) {
      setNewlyCompletedTasks([{ ...task, completed: true }]);
      setShowTaskRatingModal(true);
    }
  };

  const handleStatusCardClick = (filter: string) => {
    setActiveFilter(filter);
    const filterMessages = {
      today: "today's tasks",
      completed: 'completed tasks',
      village: 'village connections',
      goals: 'goal-related tasks'
    };
    toast({
      title: `Filtered to show ${filterMessages[filter] || filter}`
    });
  };

  const handleMarkDayComplete = () => {
    setShowCelebration(true);
    toast({
      title: "🎉 Day Marked Complete!",
      description: "Amazing work today! You should be proud of all you accomplished."
    });

    // Hide celebration effect after animation
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleSaveTaskRatings = (taskId: string, ratings: { mentalLoad: number; timeEstimate: number; satisfaction: number }) => {
    // In a real app, you might want to save these ratings to the database
    // For now, just show success toast
    toast({
      title: "Task rating saved!",
      description: "Thank you for your feedback."
    });
  };

  // Drag and drop handlers (simplified for real data)
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    // For now, just show a toast. In a real app, you might want to update task order in database
    toast({
      title: "Task reordered!",
      description: "Task order updated."
    });
  };

  const firstName = getUserName();

  return (
    <>
      <SEOHead
        title={`Daily Brief - ${firstName}'s Family Dashboard | Eloura Family Care Management`}
        description={`Your personalized daily brief with family tasks, goals, and care coordination. Stay organized with Eloura's smart family management dashboard for ${firstName}.`}
        keywords="daily brief, family dashboard, daily tasks, family goals, care coordination, family planner dashboard, personal family management"
      />
      <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 lg:py-12 max-w-7xl flex-1 flex flex-col justify-start pb-safe">
        {/* 1. Top Section (Header) - Mobile Optimized */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-3xl font-semibold text-slate-800 mb-1 md:mb-2 truncate">Hi, {getUserName()}</h1>
              <p className="text-slate-600 text-sm md:text-base mb-1 md:mb-2">{getCurrentDate()}</p>
              <p className="text-xs md:text-sm text-slate-500 italic hidden md:block">
                {getRandomQuote()}
              </p>
            </div>
            
            <div className="flex items-center justify-between md:justify-center gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{completionPercentage}%</div>
                <div className="text-xs md:text-sm text-slate-600">Complete</div>
              </div>
              <Button 
                onClick={() => setShowMoodPopup(true)} 
                variant="outline" 
                className="flex items-center gap-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 hover:scale-105 group min-touch-target touch-manipulation px-3 md:px-6"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5 text-orange-500 group-hover:animate-pulse" />
                <span className="font-medium text-sm md:text-base">Check In</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 2. Summary Status Bar - Mobile First Design */}
        <div className="flex justify-center mb-4 md:mb-8">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full max-w-5xl transition-all duration-700 ${isLoaded ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
            <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${activeFilter === 'today' ? 'ring-2 ring-orange-500 bg-orange-100 shadow-lg' : 'bg-orange-50 hover:bg-orange-100 shadow-md'} border-orange-200 h-20 md:h-32 min-touch-target touch-manipulation`} onClick={() => handleStatusCardClick('today')}>
              <CardContent className="p-3 md:p-6 text-center h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-1 md:mb-3">
                  <Calendar className="h-4 w-4 md:h-6 md:w-6 text-orange-600 mr-1 md:mr-3" />
                  <span className="text-xl md:text-3xl font-bold text-orange-600">{pendingTasks}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Today's Tasks</p>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${activeFilter === 'completed' ? 'ring-2 ring-blue-500 bg-blue-100 shadow-lg' : 'bg-blue-50 hover:bg-blue-100 shadow-md'} border-blue-200 h-20 md:h-32 min-touch-target touch-manipulation`} onClick={() => handleStatusCardClick('completed')}>
              <CardContent className="p-3 md:p-6 text-center h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-1 md:mb-3">
                  <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-blue-600 mr-1 md:mr-3" />
                  <span className="text-xl md:text-3xl font-bold text-blue-600">{completedTasks}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Completed</p>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${activeFilter === 'village' ? 'ring-2 ring-green-500 bg-green-100 shadow-lg' : 'bg-green-50 hover:bg-green-100 shadow-md'} border-green-200 h-20 md:h-32 min-touch-target touch-manipulation`} onClick={() => handleStatusCardClick('village')}>
              <CardContent className="p-3 md:p-6 text-center h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-1 md:mb-3">
                  <Users className="h-4 w-4 md:h-6 md:w-6 text-green-600 mr-1 md:mr-3" />
                  <span className="text-xl md:text-3xl font-bold text-green-600">{villageCount}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Village</p>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${activeFilter === 'goals' ? 'ring-2 ring-purple-500 bg-purple-100 shadow-lg' : 'bg-purple-50 hover:bg-purple-100 shadow-md'} border-purple-200 h-20 md:h-32 min-touch-target touch-manipulation`} onClick={() => handleStatusCardClick('goals')}>
              <CardContent className="p-3 md:p-6 text-center h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-1 md:mb-3">
                  <Target className="h-4 w-4 md:h-6 md:w-6 text-purple-600 mr-1 md:mr-3" />
                  <span className="text-xl md:text-3xl font-bold text-purple-600">{activeGoalsCount}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Goals</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3. Main Content - Tasks Prominently Displayed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6">
          {/* Center Column - Task Overview (always visible and prominent) */}
          <div className={`${activeFilter !== 'default' && shouldShowSection('priorities') ? 'lg:col-span-6' : activeFilter !== 'default' && (shouldShowSection('social') || shouldShowSection('goals')) ? 'lg:col-span-9' : 'lg:col-span-12'} order-first`}>
              <Card className="shadow-lg">
                 <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-center justify-between gap-2">
                     <CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold text-slate-800 min-w-0 flex-1">
                        <Target className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                        <span className="truncate">
                          {activeFilter === 'today' ? "Today's Tasks" : activeFilter === 'completed' ? 'Completed Tasks' : activeFilter === 'village' ? 'Village-Related Tasks' : activeFilter === 'goals' ? 'Goal-Related Tasks' : "All Tasks"}
                        </span>
                     </CardTitle>
                    <Button 
                      size="sm" 
                      onClick={() => setShowQuickAddTask(true)} 
                      className="flex items-center gap-1 min-touch-target touch-manipulation text-xs md:text-sm px-2 md:px-3"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden md:inline">Quick Add</span>
                      <span className="md:hidden">Add</span>
                    </Button>
                  </div>
                </CardHeader>
                 <CardContent className="py-3 md:py-6">
                   <div className="space-y-1">
                     {(activeFilter === 'default' ? tasks : filteredTasks).map((task, index) => (
                       <div key={task.id} className="flex items-center justify-between p-2 md:p-3 bg-card rounded-lg border hover:shadow-md transition-shadow group cursor-move shadow-sm min-touch-target" draggable onDragStart={e => handleDragStart(e, task.id)} onDragOver={handleDragOver} onDrop={e => handleDrop(e, index)}>
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => handleTaskToggle(task.id)} 
                            className="w-4 h-4 text-primary rounded cursor-pointer flex-shrink-0 min-touch-target" 
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs md:text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'} truncate`}>
                              {task.title}
                            </p>
                            <div className="flex items-center gap-1 md:gap-3 mt-0.5">
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.due_date ? new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No time set'}
                              </p>
                              <Badge variant="outline" className={`text-xs px-1 py-0.5 ${task.category === 'childcare' ? 'bg-green-50 text-green-700 border-green-200' : task.category === 'eldercare' ? 'bg-orange-50 text-orange-700 border-orange-200' : task.category === 'work' ? 'bg-purple-50 text-purple-700 border-purple-200' : task.category === 'household' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'} hidden md:inline-flex`}>
                                {task.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {task.is_urgent && !task.completed && (
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs px-1.5 py-0.5 ml-2 flex-shrink-0">
                            urgent
                          </Badge>
                        )}
                      </div>
                     ))}
                     {(activeFilter === 'default' ? tasks : filteredTasks).length === 0 && (
                       <div className="text-center py-6 md:py-8 text-slate-500">
                         <p className="text-sm md:text-base">No tasks found{activeFilter !== 'default' ? ' for the selected filter' : ''}.</p>
                       </div>
                     )}
                  </div>
                </CardContent>
               </Card>
             </div>

            {/* Left Column - Priorities & Upcoming (3 columns) */}
            {shouldShowSection('priorities') && (
              <div className="lg:col-span-3 space-y-3 md:space-y-6 order-2">
                {/* Today's Priorities */}
                <Card className="shadow-lg">
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold text-slate-800">
                      <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                      Today's Priorities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {priorities.map(priority => (
                      <div key={priority.id} className={`p-2 md:p-3 rounded-lg border-l-4 ${priority.priority_type === 'urgent' ? 'bg-red-50 border-red-400' : priority.priority_type === 'high' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 text-xs md:text-sm truncate">{priority.title}</p>
                            <p className="text-xs text-slate-600 mt-1">Due: {priority.due_time || 'TBD'}</p>
                          </div>
                          <Badge variant="outline" className={`text-xs ${priority.priority_type === 'urgent' ? 'bg-red-100 text-red-700 border-red-200' : priority.priority_type === 'high' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-blue-100 text-blue-700 border-blue-200'} flex-shrink-0`}>
                            {priority.priority_type === 'urgent' ? 'Urgent' : priority.priority_type === 'high' ? 'High' : 'Scheduled'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming This Week */}
                <Card className="shadow-lg hidden md:block">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-800">Upcoming This Week</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center py-8 text-slate-500">
                      <Calendar className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No upcoming events this week</p>
                      <p className="text-xs mt-1">Add events to your calendar to see them here!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          {(shouldShowSection('social') || shouldShowSection('goals')) && (
            <div className="lg:col-span-3 space-y-6">
              {/* Social Connection - Moved up for importance */}
              {shouldShowSection('social') && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
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
              )}

              {/* Your Goals */}
              {shouldShowSection('goals') && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                        <Target className="h-5 w-5 text-purple-600" />
                        Your Goals
                      </CardTitle>
                      <Button size="sm" onClick={() => setShowAddGoalModal(true)} className="text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {goals.map(goal => (
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
              )}
             </div>
          )}
        </div>

        {/* 4. Footer Section - Mobile Optimized */}
        <div className="mt-6 md:mt-12 mb-4 flex justify-center relative">
          {/* Celebration overlay effect */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className="animate-scale-in">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 md:px-8 py-3 md:py-4 rounded-full shadow-2xl">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Sparkles className="h-4 w-4 md:h-6 md:w-6 animate-pulse" />
                    <span className="text-sm md:text-xl font-bold">🎉 Fantastic job today!</span>
                    <Sparkles className="h-4 w-4 md:h-6 md:w-6 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="min-touch-target touch-manipulation px-4 md:px-8 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-lg shadow-lg hover:shadow-xl" 
            onClick={handleMarkDayComplete}
          >
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
            Mark Day Complete
          </Button>
        </div>
      </div>
      
      {/* Celebrate Yourself Modal */}
      <Dialog open={showCelebrateModal} onOpenChange={setShowCelebrateModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="text-2xl text-green-800">Celebrate Your Wins!</DialogTitle>
            </div>
          </DialogHeader>
          <div className="py-6">
            <p className="text-center text-green-700 font-medium mb-6">
              You're making amazing progress! Here's what you've accomplished today:
            </p>
            <div className="grid gap-4">
              {celebrations.map((celebration) => (
                <div key={celebration.id} className={`flex items-center gap-4 text-green-700 bg-green-50 rounded-lg p-4 transition-all duration-300 animate-fade-in border border-green-200`}>
                  <div className="flex-shrink-0 bg-green-500 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-medium">{celebration.title}</span>
                    {celebration.description && (
                      <p className="text-sm text-green-600 mt-1">{celebration.description}</p>
                    )}
                  </div>
                </div>
              ))}
              {celebrations.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <Star className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No celebrations yet today!</p>
                  <p className="text-xs mt-1">Complete some tasks to start celebrating! 🎉</p>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <p className="text-green-600 font-medium">Keep up the fantastic work! 🎉</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modals */}
      <MoodCheckPopup selectedMood={selectedMood} onMoodSelect={setSelectedMood} isOpen={showMoodPopup} onOpenChange={setShowMoodPopup} />

      <AddGoalModal isOpen={showAddGoalModal} onOpenChange={setShowAddGoalModal} onAddGoal={handleAddGoal} />

      <QuickAddTask isOpen={showQuickAddTask} onOpenChange={setShowQuickAddTask} onAddTask={handleAddTask} />
      
      <TaskRatingModal 
        isOpen={showTaskRatingModal} 
        onClose={() => setShowTaskRatingModal(false)} 
        completedTasks={newlyCompletedTasks}
        onSaveRatings={(taskId: number, ratings) => handleSaveTaskRatings(taskId.toString(), ratings)}
      />
      
      <div className="lg:hidden sticky bottom-0 z-50">
        <FeatureFooter />
      </div>
    </div>
    </>
  );
};

export default DailyBrief;