
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Settings as SettingsIcon } from 'lucide-react';
import AccountSettings from '@/components/settings/AccountSettings';
import FamilySettings from '@/components/settings/FamilySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SmartCareSettings from '@/components/settings/SmartCareSettings';
import AppPreferences from '@/components/settings/AppPreferences';
import VillageSettings from '@/components/settings/VillageSettings';
import ToolkitSettings from '@/components/settings/ToolkitSettings';
import DataPrivacySettings from '@/components/settings/DataPrivacySettings';
import FeatureFooter from '@/components/FeatureFooter';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1">
          <div className="container mx-auto p-4 md:p-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-2 rounded-xl">
                  <SettingsIcon className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-light text-gray-900">Settings</h1>
              </div>
              <p className="text-gray-600">Customize your Eloura experience</p>
            </div>

            {/* Settings Tabs */}
            <Card className="border-0 shadow-2xl">
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  {/* Mobile - Scrollable tabs */}
                  <div className="md:hidden overflow-x-auto">
                    <TabsList className="flex w-max min-w-full h-auto p-1 gap-1">
                      <TabsTrigger value="account" className="text-xs whitespace-nowrap px-3">Account</TabsTrigger>
                      <TabsTrigger value="family" className="text-xs whitespace-nowrap px-3">Family</TabsTrigger>
                      <TabsTrigger value="notifications" className="text-xs whitespace-nowrap px-3">Notifications</TabsTrigger>
                      <TabsTrigger value="smartcare" className="text-xs whitespace-nowrap px-3">AI Assistant</TabsTrigger>
                      <TabsTrigger value="app" className="text-xs whitespace-nowrap px-3">Preferences</TabsTrigger>
                      <TabsTrigger value="village" className="text-xs whitespace-nowrap px-3">Village</TabsTrigger>
                      <TabsTrigger value="toolkit" className="text-xs whitespace-nowrap px-3">Toolkit</TabsTrigger>
                      <TabsTrigger value="privacy" className="text-xs whitespace-nowrap px-3">Privacy & Data</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  {/* Desktop - Grid layout */}
                  <div className="hidden md:block">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1">
                      <TabsTrigger value="account" className="text-xs">Account</TabsTrigger>
                      <TabsTrigger value="family" className="text-xs">Family</TabsTrigger>
                      <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
                      <TabsTrigger value="smartcare" className="text-xs">AI Assistant</TabsTrigger>
                      <TabsTrigger value="app" className="text-xs">Preferences</TabsTrigger>
                      <TabsTrigger value="village" className="text-xs">Village</TabsTrigger>
                      <TabsTrigger value="toolkit" className="text-xs">Toolkit</TabsTrigger>
                      <TabsTrigger value="privacy" className="text-xs">Privacy & Data</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="account">
                    <AccountSettings />
                  </TabsContent>

                  <TabsContent value="family">
                    <FamilySettings />
                  </TabsContent>

                  <TabsContent value="notifications">
                    <NotificationSettings />
                  </TabsContent>

                  <TabsContent value="smartcare">
                    <SmartCareSettings />
                  </TabsContent>

                  <TabsContent value="app">
                    <AppPreferences />
                  </TabsContent>

                  <TabsContent value="village">
                    <VillageSettings />
                  </TabsContent>

                  <TabsContent value="toolkit">
                    <ToolkitSettings />
                  </TabsContent>

                  <TabsContent value="privacy">
                    <DataPrivacySettings />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </SidebarProvider>
  );
};

export default Settings;
