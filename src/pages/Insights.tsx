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
      <div className="container mx-auto px-4 pt-6 pb-4 max-w-7xl space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Insights</h1>
          <p className="text-gray-600">Analyze your patterns and optimize your family life</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Tracking */}
          <Card className="shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-gray-700">
                <Clock className="h-5 w-5 text-green-600" />
                Time Spent This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(timeTracking).length > 0 ? (
                Object.entries(timeTracking).map(([category, data]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="capitalize font-medium text-gray-700">{category}</span>
                      <span className="text-sm text-gray-500">{data.hours}h ({data.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${data.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No time tracking data available yet.</p>
                  <p className="text-sm mt-1">Start logging time for activities to see your breakdown.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Patterns & Insights */}
          <Card className="shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-gray-700">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Patterns & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.length > 0 ? (
                insights.map((insight, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg space-y-2 bg-gray-50">
                    <div className="flex items-start gap-2">
                      {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                      {insight.type === 'success' && <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />}
                      {insight.type === 'info' && <BarChart3 className="h-4 w-4 text-blue-500 mt-0.5" />}
                       <div className="flex-1">
                         <p className="text-sm text-gray-700">{insight.text}</p>
                         <p className="text-sm text-gray-500 mt-1">
                           <strong>Action:</strong> {insight.action}
                         </p>
                         <p className="text-xs text-gray-400 mt-1 italic">{insight.source}</p>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No insights available yet.</p>
                  <p className="text-sm mt-1">Complete more tasks and activities to generate personalized insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mental Load Forecast */}
        <MentalLoadForecast />

        {/* Stress Patterns */}
        <Card className="shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-700">Stress Patterns & Recommendations</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Based on task completion rates and your stress ratings</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stressPatterns.map((pattern, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    pattern.type === 'high' 
                      ? 'bg-red-50 border-red-100' 
                      : pattern.type === 'smooth' 
                      ? 'bg-green-50 border-green-100' 
                      : 'bg-orange-50 border-orange-100'
                  }`}
                >
                  <h4 className={`font-medium ${
                    pattern.type === 'high' 
                      ? 'text-red-700'
                      : pattern.type === 'smooth' 
                      ? 'text-green-700' 
                      : 'text-orange-700'
                  }`}>
                    {pattern.type === 'high' ? 'High Stress Times' : 
                     pattern.type === 'smooth' ? 'Smooth Periods' : 
                     'Current Week Load'}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    pattern.type === 'high' 
                      ? 'text-red-600'
                      : pattern.type === 'smooth' 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {pattern.period}: {pattern.rating}
                  </p>
                  <p className={`text-xs mt-2 ${
                    pattern.type === 'high' 
                      ? 'text-red-500'
                      : pattern.type === 'smooth' 
                      ? 'text-green-500' 
                      : 'text-orange-500'
                  }`}>
                    {pattern.description}
                  </p>
                  <p className={`text-xs mt-1 ${
                    pattern.type === 'high' 
                      ? 'text-red-400'
                      : pattern.type === 'smooth' 
                      ? 'text-green-400' 
                      : 'text-orange-400'
                  }`}>
                    {pattern.recommendation}
                  </p>
                </div>
              ))}
              {stressPatterns.length === 0 && (
                <div className="col-span-3 text-center text-gray-500 py-8">
                  <p>Not enough data yet to analyze stress patterns.</p>
                  <p className="text-sm mt-1">Complete more tasks to see personalized insights.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;