
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';

const PlannerHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Planner</h1>
          <p className="text-slate-600">Organize your life, one step at a time</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlannerHeader;
