import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  family_type?: string;
  pronouns?: string;
  phone?: string;
  household_name?: string;
  date_of_birth?: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const getDisplayName = () => {
    if (!user) return 'there';
    
    // First try to get from profile
    if (profile?.full_name) {
      return profile.full_name;
    }
    
    // Fallback to auth user metadata
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.user_metadata?.first_name || 
           'there';
  };

  const getFirstName = () => {
    if (!user) return 'there';
    
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    
    return user.user_metadata?.first_name || 
           user.user_metadata?.name?.split(' ')[0] ||
           'there';
  };

  return {
    profile,
    loading,
    getDisplayName,
    getFirstName,
    refetch: () => {
      if (user) {
        setLoading(true);
        // Re-trigger the effect
        setProfile(null);
      }
    }
  };
};