
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  title?: string;
}

const LoadingScreen = ({ onComplete, title = "Creating your dashboard" }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing your priorities...",
    "Organizing your challenges...",
    "Personalizing your experience...",
    "Almost ready..."
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        
        // Update step based on progress
        if (newProgress >= 25 && currentStep < 1) setCurrentStep(1);
        else if (newProgress >= 50 && currentStep < 2) setCurrentStep(2);
        else if (newProgress >= 75 && currentStep < 3) setCurrentStep(3);
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#a8e6ff]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-[#223b0a]/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-[#a8e6ff]/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-[#223b0a]/8 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo with pulsing animation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-4 rounded-2xl shadow-lg animate-pulse">
            <Heart className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-light text-[#223b0a] mb-2 animate-fade-in">
          {title}
        </h1>

        {/* Current Step */}
        <p className="text-slate-600 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {steps[currentStep]}
        </p>

        {/* Progress Bar Container */}
        <div className="relative mb-6">
          <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#a8e6ff] to-[#223b0a] rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '1s' }}>
          {Math.round(progress)}% Complete
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#a8e6ff] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Subtle particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#a8e6ff]/40 rounded-full animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
