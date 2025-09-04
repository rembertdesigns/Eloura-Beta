
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, CheckCircle } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';

const OnboardingSummary = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const { saveProgress } = useOnboardingProgress();
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

  const handleFinish = async () => {
    // Mark onboarding as completed
    await saveProgress({
      currentStep: 'completed',
      onboardingCompleted: true
    });
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-sm">
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Final Step: Review and Finish
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Quick summary of what was set up
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Household */}
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Household</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/family-structure')}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground">
                  {summary.householdName ? summary.householdName : summary.familyType}
                </p>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Your Info</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/personal-info')}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground">{formatPersonalInfo()}</p>
              </CardContent>
            </Card>

            {/* Family Members */}
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Family Members</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/family-structure')}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {summary.children.length > 0 ? (
                    summary.children.map((member: any, index: number) => (
                      <p key={index} className="text-muted-foreground">
                        {member.name} ({member.relationship})
                        {member.date_of_birth && (
                          <span className="text-muted-foreground/70 text-sm">
                            {' • '}
                            {new Date().getFullYear() - new Date(member.date_of_birth).getFullYear()} years old
                          </span>
                        )}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted-foreground/50">No family members added</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Challenges</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/top-challenges')}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {summary.challenges.length > 0 ? (
                    summary.challenges.map((challenge: string, index: number) => (
                      <p key={index} className="text-muted-foreground text-sm">
                        • {challenge}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted-foreground/50">No challenges selected</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Priorities */}
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Priorities</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/priorities')}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {summary.priorities.length > 0 ? (
                    summary.priorities.map((priority: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {priority}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground/50">No priorities selected</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Invites Sent */}
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Invites Sent</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground/50">No invites sent</p>
              </CardContent>
            </Card>
          </div>

          {/* Final Message & Button */}
          <Card className="shadow-lg border-border bg-card">
            <CardContent className="text-center py-8">
              <p className="text-lg font-medium text-foreground mb-6">
                You're all set — let's take you to your Dashboard
              </p>
              <Button className="w-full max-w-md" onClick={handleFinish}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSummary;
