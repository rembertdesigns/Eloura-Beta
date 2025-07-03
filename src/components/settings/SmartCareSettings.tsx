
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Assistant Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="personality">Assistant Personality</Label>
            <Select value={settings.aiPersonality} onValueChange={(value) => updateSetting('aiPersonality', value)}>
              <SelectTrigger className="w-full mt-1">
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

          <div>
            <Label htmlFor="responseLength">Response Length</Label>
            <Select value={settings.responseLength} onValueChange={(value) => updateSetting('responseLength', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief & To the Point</SelectItem>
                <SelectItem value="medium">Medium Detail</SelectItem>
                <SelectItem value="detailed">Detailed Explanations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Response Speed vs Accuracy</Label>
            <div className="mt-2 mb-2">
              <Slider
                value={settings.responseSpeed}
                onValueChange={(value) => updateSetting('responseSpeed', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Faster</span>
              <span>More Accurate</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Care Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="proactiveReminders">Proactive Reminders</Label>
              <p className="text-sm text-slate-600">AI suggests reminders based on your routine</p>
            </div>
            <Switch
              id="proactiveReminders"
              checked={settings.proactiveReminders}
              onCheckedChange={(checked) => updateSetting('proactiveReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="medicationReminders">Medication Reminders</Label>
              <p className="text-sm text-slate-600">Reminders for medications and supplements</p>
            </div>
            <Switch
              id="medicationReminders"
              checked={settings.medicationReminders}
              onCheckedChange={(checked) => updateSetting('medicationReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
              <p className="text-sm text-slate-600">Reminders for upcoming appointments</p>
            </div>
            <Switch
              id="appointmentReminders"
              checked={settings.appointmentReminders}
              onCheckedChange={(checked) => updateSetting('appointmentReminders', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Health Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="healthMonitoring">Enable Health Monitoring</Label>
              <p className="text-sm text-slate-600">Track health metrics and patterns</p>
            </div>
            <Switch
              id="healthMonitoring"
              checked={settings.healthMonitoring}
              onCheckedChange={(checked) => updateSetting('healthMonitoring', checked)}
            />
          </div>

          <Button variant="outline" className="w-full">
            Connect Health Devices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartCareSettings;
