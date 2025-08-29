
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Clock, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';
import PlannerHeader from '@/components/planner/PlannerHeader';
import WeekView from '@/components/planner/WeekView';
import MonthView from '@/components/planner/MonthView';
import GoalsView from '@/components/planner/GoalsView';
import TaskRating from '@/components/planner/TaskRating';
import MentalLoadForecast from '@/components/planner/MentalLoadForecast';

const PlannerInsights = () => {
  const [activeTab, setActiveTab] = useState('week');

  const timeTracking = {
    childcare: { hours: 35, percentage: 45, color: "bg-green-500" },
    eldercare: { hours: 20, percentage: 25, color: "bg-orange-500" },
    selfcare: { hours: 8, percentage: 10, color: "bg-purple-500" },
    household: { hours: 15, percentage: 20, color: "bg-blue-500" }
  };

  const insights = [
    { 
      type: "warning", 
      text: "Weekends average 8.5 tasks vs 5.2 on weekdays", 
      action: "Shift 2 errands to weekdays",
      source: "Based on your scheduled tasks over the past 4 weeks"
    },
    { 
      type: "success", 
      text: "Tuesday mornings have 85% completion rate", 
      action: "Keep this pattern",
      source: "Analysis of 12 Tuesday morning schedules"
    },
    { 
      type: "info", 
      text: "Outdoor activities rated 4.2/5 for mood improvement", 
      action: "Schedule more walks",
      source: "From your task ratings and completion feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6 pb-4 max-w-7xl space-y-6">
        <PlannerHeader />

        {/* Planner Tabs */}
        <Card className="shadow-2xl">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="week">Week View</TabsTrigger>
                <TabsTrigger value="month">Month View</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="week" className="space-y-4">
                <WeekView />
              </TabsContent>
              
              <TabsContent value="month" className="space-y-4">
                <MonthView />
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <GoalsView />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
      
      <div className="md:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default PlannerInsights;
