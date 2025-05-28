
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
    <div className="min-h-screen bg-gradient-to-br from-[#a8e6ff]/30 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-3 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-[#223b0a]">Choose Your Family Type</CardTitle>
          <CardDescription>
            Help us personalize your Eloura experience by selecting what best describes your caregiving situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-4">
            {familyTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <div key={type.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-[#a8e6ff]/20 p-2 rounded-lg">
                      <IconComponent className="h-6 w-6 text-[#223b0a]" />
                    </div>
                    <div>
                      <Label htmlFor={type.id} className="text-base font-medium cursor-pointer">
                        {type.title}
                      </Label>
                      <p className="text-sm text-slate-600">{type.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
          
          <Button
            onClick={handleContinue}
            disabled={loading || !selectedType}
            className="w-full mt-6 bg-[#223b0a] hover:bg-[#1a2e08] text-white py-6"
          >
            {loading ? 'Setting up your account...' : 'Continue to Dashboard'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilySetup;
