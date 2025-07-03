
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Settings, Download, Upload } from 'lucide-react';

const AppPreferences = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    autoSync: true,
    offlineMode: false,
    compactView: false,
    animations: true
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compactView">Compact View</Label>
              <p className="text-sm text-slate-600">Show more content in less space</p>
            </div>
            <Switch
              id="compactView"
              checked={settings.compactView}
              onCheckedChange={(checked) => updateSetting('compactView', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="animations">Enable Animations</Label>
              <p className="text-sm text-slate-600">Smooth transitions and effects</p>
            </div>
            <Switch
              id="animations"
              checked={settings.animations}
              onCheckedChange={(checked) => updateSetting('animations', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Sync</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoSync">Auto Sync</Label>
              <p className="text-sm text-slate-600">Automatically sync data across devices</p>
            </div>
            <Switch
              id="autoSync"
              checked={settings.autoSync}
              onCheckedChange={(checked) => updateSetting('autoSync', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offlineMode">Offline Mode</Label>
              <p className="text-sm text-slate-600">Cache data for offline access</p>
            </div>
            <Switch
              id="offlineMode"
              checked={settings.offlineMode}
              onCheckedChange={(checked) => updateSetting('offlineMode', checked)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Backup Data
            </Button>
            <Button variant="outline" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Restore Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPreferences;
