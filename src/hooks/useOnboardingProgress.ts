import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OnboardingData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  pronouns?: string;
  avatarUrl?: string;
  familyType?: string;
  householdName?: string;
  challenges?: string[];
  priorities?: string[];
  currentStep?: string;
  onboardingCompleted?: boolean;
  tourCompleted?: boolean;
}

export const useOnboardingProgress = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const saveProgress = useCallback(async (data: OnboardingData) => {
    if (!user) {
      console.warn('No user found, skipping Supabase save');
      return;
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      throw new Error('Database connection not available');
    }

    try {
      setLoading(true);
      console.log('🔍 Starting saveProgress for user:', user.id);
      console.log('🔍 Data being saved:', data);

      // Prepare onboarding data
      const onboardingData: any = {
        user_id: user.id,
        current_step: data.currentStep,
        onboarding_completed: data.onboardingCompleted || false,
      };

      // Add non-PII fields only (PII data goes to profiles table)
      if (data.pronouns) onboardingData.pronouns = data.pronouns;
      if (data.familyType) onboardingData.family_type = data.familyType;
      if (data.householdName) onboardingData.household_name = data.householdName;
      if (data.challenges) onboardingData.challenges = JSON.stringify(data.challenges);
      if (data.priorities) onboardingData.priorities = JSON.stringify(data.priorities);

      console.log('🔍 Prepared onboarding data:', onboardingData);

      // Upsert onboarding data
      const { data: upsertResult, error: onboardingError } = await supabase
        .from('user_onboarding')
        .upsert(onboardingData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        })
        .select();

      if (onboardingError) {
        console.error('❌ Onboarding save error:', onboardingError);
        throw onboardingError;
      }

      console.log('✅ Onboarding data saved successfully:', upsertResult);

      // Update profiles table with PII and other relevant fields
      const profileData: any = {};
      if (data.firstName && data.lastName) {
        profileData.full_name = `${data.firstName} ${data.lastName}`;
      }
      if (data.email) profileData.email = data.email;
      if (data.phone) profileData.phone = data.phone;
      if (data.dateOfBirth) profileData.date_of_birth = data.dateOfBirth;
      if (data.pronouns) profileData.pronouns = data.pronouns;
      if (data.familyType) profileData.family_type = data.familyType;
      if (data.householdName) profileData.household_name = data.householdName;
      if (data.avatarUrl) profileData.avatar_url = data.avatarUrl;

      if (Object.keys(profileData).length > 0) {
        console.log('🔍 Updating profiles table with:', profileData);
        
        const { data: profileResult, error: profileError } = await supabase
          .from('profiles')
          .upsert({ id: user.id, ...profileData })
          .select();

        if (profileError) {
          console.error('❌ Profile update error:', profileError);
          // Don't throw as this is secondary
        } else {
          console.log('✅ Profile data saved successfully:', profileResult);
        }
      }

      console.log('✅ saveProgress completed successfully');

    } catch (error) {
      console.error('❌ Error saving onboarding progress:', error);
      toast({
        title: "Save Error",
        description: "There was an issue saving your progress. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to let the component handle it
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const markTourCompleted = useCallback(async (): Promise<void> => {
    if (!user) {
      console.warn('No user found, cannot mark tour as completed');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('user_onboarding')
        .update({ tour_completed: true })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error marking tour as completed:', error);
        throw error;
      }

      toast({
        title: "Welcome to Eloura!",
        description: "You're all set to get started with your household management.",
      });

    } catch (error) {
      console.error('Error marking tour as completed:', error);
      toast({
        title: "Tour completed!",
        description: "Welcome to Eloura. You're all set to get started.",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const loadProgress = useCallback(async () => {
    if (!user) return null;

    try {
      // Fetch onboarding data
      const { data: onboardingData, error: onboardingError } = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (onboardingError) {
        console.error('Error loading onboarding progress:', onboardingError);
        return null;
      }

      // Fetch profile data for PII fields
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        console.warn('Profile data not found or error:', profileError);
      }

      // If no onboarding data exists, return null
      if (!onboardingData) {
        return null;
      }

      // Safe JSON parsing helper
      const safeJSONParse = (jsonString: any, fallback: any = []) => {
        if (!jsonString || typeof jsonString !== 'string' || jsonString.trim() === '') {
          return fallback;
        }
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          console.warn('Invalid JSON found, using fallback:', jsonString);
          return fallback;
        }
      };

      // Extract first and last name from full_name
      const fullName = profileData?.full_name || '';
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      return {
        firstName,
        lastName,
        email: profileData?.email || '',
        phone: profileData?.phone || '',
        dateOfBirth: profileData?.date_of_birth || '',
        pronouns: onboardingData.pronouns || profileData?.pronouns || '',
        familyType: onboardingData.family_type || profileData?.family_type || '',
        householdName: onboardingData.household_name || profileData?.household_name || '',
        challenges: safeJSONParse(onboardingData.challenges, []),
        priorities: safeJSONParse(onboardingData.priorities, []),
        currentStep: onboardingData.current_step || 'intro',
        onboardingCompleted: onboardingData.onboarding_completed || false,
        tourCompleted: onboardingData.tour_completed || false,
      };
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
      return null;
    }
  }, [user]);

  const uploadProfilePhoto = useCallback(async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      setLoading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast({
        title: "Upload Error",
        description: "There was an issue uploading your photo.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  return {
    saveProgress,
    loadProgress,
    uploadProfilePhoto,
    markTourCompleted,
    loading,
  };
};