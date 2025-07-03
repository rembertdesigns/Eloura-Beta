
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FolderOpen, Database } from 'lucide-react';

const ToolkitSettings = () => {
  const [settings, setSettings] = useState({
    autoOrganize: true,
    cloudStorage: true,
    documentScanning: true,
    smartTags: true
  });

  const [categories] = useState([
    { id: 'medical', name: 'Medical Records', enabled: true },
    { id: 'financial', name: 'Financial Documents', enabled: true },
    { id: 'legal', name: 'Legal Documents', enabled: true },
    { id: 'insurance', name: 'Insurance', enabled: true },
    { id: 'education', name: 'Education', enabled: false },
    { id: 'personal', name: 'Personal Documents', enabled: true }
  ]);

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Organization Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoOrganize">Auto-organize Documents</Label>
              <p className="text-sm text-slate-600">Automatically categorize new documents</p>
            </div>
            <Switch
              id="autoOrganize"
              checked={settings.autoOrganize}
              onCheckedChange={(checked) => updateSetting('autoOrganize', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smartTags">Smart Tags</Label>
              <p className="text-sm text-slate-600">AI-powered document tagging</p>
            </div>
            <Switch
              id="smartTags"
              checked={settings.smartTags}
              onCheckedChange={(checked) => updateSetting('smartTags', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="documentScanning">Document Scanning</Label>
              <p className="text-sm text-slate-600">OCR text extraction from images</p>
            </div>
            <Switch
              id="documentScanning"
              checked={settings.documentScanning}
              onCheckedChange={(checked) => updateSetting('documentScanning', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} checked={category.enabled} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Storage Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="cloudStorage">Cloud Storage Sync</Label>
              <p className="text-sm text-slate-600">Sync documents to cloud storage</p>
            </div>
            <Switch
              id="cloudStorage"
              checked={settings.cloudStorage}
              onCheckedChange={(checked) => updateSetting('cloudStorage', checked)}
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm text-slate-600 mb-2">Storage Usage</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-[#223b0a] h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">2.3 GB of 5 GB used</p>
          </div>

          <Button variant="outline" className="w-full">
            Manage Storage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolkitSettings;
