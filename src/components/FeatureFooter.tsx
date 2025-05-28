
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Brain, BarChart3, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FeatureFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const features = [
    {
      title: "Brief",
      icon: Calendar,
      route: "/daily-brief"
    },
    {
      title: "Village",
      icon: Users,
      route: "/village"
    },
    {
      title: "Assistant",
      icon: Brain,
      route: "/smart-care-assistant"
    },
    {
      title: "Insights",
      icon: BarChart3,
      route: "/planner-insights"
    },
    {
      title: "Toolkit",
      icon: Home,
      route: "/home-base-toolkit"
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg z-50">
      <div className="container mx-auto px-2 py-2">
        <div className="flex justify-center items-center">
          <div className="flex justify-between items-center w-full max-w-md">
            {features.map((feature) => {
              const isActive = location.pathname === feature.route;
              return (
                <Button
                  key={feature.route}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1 ${
                    isActive 
                      ? "text-emerald-600 bg-emerald-50" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => navigate(feature.route)}
                >
                  <feature.icon className="h-5 w-5 shrink-0" />
                  <span className="text-xs font-medium leading-none">{feature.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FeatureFooter;
