
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';

const OnboardingSummary = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [summary, setSummary] = useState({
    familyType: '',
    personalInfo: '',
    children: [],
    challenges: [],
    priorities: [],
    goals: []
  });

  useEffect(() => {
    // Load data from localStorage
    const familyType = localStorage.getItem('familyType') || 'Not specified';
    const personalInfo = localStorage.getItem('personalInfo') || 'Not specified';
    const children = JSON.parse(localStorage.getItem('kids') || '[]');
    const challenges = JSON.parse(localStorage.getItem('topChallenges') || '[]');
    const priorities = JSON.parse(localStorage.getItem('topPriorities') || '[]');

    setSummary({
      familyType,
      personalInfo,
      children,
      challenges,
      priorities,
      goals: [
        'Stream line daily planning and life management',
        'Managing school + routines',
        'Sharing tasks with others'
      ]
    });
  }, []);

  const handleFinish = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    navigate('/dashboard');
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} title="Creating your personalized dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Here's what you entered</CardTitle>
            <p className="text-slate-600">
              Choose up to 3 priorities that align with your primary goals
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Family Type */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">FAMILY TYPE</h3>
                <p className="text-slate-600">{summary.familyType}</p>
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">PERSONAL INFO</h3>
                <p className="text-slate-600">{summary.personalInfo}</p>
              </div>

              {/* Children */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">CHILDREN</h3>
                <div className="space-y-1">
                  {summary.children.length > 0 ? (
                    summary.children.map((child: any, index: number) => (
                      <p key={index} className="text-slate-600">
                        {child.name}, {child.age}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-400">No children added</p>
                  )}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">CHALLENGES</h3>
                <div className="space-y-1">
                  {summary.challenges.length > 0 ? (
                    summary.challenges.map((challenge: string, index: number) => (
                      <p key={index} className="text-slate-600 text-sm">
                        {challenge}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-400">No challenges selected</p>
                  )}
                </div>
              </div>

              {/* Priorities */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">PRIORITIES</h3>
                <div className="space-y-1">
                  {summary.priorities.length > 0 ? (
                    summary.priorities.map((priority: string, index: number) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-1">
                        {priority}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-slate-400">No priorities selected</p>
                  )}
                </div>
              </div>

              {/* Goals */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">GOALS</h3>
                <div className="space-y-1">
                  {summary.goals.map((goal: string, index: number) => (
                    <p key={index} className="text-slate-600 text-sm">
                      {goal}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button className="w-full" onClick={handleFinish}>
                Complete Setup & Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingSummary;
