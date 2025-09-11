
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Settings as SettingsIcon, ChevronLeft } from 'lucide-react';
import AccountSettings from '@/components/settings/AccountSettings';
import FamilySettings from '@/components/settings/FamilySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SmartCareSettings from '@/components/settings/SmartCareSettings';
import AppPreferences from '@/components/settings/AppPreferences';
import VillageSettings from '@/components/settings/VillageSettings';
import ToolkitSettings from '@/components/settings/ToolkitSettings';
import DataPrivacySettings from '@/components/settings/DataPrivacySettings';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();

  const settingsTabs = [
    { id: 'account', label: 'Account', shortLabel: 'Account' },
    { id: 'family', label: 'Family', shortLabel: 'Family' },
    { id: 'notifications', label: 'Notifications', shortLabel: 'Alerts' },
    { id: 'smartcare', label: 'AI Assistant', shortLabel: 'AI' },
    { id: 'app', label: 'Preferences', shortLabel: 'Prefs' },
    { id: 'village', label: 'Village', shortLabel: 'Village' },
    { id: 'toolkit', label: 'Toolkit', shortLabel: 'Tools' },
    { id: 'privacy', label: 'Privacy & Data', shortLabel: 'Privacy' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1">
          <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
            {/* Mobile Header with Back Button */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/dashboard')}
                className="touch-manipulation min-h-[44px] min-w-[44px]"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-2 rounded-xl">
                  <SettingsIcon className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-light text-gray-900">Settings</h1>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-2 rounded-xl">
                  <SettingsIcon className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-light text-gray-900">Settings</h1>
              </div>
              <p className="text-gray-600">Customize your Eloura experience</p>
            </div>

            {/* Settings Tabs */}
            <Card className="border-0 shadow-lg sm:shadow-2xl">
              <CardContent className="p-4 sm:pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
                  {/* Mobile - Scrollable tabs */}
                  <div className="sm:hidden overflow-x-auto">
                    <TabsList className="flex w-max min-w-full h-auto p-1 gap-1">
                      {settingsTabs.map((tab) => (
                        <TabsTrigger 
                          key={tab.id}
                          value={tab.id} 
                          className="text-xs whitespace-nowrap px-2 py-2 min-h-[40px] text-center"
                        >
                          {tab.shortLabel}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  {/* Tablet - 4 columns */}
                  <div className="hidden sm:block md:hidden">
                    <TabsList className="grid w-full grid-cols-4 h-auto p-1 gap-1">
                      {settingsTabs.map((tab) => (
                        <TabsTrigger 
                          key={tab.id}
                          value={tab.id} 
                          className="text-xs p-2 min-h-[44px] text-center"
                        >
                          {tab.shortLabel}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {/* Desktop - 8 columns */}
                  <div className="hidden md:block">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 gap-1">
                      {settingsTabs.map((tab) => (
                        <TabsTrigger 
                          key={tab.id}
                          value={tab.id} 
                          className="text-xs p-2 min-h-[44px] text-center"
                        >
                          <span className="lg:hidden">{tab.shortLabel}</span>
                          <span className="hidden lg:inline">{tab.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <div className="pb-safe">
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
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
