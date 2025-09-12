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
      illustration: dashboardIllustration
    },
    {
      id: 'planner', 
      title: "Here's your shared Planner",
      description: 'Organize tasks, events, and reminders with your family.',
      illustration: plannerIllustration
    },
    {
      id: 'village',
      title: 'This is your Village',
      description: 'Connect with the people who support you.',
      illustration: villageIllustration
    },
    {
      id: 'daily-brief',
      title: 'Your Daily Brief',
      description: 'Start each day with a clear, personalized plan.',
      illustration: dailyBriefIllustration
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Unified centered modal */}
      <Card className="w-full max-w-lg mx-auto animate-fade-in shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            {/* Custom illustration */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 mb-8 flex items-center justify-center animate-scale-in">
              <img 
                src={currentStepData.illustration} 
                alt={`${currentStepData.title} illustration`}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Content */}
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <h2 className="font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                  {currentStepData.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {currentStepData.description}
                </p>
              </div>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="flex gap-2">
                  {tourSteps.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-primary scale-110 shadow-lg' 
                          : index < currentStep 
                            ? 'bg-primary/60' 
                            : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2 font-medium">
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <div className="flex gap-3 justify-center sm:justify-start">
                  {currentStep > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={handlePrev} 
                      className="hover-scale"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={handleSkip}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Skip Tour
                  </Button>
                </div>
                
                <div className="flex justify-center sm:justify-end sm:ml-auto">
                  <Button 
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground hover-scale px-6"
                  >
                    {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTour;