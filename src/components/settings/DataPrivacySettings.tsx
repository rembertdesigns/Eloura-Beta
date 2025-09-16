
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Download, Trash, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const DataPrivacySettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    dataCollection: true,
    analyticsSharing: false,
    personalizedAds: false,
    thirdPartySharing: false
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      'Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently remove all your data.'
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      // Delete user account using Supabase Auth
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        // If admin method fails, try user method
        const { error: userError } = await supabase.auth.updateUser({
          data: { deleted_at: new Date().toISOString() }
        });
        
        if (userError) throw userError;
        
        // Sign out the user
        await supabase.auth.signOut();
        
        toast({
          title: "Account Deactivated",
          description: "Your account has been deactivated. Contact support for permanent deletion.",
        });
      } else {
        toast({
          title: "Account Deleted",
          description: "Your account has been permanently deleted.",
        });
      }

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="dataCollection" className="text-sm font-medium">Allow Data Collection</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Help improve our services with usage data</p>
            </div>
            <Switch
              id="dataCollection"
              checked={settings.dataCollection}
              onCheckedChange={(checked) => updateSetting('dataCollection', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="analyticsSharing" className="text-sm font-medium">Analytics Sharing</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Share anonymized analytics data</p>
            </div>
            <Switch
              id="analyticsSharing"
              checked={settings.analyticsSharing}
              onCheckedChange={(checked) => updateSetting('analyticsSharing', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="personalizedAds" className="text-sm font-medium">Personalized Recommendations</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Use your data to personalize content</p>
            </div>
            <Switch
              id="personalizedAds"
              checked={settings.personalizedAds}
              onCheckedChange={(checked) => updateSetting('personalizedAds', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="thirdPartySharing" className="text-sm font-medium">Third-party Integration</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Allow integrations with external services</p>
            </div>
            <Switch
              id="thirdPartySharing"
              checked={settings.thirdPartySharing}
              onCheckedChange={(checked) => updateSetting('thirdPartySharing', checked)}
              className="flex-shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full h-11">
            <Download className="h-4 w-4 mr-2" />
            Download My Data
          </Button>

          <Button variant="outline" className="w-full h-11">
            View Privacy Policy
          </Button>

          <Button variant="outline" className="w-full h-11">
            Manage Consent Preferences
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              These actions are permanent and cannot be undone.
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full h-11 text-destructive border-destructive/20 hover:bg-destructive/10">
            Clear All Data
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-11 text-destructive border-destructive/20 hover:bg-destructive/10"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            <Trash className="h-4 w-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPrivacySettings;
