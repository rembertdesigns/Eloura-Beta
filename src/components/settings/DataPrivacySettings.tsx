
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Download, Trash, AlertTriangle } from 'lucide-react';

const DataPrivacySettings = () => {
  const [settings, setSettings] = useState({
    dataCollection: true,
    analyticsSharing: false,
    personalizedAds: false,
    thirdPartySharing: false
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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

          <Button variant="outline" className="w-full h-11 text-destructive border-destructive/20 hover:bg-destructive/10">
            <Trash className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPrivacySettings;
