
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  CheckCircle2,
  Plus,
  UserPlus,
  MapPin,
  Edit3
} from 'lucide-react';
import { Users, TrendingUp, Calendar, Clock, CheckSquare, Target } from 'lucide-react';
import VillagePreview from '@/components/VillagePreview';
import InteractiveTour from './InteractiveTour';
import MiniChecklist from './MiniChecklist';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';
import { toast } from '@/hooks/use-toast';

const FirstTimeDashboard = () => {
  const [showTour, setShowTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [householdName, setHouseholdName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [invites, setInvites] = useState([]);
  const { markTourCompleted, loadProgress } = useOnboardingProgress();

  useEffect(() => {
    const loadData = async () => {
      // Load from localStorage for immediate updates
      const savedHouseholdName = localStorage.getItem('householdName');
      const savedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
      const savedInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
      
      // Also load from Supabase for persistent data
      try {
        const progress = await loadProgress();
        if (progress?.householdName) {
          setHouseholdName(progress.householdName);
        } else if (savedHouseholdName) {
          setHouseholdName(savedHouseholdName);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        // Fallback to localStorage
        if (savedHouseholdName) {
          setHouseholdName(savedHouseholdName);
        }
      }
      
      if (savedTasks) {
        setTasks(savedTasks);
      }
      if (savedInvites) {
        setInvites(savedInvites);
      }
    };

    loadData();
    
    // Listen for storage changes to update when new items are added via checklist
    const interval = setInterval(() => {
      const savedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
      const savedInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
      setTasks(savedTasks);
      setInvites(savedInvites);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [loadProgress]);

  const handleStartTour = () => {
    setShowTour(true);
  };

  const handleTourComplete = async () => {
    setShowTour(false);
    setTourCompleted(true);
    
    try {
      await markTourCompleted();
    } catch (error) {
      console.error('Error marking tour as completed:', error);
      toast({
        title: "Tour completed!",
        description: "Welcome to Eloura. You're all set to get started.",
      });
    }
  };

  if (showTour) {
    return <InteractiveTour onComplete={handleTourComplete} />;
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      {!tourCompleted ? (
        // Hero-style Tour Introduction
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight">
              Welcome to Eloura!
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Take a quick tour to easily navigate Eloura's features and learn how we make care easier from day one.
            </p>
          </div>

          <Button 
            onClick={handleStartTour}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Tour
          </Button>
        </div>
      ) : (
        // Post-Tour Dashboard
        <div className="space-y-4">
          {/* Welcome Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-light text-slate-800">
              {householdName ? `Welcome to ${householdName}!` : "You're in. Let's make this easier together."}
            </h1>
            <p className="text-base text-slate-600">
              Here are a few things you can try right now.
            </p>
          </div>

          {/* Mini Checklist */}
          <MiniChecklist />

          {/* Dashboard Preview Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Daily Dashboard Preview */}
            <Card id="dashboard" className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/30 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <div className="p-1.5 rounded-full bg-primary/10">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                  Daily Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {householdName ? (
                  <div className="space-y-2">
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">{householdName}</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">Your household is set up!</p>
                    </div>
                    {tasks.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-700">Today's Tasks:</p>
                        {tasks.slice(0, 2).map((task, index) => (
                          <div key={task.id || index} className="bg-blue-50 border border-blue-200 rounded-md p-2">
                            <span className="text-xs text-blue-800">{task.title}</span>
                          </div>
                        ))}
                        {tasks.length > 2 && (
                          <p className="text-xs text-slate-500">+{tasks.length - 2} more tasks</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-2">
                    <div className="w-10 h-10 mx-auto bg-muted rounded-full flex items-center justify-center opacity-40">
                      <Home className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Your personalized dashboard will appear here</p>
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-2 mx-2">
                      <p className="text-xs text-primary font-medium">
                        💡 Finish your checklist to see today's upcoming tasks and insights!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shared Planner Preview */}
            <Card id="planner" className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/30 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <div className="p-1.5 rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  Shared Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {tasks.length > 0 ? (
                  <div className="space-y-2">
                    <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-800">Tasks Added</span>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">{tasks.length} task{tasks.length > 1 ? 's' : ''} in your planner</p>
                    </div>
                    <div className="space-y-1">
                      {tasks.slice(0, 3).map((task, index) => (
                        <div key={task.id || index} className="bg-white border border-slate-200 rounded p-2">
                          <span className="text-xs text-slate-700">{task.title}</span>
                          <div className="text-xs text-slate-500 mt-1">
                            Added {new Date(task.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-2">
                    <div className="w-10 h-10 mx-auto bg-muted rounded-full flex items-center justify-center opacity-40">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Your tasks, events, and reminders will appear here</p>
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-2 mx-2">
                      <p className="text-xs text-primary font-medium">
                        📅 Add a task and your planner will be ready!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Village Preview */}
            <Card id="village" className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/30 hover:border-primary/30 transition-all duration-300 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <div className="p-1.5 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  The Village
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <VillagePreview />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstTimeDashboard;
