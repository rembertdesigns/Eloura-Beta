import React, { useState } from 'react';
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

const FirstTimeDashboard = () => {
  const [showTour, setShowTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);


  const handleStartTour = () => {
    setShowTour(true);
  };


  const handleTourComplete = () => {
    setShowTour(false);
    setTourCompleted(true);
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none transform hover:scale-105"
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
              You're in. Let's make this easier together.
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