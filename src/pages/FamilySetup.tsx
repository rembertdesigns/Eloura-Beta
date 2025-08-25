import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Baby, UserCheck, Heart, Home, HelpCircle } from 'lucide-react';
import familyCareIcon from '@/assets/family-care-icon.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FamilySetup = () => {
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const familyTypes = [
    {
      id: 'solo-parent',
      title: 'Solo parent',
      description: 'Raising children on your own and managing all family responsibilities independently',
      icon: Baby,
      bgColor: 'from-pink-50 to-rose-50',
      iconColor: 'text-pink-600',
      selectedBg: 'bg-pink-50',
      selectedBorder: 'border-pink-500',
    },
    {
      id: 'partnered',
      title: 'Partnered',
      description: 'Sharing parenting and family responsibilities with a partner or spouse',
      icon: Heart,
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
      selectedBg: 'bg-blue-50',
      selectedBorder: 'border-blue-500',
    },
    {
      id: 'co-parenting',
      title: 'Co-parenting',
      description: 'Sharing parenting responsibilities with an ex-partner or separate households',
      icon: Home,
      bgColor: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      selectedBg: 'bg-green-50',
      selectedBorder: 'border-green-500',
    },
    {
      id: 'multigenerational',
      title: 'Multigenerational',
      description: 'Caring for multiple generations in your family, including children and aging parents',
      icon: Users,
      bgColor: 'from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      selectedBg: 'bg-purple-50',
      selectedBorder: 'border-purple-500',
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Your family structure is unique and doesn\'t fit the categories above',
      icon: HelpCircle,
      bgColor: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
      selectedBg: 'bg-amber-50',
      selectedBorder: 'border-amber-500',
    },
  ];

  const handleContinue = async () => {
    if (!selectedType) {
      toast({
        title: "Please select a family type",
        description: "Choose the option that best describes your situation",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Save family type to profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ family_type: selectedType })
        .eq('id', user.id);

      if (profileError) {
        toast({
          title: "Error",
          description: profileError.message,
          variant: "destructive",
        });
        return;
      }

      // Also save to onboarding table if it exists, or create new record
      const { error: onboardingError } = await supabase
        .from('user_onboarding')
        .upsert({
          user_id: user.id,
          family_type: selectedType,
        });

      if (onboardingError) {
        console.error('Onboarding error:', onboardingError);
        // Don't show error to user as this is secondary
      }

      toast({
        title: "Family type selected",
        description: "Let's continue with your personal information",
      });

      navigate('/family-structure');
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-2">
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl my-2">
        {/* Logo and Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-2 shadow-lg">
            <img src={familyCareIcon} alt="Family Care" className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-1">Your Family and Care Responsibilities</h1>
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
            Help us personalize your Eloura experience by selecting what best describes your family situation
          </p>
        </div>

        {/* Family Types Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4 lg:p-5">
            <div className="space-y-2 sm:space-y-3">
              {familyTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = selectedType === type.id;
                
                return (
                  <div 
                    key={type.id} 
                    className={`group relative cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                      isSelected ? 'scale-[1.01]' : ''
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className={`
                      relative p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300
                      bg-gradient-to-r ${type.bgColor}
                      shadow-lg hover:shadow-xl
                      ${isSelected 
                        ? `${type.selectedBorder} ${type.selectedBg} shadow-xl ring-4 ring-opacity-20` 
                        : 'border-white/60 hover:border-white/80 hover:shadow-lg'
                      }
                    `}>
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-[#223b0a] rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        {/* Icon */}
                        <div className={`
                          flex-shrink-0 p-2 sm:p-3 rounded-xl transition-all duration-300
                          ${isSelected 
                            ? 'bg-[#223b0a] text-white shadow-lg' 
                            : `${type.iconColor} bg-white/70 group-hover:bg-white/90 shadow-md`
                          }
                        `}>
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <h3 className={`
                            text-base sm:text-lg font-bold mb-1 transition-colors duration-300
                            ${isSelected ? 'text-[#223b0a]' : 'text-slate-900 group-hover:text-slate-800'}
                          `}>
                            {type.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hidden radio input for accessibility */}
                      <input
                        type="radio"
                        name="familyType"
                        value={type.id}
                        checked={isSelected}
                        onChange={() => setSelectedType(type.id)}
                        className="sr-only"
                        aria-label={type.title}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button
              onClick={handleContinue}
              disabled={loading || !selectedType}
              className="w-full mt-3 sm:mt-4 h-9 sm:h-10 text-sm font-medium bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm">Setting up your account...</span>
                </div>
              ) : (
                'Continue to Family Structure'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-2">
          <p className="text-xs text-slate-500 px-4 sm:px-0">
            You can change this selection later in your account settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilySetup;
