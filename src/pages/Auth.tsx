
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Chrome, Mail, Shield, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MFAChallenge from '@/components/auth/MFAChallenge';
import MFAEnrollment from '@/components/auth/MFAEnrollment';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStep, setAuthStep] = useState<'credentials' | 'mfa-challenge' | 'mfa-enrollment'>('credentials');
  const [rateLimitInfo, setRateLimitInfo] = useState<{ attempts: number; resetTime?: Date } | null>(null);
  const [userRiskLevel, setUserRiskLevel] = useState<'low' | 'high'>('low');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for rate limiting on component mount
  useEffect(() => {
    const checkRateLimit = () => {
      const attempts = parseInt(localStorage.getItem('auth_attempts') || '0');
      const lastAttempt = localStorage.getItem('auth_last_attempt');
      const emailAttempts = parseInt(localStorage.getItem(`auth_attempts_${email}`) || '0');
      
      // Set risk level based on overall and email-specific attempts
      if (attempts >= 3 || emailAttempts >= 2) {
        setUserRiskLevel('high');
      } else {
        setUserRiskLevel('low');
      }
      
      if (attempts >= 5 && lastAttempt) {
        const lastAttemptTime = new Date(lastAttempt);
        const resetTime = new Date(lastAttemptTime.getTime() + 15 * 60 * 1000); // 15 minutes
        
        if (new Date() < resetTime) {
          setRateLimitInfo({ attempts, resetTime });
        } else {
          // Reset rate limit
          localStorage.removeItem('auth_attempts');
          localStorage.removeItem('auth_last_attempt');
          localStorage.removeItem(`auth_attempts_${email}`);
        }
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [email]);

  const trackFailedAttempt = () => {
    const attempts = parseInt(localStorage.getItem('auth_attempts') || '0') + 1;
    const emailAttempts = parseInt(localStorage.getItem(`auth_attempts_${email}`) || '0') + 1;
    
    localStorage.setItem('auth_attempts', attempts.toString());
    localStorage.setItem(`auth_attempts_${email}`, emailAttempts.toString());
    localStorage.setItem('auth_last_attempt', new Date().toISOString());
    
    // Update risk level for future attempts
    if (attempts >= 3 || emailAttempts >= 2) {
      setUserRiskLevel('high');
    }
    
    if (attempts >= 5) {
      const resetTime = new Date(Date.now() + 15 * 60 * 1000);
      setRateLimitInfo({ attempts, resetTime });
    }
  };

  const clearRateLimit = () => {
    localStorage.removeItem('auth_attempts');
    localStorage.removeItem('auth_last_attempt');
    localStorage.removeItem(`auth_attempts_${email}`);
    setRateLimitInfo(null);
    setUserRiskLevel('low');
  };

  const getEnhancedErrorMessage = (error: any, isSignupFlow: boolean = false) => {
    const message = error.message.toLowerCase();
    
    if (message.includes('rate_limit') || message.includes('too_many_requests')) {
      return "Too many login attempts. Please wait 15 minutes before trying again.";
    } else if (message.includes('weak_password') || message.includes('pwned')) {
      return "This password is too weak or commonly used. Please choose a stronger password.";
    } else if (message.includes('invalid_credentials')) {
      return "Invalid email or password. Please check your credentials and try again.";
    } else if (message.includes('email_not_confirmed')) {
      return "Please check your email and click the verification link before signing in.";
    } else if (message.includes('signup_disabled')) {
      return "New account registration is currently disabled. Please contact support.";
    } else if (message.includes('captcha') || message.includes('hcaptcha')) {
      if (isSignupFlow) {
        return "Please complete the security verification to create your account.";
      } else {
        return "For security, please complete the verification. This happens when we detect unusual activity.";
      }
    } else if (message.includes('bot_like_activity') || message.includes('suspicious_activity')) {
      return "We've detected unusual activity. Please try again or contact support if this persists.";
    } else if (message.includes('challenge_required')) {
      return "Additional verification required. Please complete the security challenge.";
    }
    
    return error.message;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit
    if (rateLimitInfo && rateLimitInfo.resetTime && new Date() < rateLimitInfo.resetTime) {
      const waitTime = Math.ceil((rateLimitInfo.resetTime.getTime() - Date.now()) / (1000 * 60));
      toast({
        title: "Rate Limited",
        description: `Too many attempts. Please wait ${waitTime} minutes.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/welcome`,
          },
        });

        if (error) {
          trackFailedAttempt();
          toast({
            title: "Sign Up Failed",
            description: getEnhancedErrorMessage(error, true),
            variant: "destructive",
          });
        } else {
          clearRateLimit();
          toast({
            title: "Account Created!",
            description: "Check your email to verify your account before signing in.",
          });
        }
      } else {
        // Show info toast for high-risk signin attempts
        if (userRiskLevel === 'high') {
          toast({
            title: "Security Notice", 
            description: "Due to previous failed attempts, additional verification may be required for sign-in.",
            variant: "default",
          });
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          trackFailedAttempt();
          toast({
            title: "Sign In Failed",
            description: getEnhancedErrorMessage(error, false),
            variant: "destructive",
          });
        } else {
          clearRateLimit();
          
          // Check if MFA is required
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            // Parse the JWT token to check AAL level
            const tokenPayload = JSON.parse(atob(session.access_token.split('.')[1]));
            if (tokenPayload.aal === 'aal1') {
              // Check if user has MFA factors
              const { data: factors } = await supabase.auth.mfa.listFactors();
              if (factors?.totp && factors.totp.length > 0) {
                setAuthStep('mfa-challenge');
                return;
              }
            }
          }
          
          toast({
            title: "Welcome back!",
            description: "Redirecting to your dashboard...",
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      trackFailedAttempt();
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
    if (rateLimitInfo && rateLimitInfo.resetTime && new Date() < rateLimitInfo.resetTime) {
      const waitTime = Math.ceil((rateLimitInfo.resetTime.getTime() - Date.now()) / (1000 * 60));
      toast({
        title: "Rate Limited",
        description: `Too many attempts. Please wait ${waitTime} minutes.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        trackFailedAttempt();
        toast({
          title: "OAuth Error",
          description: getEnhancedErrorMessage(error, false),
          variant: "destructive",
        });
      }
    } catch (error) {
      trackFailedAttempt();
      toast({
        title: "Error",
        description: "An unexpected error occurred with social login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle MFA success
  const handleMFASuccess = () => {
    clearRateLimit();
    setAuthStep('credentials');
    navigate('/dashboard');
  };

  // Handle back to credentials
  const handleBackToCredentials = () => {
    setAuthStep('credentials');
  };

  // Render MFA Challenge
  if (authStep === 'mfa-challenge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
        <MFAChallenge
          onSuccess={handleMFASuccess}
          onBack={handleBackToCredentials}
          userEmail={email}
        />
      </div>
    );
  }

  // Render MFA Enrollment
  if (authStep === 'mfa-enrollment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
        <MFAEnrollment
          onComplete={() => {
            setAuthStep('credentials');
            navigate('/dashboard');
          }}
          onSkip={() => {
            setAuthStep('credentials');
            navigate('/dashboard');
          }}
        />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-6 shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">Welcome to Eloura</h1>
          <p className="text-slate-600 text-base sm:text-lg px-4">Sign in to start your compassionate caregiving journey</p>
        </div>

        {/* Security Alerts */}
        {rateLimitInfo && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Too many failed attempts. Access temporarily restricted until{' '}
              {rateLimitInfo.resetTime?.toLocaleTimeString()} for security.
            </AlertDescription>
          </Alert>
        )}

        {/* Security Notice for High-Risk Users */}
        {userRiskLevel === 'high' && !isSignUp && !rateLimitInfo && (
          <Alert className="mb-6 border-yellow-500 bg-yellow-50">
            <Shield className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Additional security verification may be required due to previous failed sign-in attempts. 
              This helps protect your account and typically takes just a few seconds.
            </AlertDescription>
          </Alert>
        )}

        {/* Auth Card */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isSignUp ? 'Join our caregiving community' : 'Welcome back to Eloura'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-8 space-y-4">
            {/* Email/Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 sm:h-14 text-base touch-manipulation"
                  autoComplete="email"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 sm:h-14 text-base touch-manipulation"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 sm:h-14 text-base bg-[#223b0a] hover:bg-[#223b0a]/90 touch-manipulation font-medium"
                disabled={loading || (rateLimitInfo?.resetTime && new Date() < rateLimitInfo.resetTime)}
              >
                <Mail className="h-4 w-4 mr-2" />
                {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')} with Email
              </Button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center py-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm sm:text-base text-[#223b0a] hover:underline font-medium min-h-[44px] px-4 touch-manipulation"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                <span className="bg-white px-4 text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              {/* Google Login - Official Google Style */}
              <Button
                className="w-full h-14 sm:h-16 text-base font-medium bg-white hover:bg-gray-50 text-[#3c4043] border border-[#dadce0] hover:border-[#d2e3fc] transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation"
                onClick={() => handleSocialLogin('google')}
                disabled={loading || (rateLimitInfo?.resetTime && new Date() < rateLimitInfo.resetTime)}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Security Notice */}
        <div className="text-center mt-6 px-4">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-2">
            <Shield className="w-3 h-3" />
            <span>Protected by enterprise-grade security</span>
          </div>
          <p className="text-xs text-slate-500">
            Two-factor authentication • End-to-end encryption • SOC 2 compliance
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 px-4">
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="https://elouraapp.com/terms" className="text-[#223b0a] hover:underline font-medium touch-manipulation">Terms of Service</a>
            {' '}and{' '}
            <a href="https://elouraapp.com/privacy" className="text-[#223b0a] hover:underline font-medium touch-manipulation">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
