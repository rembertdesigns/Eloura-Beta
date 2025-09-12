import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import dashboardIllustration from '@/assets/tour-dashboard-illustration.png';
import plannerIllustration from '@/assets/tour-planner-illustration.png';
import villageIllustration from '@/assets/tour-village-illustration.png';
import dailyBriefIllustration from '@/assets/tour-daily-brief-illustration.png';

interface InteractiveTourProps {
  onComplete: () => void;
}

const InteractiveTour = ({ onComplete }: InteractiveTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      id: 'dashboard',
      title: 'This is your Dashboard',
      description: "Your personal command center - we'll build it together.",
      illustration: dashboardIllustration,
      position: { top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }
    },
    {
      id: 'planner', 
      title: "Here's your shared Planner",
      description: 'Organize tasks, events, and reminders with your family.',
      illustration: plannerIllustration,
      position: { top: '40%', left: '25%', transform: 'translate(-50%, -50%)' }
    },
    {
      id: 'village',
      title: 'This is your Village',
      description: 'Connect with the people who support you.',
      illustration: villageIllustration,
      position: { top: '40%', right: '25%', transform: 'translate(50%, -50%)' }
    },
    {
      id: 'daily-brief',
      title: 'Your Daily Brief',
      description: 'Start each day with a clear, personalized plan.',
      illustration: dailyBriefIllustration,
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
      <Card className="relative z-10 max-w-md mx-4 animate-fade-in" style={currentStepData.position}>
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Custom illustration */}
            <div className="w-20 h-20 mb-6 flex items-center justify-center animate-scale-in">
              <img 
                src={currentStepData.illustration} 
                alt={`${currentStepData.title} illustration`}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-xl text-slate-800 mb-3">{currentStepData.title}</h3>
              <p className="text-base text-slate-600 mb-6 leading-relaxed">{currentStepData.description}</p>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {tourSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'bg-[#223b0a] scale-125' : 'bg-slate-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-slate-500 ml-3">
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <Button variant="outline" size="sm" onClick={handlePrev} className="hover-scale">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSkip}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Skip Tour
                  </Button>
                </div>
                
                <Button 
                  onClick={handleNext}
                  className="bg-[#223b0a] hover:bg-[#1a2e08] text-white hover-scale"
                  size="sm"
                >
                  {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
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