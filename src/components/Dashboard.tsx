
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Brain, Heart, Plus, Bell, FileText, BarChart3, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuickActions from './QuickActions';
import FamilyOverview from './FamilyOverview';
import SupportNetwork from './SupportNetwork';
import Navigation from './Navigation';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Daily Brief",
      description: "Your personalized daily snapshot",
      icon: Calendar,
      color: "bg-blue-500 hover:bg-blue-600",
      route: "/daily-brief"
    },
    {
      title: "Village",
      description: "Coordinate your support network",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600",
      route: "/village"
    },
    {
      title: "Smart Care Assistant",
      description: "AI-powered caregiving guidance",
      icon: Brain,
      color: "bg-purple-500 hover:bg-purple-600",
      route: "/smart-care-assistant"
    },
    {
      title: "Planner & Insights",
      description: "Visual insights and planning",
      icon: BarChart3,
      color: "bg-orange-500 hover:bg-orange-600",
      route: "/planner-insights"
    },
    {
      title: "Home Base Toolkit",
      description: "Your essential care resources",
      icon: Home,
      color: "bg-indigo-500 hover:bg-indigo-600",
      route: "/home-base-toolkit"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-light text-slate-800 mb-2">
            Welcome to <span className="font-medium text-emerald-600">Eloura</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your operating system for caregiving. We're here to reduce your mental load 
            and bring calm structure to your family life.
          </p>
        </div>

        {/* Feature Navigation Cards */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-700 text-center">Your Eloura Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-4 border-0 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition-all duration-200 group"
                  onClick={() => navigate(feature.route)}
                >
                  <div className={`p-4 rounded-xl ${feature.color} transition-transform group-hover:scale-110`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-slate-700 text-lg">{feature.title}</div>
                    <div className="text-sm text-slate-500 mt-2">{feature.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Family Overview */}
          <div className="lg:col-span-2 space-y-6">
            <FamilyOverview />
            <QuickActions />
          </div>

          {/* Right Column - Support & Insights */}
          <div className="space-y-6">
            <SupportNetwork />
            
            {/* AI Insights Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 hover-scale">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white/60 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">Suggestion:</span> Schedule mom's doctor appointment 
                      for next Tuesday when your sister is available to help.
                    </p>
                  </div>
                  <div className="p-3 bg-white/60 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">Pattern:</span> Kids seem less stressed on days 
                      with structured after-school activities.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-lg hover-scale">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-600">Sarah confirmed pickup for Thursday</p>
                      <p className="text-xs text-slate-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-600">Grocery list updated with dad's preferences</p>
                      <p className="text-xs text-slate-400">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-600">New automation suggestion available</p>
                      <p className="text-xs text-slate-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
