
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Settings, User } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-light text-slate-800">
              Eloura
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              Family
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              Network
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              Insights
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-slate-600">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-600">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-slate-600">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
