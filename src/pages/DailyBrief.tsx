
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Heart, Brain, Edit3, Pause } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';

const DailyBrief = () => {
  const [moodChecked, setMoodChecked] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const allTasks = [
    { id: 1, text: "Pick up Sarah from soccer practice", time: "3:30 PM", category: "childcare" },
    { id: 2, text: "Dad's blood pressure medication", time: "6:00 PM", category: "eldercare" },
    { id: 3, text: "Grocery shopping for dinner", time: "4:30 PM", category: "household" },
    { id: 4, text: "Finish quarterly report", time: "2:00 PM", category: "work" },
    { id: 5, text: "Schedule pediatrician appointment", time: "Morning", category: "childcare" },
    { id: 6, text: "Pick up prescription for Mom", time: "5:00 PM", category: "eldercare" }
  ];

  const getFilteredTasks = () => {
    if (activeFilter === 'all') return allTasks.slice(0, 3);
    return allTasks.filter(task => task.category === activeFilter).slice(0, 3);
  };

  const topTasks = getFilteredTasks();

  const aiSummary = "Good morning! Today looks manageable with 3 key priorities. Your energy seems focused on family coordination. Remember to take a moment for yourself between pickup and dinner prep.";

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen warm-gradient pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-light text-slate-800">
            Daily <span className="text-gradient-orange font-medium">Brief</span>
          </h1>
          <p className="text-slate-600">Your calm, personalized snapshot for today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Brief */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            <Card className="card-warm h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Brain className="h-5 w-5 text-green-600" />
                  Today's Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center">
                <p className="text-slate-600 leading-relaxed">{aiSummary}</p>
              </CardContent>
            </Card>

            {/* Top 3 Things Today */}
            <Card className="card-warm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Top 3 Things Today
                    {activeFilter !== 'all' && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {activeFilter}
                      </Badge>
                    )}
                  </span>
                  <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topTasks.length > 0 ? (
                  topTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-white/50">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                        <div>
                          <p className="text-slate-700 font-medium">{task.text}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={task.category === 'childcare' ? 'default' : task.category === 'eldercare' ? 'secondary' : 'outline'} 
                               className={task.category === 'childcare' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                                         task.category === 'eldercare' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : ''}>
                          {task.category}
                        </Badge>
                        <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">No tasks found for this filter</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Mood Check & Filters */}
          <div className="space-y-6">
            {/* Mood Check-in */}
            <Card className="card-warm h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Heart className="h-5 w-5 text-orange-500" />
                  How are you feeling?
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                {!moodChecked ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Energized', 'Calm', 'Overwhelmed', 'Tired'].map((mood) => (
                        <Button
                          key={mood}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMood(mood);
                            setMoodChecked(true);
                          }}
                          className="text-sm border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                        >
                          {mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">You're feeling: <span className="font-medium text-orange-600">{selectedMood}</span></p>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm text-slate-600">
                        {selectedMood === 'Overwhelmed' && "Remember: You don't have to do everything today. Focus on your top 3."}
                        {selectedMood === 'Tired' && "Be gentle with yourself. Consider delegating one task today."}
                        {selectedMood === 'Energized' && "Great energy today! Maybe tackle that task you've been putting off."}
                        {selectedMood === 'Calm' && "Wonderful! This peaceful energy will help you navigate today smoothly."}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Context Filters */}
            <Card className="card-warm">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleFilterClick('all')}
                >
                  📋 All Tasks
                </Button>
                <Button 
                  variant={activeFilter === 'childcare' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start border-green-200 hover:bg-green-50 hover:border-green-300"
                  onClick={() => handleFilterClick('childcare')}
                >
                  👶 Childcare Only
                </Button>
                <Button 
                  variant={activeFilter === 'eldercare' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                  onClick={() => handleFilterClick('eldercare')}
                >
                  👴 Eldercare Only
                </Button>
                <Button 
                  variant={activeFilter === 'household' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start border-green-200 hover:bg-green-50 hover:border-green-300"
                  onClick={() => handleFilterClick('household')}
                >
                  🏠 Household Tasks
                </Button>
                <Button 
                  variant={activeFilter === 'work' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                  onClick={() => handleFilterClick('work')}
                >
                  💼 Work Related
                </Button>
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
