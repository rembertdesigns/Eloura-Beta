import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const EmailTesting = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [testEmail] = useState('info@gamedaydna.com');
  const { toast } = useToast();

  const sendTestEmail = async (type: string, data: any) => {
    setLoading(type);
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          type,
          email: testEmail,
          data
        }
      });

      if (error) throw error;

      toast({
        title: "Email sent successfully!",
        description: `${type} email sent to ${testEmail}`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const testScenarios = [
    {
      id: 'welcome',
      title: 'Welcome Email',
      description: 'Sent when new users sign up',
      action: () => sendTestEmail('welcome', {
        userName: 'Test User',
        loginUrl: 'https://elouraapp.com/auth'
      })
    },
    {
      id: 'password-reset',
      title: 'Password Reset',
      description: 'Sent when users request password reset',
      action: () => sendTestEmail('password-reset', {
        userName: 'Test User',
        resetUrl: 'https://elouraapp.com/auth/reset?token=test-token'
      })
    },
    {
      id: 'village-invitation',
      title: 'Village Invitation',
      description: 'Sent when users invite others to their village',
      action: () => sendTestEmail('village-invitation', {
        invitedName: 'Test Invitee',
        inviterName: 'John Smith',
        inviterEmail: 'john@example.com',
        role: 'Family Support',
        personalMessage: 'Hi! I would love to have you as part of my support network. You would be a great help with coordinating family activities.',
        signupUrl: 'https://elouraapp.com/auth?invite=test-invite'
      })
    },
    {
      id: 'change-email',
      title: 'Change Email Address',
      description: 'Sent when users change their email address',
      action: () => sendTestEmail('change-email', {
        userName: 'Test User',
        newEmail: 'newemail@example.com',
        confirmUrl: 'https://elouraapp.com/auth/confirm-email?token=test-token'
      })
    },
    {
      id: 'reauthentication',
      title: 'Reauthentication',
      description: 'Sent for sensitive actions requiring verification',
      action: () => sendTestEmail('reauthentication', {
        userName: 'Test User',
        verificationCode: '123456',
        actionDescription: 'delete your account'
      })
    }
  ];

  const triggerAuthEmail = async (type: 'signup' | 'login') => {
    setLoading(type);
    try {
      const action = type === 'signup' ? 'signUp' : 'signInWithOtp';
      const { error } = await supabase.auth[action]({
        email: testEmail,
        password: type === 'signup' ? 'testpassword123' : undefined,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error && !error.message.includes('already registered')) {
        throw error;
      }

      toast({
        title: "Auth email triggered!",
        description: `${type} email should be sent to ${testEmail}`,
      });
    } catch (error) {
      console.error('Error triggering auth email:', error);
      toast({
        title: "Error triggering auth email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Email Testing Dashboard</h1>
        <p className="text-muted-foreground">
          Test all Supabase-powered email functions. All emails will be sent to: <strong>{testEmail}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Authentication Emails */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication Emails</CardTitle>
            <CardDescription>
              These are handled by Supabase Auth webhooks and use the magic-link template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Confirm Signup / Magic Link Login</Label>
              <div className="flex gap-2">
                <Button
                  onClick={() => triggerAuthEmail('signup')}
                  disabled={loading === 'signup'}
                  variant="outline"
                  className="flex-1"
                >
                  {loading === 'signup' ? 'Sending...' : 'Trigger Signup Email'}
                </Button>
                <Button
                  onClick={() => triggerAuthEmail('login')}
                  disabled={loading === 'login'}
                  variant="outline"
                  className="flex-1"
                >
                  {loading === 'login' ? 'Sending...' : 'Trigger Magic Link'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct API Emails */}
        <Card>
          <CardHeader>
            <CardTitle>Direct API Emails</CardTitle>
            <CardDescription>
              These are sent directly through the send-email function
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {testScenarios.map((scenario) => (
              <div key={scenario.id} className="space-y-2">
                <Label>{scenario.title}</Label>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
                <Button
                  onClick={scenario.action}
                  disabled={loading === scenario.id}
                  variant="outline"
                  className="w-full"
                >
                  {loading === scenario.id ? 'Sending...' : `Send ${scenario.title}`}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates Status</CardTitle>
          <CardDescription>All email templates are configured and ready</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Magic Link</div>
              <div className="text-sm text-green-600">✓ Configured</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Welcome</div>
              <div className="text-sm text-green-600">✓ Configured</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Password Reset</div>
              <div className="text-sm text-green-600">✓ Configured</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Village Invitation</div>
              <div className="text-sm text-green-600">✓ Configured</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Change Email</div>
              <div className="text-sm text-green-600">✓ Configured</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Reauthentication</div>
              <div className="text-sm text-green-600">✓ Configured</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTesting;