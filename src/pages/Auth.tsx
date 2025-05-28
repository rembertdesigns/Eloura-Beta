
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Chrome, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/family-setup`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
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

  const handleYahooLogin = async () => {
    toast({
      title: "Coming Soon",
      description: "Yahoo login will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a8e6ff]/30 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-3 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-[#223b0a]">Welcome to Eloura</CardTitle>
          <CardDescription>
            Sign in to start your compassionate caregiving journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-3 py-6"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
          >
            <Chrome className="h-5 w-5 text-blue-500" />
            Continue with Google
          </Button>
          
          <Button
            variant="outline"
            className="w-full flex items-center gap-3 py-6"
            onClick={() => handleSocialLogin('apple')}
            disabled={loading}
          >
            <Apple className="h-5 w-5 text-gray-800" />
            Continue with Apple
          </Button>
          
          <Button
            variant="outline"
            className="w-full flex items-center gap-3 py-6"
            onClick={handleYahooLogin}
            disabled={loading}
          >
            <div className="w-5 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
              Y!
            </div>
            Continue with Yahoo
          </Button>
          
          <div className="text-center text-sm text-slate-600 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
