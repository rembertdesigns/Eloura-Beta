
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
    householdName: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    children: [],
    challenges: [],
    priorities: [],
    goals: []
  });

  useEffect(() => {
    // Load data from localStorage
    const familyType = localStorage.getItem('familyType') || 'Not specified';
    const householdName = localStorage.getItem('householdName') || '';
    
    // Parse personal info properly
    let personalInfo = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    };
    
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    if (savedPersonalInfo) {
      try {
        personalInfo = JSON.parse(savedPersonalInfo);
      } catch (e) {
        console.error('Error parsing personal info:', e);
      }
    }

    const familyMembers = JSON.parse(localStorage.getItem('familyMembers') || '[]');
    const challenges = JSON.parse(localStorage.getItem('topChallenges') || '[]');
    const priorities = JSON.parse(localStorage.getItem('topPriorities') || '[]');

    setSummary({
      familyType,
      householdName,
      personalInfo,
      children: familyMembers,
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

  const formatPersonalInfo = () => {
    const { firstName, lastName, email, phone, dateOfBirth } = summary.personalInfo;
    const parts = [];
    
    if (firstName && lastName) {
      parts.push(`${firstName} ${lastName}`);
    }
    if (email) {
      parts.push(email);
    }
    if (phone) {
      parts.push(phone);
    }
    if (dateOfBirth) {
      const date = new Date(dateOfBirth);
      parts.push(`Born: ${date.toLocaleDateString()}`);
    }
    
    return parts.length > 0 ? parts.join(' • ') : 'Not specified';
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
            <CardTitle className="text-2xl font-semibold">Final Step: Review and Finish</CardTitle>
            <p className="text-slate-600">
              Quick summary of what was set up
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Household */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">● Household</h3>
                <p className="text-slate-600">
                  {summary.householdName ? summary.householdName : summary.familyType}
                </p>
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">● Your info</h3>
                <p className="text-slate-600">{formatPersonalInfo()}</p>
              </div>

              {/* Family Members */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">● Family members added</h3>
                <div className="space-y-1">
                  {summary.children.length > 0 ? (
                    summary.children.map((member: any, index: number) => (
                      <p key={index} className="text-slate-600">
                        {member.name} ({member.relationship})
                        {member.date_of_birth && (
                          <span className="text-slate-500 text-sm">
                            {' • '}
                            {new Date().getFullYear() - new Date(member.date_of_birth).getFullYear()} years old
                          </span>
                        )}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-400">No family members added</p>
                  )}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">● Challenges</h3>
                <div className="space-y-1">
                  {summary.challenges.length > 0 ? (
                    summary.challenges.map((challenge: string, index: number) => (
                      <p key={index} className="text-slate-600 text-sm">
                        • {challenge}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-400">No challenges selected</p>
                  )}
                </div>
              </div>

              {/* Priorities */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">● Priorities</h3>
                <div className="flex flex-wrap gap-2">
                  {summary.priorities.length > 0 ? (
                    summary.priorities.map((priority: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {priority}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-slate-400">No priorities selected</p>
                  )}
                </div>
              </div>

              {/* Invites Sent */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">● Invites sent</h3>
                <p className="text-slate-400">No invites sent</p>
              </div>
            </div>

            {/* Final Message */}
            <div className="text-center py-6">
              <p className="text-lg text-slate-700 font-medium">
                You're all set — let's take you to your Dashboard
              </p>
            </div>

            <div className="pt-6 border-t">
              <Button className="w-full" onClick={handleFinish}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingSummary;
