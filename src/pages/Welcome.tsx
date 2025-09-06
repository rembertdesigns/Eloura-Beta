import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import welcomeIllustration from '@/assets/welcome-family-illustration.png';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import SEOHead from '@/components/SEOHead';

const Welcome = () => {
  const navigate = useNavigate();
  const { isOnboardingComplete, loading } = useOnboardingStatus();

  useEffect(() => {
    // Redirect to dashboard if onboarding is already completed
    if (!loading && isOnboardingComplete) {
      navigate('/dashboard');
    }
  }, [loading, isOnboardingComplete, navigate]);

  const handleContinue = () => {
    navigate('/intro');
  };

  // Show loading or nothing while checking status
  if (loading || isOnboardingComplete) {
    return null;
  }
  
  return (
    <>
      <SEOHead
        title="Welcome to Eloura - Start Your Family Care Journey | Smart Family Management"
        description="Welcome to Eloura! Start organizing your family life with our smart assistant for caregiving, daily planning, and family coordination. Set up your personalized experience in minutes."
        keywords="welcome to Eloura, family care setup, family planner onboarding, caregiving organization, family management tools"
      />
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <section className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-xl">
          {/* Content */}
          <div className="text-center space-y-6">
            {/* Header */}
            <header className="space-y-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome to Eloura
              </h1>
              <p className="text-slate-600 text-lg">
                Your smart assistant for family life.
              </p>
            </header>

            {/* Illustration */}
            <div className="py-4">
              <img 
                src={welcomeIllustration} 
                alt="Happy family with children reading together, representing family care and organization with Eloura's smart family management tools" 
                className="w-full max-w-sm mx-auto rounded-2xl" 
              />
            </div>

            {/* Body text */}
            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                From daily routines to shared responsibilities, 
                Eloura helps you manage it all in one place—
                so you can spend more time on what 
                matters most.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button onClick={handleContinue} className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium text-base rounded-xl shadow-lg">
                Let's set things up
              </Button>
              <p className="text-sm text-slate-500 mt-3">
                We'll guide you through every step of the way.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Welcome;