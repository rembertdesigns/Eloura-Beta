import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface OnboardingProtectedRouteProps {
  children: React.ReactNode;
}

const OnboardingProtectedRoute: React.FC<OnboardingProtectedRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { isOnboardingComplete, loading: onboardingLoading } = useOnboardingStatus();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if still loading
    if (authLoading || onboardingLoading) return;

    // Redirect to auth if not authenticated
    if (!user) {
      navigate('/auth');
      return;
    }

    // Redirect to welcome if onboarding not complete and not already in onboarding flow
    if (isOnboardingComplete === false && location.pathname !== '/welcome') {
      navigate('/welcome');
      return;
    }
  }, [user, isOnboardingComplete, authLoading, onboardingLoading, navigate, location.pathname]);

  // Show loading while checking status
  if (authLoading || onboardingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated or onboarding not complete
  if (!user || (isOnboardingComplete === false && location.pathname !== '/welcome')) {
    return null;
  }

  return <>{children}</>;
};

export default OnboardingProtectedRoute;