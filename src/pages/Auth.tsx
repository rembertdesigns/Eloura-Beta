
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-6 shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to Eloura</h1>
          <p className="text-slate-600 text-lg">Sign in to start your compassionate caregiving journey</p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8 space-y-4">
            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Continue with Google</span>
              </div>
            </Button>
            
            {/* Apple Login */}
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group"
              onClick={() => handleSocialLogin('apple')}
              disabled={loading}
            >
              <div className="flex items-center gap-3">
                <Apple className="h-5 w-5 text-slate-700 group-hover:text-slate-900" />
                <span className="text-slate-700 group-hover:text-slate-900">Continue with Apple</span>
              </div>
            </Button>
            
            {/* Yahoo Login */}
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group"
              onClick={handleYahooLogin}
              disabled={loading}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded text-white text-xs flex items-center justify-center font-bold">
                  Y!
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Continue with Yahoo</span>
              </div>
            </Button>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#223b0a] hover:underline font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#223b0a] hover:underline font-medium">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
