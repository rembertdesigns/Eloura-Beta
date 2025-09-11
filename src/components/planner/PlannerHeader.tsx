
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';

const PlannerHeader = () => {
  return (
    <div className="mb-3 md:mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-3xl font-light text-slate-800 truncate">Planner</h1>
          <p className="text-slate-600 text-sm md:text-base hidden md:block">Organize your life, one step at a time</p>
        </div>
        
        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="min-touch-target touch-manipulation">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm" className="min-touch-target touch-manipulation">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 min-touch-target touch-manipulation">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Mobile Action Bar */}
        <div className="flex md:hidden items-center justify-between gap-2">
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="min-touch-target touch-manipulation px-2">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="min-touch-target touch-manipulation px-2">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 min-touch-target touch-manipulation text-sm px-3">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlannerHeader;
