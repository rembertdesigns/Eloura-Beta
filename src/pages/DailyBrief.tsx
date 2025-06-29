
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
  const [activeFilter, setActiveFilter] = useState('all');

  const allTasks = [
    { id: 1, text: "Pick up Sarah from soccer practice", time: "3:30 PM", category: "childcare" },
    { id: 2, text: "Dad's blood pressure medication", time: "6:00 PM", category: "eldercare" },
    { id: 3, text: "Grocery shopping for dinner", time: "4:30 PM", category: "general" },
    { id: 4, text: "Emily's piano lesson", time: "4:00 PM", category: "childcare" },
    { id: 5, text: "Mom's doctor appointment", time: "2:00 PM", category: "eldercare" },
    { id: 6, text: "Team meeting", time: "10:00 AM", category: "work" },
    { id: 7, text: "Laundry and dishes", time: "7:00 PM", category: "household" }
  ];

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'childcare':
        return allTasks.filter(task => task.category === 'childcare').slice(0, 3);
      case 'eldercare':
        return allTasks.filter(task => task.category === 'eldercare').slice(0, 3);
      case 'household':
        return allTasks.filter(task => task.category === 'general').slice(0, 3);
      case 'work':
        return allTasks.filter(task => task.category === 'work').slice(0, 3);
      default:
        return allTasks.slice(0, 3);
    }
  };

  const topTasks = getFilteredTasks();

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

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen warm-gradient pb-24">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-800">
            Daily <span className="text-gradient-orange font-medium">Brief</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Your calm, personalized snapshot for today
          </p>
        </div>

        {/* Mobile: Single Column Stack, Desktop: Two Column */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile: Single Column Order */}
          <div className="flex flex-col lg:hidden space-y-6">
            {/* 1. Today's Overview - Mobile First */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-all duration-200 rounded-xl">
              <CardHeader className="pb-6 px-6 pt-6">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                  <Brain className="h-6 w-6 text-green-600" />
                  Today's Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed text-base mb-6">
                    Good morning! Here's what your day looks like:
                  </p>
                  <div className="space-y-3">
                    {aiOverviewPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white/60 rounded-xl">
                        <point.icon className={`h-5 w-5 ${point.color} shrink-0`} />
                        <span className="text-slate-700 text-base">{point.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. How are you feeling? - Mobile Second */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-all duration-200 rounded-xl">
              <CardHeader className="pb-6 px-6 pt-6">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                  <Heart className="h-6 w-6 text-orange-500" />
                  How are you feeling?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                {!moodChecked ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {['Energized', 'Calm', 'Overwhelmed', 'Tired'].map((mood) => (
                        <Button
                          key={mood}
                          variant="outline"
                          onClick={() => handleMoodSelection(mood)}
                          disabled={isLoading}
                          className="text-base font-medium py-6 px-4 h-auto min-h-[56px] border-2 border-orange-200 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-300 hover:text-orange-700 transition-all duration-200 disabled:opacity-50 rounded-xl"
                        >
                          {isLoading ? '...' : mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <p className="text-base text-slate-600">
                        You're feeling: <span className="font-semibold text-orange-600">{selectedMood}</span>
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-base text-slate-700 leading-relaxed">
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
                      className="w-full text-orange-600 hover:bg-orange-50 min-h-[48px] rounded-xl text-base"
                    >
                      Change mood
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 3. Top 3 Things Today - Mobile Third */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-all duration-200 rounded-xl">
              <CardHeader className="pb-6 px-6 pt-6">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                    <Calendar className="h-6 w-6 text-green-600" />
                    Top 3 Things Today
                  </span>
                  <Button variant="ghost" size="sm" className="hover:bg-orange-50 text-orange-600 h-10 w-10 p-0 rounded-lg">
                    <Edit3 className="h-5 w-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-20 bg-gray-200 rounded-xl"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    topTasks.map((task, index) => (
                      <div key={task.id} className="flex items-start justify-between p-5 bg-white/70 rounded-xl border border-white/60 hover:bg-white/80 transition-colors group shadow-sm min-h-[60px]">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="h-4 w-4 bg-orange-400 rounded-full"></div>
                            <span className="text-base font-medium text-orange-600">#{index + 1}</span>
                          </div>
                          <div className="space-y-2 flex-1 min-w-0">
                            <p className="text-slate-700 font-medium text-base leading-tight">{task.text}</p>
                            <div className="flex flex-col gap-2">
                              <p className="text-sm text-slate-500 flex items-center gap-2">
                                <Clock className="h-4 w-4 shrink-0" />
                                <span className="font-mono">{task.time}</span>
                              </p>
                              <Badge 
                                variant={task.category === 'childcare' ? 'default' : task.category === 'eldercare' ? 'secondary' : 'outline'} 
                                className={`text-xs font-medium px-3 py-1 w-fit rounded-full ${
                                  task.category === 'childcare' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 
                                  task.category === 'eldercare' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200' : 
                                  task.category === 'work' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200' :
                                  'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                                }`}
                              >
                                {task.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50 h-10 w-10 p-0 shrink-0 rounded-lg">
                          <Pause className="h-5 w-5" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 4. Quick Filters - Mobile Fourth */}
            <Card className="card-warm shadow-md hover:shadow-lg transition-all duration-200 rounded-xl">
              <CardHeader className="pb-6 px-6 pt-6">
                <CardTitle className="text-xl font-semibold text-slate-700">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFilterClick('childcare')}
                    className={`w-full justify-start py-6 px-4 h-auto min-h-[56px] border-2 transition-all duration-200 rounded-xl text-base ${
                      activeFilter === 'childcare' 
                        ? 'bg-green-100 border-green-300 text-green-700' 
                        : 'border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                    }`}
                  >
                    👶 Childcare Only
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFilterClick('eldercare')}
                    className={`w-full justify-start py-6 px-4 h-auto min-h-[56px] border-2 transition-all duration-200 rounded-xl text-base ${
                      activeFilter === 'eldercare' 
                        ? 'bg-orange-100 border-orange-300 text-orange-700' 
                        : 'border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700'
                    }`}
                  >
                    👴 Eldercare Only
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFilterClick('household')}
                    className={`w-full justify-start py-6 px-4 h-auto min-h-[56px] border-2 transition-all duration-200 rounded-xl text-base ${
                      activeFilter === 'household' 
                        ? 'bg-blue-100 border-blue-300 text-blue-700' 
                        : 'border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    🏠 Household Tasks
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFilterClick('work')}
                    className={`w-full justify-start py-6 px-4 h-auto min-h-[56px] border-2 transition-all duration-200 rounded-xl text-base ${
                      activeFilter === 'work' 
                        ? 'bg-purple-100 border-purple-300 text-purple-700' 
                        : 'border-purple-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
                    }`}
                  >
                    💼 Work Related
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:flex lg:flex-row gap-8 w-full">
            {/* Main Content - Desktop */}
            <div className="flex-1 space-y-8">
              {/* AI Summary - Desktop */}
              <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl">
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
                        <div key={index} className="flex items-center gap-3 p-4 bg-white/60 rounded-xl">
                          <point.icon className={`h-5 w-5 ${point.color} shrink-0`} />
                          <span className="text-slate-700 text-base">{point.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Combined Top 3 Things Today & Quick Filters - Desktop */}
              <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl">
                <CardHeader className="pb-6 px-8 pt-8">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-3 text-xl font-semibold text-slate-700">
                      <Calendar className="h-6 w-6 text-green-600" />
                      Top 3 Things Today
                    </span>
                    <Button variant="ghost" size="sm" className="hover:bg-orange-50 text-orange-600 h-9 w-9 p-0">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  {/* Filter buttons at the top */}
                  <div className="flex flex-wrap gap-3 mb-6 pb-4 border-b border-gray-200">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleFilterClick('all')}
                      className={`py-2 px-4 h-auto border-2 transition-all duration-200 rounded-lg text-sm ${
                        activeFilter === 'all' 
                          ? 'bg-slate-100 border-slate-300 text-slate-700' 
                          : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                      }`}
                    >
                      All Tasks
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleFilterClick('childcare')}
                      className={`py-2 px-4 h-auto border-2 transition-all duration-200 rounded-lg text-sm ${
                        activeFilter === 'childcare' 
                          ? 'bg-green-100 border-green-300 text-green-700' 
                          : 'border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                      }`}
                    >
                      👶 Childcare Only
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleFilterClick('eldercare')}
                      className={`py-2 px-4 h-auto border-2 transition-all duration-200 rounded-lg text-sm ${
                        activeFilter === 'eldercare' 
                          ? 'bg-orange-100 border-orange-300 text-orange-700' 
                          : 'border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700'
                      }`}
                    >
                      👴 Eldercare Only
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleFilterClick('household')}
                      className={`py-2 px-4 h-auto border-2 transition-all duration-200 rounded-lg text-sm ${
                        activeFilter === 'household' 
                          ? 'bg-blue-100 border-blue-300 text-blue-700' 
                          : 'border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                      }`}
                    >
                      🏠 Household Tasks
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleFilterClick('work')}
                      className={`py-2 px-4 h-auto border-2 transition-all duration-200 rounded-lg text-sm ${
                        activeFilter === 'work' 
                          ? 'bg-purple-100 border-purple-300 text-purple-700' 
                          : 'border-purple-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
                      }`}
                    >
                      💼 Work Related
                    </Button>
                  </div>

                  {/* Task list */}
                  <div className="space-y-4">
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-20 bg-gray-200 rounded-xl"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      topTasks.map((task, index) => (
                        <div key={task.id} className="flex items-start justify-between p-5 bg-white/70 rounded-xl border border-white/60 hover:bg-white/80 transition-colors group shadow-sm min-h-[60px]">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="h-4 w-4 bg-orange-400 rounded-full"></div>
                              <span className="text-base font-medium text-orange-600">#{index + 1}</span>
                            </div>
                            <div className="space-y-2 flex-1 min-w-0">
                              <p className="text-slate-700 font-medium text-base leading-tight">{task.text}</p>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                  <Clock className="h-4 w-4 shrink-0" />
                                  <span className="font-mono">{task.time}</span>
                                </p>
                                <Badge 
                                  variant={task.category === 'childcare' ? 'default' : task.category === 'eldercare' ? 'secondary' : 'outline'} 
                                  className={`text-xs font-medium px-3 py-1 w-fit rounded-full ${
                                    task.category === 'childcare' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 
                                    task.category === 'eldercare' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200' : 
                                    task.category === 'work' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200' :
                                    'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                                  }`}
                                >
                                  {task.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50 h-10 w-10 p-0 shrink-0 rounded-lg">
                            <Pause className="h-5 w-5" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Desktop */}
            <div className="w-80 space-y-8">
              {/* How are you feeling? - Desktop */}
              <Card className="card-warm shadow-md hover:shadow-lg transition-shadow duration-200 h-fit rounded-xl">
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
                            onClick={() => handleMoodSelection(mood)}
                            disabled={isLoading}
                            className="text-base font-medium py-6 px-4 h-auto min-h-[56px] border-2 border-orange-200 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-300 hover:text-orange-700 transition-all duration-200 disabled:opacity-50 rounded-xl"
                          >
                            {isLoading ? '...' : mood}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <p className="text-base text-slate-600">
                          You're feeling: <span className="font-semibold text-orange-600">{selectedMood}</span>
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-base text-slate-700 leading-relaxed">
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
                        className="w-full text-orange-600 hover:bg-orange-50 min-h-[48px] rounded-xl text-base"
                      >
                        Change mood
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <FeatureFooter />
    </div>
  );
};

export default DailyBrief;
