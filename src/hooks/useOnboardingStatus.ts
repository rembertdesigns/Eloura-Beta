import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const { loadProgress } = useOnboardingProgress();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [isTourComplete, setIsTourComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsOnboardingComplete(false);
        setIsTourComplete(false);
        setLoading(false);
        return;
      }

      try {
        const progress = await loadProgress();
        const isOnboardingComplete = progress?.onboardingCompleted || false;
        const isTourComplete = progress?.tourCompleted || false;
        
        setIsOnboardingComplete(isOnboardingComplete);
        setIsTourComplete(isTourComplete);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsOnboardingComplete(false);
        setIsTourComplete(false);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user, loadProgress]);

  return { isOnboardingComplete, isTourComplete, loading };
};