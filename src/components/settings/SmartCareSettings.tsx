
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Clock } from 'lucide-react';

const SmartCareSettings = () => {
  const [settings, setSettings] = useState({
    aiPersonality: 'caring',
    responseLength: 'medium',
    proactiveReminders: true,
    healthMonitoring: true,
    medicationReminders: true,
    appointmentReminders: true,
    responseSpeed: [75]
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-5 w-5" />
            AI Assistant Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="personality" className="text-sm font-medium">Assistant Personality</Label>
            <Select value={settings.aiPersonality} onValueChange={(value) => updateSetting('aiPersonality', value)}>
              <SelectTrigger className="w-full h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="caring">Caring & Supportive</SelectItem>
                <SelectItem value="professional">Professional & Direct</SelectItem>
                <SelectItem value="friendly">Friendly & Casual</SelectItem>
                <SelectItem value="concise">Concise & Efficient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responseLength" className="text-sm font-medium">Response Length</Label>
            <Select value={settings.responseLength} onValueChange={(value) => updateSetting('responseLength', value)}>
              <SelectTrigger className="w-full h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief & To the Point</SelectItem>
                <SelectItem value="medium">Medium Detail</SelectItem>
                <SelectItem value="detailed">Detailed Explanations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Response Speed vs Accuracy</Label>
            <div className="px-3 py-4">
              <Slider
                value={settings.responseSpeed}
                onValueChange={(value) => updateSetting('responseSpeed', value)}
                max={100}
                step={1}
                className="w-full touch-manipulation"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>Faster</span>
              <span>More Accurate</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-5 w-5" />
            Care Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="proactiveReminders" className="text-sm font-medium">Proactive Reminders</Label>
              <p className="text-xs text-muted-foreground mt-0.5">AI suggests reminders based on your routine</p>
            </div>
            <Switch
              id="proactiveReminders"
              checked={settings.proactiveReminders}
              onCheckedChange={(checked) => updateSetting('proactiveReminders', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="medicationReminders" className="text-sm font-medium">Medication Reminders</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Reminders for medications and supplements</p>
            </div>
            <Switch
              id="medicationReminders"
              checked={settings.medicationReminders}
              onCheckedChange={(checked) => updateSetting('medicationReminders', checked)}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="appointmentReminders" className="text-sm font-medium">Appointment Reminders</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Reminders for upcoming appointments</p>
            </div>
            <Switch
              id="appointmentReminders"
              checked={settings.appointmentReminders}
              onCheckedChange={(checked) => updateSetting('appointmentReminders', checked)}
              className="flex-shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-5 w-5" />
            Health Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            <div className="flex-1">
              <Label htmlFor="healthMonitoring" className="text-sm font-medium">Enable Health Monitoring</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Track health metrics and patterns</p>
            </div>
            <Switch
              id="healthMonitoring"
              checked={settings.healthMonitoring}
              onCheckedChange={(checked) => updateSetting('healthMonitoring', checked)}
              className="flex-shrink-0"
            />
          </div>

          <Button variant="outline" className="w-full h-11 mt-4 touch-manipulation">
            Connect Health Devices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartCareSettings;
