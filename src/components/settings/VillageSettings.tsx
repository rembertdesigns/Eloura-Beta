
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Shield, Eye } from 'lucide-react';

const VillageSettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'village',
    allowMessages: true,
    shareCalendar: false,
    shareLocation: false,
    autoJoinGroups: false,
    communityNotifications: true
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select value={settings.profileVisibility} onValueChange={(value) => updateSetting('profileVisibility', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="village">Village Members Only</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allowMessages">Allow Messages</Label>
              <p className="text-sm text-slate-600">Let village members send you messages</p>
            </div>
            <Switch
              id="allowMessages"
              checked={settings.allowMessages}
              onCheckedChange={(checked) => updateSetting('allowMessages', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="shareCalendar">Share Calendar</Label>
              <p className="text-sm text-slate-600">Share your availability with village</p>
            </div>
            <Switch
              id="shareCalendar"
              checked={settings.shareCalendar}
              onCheckedChange={(checked) => updateSetting('shareCalendar', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="shareLocation">Share Location</Label>
              <p className="text-sm text-slate-600">Share your general location for local connections</p>
            </div>
            <Switch
              id="shareLocation"
              checked={settings.shareLocation}
              onCheckedChange={(checked) => updateSetting('shareLocation', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Participation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoJoinGroups">Auto-join Suggested Groups</Label>
              <p className="text-sm text-slate-600">Automatically join groups based on your interests</p>
            </div>
            <Switch
              id="autoJoinGroups"
              checked={settings.autoJoinGroups}
              onCheckedChange={(checked) => updateSetting('autoJoinGroups', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="communityNotifications">Community Notifications</Label>
              <p className="text-sm text-slate-600">Get notified of community events and updates</p>
            </div>
            <Switch
              id="communityNotifications"
              checked={settings.communityNotifications}
              onCheckedChange={(checked) => updateSetting('communityNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VillageSettings;
