
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import SearchModal from './SearchModal';
import FilterModal from './FilterModal';
import AddEventModal from '@/components/AddEventModal';

interface PlannerHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    dateRange?: { from: Date | undefined; to: Date | undefined };
    category: string;
    status: string;
    type: string;
  };
  onFiltersChange: (filters: any) => void;
  onAddEvent: (eventData: any) => Promise<any>;
}

const PlannerHeader = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  onAddEvent 
}: PlannerHeaderProps) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const handleSearch = () => {
    // Search is handled by the hook automatically via useEffect
    setSearchModalOpen(false);
  };

  const handleApplyFilters = () => {
    // Filters are handled by the hook automatically via useEffect
    setFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    onFiltersChange({
      dateRange: { from: undefined, to: undefined },
      category: 'all',
      status: 'all',
      type: 'all'
    });
    setFilterModalOpen(false);
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.status !== 'all' || 
    filters.type !== 'all' || 
    filters.dateRange?.from || 
    filters.dateRange?.to;

  return (
    <>
      <div className="mb-3 md:mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-3xl font-light text-slate-800 truncate">Planner</h1>
            <p className="text-slate-600 text-sm md:text-base hidden md:block">Organize your life, one step at a time</p>
          </div>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="min-touch-target touch-manipulation"
              onClick={() => setSearchModalOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
              {searchQuery && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">
                  "{searchQuery}"
                </span>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="min-touch-target touch-manipulation"
              onClick={() => setFilterModalOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {hasActiveFilters && (
                <span className="ml-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 min-touch-target touch-manipulation"
              onClick={() => setAddEventModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          {/* Mobile Action Bar */}
          <div className="flex md:hidden items-center justify-between gap-2">
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="min-touch-target touch-manipulation px-2"
                onClick={() => setSearchModalOpen(true)}
              >
                <Search className="h-4 w-4" />
                {searchQuery && <span className="ml-1 w-1.5 h-1.5 bg-primary rounded-full" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="min-touch-target touch-manipulation px-2"
                onClick={() => setFilterModalOpen(true)}
              >
                <Filter className="h-4 w-4" />
                {hasActiveFilters && <span className="ml-1 w-1.5 h-1.5 bg-primary rounded-full" />}
              </Button>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 min-touch-target touch-manipulation text-sm px-3"
              onClick={() => setAddEventModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onOpenChange={setSearchModalOpen}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearch={handleSearch}
      />
      
      <FilterModal
        isOpen={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      
      <AddEventModal
        isOpen={addEventModalOpen}
        onOpenChange={setAddEventModalOpen}
        onAddEvent={async (eventData) => {
          try {
            await onAddEvent(eventData);
            setAddEventModalOpen(false);
          } catch (error) {
            // Error is already handled in the hook
            console.error('Failed to add event:', error);
          }
        }}
      />
    </>
  );
};

export default PlannerHeader;
