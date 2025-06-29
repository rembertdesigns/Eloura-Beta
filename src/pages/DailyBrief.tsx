
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Heart, Brain, Edit3, Pause, CheckCircle, User, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';

const DailyBrief = () => {
  const [moodChecked, setMoodChecked] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const topTasks = [
    { id: 1, text: "Pick up Sarah from soccer practice", time: "3:30 PM", category: "childcare" },
    { id: 2, text: "Dad's blood pressure medication", time: "6:00 PM", category: "eldercare" },
    { id: 3, text: "Grocery shopping for dinner", time: "4:30 PM", category: "general" }
  ];

  const aiOverviewPoints = [
    { icon: CheckCircle, text: "3 key priorities scheduled for today", color: "text-green-600" },
    { icon: User, text: "Family coordination is your main focus", color: "text-blue-600" },
    { icon: MapPin, text: "Remember self-care between activities", color: "text-orange-600" }
  ];

  const handleMoodSelection = (mood: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedMood(mood);
      setMoodChecked(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen warm-gradient pb-24">
      <Navigation />
      
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light text-slate-800">
            Daily <span className="text-gradient-orange font-medium">Brief</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your calm, personalized snapshot for today
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Flexible Width */}
          <div className="flex-1 space-y-8">
            {/* AI Summary with Visual Elements */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-6 px-8 pt-8">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                  <Brain className="h-6 w-6 text-green-600" />
                  Today's Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed text-base mb-6">
                    Good morning! Here's what your day looks like:
                  </p>
                  <div className="space-y-3">
                    {aiOverviewPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                        <point.icon className={`h-5 w-5 ${point.color}`} />
                        <span className="text-slate-700">{point.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Top 3 Things Today */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-6 px-8 pt-8">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                    <Calendar className="h-6 w-6 text-green-600" />
                    Top 3 Things Today
                  </span>
                  <Button variant="ghost" size="sm" className="hover:bg-orange-50 text-orange-600">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    topTasks.map((task, index) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-white/60 hover:bg-white/80 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-3 w-3 bg-orange-400 rounded-full"></div>
                            <span className="text-sm font-medium text-orange-600">#{index + 1}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-slate-700 font-medium text-base">{task.text}</p>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span className="font-mono">{task.time}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={task.category === 'childcare' ? 'default' : task.category === 'eldercare' ? 'secondary' : 'outline'} 
                            className={`text-xs font-medium px-3 py-1 ${
                              task.category === 'childcare' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 
                              task.category === 'eldercare' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200' : 
                              'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                            }`}
                          >
                            {task.category}
                          </Badge>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50">
                            <Pause className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Fixed Width */}
          <div className="w-full lg:w-80 space-y-8">
            {/* Enhanced Mood Check-in */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200 h-fit">
              <CardHeader className="pb-6 px-8 pt-8">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                  <Heart className="h-6 w-6 text-orange-500" />
                  How are you feeling?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {!moodChecked ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {['Energized', 'Calm', 'Overwhelmed', 'Tired'].map((mood) => (
                        <Button
                          key={mood}
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection(mood)}
                          disabled={isLoading}
                          className="text-sm font-medium py-3 px-4 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-200 disabled:opacity-50"
                        >
                          {isLoading ? '...' : mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-sm text-slate-600">
                        You're feeling: <span className="font-semibold text-orange-600">{selectedMood}</span>
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedMood === 'Overwhelmed' && "Remember: You don't have to do everything today. Focus on your top 3."}
                        {selectedMood === 'Tired' && "Be gentle with yourself. Consider delegating one task today."}
                        {selectedMood === 'Energized' && "Great energy today! Maybe tackle that task you've been putting off."}
                        {selectedMood === 'Calm' && "Wonderful! This peaceful energy will help you navigate today smoothly."}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setMoodChecked(false)}
                      className="w-full text-orange-600 hover:bg-orange-50"
                    >
                      Change mood
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Quick Filters */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-6 px-8 pt-8">
                <CardTitle className="text-xl font-semibold text-slate-700">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start py-3 px-4 border-2 border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200">
                    👶 Childcare Only
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start py-3 px-4 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-200">
                    👴 Eldercare Only
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start py-3 px-4 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200">
                    🏠 Household Tasks
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start py-3 px-4 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200">
                    💼 Work Related
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FeatureFooter />
    </div>
  );
};

export default DailyBrief;
