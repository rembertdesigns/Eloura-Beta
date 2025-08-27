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
    <div className="min-h-screen warm-gradient pb-20">
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Village</h1>
            <p className="text-gray-600">All the people in your support network - your village of care</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Send Message
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Village Member
            </Button>
          </div>
        </div>

        {/* Stats Cards - Now 3 equal width cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="care-circle" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="care-circle" className="text-base">Care Circle</TabsTrigger>
            <TabsTrigger value="delegations" className="text-base">Active Tasks</TabsTrigger>
            <TabsTrigger value="help-requests" className="text-base">Help Requests & Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="care-circle" className="space-y-6">
            <CareCircleEnhanced />
          </TabsContent>

          <TabsContent value="delegations" className="space-y-6">
            <ActiveTasksEnhanced />
          </TabsContent>

          <TabsContent value="help-requests" className="space-y-6">
            <HelpRequestsLogsEnhanced />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="md:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default Village;
