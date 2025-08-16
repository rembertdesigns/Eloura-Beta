
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Navigation from '@/components/Navigation';

const Priorities = () => {
  const navigate = useNavigate();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const priorities = [
    'Daily planning and organization',
    'Managing school activities and homework',
    'Bedtime and morning routines',
    'Communications and events coordination',
    'Appointments and medical needs',
    'Managing aging parents\' needs',
    'Managing medically complex children',
    'Sharing tasks with others',
    'Keeping everything in one place',
    "I'm not sure yet"
  ];

  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev => {
      if (prev.includes(priority)) {
        return prev.filter(p => p !== priority);
      } else if (prev.length < 3) {
        return [...prev, priority];
      }
      return prev;
    });
  };

  const handleNext = () => {
    // Save to localStorage for demo
    localStorage.setItem('topPriorities', JSON.stringify(selectedPriorities));
    console.log('Saved priorities:', selectedPriorities);
    navigate('/invite');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Set Your Priorities</CardTitle>
            <p className="text-slate-600">
              What matters most to you right now? Select up to 3
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {priorities.map((priority) => (
              <div
                key={priority}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPriorities.includes(priority)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:bg-slate-50'
                } ${
                  selectedPriorities.length >= 3 && !selectedPriorities.includes(priority)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                onClick={() => togglePriority(priority)}
              >
                <Checkbox
                  checked={selectedPriorities.includes(priority)}
                  onChange={() => togglePriority(priority)}
                  disabled={selectedPriorities.length >= 3 && !selectedPriorities.includes(priority)}
                />
                <label className="flex-1 text-slate-700 cursor-pointer">
                  {priority}
                </label>
              </div>
            ))}

            <div className="text-sm text-slate-500 mt-4">
              {selectedPriorities.length}/3 priorities selected
            </div>

            <div className="pt-6">
              <Button 
                className="w-full" 
                onClick={handleNext}
                disabled={selectedPriorities.length === 0}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Priorities;
