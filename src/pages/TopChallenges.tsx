
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Navigation from '@/components/Navigation';

const TopChallenges = () => {
  const navigate = useNavigate();
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const challenges = [
    'Juggling too many tasks',
    "Can't keep up with school stuff",
    'Forgetting important dates and things',
    'Planning everything alone is exhausting',
    "I don't have time to think or reset",
    'I feel overwhelmed by constant decisions',
    "Others don't follow through on what I delegate",
    'Hard to coordinate with people helping me'
  ];

  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges(prev =>
      prev.includes(challenge)
        ? prev.filter(c => c !== challenge)
        : [...prev, challenge]
    );
  };

  const handleNext = () => {
    // Save to localStorage for demo
    localStorage.setItem('topChallenges', JSON.stringify(selectedChallenges));
    console.log('Saved challenges:', selectedChallenges);
    navigate('/priorities');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Your Top Challenges</CardTitle>
            <p className="text-slate-600">Choose as many as you like</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge}
                className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                onClick={() => toggleChallenge(challenge)}
              >
                <Checkbox
                  checked={selectedChallenges.includes(challenge)}
                  onChange={() => toggleChallenge(challenge)}
                />
                <label className="flex-1 text-slate-700 cursor-pointer">
                  {challenge}
                </label>
              </div>
            ))}

            <div className="pt-6">
              <Button 
                className="w-full" 
                onClick={handleNext}
                disabled={selectedChallenges.length === 0}
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

export default TopChallenges;
