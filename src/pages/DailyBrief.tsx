import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, Heart, Brain, Edit3, Pause, CheckCircle, User, MapPin, AlertTriangle, Target, TrendingUp, CalendarDays, Users, Star, Plus, Sparkles } from 'lucide-react';
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

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
    setCurrentQuoteIndex(Math.floor(Math.random() * 8));

    const animateNumber = (target: number, key: 'tasks' | 'village' | 'goals') => {
      let current = 0;
      const increment = Math.ceil(target / 20);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => ({ ...prev, [key]: current }));
      }, 50);
    };

    animateNumber(totalTasks, 'tasks');
    animateNumber(villageCount, 'village');  
    animateNumber(activeGoalsCount, 'goals');
  }, [totalTasks, villageCount, activeGoalsCount]);

  return (
    <>
      <SEOHead 
        title="Daily Brief"
        description="Get your personalized daily summary, priorities, and smart insights to start your day right."
        keywords="daily brief, priorities, daily summary, task management, personal insights"
      />
      <div className="min-h-screen bg-white">
        {/* Page Header */}
        <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">Daily Brief</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">Your personalized daily summary and priorities</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Good morning, {getFirstName()}! 🌅
            </h2>
            <p className="text-gray-600 text-sm">
              {getRandomQuote()}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today's Tasks</p>
                    <p className="text-2xl font-bold">{animatedNumbers.tasks}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Village Members</p>
                    <p className="text-2xl font-bold">{animatedNumbers.village}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Goals</p>
                    <p className="text-2xl font-bold">{animatedNumbers.goals}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button
                onClick={() => setShowQuickAddTask(true)}
                className="flex items-center gap-2 justify-start h-12"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
              <Button
                onClick={() => setShowAddGoalModal(true)}
                className="flex items-center gap-2 justify-start h-12"
                variant="outline"
              >
                <Target className="h-4 w-4" />
                Add Goal
              </Button>
              <Button
                onClick={() => setShowMoodPopup(true)}
                className="flex items-center gap-2 justify-start h-12"
                variant="outline"
              >
                <Heart className="h-4 w-4" />
                Check Mood
              </Button>
              <Button
                className="flex items-center gap-2 justify-start h-12"
                variant="outline"
              >
                <Sparkles className="h-4 w-4" />
                Get Insight
              </Button>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickAddTask(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>

            <div className="space-y-2">
              {getFilteredTasks('today').length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No tasks for today. Add your first task to get started!</p>
                  </CardContent>
                </Card>
              ) : (
                getFilteredTasks('today').map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id, !task.completed)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
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
        </div>

        {/* Modals */}
        {showMoodPopup && (
          <div>Mood popup placeholder</div>
        )}

        {showAddGoalModal && (
          <div>Add goal modal placeholder</div>
        )}

        {showQuickAddTask && (
          <div>Quick add task placeholder</div>
        )}

        {showTaskRatingModal && (
          <div>Task rating modal placeholder</div>
        )}
      </div>
    </>
  );
};

export default DailyBrief;