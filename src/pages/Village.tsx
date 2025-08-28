import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Heart, MessageSquare, UserPlus } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';
import CareCircleEnhanced from '@/components/village/CareCircleEnhanced';
import ActiveTasksEnhanced from '@/components/village/ActiveTasksEnhanced';
import HelpRequestsLogsEnhanced from '@/components/village/HelpRequestsLogsEnhanced';

const Village = () => {
  const stats = [
    {
      icon: Users,
      label: "Village Members",
      value: "8",
      color: "text-green-600"
    },
    {
      icon: Calendar,
      label: "Active Tasks",
      value: "12",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      label: "Open Requests",
      value: "3",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col h-full">
        {/* Header - Fixed height */}
        <div className="flex items-center justify-between py-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Village</h1>
            <p className="text-sm text-gray-600">All the people in your support network - your village of care</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4" />
              Send Message
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-sm">
              <UserPlus className="h-4 w-4" />
              Add Village Member
            </Button>
          </div>
        </div>

        {/* Stats Cards - Fixed height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 flex-shrink-0">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white border-0 shadow-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <IconComponent className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section - Flexible height */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="care-circle" className="w-full flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 flex-shrink-0">
              <TabsTrigger value="care-circle" className="text-sm">Care Circle</TabsTrigger>
              <TabsTrigger value="delegations" className="text-sm">Active Tasks</TabsTrigger>
              <TabsTrigger value="help-requests" className="text-sm">Help Requests & Logs</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="care-circle" className="h-full overflow-auto">
                <CareCircleEnhanced />
              </TabsContent>

              <TabsContent value="delegations" className="h-full overflow-auto">
                <ActiveTasksEnhanced />
              </TabsContent>

              <TabsContent value="help-requests" className="h-full overflow-auto">
                <HelpRequestsLogsEnhanced />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <div className="md:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default Village;
