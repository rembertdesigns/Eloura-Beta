
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell } from 'lucide-react';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    dailyBrief: true,
    dailyBriefTime: '08:00',
    messageNotifications: true,
    careAlerts: true,
    villageActivity: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Daily Brief Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dailyBrief">Enable Daily Brief</Label>
              <p className="text-sm text-slate-600">Receive your personalized daily summary</p>
            </div>
            <Switch
              id="dailyBrief"
              checked={settings.dailyBrief}
              onCheckedChange={(checked) => updateSetting('dailyBrief', checked)}
            />
          </div>
          
          {settings.dailyBrief && (
            <div>
              <Label htmlFor="briefTime">Daily Brief Time</Label>
              <Select value={settings.dailyBriefTime} onValueChange={(value) => updateSetting('dailyBriefTime', value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="06:00">6:00 AM</SelectItem>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="08:00">8:00 AM</SelectItem>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>App Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="messageNotifications">Message Notifications</Label>
              <p className="text-sm text-slate-600">Get notified of new messages</p>
            </div>
            <Switch
              id="messageNotifications"
              checked={settings.messageNotifications}
              onCheckedChange={(checked) => updateSetting('messageNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="careAlerts">Smart Care Alerts</Label>
              <p className="text-sm text-slate-600">Important care reminders and alerts</p>
            </div>
            <Switch
              id="careAlerts"
              checked={settings.careAlerts}
              onCheckedChange={(checked) => updateSetting('careAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="villageActivity">Village Activity</Label>
              <p className="text-sm text-slate-600">Updates from your village community</p>
            </div>
            <Switch
              id="villageActivity"
              checked={settings.villageActivity}
              onCheckedChange={(checked) => updateSetting('villageActivity', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-slate-600">Receive notifications via email</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <p className="text-sm text-slate-600">Receive push notifications on your device</p>
            </div>
            <Switch
              id="pushNotifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
