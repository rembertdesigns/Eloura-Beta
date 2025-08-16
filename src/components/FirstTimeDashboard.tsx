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

  const highlights = [
    {
      title: "Daily Dashboard",
      description: "Your personalized overview",
      icon: Home,
      id: "dashboard"
    },
    {
      title: "Shared Planner", 
      description: "Tasks, events, and reminders",
      icon: Calendar,
      id: "planner"
    },
    {
      title: "Care Circle",
      description: "Manage care responsibilities", 
      icon: Heart,
      id: "care-circle"
    },
    {
      title: "The Village",
      description: "Your support network",
      icon: Users,
      id: "village"
    }
  ];

  const handleStartTour = () => {
    setShowTour(true);
  };

  const handleSkipTour = () => {
    setTourCompleted(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
    setTourCompleted(true);
  };

  if (showTour) {
    return <InteractiveTour onComplete={handleTourComplete} />;
  }

  return (
    <div className="p-6 space-y-6">
      {!tourCompleted ? (
        // Initial Tour Introduction
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-light text-slate-800">
              Let's take a quick look around
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Welcome to Eloura! Here are the key areas that will help you manage your family and care responsibilities.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {highlights.map((highlight) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={highlight.id} className="border-2 hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{highlight.title}</h3>
                    <p className="text-sm text-slate-600">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleStartTour}
              className="bg-[#223b0a] hover:bg-[#1a2e08] text-white px-8 py-3"
            >
              Start Tour
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkipTour}
              className="border-[#223b0a] text-[#223b0a] hover:bg-[#223b0a] hover:text-white px-8 py-3"
            >
              Skip Tour
            </Button>
          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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