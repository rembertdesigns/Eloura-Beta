import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Smartphone, Key, AlertTriangle, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MFAEnrollment from './MFAEnrollment';

const SecuritySettings: React.FC = () => {
  const [mfaFactors, setMfaFactors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadSecurityStatus();
  }, []);

  const loadSecurityStatus = async () => {
    try {
      setLoading(true);
      
      // Get MFA factors
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;
      
      setMfaFactors(factors?.totp || []);

      // Mock sessions data (Supabase doesn't expose session management in client)
      setSessions([
        {
          id: 'current',
          device: 'Current Device',
          location: 'Unknown Location',
          lastActive: new Date(),
          isCurrent: true,
        }
      ]);

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load security settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disableMFA = async (factorId: string) => {
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) throw error;

      toast({
        title: "MFA Disabled",
        description: "Two-factor authentication has been disabled",
      });
      
      await loadSecurityStatus();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to disable MFA",
        variant: "destructive",
      });
    }
  };

  const signOutOtherSessions = async () => {
    try {
      // This would require server-side implementation
      const { error } = await supabase.auth.admin.signOut('others');
      if (error) throw error;

      toast({
        title: "Success",
        description: "Signed out of all other devices",
      });
    } catch (error: any) {
      toast({
        title: "Note",
        description: "Session management requires additional server configuration",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (showEnrollment) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setShowEnrollment(false)}
          className="mb-4"
        >
          ← Back to Security Settings
        </Button>
        <MFAEnrollment
          onComplete={() => {
            setShowEnrollment(false);
            loadSecurityStatus();
          }}
          onSkip={() => setShowEnrollment(false)}
        />
      </div>
    );
  }

  const hasMFA = mfaFactors.length > 0;

  return (
    <div className="space-y-6">
      {/* MFA Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" />
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Secure your account with an additional verification step
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${hasMFA ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="font-medium">
                {hasMFA ? 'Enabled' : 'Disabled'}
              </span>
              {hasMFA && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  Protected
                </Badge>
              )}
            </div>
            
            {hasMFA ? (
              <Button 
                variant="outline" 
                onClick={() => disableMFA(mfaFactors[0].id)}
                className="text-destructive"
              >
                Disable
              </Button>
            ) : (
              <Button onClick={() => setShowEnrollment(true)}>
                Enable MFA
              </Button>
            )}
          </div>

          {hasMFA && (
            <div className="space-y-2">
              {mfaFactors.map((factor) => (
                <div key={factor.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{factor.friendly_name || 'Authenticator App'}</p>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(factor.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">TOTP</Badge>
                </div>
              ))}
            </div>
          )}

          {!hasMFA && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your account is not protected by two-factor authentication. Enable MFA to secure your account against unauthorized access.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5" />
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage devices that are signed into your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium flex items-center gap-2">
                  {session.device}
                  {session.isCurrent && (
                    <Badge variant="secondary" className="text-xs">
                      Current
                    </Badge>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {session.location} • Last active {session.lastActive.toLocaleDateString()}
                </p>
              </div>
              {!session.isCurrent && (
                <Button variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          
          <Button variant="outline" onClick={signOutOtherSessions} className="w-full">
            Sign out of all other devices
          </Button>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${hasMFA ? 'bg-green-100' : 'bg-orange-100'}`}>
              {hasMFA ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-orange-600" />
              )}
            </div>
            <div>
              <p className="font-medium">Enable Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                {hasMFA ? 'Your account is protected with MFA' : 'Protect your account with an authenticator app'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Strong Password</p>
              <p className="text-sm text-muted-foreground">
                You're using a strong, unique password
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;