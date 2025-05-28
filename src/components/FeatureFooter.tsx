
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Brain, BarChart3, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FeatureFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const features = [
    {
      title: "Daily Brief",
      icon: Calendar,
      route: "/daily-brief"
    },
    {
      title: "Village",
      icon: Users,
      route: "/village"
    },
    {
      title: "Smart Care Assistant",
      icon: Brain,
      route: "/smart-care-assistant"
    },
    {
      title: "Planner & Insights",
      icon: BarChart3,
      route: "/planner-insights"
    },
    {
      title: "Home Base Toolkit",
      icon: Home,
      route: "/home-base-toolkit"
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t shadow-lg z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
          {features.map((feature) => {
            const isActive = location.pathname === feature.route;
            return (
              <Button
                key={feature.route}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 ${
                  isActive 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                }`}
                onClick={() => navigate(feature.route)}
              >
                <feature.icon className="h-4 w-4" />
                <span className="text-xs font-medium truncate">{feature.title}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default FeatureFooter;
