import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, TrendingUp, AlertTriangle, BarChart3, Loader2 } from 'lucide-react';
import MentalLoadForecast from '@/components/planner/MentalLoadForecast';
import { useInsightsData } from '@/hooks/useInsightsData';

const Insights = () => {
  const { timeTracking, insights, stressPatterns, loading, error, refetch } = useInsightsData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading insights...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <CardContent>
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Insights</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button 
                onClick={refetch}
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
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">Insights</h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Analytics and patterns to optimize your well-being</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-4 pb-2 max-w-7xl space-y-3 md:space-y-4">
        <div>
          <p className="text-sm md:text-base text-gray-600">Analyze your patterns and optimize your family life</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {/* Time Tracking */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {timeTracking && Array.isArray(timeTracking) && timeTracking.length > 0 ? (
                <div className="space-y-2">
                  {timeTracking.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-xs md:text-sm text-gray-700">{item.task || 'Task'}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.time || 0}min
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm md:text-base">No time tracking data yet.</p>
                  <p className="text-xs md:text-sm mt-1">Complete tasks to see time insights.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Smart Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {insights && Array.isArray(insights) && insights.length > 0 ? (
                <div className="space-y-2">
                  {insights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs md:text-sm text-blue-900">{insight.category || 'Insight'}</p>
                      <p className="text-xs text-blue-600 mt-1">{insight.type || 'General'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm md:text-base">No insights available yet.</p>
                  <p className="text-xs md:text-sm mt-1">Use the app more to generate personalized insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-3">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="forecast" className="hidden sm:block">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm md:text-base">Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-sm md:text-base">Overview coming soon</p>
                    <p className="text-xs md:text-sm mt-1">Weekly patterns and trends will appear here.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm md:text-base">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-sm md:text-base">Metrics coming soon</p>
                    <p className="text-xs md:text-sm mt-1">Your performance data will be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm md:text-base">Detailed Time Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {timeTracking && Array.isArray(timeTracking) && timeTracking.length > 0 ? (
                  <div className="space-y-3">
                    {timeTracking.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">{item.task || 'Task'}</span>
                          <p className="text-xs text-gray-600">{item.category || 'General'}</p>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {item.time || 0}min
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm md:text-base">No time data available</p>
                    <p className="text-xs md:text-sm mt-1">Complete tasks to see detailed time analysis.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stress">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm md:text-base">Stress Patterns</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {stressPatterns && Array.isArray(stressPatterns) && stressPatterns.length > 0 ? (
                  <div className="space-y-3">
                    {stressPatterns.map((pattern, index) => (
                      <div key={index} className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-orange-900">{pattern.category || 'Stress source'}</span>
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                            {pattern.severity || 'Medium'}
                          </Badge>
                        </div>
                        <p className="text-xs text-orange-700">{pattern.recommendation || 'Take regular breaks to manage stress.'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm md:text-base">Not enough data yet to analyze stress patterns.</p>
                    <p className="text-xs md:text-sm mt-1">Complete more tasks to see personalized insights.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm md:text-base">Mental Load Forecast</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <MentalLoadForecast />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insights;