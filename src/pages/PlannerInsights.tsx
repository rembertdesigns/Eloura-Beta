
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, BarChart3, Clock, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import Navigation from '@/components/Navigation';

const PlannerInsights = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar');

  const weeklyGoal = {
    current: "Get more help with evening routines",
    progress: 60,
    suggestions: ["Ask Sarah to handle bedtime stories", "Move bath time earlier", "Prep clothes night before"]
  };

  const timeTracking = {
    childcare: { hours: 35, percentage: 45, color: "bg-blue-500" },
    eldercare: { hours: 20, percentage: 25, color: "bg-green-500" },
    selfcare: { hours: 8, percentage: 10, color: "bg-purple-500" },
    household: { hours: 15, percentage: 20, color: "bg-yellow-500" }
  };

  const insights = [
    { type: "warning", text: "Weekends are 40% more overloaded than weekdays", action: "Shift 2 errands to weekdays" },
    { type: "success", text: "Tuesday mornings flow smoothly when nurse visits", action: "Keep this pattern" },
    { type: "info", text: "Dad's mood improves on days with outdoor activities", action: "Schedule more walks" }
  ];

  const upcomingEvents = [
    { time: "9:00 AM", event: "Dad's doctor appointment", type: "eldercare", date: "Today" },
    { time: "3:30 PM", event: "Kids soccer practice pickup", type: "childcare", date: "Today" },
    { time: "10:00 AM", event: "Home health aide visit", type: "eldercare", date: "Tomorrow" },
    { time: "2:00 PM", event: "Parent-teacher conference", type: "childcare", date: "Friday" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-light text-slate-800">
            Planner & <span className="font-medium text-emerald-600">Insights</span>
          </h1>
          <p className="text-slate-600">Visual insights into what's working and what needs attention</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <Button 
              variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button 
              variant={viewMode === 'insights' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('insights')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Insights
            </Button>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-700">Care Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-slate-700">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-700">{event.event}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time} • {event.date}
                          </p>
                        </div>
                        <Badge variant={event.type === 'childcare' ? 'default' : 'secondary'}>
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Goal */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-slate-700">
                    <Target className="h-5 w-5 text-green-500" />
                    This Week's Goal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-slate-600">{weeklyGoal.current}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{weeklyGoal.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${weeklyGoal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-700">Suggestions:</p>
                    {weeklyGoal.suggestions.map((suggestion, index) => (
                      <p key={index} className="text-sm text-slate-600">• {suggestion}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time Tracking */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Clock className="h-5 w-5 text-blue-500" />
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

            {/* Insights & Patterns */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Patterns & Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-start gap-2">
                      {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                      {insight.type === 'success' && <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />}
                      {insight.type === 'info' && <BarChart3 className="h-4 w-4 text-blue-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">{insight.text}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          <strong>Action:</strong> {insight.action}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Behavior Trends */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Stress Patterns & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-700">High Stress Times</h4>
                    <p className="text-sm text-red-600 mt-1">Tuesday mornings (7-9 AM)</p>
                    <p className="text-xs text-red-500 mt-2">Consider adjusting visiting nurse schedule</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-700">Smooth Periods</h4>
                    <p className="text-sm text-green-600 mt-1">Thursday afternoons</p>
                    <p className="text-xs text-green-500 mt-2">Good time for personal appointments</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-700">Overloaded Days</h4>
                    <p className="text-sm text-blue-600 mt-1">Saturdays</p>
                    <p className="text-xs text-blue-500 mt-2">Move 2 errands to weekday evenings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlannerInsights;
