import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Home, Calendar, Users, FileText } from 'lucide-react';

interface InteractiveTourProps {
  onComplete: () => void;
}

const InteractiveTour = ({ onComplete }: InteractiveTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      id: 'dashboard',
      title: 'This is your Dashboard',
      description: "We'll build it together.",
      icon: Home,
      position: { top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }
    },
    {
      id: 'planner', 
      title: "Here's your shared Planner",
      description: 'for tasks, events, and reminders.',
      icon: Calendar,
      position: { top: '40%', left: '25%', transform: 'translate(-50%, -50%)' }
    },
    {
      id: 'village',
      title: 'This is your Village',
      description: 'the people who support you.',
      icon: Users,
      position: { top: '40%', right: '25%', transform: 'translate(50%, -50%)' }
    },
    {
      id: 'daily-brief',
      title: 'Your Daily Brief',
      description: 'gives you a clear plan each day.',
      icon: FileText,
      position: { bottom: '30%', left: '50%', transform: 'translate(-50%, 50%)' }
    }
  ];

  const currentStepData = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      {/* Background overlay with highlighted areas */}
      <div className="absolute inset-0">
        {/* Simulated dashboard areas */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/90 rounded-lg border-2 border-[#223b0a] shadow-xl" 
             style={{ display: currentStep === 0 ? 'block' : 'none' }}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Dashboard Overview</h3>
            <p className="text-slate-600">Your personal command center</p>
          </div>
        </div>

        <div className="absolute top-1/3 left-8 w-1/3 h-1/3 bg-white/90 rounded-lg border-2 border-[#223b0a] shadow-xl"
             style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Shared Planner</h3>
            <p className="text-slate-600">Tasks, events, and reminders</p>
          </div>
        </div>

        <div className="absolute top-1/3 right-8 w-1/3 h-1/3 bg-white/90 rounded-lg border-2 border-[#223b0a] shadow-xl"
             style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">The Village</h3>
            <p className="text-slate-600">Your support network</p>
          </div>
        </div>

        <div className="absolute bottom-1/3 left-1/4 w-1/2 h-1/4 bg-white/90 rounded-lg border-2 border-[#223b0a] shadow-xl"
             style={{ display: currentStep === 3 ? 'block' : 'none' }}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Daily Brief</h3>
            <p className="text-slate-600">Your clear daily plan</p>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <Card className="relative z-10 max-w-md mx-4 animate-scale-in" style={currentStepData.position}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-full flex items-center justify-center flex-shrink-0">
              <currentStepData.icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-2">{currentStepData.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{currentStepData.description}</p>
              
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-4">
                {tourSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-[#223b0a]' : 'bg-slate-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-slate-500 ml-2">
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button variant="outline" size="sm" onClick={handlePrev}>
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSkip}
                    className="text-slate-500"
                  >
                    Skip Tour
                  </Button>
                </div>
                
                <Button 
                  onClick={handleNext}
                  className="bg-[#223b0a] hover:bg-[#1a2e08] text-white"
                  size="sm"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTour;