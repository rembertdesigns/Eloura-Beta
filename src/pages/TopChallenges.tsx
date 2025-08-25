
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Target } from 'lucide-react';

const TopChallenges = () => {
  const navigate = useNavigate();
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const challenges = [
    "I feel overwhelmed juggling too many tasks",
    "I forget important dates or things",
    "I'm always behind on school, daycare, or activity reminders",
    "I feel like I'm doing everything alone",
    "I don't have time to pause or reset",
    "I feel mentally drained from constant decisions",
    "I get frustrated repeating myself or chasing people to follow through",
    "I struggle to coordinate with others helping me",
    "I have too much in my head and nowhere to put it"
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-center">
        <Card className="shadow-lg w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <Target className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold">What Are You Dealing With Right Now?</CardTitle>
            <p className="text-muted-foreground">Select anything that resonates. This helps Eloura show up where you need support most.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                onClick={() => toggleChallenge(challenge)}
              >
                <Checkbox
                  checked={selectedChallenges.includes(challenge)}
                  onChange={() => toggleChallenge(challenge)}
                />
                <label className="flex-1 text-foreground cursor-pointer">
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
