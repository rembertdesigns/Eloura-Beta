
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Calendar, Users, Brain, MoreHorizontal, FolderOpen, BarChart3, MessageSquare, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FeatureFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainFeatures = [
    {
      title: "Dashboard",
      icon: Home,
      route: "/dashboard"
    },
    {
      title: "Brief",
      icon: Calendar,
      route: "/daily-brief"
    },
    {
      title: "Planner",
      icon: BarChart3,
      route: "/planner-insights"
    },
    {
      title: "Assistant",
      icon: Brain,
      route: "/smart-care-assistant"
    }
  ];

  const moreFeatures = [
    {
      title: "Home Base Toolkit",
      icon: FolderOpen,
      route: "/home-base-toolkit"
    },
    {
      title: "Village",
      icon: Users,
      route: "/village"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      route: "/messages"
    },
    {
      title: "Settings",
      icon: Settings,
      route: "/settings"
    }
  ];

  const handleMoreItemClick = (route: string) => {
    navigate(route);
    setIsMoreOpen(false);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg z-50 safe-area-inset-bottom">
      <div className="container mx-auto px-2 py-2 pb-safe">
        <div className="flex justify-center items-center">
          <div className="flex justify-between items-center w-full max-w-md">
            {mainFeatures.map((feature) => {
              const isActive = location.pathname === feature.route;
              return (
                <Button
                  key={feature.route}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-3 px-2 min-w-0 flex-1 min-h-[48px] touch-manipulation ${
                    isActive 
                      ? "text-emerald-600 bg-emerald-50" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => navigate(feature.route)}
                >
                  <feature.icon className="h-5 w-5 shrink-0" />
                  <span className="text-xs font-medium leading-none truncate max-w-full">{feature.title}</span>
                </Button>
              );
            })}
            
            {/* More button */}
            <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3 px-2 min-w-0 flex-1 min-h-[48px] text-slate-500 hover:text-slate-700 hover:bg-slate-50 touch-manipulation"
                >
                  <MoreHorizontal className="h-5 w-5 shrink-0" />
                  <span className="text-xs font-medium leading-none">More</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 py-6 px-2">
                  {moreFeatures.map((feature) => {
                    const isActive = location.pathname === feature.route;
                    return (
                      <Button
                        key={feature.route}
                        variant="ghost"
                        className={`flex items-center gap-3 h-auto py-4 px-4 justify-start min-h-[52px] touch-manipulation ${
                          isActive 
                            ? "text-emerald-600 bg-emerald-50" 
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                        onClick={() => handleMoreItemClick(feature.route)}
                      >
                        <feature.icon className="h-5 w-5 shrink-0" />
                        <span className="text-sm font-medium">{feature.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FeatureFooter;
