
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Heart, Brain, Edit3, Pause, CheckCircle, User, MapPin, AlertTriangle, Target, TrendingUp, CalendarDays } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';

const DailyBrief = () => {
  const [moodChecked, setMoodChecked] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const allTasks = [
    { id: 1, text: "Pick up Sarah from soccer practice", time: "3:30 PM", category: "childcare", completed: false, urgent: false },
    { id: 2, text: "Dad's blood pressure medication", time: "6:00 PM", category: "eldercare", completed: true, urgent: false },
    { id: 3, text: "Grocery shopping for dinner", time: "4:30 PM", category: "general", completed: false, urgent: false },
    { id: 4, text: "Emily's piano lesson", time: "4:00 PM", category: "childcare", completed: false, urgent: false },
    { id: 5, text: "Mom's doctor appointment", time: "2:00 PM", category: "eldercare", completed: false, urgent: false },
    { id: 6, text: "Team meeting", time: "10:00 AM", category: "work", completed: true, urgent: false },
    { id: 7, text: "Laundry and dishes", time: "7:00 PM", category: "household", completed: false, urgent: false },
    { id: 8, text: "Call mom about doctor's appointment", time: "10:00 AM", category: "eldercare", completed: false, urgent: true },
    { id: 9, text: "Submit project proposal", time: "End of day", category: "work", completed: false, urgent: false },
    { id: 10, text: "Pick up kids from school", time: "3:00 PM", category: "childcare", completed: false, urgent: false }
  ];

  const priorities = [
    { id: 1, text: "Call mom about doctor's appointment", time: "10:00 AM", urgent: true, type: "urgent" },
    { id: 2, text: "Submit project proposal", time: "End of day", urgent: false, type: "high" },
    { id: 3, text: "Pick up kids from school", time: "3:00 PM", urgent: false, type: "scheduled" }
  ];

  const upcomingEvents = [
    { day: "Wed", event: "Parent-teacher conference" },
    { day: "Thu", event: "Mom's grocery shopping" },
    { day: "Fri", event: "Family movie night" },
    { day: "Sat", event: "Soccer tournament" }
  ];

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'childcare':
        return allTasks.filter(task => task.category === 'childcare').slice(0, 5);
      case 'eldercare':
        return allTasks.filter(task => task.category === 'eldercare').slice(0, 5);
      case 'household':
        return allTasks.filter(task => task.category === 'general').slice(0, 5);
      case 'work':
        return allTasks.filter(task => task.category === 'work').slice(0, 5);
      default:
        return allTasks.slice(0, 5);
    }
  };

  const topTasks = getFilteredTasks();
  const completedTasks = allTasks.filter(task => task.completed).length;
  const totalTasks = allTasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

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
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-2">Daily Brief</h1>
              <p className="text-slate-600">Tuesday, July 1, 2025</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-1">{completionPercentage}%</div>
              <div className="text-sm text-slate-600">Tasks Complete</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-600">{completedTasks}</span>
                </div>
                <p className="text-sm text-slate-600">Tasks Done</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</span>
                </div>
                <p className="text-sm text-slate-600">Pending</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CalendarDays className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">6</span>
                </div>
                <p className="text-sm text-slate-600">Meetings</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-600">85%</span>
                </div>
                <p className="text-sm text-slate-600">Weekly Goal</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks and Priorities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Priorities */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Today's Priorities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorities.map((priority) => (
                  <div key={priority.id} className={`p-4 rounded-lg border-l-4 ${
                    priority.type === 'urgent' ? 'bg-red-50 border-red-400' :
                    priority.type === 'high' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{priority.text}</p>
                        <p className="text-sm text-slate-600 mt-1">Due: {priority.time}</p>
                      </div>
                      <Badge variant="outline" className={`${
                        priority.type === 'urgent' ? 'bg-red-100 text-red-700 border-red-200' :
                        priority.type === 'high' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>
                        {priority.type === 'urgent' ? 'Urgent' : priority.type === 'high' ? 'High' : 'Scheduled'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Task Tabs */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <Target className="h-5 w-5 text-green-600" />
                  Tasks Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="childcare">👶 Kids</TabsTrigger>
                    <TabsTrigger value="eldercare">👴 Elder</TabsTrigger>
                    <TabsTrigger value="household">🏠 Home</TabsTrigger>
                    <TabsTrigger value="work">💼 Work</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeFilter} className="space-y-3">
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
                        <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow group">
                          <div className="flex items-center gap-3 flex-1">
                            <input 
                              type="checkbox" 
                              checked={task.completed}
                              className="w-4 h-4 text-green-600 rounded"
                              readOnly
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                {task.text}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.time}
                                </p>
                                <Badge variant="outline" className={`text-xs ${
                                  task.category === 'childcare' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  task.category === 'eldercare' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                                  task.category === 'work' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                  'bg-gray-50 text-gray-700 border-gray-200'
                                }`}>
                                  {task.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {task.urgent && !task.completed && (
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs ml-2">
                              urgent
                            </Badge>
                          )}
                        </div>
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* This Week's Progress */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">This Week's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Personal Goals</span>
                    <span className="font-medium">7/10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Family Tasks</span>
                    <span className="font-medium">12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Career Projects</span>
                    <span className="font-medium">4/6</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Mood Check and Upcoming */}
          <div className="space-y-6">
            {/* How are you feeling? */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <Heart className="h-5 w-5 text-orange-500" />
                  How are you feeling?
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!moodChecked ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {['Energized', 'Calm', 'Overwhelmed', 'Tired'].map((mood) => (
                        <Button
                          key={mood}
                          variant="outline"
                          onClick={() => handleMoodSelection(mood)}
                          disabled={isLoading}
                          className="text-sm font-medium py-3 px-3 h-auto border-2 bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300 hover:text-orange-700 transition-all duration-200 disabled:opacity-50"
                        >
                          {isLoading ? '...' : mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-slate-600">
                        You're feeling: <span className="font-semibold text-orange-600">{selectedMood}</span>
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
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
                      className="w-full text-orange-600 hover:bg-orange-50 text-sm"
                    >
                      Change mood
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming This Week */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">Upcoming This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700">{event.day}</span>
                    </div>
                    <span className="text-sm text-slate-700 flex-1">{event.event}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
              <Button variant="outline" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Day Complete
              </Button>
            </div>

            {/* Motivational Message */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-slate-600 mb-2">You've got this! 💪</p>
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
