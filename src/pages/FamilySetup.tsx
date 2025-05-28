
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Heart, Users, Baby, UserCheck } from 'lucide-react';
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
      id: 'raising-children',
      title: 'Raising Children',
      description: 'Supporting families with young children and parenting challenges',
      icon: Baby,
    },
    {
      id: 'aging-parents',
      title: 'Caring for Aging Parents',
      description: 'Helping with elderly care and senior support needs',
      icon: UserCheck,
    },
    {
      id: 'sandwich-generation',
      title: 'Sandwich Generation',
      description: 'Managing both childcare and eldercare responsibilities',
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
      
      const { error } = await supabase
        .from('profiles')
        .update({ family_type: selectedType })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome to Eloura!",
        description: "Your account has been set up successfully",
      });

      navigate('/');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-6 shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Family Type</h1>
          <p className="text-slate-600 text-lg max-w-md mx-auto">
            Help us personalize your Eloura experience by selecting what best describes your caregiving situation
          </p>
        </div>

        {/* Family Types Card */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8">
            <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-4">
              {familyTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = selectedType === type.id;
                
                return (
                  <div 
                    key={type.id} 
                    className={`relative flex items-center space-x-4 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-[#223b0a] bg-[#223b0a]/5 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <RadioGroupItem 
                      value={type.id} 
                      id={type.id}
                      className={`mt-1 ${isSelected ? 'border-[#223b0a] text-[#223b0a]' : ''}`}
                    />
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-xl transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-[#223b0a] text-white' 
                          : 'bg-[#a8e6ff]/20 text-[#223b0a]'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <Label 
                          htmlFor={type.id} 
                          className={`text-lg font-semibold cursor-pointer transition-colors duration-200 ${
                            isSelected ? 'text-[#223b0a]' : 'text-slate-900'
                          }`}
                        >
                          {type.title}
                        </Label>
                        <p className="text-slate-600 mt-1 leading-relaxed">{type.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
            
            <Button
              onClick={handleContinue}
              disabled={loading || !selectedType}
              className="w-full mt-8 h-14 text-lg font-medium bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Setting up your account...
                </div>
              ) : (
                'Continue to Dashboard'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            You can change this selection later in your account settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilySetup;
