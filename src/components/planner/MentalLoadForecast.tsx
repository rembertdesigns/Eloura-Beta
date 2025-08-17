import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const MentalLoadForecast = () => {
  const [forecastDays] = useState(7);

  const forecastData = [
    {
      date: 'Today',
      day: 'Mon',
      load: 8.2,
      level: 'high',
      tasks: 7,
      categories: ['childcare', 'household', 'eldercare'],
      recommendations: ['Consider moving 2 household tasks to tomorrow', 'Schedule a 15-min break between tasks']
    },
    {
      date: 'Tomorrow',
      day: 'Tue',
      load: 6.1,
      level: 'medium',
      tasks: 5,
      categories: ['childcare', 'selfcare'],
      recommendations: ['Good day to add that doctor appointment', 'Perfect time for meal prep']
    },
    {
      date: 'Wed',
      day: 'Wed',
      load: 4.3,
      level: 'low',
      tasks: 3,
      categories: ['selfcare', 'household'],
      recommendations: ['Light day - great for self-care', 'Consider scheduling something you enjoy']
    },
    {
      date: 'Thu',
      day: 'Thu',
      load: 7.8,
      level: 'high',
      tasks: 6,
      categories: ['eldercare', 'childcare', 'household'],
      recommendations: ['Heavy elder care day', 'Prep meals the night before']
    },
    {
      date: 'Fri',
      day: 'Fri',
      load: 5.5,
      level: 'medium',
      tasks: 4,
      categories: ['childcare', 'household'],
      recommendations: ['Balanced day', 'Good for routine tasks']
    },
    {
      date: 'Sat',
      day: 'Sat',
      load: 3.2,
      level: 'low',
      tasks: 2,
      categories: ['selfcare'],
      recommendations: ['Weekend recovery time', 'Focus on what energizes you']
    },
    {
      date: 'Sun',
      day: 'Sun',
      load: 2.8,
      level: 'low',
      tasks: 2,
      categories: ['selfcare', 'household'],
      recommendations: ['Light prep for next week', 'Rest and recharge']
    }
  ];

  const getLoadColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLoadIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const categoryColors = {
    childcare: 'bg-green-500',
    eldercare: 'bg-orange-500',
    selfcare: 'bg-purple-500',
    household: 'bg-blue-500'
  };

  const weeklyAverage = forecastData.reduce((sum, day) => sum + day.load, 0) / forecastData.length;

  return (
    <Card className="card-warm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <Brain className="h-5 w-5 text-purple-600" />
          Mental Load Forecast ({forecastDays} Days)
        </CardTitle>
        <p className="text-sm text-slate-500">
          Predicted mental load based on your patterns and scheduled tasks
        </p>
        <div className="flex items-center gap-4 pt-2">
          <div className="text-sm text-slate-600">
            Weekly Average: <span className="font-semibold">{weeklyAverage.toFixed(1)}/10</span>
          </div>
          <Badge variant="outline" className="text-slate-600">
            {weeklyAverage < 4 ? 'Light Week' : weeklyAverage < 7 ? 'Balanced Week' : 'Heavy Week'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Daily Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {forecastData.map((day, index) => (
                <div key={index} className="p-4 border border-white/50 rounded-lg bg-white/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-700">{day.date}</h4>
                      <p className="text-sm text-slate-500">{day.day}</p>
                    </div>
                    <Badge className={getLoadColor(day.level)} variant="outline">
                      {getLoadIcon(day.level)}
                      {day.load.toFixed(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Tasks:</span>
                      <span className="font-medium">{day.tasks}</span>
                    </div>
                    
                    <div className="flex gap-1">
                      {day.categories.map((category, catIndex) => (
                        <div
                          key={catIndex}
                          className={`w-3 h-3 rounded ${categoryColors[category as keyof typeof categoryColors]}`}
                          title={category}
                        />
                      ))}
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          day.level === 'high' ? 'bg-red-500' :
                          day.level === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(day.load / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            {forecastData.filter(day => day.recommendations.length > 0).map((day, index) => (
              <div key={index} className="p-4 border border-white/50 rounded-lg bg-white/30">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium text-slate-700">{day.date} ({day.day})</h4>
                  <Badge className={getLoadColor(day.level)} variant="outline">
                    {day.level} load
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {day.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MentalLoadForecast;