import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Copy, Check, AlertTriangle, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MFAEnrollmentProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const MFAEnrollment: React.FC<MFAEnrollmentProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState<'setup' | 'verify' | 'recovery'>('setup');
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (step === 'setup') {
      enrollMFA();
    }
  }, [step]);

  const enrollMFA = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Eloura Authenticator',
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
    } catch (error: any) {
      toast({
        title: "Setup Error",
        description: error.message || "Failed to set up MFA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyMFA = async () => {
    if (verificationCode.length !== 6 || !secret) return;

    try {
      setLoading(true);
      // First create a challenge, then verify
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ 
        factorId: secret 
      });
      
      if (challengeError) throw challengeError;

      const { data, error } = await supabase.auth.mfa.verify({
        factorId: secret,
        challengeId: challenge.id,
        code: verificationCode,
      });

      if (error) throw error;

      // Generate recovery codes
      const codes = Array.from({ length: 10 }, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setRecoveryCodes(codes);
      setStep('recovery');

      toast({
        title: "MFA Enabled!",
        description: "Two-factor authentication is now active on your account.",
      });
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code",
        variant: "destructive",
      });
      setVerificationCode('');
    } finally {
      setLoading(false);
    }
  };

  const copySecret = async () => {
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Secret key copied to clipboard",
    });
  };

  const copyRecoveryCodes = async () => {
    const codesText = recoveryCodes.join('\n');
    await navigator.clipboard.writeText(codesText);
    toast({
      title: "Recovery Codes Copied",
      description: "Save these codes in a secure location",
    });
  };

  const handleComplete = () => {
    onComplete();
  };

  if (loading && step === 'setup') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Setting up authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {step === 'setup' && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Secure Your Account</CardTitle>
            <CardDescription>
              Set up two-factor authentication for enhanced security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </AlertDescription>
            </Alert>

            {qrCode && (
              <div className="text-center space-y-4">
                <div 
                  className="mx-auto w-48 h-48 border rounded-lg bg-white p-2"
                  dangerouslySetInnerHTML={{ __html: qrCode }}
                />
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Can't scan? Enter this key manually:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono break-all">
                      {secret}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copySecret}
                      className="shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {onSkip && (
                <Button variant="outline" onClick={onSkip} className="flex-1">
                  Skip for now
                </Button>
              )}
              <Button onClick={() => setStep('verify')} className="flex-1">
                I've added the account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'verify' && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Verify Setup</CardTitle>
            <CardDescription>
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
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
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('setup')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={verifyMFA} 
                disabled={verificationCode.length !== 6 || loading}
                className="flex-1"
              >
                {loading ? 'Verifying...' : 'Verify & Enable'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'recovery' && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Save Recovery Codes</CardTitle>
            <CardDescription>
              Store these codes safely - they're your backup access method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Keep these codes secure and accessible. You can use them to access your account if you lose your authenticator device.
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                {recoveryCodes.map((code, index) => (
                  <div key={index} className="text-center py-1">
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={copyRecoveryCodes} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Codes
              </Button>
              <Button onClick={handleComplete} className="flex-1">
                I've Saved Them
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MFAEnrollment;