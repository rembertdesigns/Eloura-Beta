
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Clock, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';
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
    <div className="min-h-screen warm-gradient pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        <PlannerHeader />

        {/* Planner Tabs */}
        <Card className="card-warm">
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

        {/* Insights Section - Only show for Week tab */}
        {activeTab === 'week' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time Tracking */}
              <Card className="card-warm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-slate-700">
                    <Clock className="h-5 w-5 text-green-600" />
                    Time Spent This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(timeTracking).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium text-slate-700">{category}</span>
                        <span className="text-sm text-slate-500">{data.hours}h ({data.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`${data.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Patterns & Insights */}
              <Card className="card-warm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-slate-700">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Patterns & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => (
                    <div key={index} className="p-3 border border-white/50 rounded-lg space-y-2 bg-white/40">
                      <div className="flex items-start gap-2">
                        {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                        {insight.type === 'success' && <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />}
                        {insight.type === 'info' && <BarChart3 className="h-4 w-4 text-blue-500 mt-0.5" />}
                         <div className="flex-1">
                           <p className="text-sm text-slate-700">{insight.text}</p>
                           <p className="text-sm text-slate-500 mt-1">
                             <strong>Action:</strong> {insight.action}
                           </p>
                           <p className="text-xs text-slate-400 mt-1 italic">{insight.source}</p>
                         </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Task Rating Section */}
            <TaskRating />

            {/* Mental Load Forecast */}
            <MentalLoadForecast />

            {/* Stress Patterns */}
            <Card className="card-warm">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Stress Patterns & Recommendations</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Based on task completion rates and your stress ratings</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50/80 rounded-lg border border-red-100">
                    <h4 className="font-medium text-red-700">High Stress Times</h4>
                    <p className="text-sm text-red-600 mt-1">Tuesday mornings (7-9 AM)</p>
                    <p className="text-xs text-red-500 mt-2">6 tasks scheduled, avg rating 2.1/5</p>
                    <p className="text-xs text-red-400 mt-1">Consider spreading tasks across the week</p>
                  </div>
                  <div className="p-4 bg-green-50/80 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-700">Smooth Periods</h4>
                    <p className="text-sm text-green-600 mt-1">Thursday afternoons</p>
                    <p className="text-xs text-green-500 mt-2">3 tasks scheduled, avg rating 4.3/5</p>
                    <p className="text-xs text-green-400 mt-1">Perfect for scheduling new appointments</p>
                  </div>
                  <div className="p-4 bg-orange-50/80 rounded-lg border border-orange-100">
                    <h4 className="font-medium text-orange-700">Current Week Load</h4>
                    <p className="text-sm text-orange-600 mt-1">This week: High</p>
                    <p className="text-xs text-orange-500 mt-2">8 tasks planned, above average</p>
                    <p className="text-xs text-orange-400 mt-1">See detailed forecast below</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <FeatureFooter />
    </div>
  );
};

export default PlannerInsights;
