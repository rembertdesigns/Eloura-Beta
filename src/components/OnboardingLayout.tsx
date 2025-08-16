import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Circle } from 'lucide-react';
import familyCareIcon from '@/assets/family-care-icon.png';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  const location = useLocation();
  
  const steps = [
    { id: 'personal-info', title: 'Personal Info', path: '/personal-info' },
    { id: 'family-setup', title: 'Family Type', path: '/family-setup' },
    { id: 'family-structure', title: 'Family Structure', path: '/family-structure' },
    { id: 'top-challenges', title: 'Top Challenges', path: '/top-challenges' },
    { id: 'priorities', title: 'Priorities', path: '/priorities' },
    { id: 'invite-village', title: 'Invite Village', path: '/invite' },
    { id: 'onboarding-summary', title: 'Review & Complete', path: '/onboarding-summary' },
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
      {/* Sidebar with Progress */}
      <div className="hidden lg:flex lg:w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200 flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-4">
            <img src={familyCareIcon} alt="Family Care" className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Setting Up Eloura</h2>
          <p className="text-sm text-slate-600">Let's personalize your experience</p>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#a8e6ff] to-[#223b0a] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              
              return (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    status === 'completed' 
                      ? 'bg-[#223b0a] border-[#223b0a] text-white'
                      : status === 'current'
                      ? 'border-[#223b0a] text-[#223b0a] bg-white'
                      : 'border-slate-300 text-slate-400 bg-white'
                  }`}>
                    {status === 'completed' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Circle className={`w-3 h-3 ${status === 'current' ? 'fill-current' : ''}`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`text-sm font-medium transition-colors duration-200 ${
                      status === 'completed' || status === 'current'
                        ? 'text-slate-900'
                        : 'text-slate-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-400">Step {index + 1} of {steps.length}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-slate-200 p-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-lg">
            <img src={familyCareIcon} alt="Family Care" className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-slate-600">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#a8e6ff] to-[#223b0a] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pt-0 pt-20">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;