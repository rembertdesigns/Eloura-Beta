
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Clock, Target, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';
import PlannerHeader from '@/components/planner/PlannerHeader';
import WeekView from '@/components/planner/WeekView';
import MonthView from '@/components/planner/MonthView';
import GoalsView from '@/components/planner/GoalsView';
import { usePlannerInsightsData } from '@/hooks/usePlannerInsightsData';

const PlannerInsights = () => {
  const [activeTab, setActiveTab] = useState('week');
  const plannerData = usePlannerInsightsData();

  if (plannerData.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-sm sm:text-base">Loading insights...</span>
        </div>
      </div>
    );
  }

  if (plannerData.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-4 sm:p-6 max-w-md w-full">
          <CardContent>
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Insights</h3>
              <p className="text-muted-foreground mb-4 text-sm">{plannerData.error}</p>
              <button 
                onClick={plannerData.refetch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 touch-manipulation min-h-[44px]"
              >
                Try Again
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-4 max-w-7xl space-y-4 sm:space-y-6">
        <div className="px-2 sm:px-0">
          <PlannerHeader />
        </div>

        {/* Planner Tabs */}
        <Card className="shadow-lg sm:shadow-2xl">
          <CardContent className="p-4 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Mobile - Scrollable tabs */}
              <div className="sm:hidden overflow-x-auto mb-4">
                <TabsList className="flex w-max min-w-full h-auto">
                  <TabsTrigger value="week" className="text-xs whitespace-nowrap px-3 py-2 min-h-[44px]">Week View</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs whitespace-nowrap px-3 py-2 min-h-[44px]">Month View</TabsTrigger>
                  <TabsTrigger value="goals" className="text-xs whitespace-nowrap px-3 py-2 min-h-[44px]">Goals</TabsTrigger>
                </TabsList>
              </div>

              {/* Desktop - Standard tabs */}
              <div className="hidden sm:block">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="week" className="min-h-[44px]">Week View</TabsTrigger>
                  <TabsTrigger value="month" className="min-h-[44px]">Month View</TabsTrigger>
                  <TabsTrigger value="goals" className="min-h-[44px]">Goals</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="space-y-4">
                <TabsContent value="week" className="space-y-4 pb-safe">
                  <WeekView 
                    weekData={plannerData.weekData}
                    achievements={plannerData.achievements}
                    milestones={plannerData.milestones.filter(m => m.is_highlight)}
                    timeAllocation={plannerData.timeAllocation}
                    goals={plannerData.goals}
                    patterns={plannerData.patterns}
                    onSaveReflection={plannerData.saveReflection}
                  />
                </TabsContent>
                
                <TabsContent value="month" className="space-y-4 pb-safe">
                  <MonthView 
                    achievements={plannerData.achievements}
                    milestones={plannerData.milestones}
                    timeAllocation={plannerData.timeAllocation}
                    goals={plannerData.goals}
                    patterns={plannerData.patterns}
                    onSaveReflection={plannerData.saveReflection}
                  />
                </TabsContent>
                
                <TabsContent value="goals" className="space-y-4 pb-safe">
                  <GoalsView 
                    goals={plannerData.goals}
                    onUpdateProgress={plannerData.updateGoalProgress}
                    onAddGoal={plannerData.addGoal}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

      </div>
      
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default PlannerInsights;
