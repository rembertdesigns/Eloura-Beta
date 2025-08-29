import React from 'react';
import { Search, Calendar, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AppHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left section - Brand */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#223B0A] to-[#D7642A] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Eloura HQ</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search ⌘K"
            className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#223B0A] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center gap-4">
        {/* Calendar */}
        <Button variant="ghost" size="sm" className="p-2">
          <Calendar className="h-5 w-5 text-gray-600" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="p-2 relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
            3
          </Badge>
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-[#223B0A] text-white text-sm">
              LM
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;