
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
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-5 w-5" />
            Daily Brief Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="dailyBrief" className="text-sm font-medium">Enable Daily Brief</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Receive your personalized daily summary</p>
            </div>
            <Switch
              id="dailyBrief"
              checked={settings.dailyBrief}
              onCheckedChange={(checked) => updateSetting('dailyBrief', checked)}
              className="flex-shrink-0"
            />
          </div>
          
          {settings.dailyBrief && (
            <div className="space-y-2">
              <Label htmlFor="briefTime" className="text-sm font-medium">Daily Brief Time</Label>
              <Select value={settings.dailyBriefTime} onValueChange={(value) => updateSetting('dailyBriefTime', value)}>
                <SelectTrigger className="w-full h-11">
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
        <CardHeader className="pb-3">
          <CardTitle className="text-base">App Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="messageNotifications" className="text-sm font-medium">Message Notifications</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Get notified of new messages</p>
            </div>
            <Switch
              id="messageNotifications"
              checked={settings.messageNotifications}
              onCheckedChange={(checked) => updateSetting('messageNotifications', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="careAlerts" className="text-sm font-medium">Smart Care Alerts</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Important care reminders and alerts</p>
            </div>
            <Switch
              id="careAlerts"
              checked={settings.careAlerts}
              onCheckedChange={(checked) => updateSetting('careAlerts', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="villageActivity" className="text-sm font-medium">Village Activity</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Updates from your village community</p>
            </div>
            <Switch
              id="villageActivity"
              checked={settings.villageActivity}
              onCheckedChange={(checked) => updateSetting('villageActivity', checked)}
              className="flex-shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Delivery Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="emailNotifications" className="text-sm font-medium">Email Notifications</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Receive notifications via email</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="pushNotifications" className="text-sm font-medium">Push Notifications</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Receive push notifications on your device</p>
            </div>
            <Switch
              id="pushNotifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
              className="flex-shrink-0"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
