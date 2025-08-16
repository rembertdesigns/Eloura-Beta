import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Users, Baby, UserCheck } from 'lucide-react';
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
    },
    {
      id: 'partnered',
      title: 'Partnered',
      description: 'Sharing parenting and family responsibilities with a partner or spouse',
      icon: Users,
    },
    {
      id: 'co-parenting',
      title: 'Co-parenting',
      description: 'Sharing parenting responsibilities with an ex-partner or separate households',
      icon: UserCheck,
    },
    {
      id: 'multigenerational',
      title: 'Multigenerational',
      description: 'Caring for multiple generations in your family, including children and aging parents',
      icon: Users,
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Your family structure is unique and doesn\'t fit the categories above',
      icon: Users,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg sm:max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <img src={familyCareIcon} alt="Family Care" className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Your Family and Care Responsibilities</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
            Help us personalize your Eloura experience by selecting what best describes your family situation
          </p>
        </div>

        {/* Family Types Card */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-8">
            <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-3 sm:space-y-4">
              {familyTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = selectedType === type.id;
                
                return (
                  <div 
                    key={type.id} 
                    className={`relative flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-[#223b0a] bg-[#223b0a]/5 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <RadioGroupItem 
                      value={type.id} 
                      id={type.id}
                      className={`mt-0.5 sm:mt-1 flex-shrink-0 ${isSelected ? 'border-[#223b0a] text-[#223b0a]' : ''}`}
                    />
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className={`p-2 sm:p-3 rounded-xl transition-colors duration-200 flex-shrink-0 ${
                        isSelected 
                          ? 'bg-[#223b0a] text-white' 
                          : 'bg-[#a8e6ff]/20 text-[#223b0a]'
                      }`}>
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Label 
                          htmlFor={type.id} 
                          className={`text-base sm:text-lg font-semibold cursor-pointer transition-colors duration-200 block ${
                            isSelected ? 'text-[#223b0a]' : 'text-slate-900'
                          }`}
                        >
                          {type.title}
                        </Label>
                        <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed">{type.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
            
            <Button
              onClick={handleContinue}
              disabled={loading || !selectedType}
              className="w-full mt-6 sm:mt-8 h-12 sm:h-14 text-base sm:text-lg font-medium bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">Setting up your account...</span>
                </div>
              ) : (
                'Continue to Personal Info'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-slate-500 px-4 sm:px-0">
            You can change this selection later in your account settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilySetup;
