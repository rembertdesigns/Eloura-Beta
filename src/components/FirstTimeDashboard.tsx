import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Home, 
  Heart,
  CheckCircle2,
  Plus,
  UserPlus,
  MapPin,
  Edit3
} from 'lucide-react';
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
    <div className="p-4 md:p-6 space-y-6">
      {!tourCompleted ? (
        // Hero-style Tour Introduction
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 px-4">
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-light text-slate-800 leading-tight">
              Welcome to Eloura!
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Take a quick tour to easily navigate Eloura's features and learn how we make care easier from day one.
            </p>
          </div>

          <Button 
            onClick={handleStartTour}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none transform hover:scale-105"
          >
            Start Your Tour
          </Button>
        </div>
      ) : (
        // Post-Tour Dashboard
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-light text-slate-800">
              You're in. Let's make this easier together.
            </h1>
            <p className="text-lg text-slate-600">
              Here are a few things you can try right now.
            </p>
          </div>

          {/* Mini Checklist */}
          <MiniChecklist />

          {/* Dashboard Preview Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Dashboard Preview */}
            <Card id="dashboard" className="border-2 border-dashed border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-[#223b0a]" />
                  Daily Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">Your personalized dashboard will appear here</p>
                  <p className="text-xs mt-2">Complete the checklist above to get started</p>
                </div>
              </CardContent>
            </Card>

            {/* Shared Planner Preview */}
            <Card id="planner" className="border-2 border-dashed border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#223b0a]" />
                  Shared Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">Your tasks, events, and reminders will appear here</p>
                  <p className="text-xs mt-2">Add your first task to get started</p>
                </div>
              </CardContent>
            </Card>

            {/* Village Preview */}
            <Card id="village" className="border-2 border-dashed border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#223b0a]" />
                  The Village
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">Your support network will appear here</p>
                  <p className="text-xs mt-2">Invite someone to get started</p>
                </div>
              </CardContent>
            </Card>

            {/* Care Circle Preview */}
            <Card id="care-circle" className="border-2 border-dashed border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#223b0a]" />
                  Care Circle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">Your care responsibilities will appear here</p>
                  <p className="text-xs mt-2">Create your care circle to get started</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstTimeDashboard;