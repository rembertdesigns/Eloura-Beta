import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import chaosIllustration from '@/assets/intro-chaos-illustration.png';
import supportIllustration from '@/assets/intro-support-illustration.png';
import setupIllustration from '@/assets/intro-setup-woman-illustration.png';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

const IntroFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { isOnboardingComplete, loading } = useOnboardingStatus();

  useEffect(() => {
    // Redirect to dashboard if onboarding is already completed
    if (!loading && isOnboardingComplete) {
      navigate('/dashboard');
    }
  }, [loading, isOnboardingComplete, navigate]);

  const steps = [
    {
      headline: "Designed for your everyday chaos",
      body: "From daily routines to shared responsibilities, Eloura helps you stay on top of it all — without doing it all alone.",
      illustration: chaosIllustration,
      cta: "Next"
    },
    {
      headline: "Built to support how your real life works",
      body: "Whether you're solo parenting, co-parenting, partnered, or caring for both your children and parents, Eloura adapts to your world.",
      illustration: supportIllustration,
      cta: "Next"
    },
    {
      headline: "Let's build your setup together",
      body: "We'll walk you through a few easy steps to make Eloura work for your family - starting with you.",
      illustration: setupIllustration,
      cta: "Let's begin"
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/personal-info');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/welcome');
    }
  };

  // Show loading or nothing while checking status
  if (loading || isOnboardingComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-xl">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === currentStep 
                  ? 'bg-orange-500' 
                  : step < currentStep 
                    ? 'bg-orange-300' 
                    : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Illustration */}
          <div className="py-4">
            <img 
              src={currentStepData.illustration} 
              alt={`Step ${currentStep} illustration`}
              className="w-full max-w-sm mx-auto rounded-2xl"
            />
          </div>

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {currentStepData.headline}
            </h1>
          </div>

          {/* Body text */}
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">
              {currentStepData.body}
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              onClick={handleNext}
              className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium text-base rounded-xl shadow-lg"
            >
              {currentStepData.cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroFlow;