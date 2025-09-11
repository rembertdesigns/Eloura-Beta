import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface MFAChallengeProps {
  onSuccess: () => void;
  onBack: () => void;
  userEmail?: string;
}

interface MFAFactor {
  id: string;
  friendly_name?: string;
  factor_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const MFAChallenge: React.FC<MFAChallengeProps> = ({ onSuccess, onBack, userEmail }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [challengeId, setChallengeId] = useState<string>('');
  const [mfaFactors, setMfaFactors] = useState<MFAFactor[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize MFA challenge on component mount
  useEffect(() => {
    initializeMFAChallenge();
  }, []);

  const initializeMFAChallenge = async () => {
    try {
      // Get available MFA factors
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;
      
      const totpFactors = factors?.totp || [];
      setMfaFactors(totpFactors as MFAFactor[]);
      
      if (totpFactors.length > 0) {
        // Create challenge for the first TOTP factor
        const { data, error } = await supabase.auth.mfa.challenge({ factorId: totpFactors[0].id });
        if (error) throw error;
        setChallengeId(data.id);
      }
    } catch (error: any) {
      toast({
        title: "Setup Error",
        description: "Failed to initialize MFA challenge",
        variant: "destructive",
      });
    }
  };

  const verifyMFA = async () => {
    if (verificationCode.length !== 6 || !challengeId) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.mfa.verify({
        factorId: mfaFactors[0]?.id || '',
        challengeId: challengeId,
        code: verificationCode,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Authentication successful",
      });
      
      onSuccess();
      navigate('/dashboard');
    } catch (error: any) {
      let errorMessage = "Invalid verification code";
      
      // Enhanced error handling for different scenarios
      if (error.message?.includes('rate_limit')) {
        errorMessage = "Too many attempts. Please wait before trying again.";
      } else if (error.message?.includes('expired')) {
        errorMessage = "Code has expired. Please generate a new one.";
      } else if (error.message?.includes('invalid_code')) {
        errorMessage = "Invalid code. Please check your authenticator app.";
      }

      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setVerificationCode('');
    } finally {
      setLoading(false);
    }
  };

  const verifyRecoveryCode = async () => {
    if (verificationCode.length < 6) return;

    try {
      setLoading(true);
      // For recovery codes, we'd typically need a different API endpoint
      // This is a simplified implementation
      toast({
        title: "Recovery Code",
        description: "Recovery code functionality requires additional server setup",
        variant: "destructive",
      });
      setLoading(false);
      return;

      toast({
        title: "Recovery Successful",
        description: "Logged in with recovery code",
      });
      
      onSuccess();
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Recovery Failed",
        description: "Invalid recovery code",
        variant: "destructive",
      });
      setVerificationCode('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (useRecoveryCode) {
      verifyRecoveryCode();
    } else {
      verifyMFA();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            {useRecoveryCode 
              ? "Enter one of your recovery codes"
              : `Enter the 6-digit code from your authenticator app${userEmail ? ` for ${userEmail}` : ''}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={useRecoveryCode ? 8 : 6}
              value={verificationCode}
              onChange={setVerificationCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                {useRecoveryCode && (
                  <>
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </>
                )}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {!useRecoveryCode && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setUseRecoveryCode(true)}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Lost your device? Use a recovery code
              </button>
            </div>
          )}

          {useRecoveryCode && (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Recovery codes are single-use</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUseRecoveryCode(false);
                  setVerificationCode('');
                }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Back to authenticator code
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={
                (useRecoveryCode && verificationCode.length < 6) ||
                (!useRecoveryCode && verificationCode.length !== 6) ||
                loading
              }
              className="flex-1"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MFAChallenge;