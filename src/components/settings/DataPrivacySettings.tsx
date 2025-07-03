
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
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dataCollection">Allow Data Collection</Label>
              <p className="text-sm text-slate-600">Help improve our services with usage data</p>
            </div>
            <Switch
              id="dataCollection"
              checked={settings.dataCollection}
              onCheckedChange={(checked) => updateSetting('dataCollection', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analyticsSharing">Analytics Sharing</Label>
              <p className="text-sm text-slate-600">Share anonymized analytics data</p>
            </div>
            <Switch
              id="analyticsSharing"
              checked={settings.analyticsSharing}
              onCheckedChange={(checked) => updateSetting('analyticsSharing', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="personalizedAds">Personalized Recommendations</Label>
              <p className="text-sm text-slate-600">Use your data to personalize content</p>
            </div>
            <Switch
              id="personalizedAds"
              checked={settings.personalizedAds}
              onCheckedChange={(checked) => updateSetting('personalizedAds', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="thirdPartySharing">Third-party Integration</Label>
              <p className="text-sm text-slate-600">Allow integrations with external services</p>
            </div>
            <Switch
              id="thirdPartySharing"
              checked={settings.thirdPartySharing}
              onCheckedChange={(checked) => updateSetting('thirdPartySharing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download My Data
          </Button>

          <Button variant="outline" className="w-full">
            View Privacy Policy
          </Button>

          <Button variant="outline" className="w-full">
            Manage Consent Preferences
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              These actions are permanent and cannot be undone.
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Clear All Data
          </Button>

          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            <Trash className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPrivacySettings;
