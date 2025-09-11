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

    // Only redirect to welcome if onboarding is not complete
    // Allow access to all routes if onboarding is complete (preserve current page)
    if (isOnboardingComplete === false) {
      // Only redirect if not already in the onboarding flow
      const onboardingPaths = ['/welcome', '/intro', '/personal-info', '/family-setup', '/family-structure', '/top-challenges', '/priorities', '/invite', '/onboarding-summary'];
      if (!onboardingPaths.includes(location.pathname)) {
        navigate('/welcome');
        return;
      }
    }

    // If onboarding is complete but user is on onboarding pages, redirect to dashboard
    if (isOnboardingComplete === true) {
      const onboardingOnlyPaths = ['/welcome', '/intro'];
      if (onboardingOnlyPaths.includes(location.pathname)) {
        navigate('/dashboard');
        return;
      }
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

  // Don't render children if user is not authenticated
  if (!user) {
    return null;
  }

  // Don't render if onboarding is not complete and user is not in onboarding flow
  if (isOnboardingComplete === false) {
    const onboardingPaths = ['/welcome', '/intro', '/personal-info', '/family-setup', '/family-structure', '/top-challenges', '/priorities', '/invite', '/onboarding-summary'];
    if (!onboardingPaths.includes(location.pathname)) {
      return null;
    }
  }

  return <>{children}</>;
};

export default OnboardingProtectedRoute;