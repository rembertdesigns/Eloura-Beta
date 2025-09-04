
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading insights...</span>
        </div>
      </div>
    );
  }

  if (plannerData.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <CardContent>
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Insights</h3>
              <p className="text-muted-foreground mb-4">{plannerData.error}</p>
              <button 
                onClick={plannerData.refetch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
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
              
              <TabsContent value="month" className="space-y-4">
                <MonthView 
                  achievements={plannerData.achievements}
                  milestones={plannerData.milestones}
                  timeAllocation={plannerData.timeAllocation}
                  goals={plannerData.goals}
                  patterns={plannerData.patterns}
                  onSaveReflection={plannerData.saveReflection}
                />
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <GoalsView 
                  goals={plannerData.goals}
                  onUpdateProgress={plannerData.updateGoalProgress}
                />
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
