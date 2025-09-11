import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Plus,
  Sparkles
} from 'lucide-react';

interface GoalSuggestion {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedDays: number;
  reason: string;
}

interface GoalSuggestionsCardProps {
  completedGoals: any[];
  onCreateGoal?: (goalData: any) => Promise<void>;
}

const GoalSuggestionsCard: React.FC<GoalSuggestionsCardProps> = ({
  completedGoals,
  onCreateGoal
}) => {
  
  const generateSuggestions = (): GoalSuggestion[] => {
    const suggestions: GoalSuggestion[] = [];
    const categories = completedGoals.map(goal => goal.category);
    const mostFrequentCategory = categories.length > 0 
      ? categories.reduce((a, b) => categories.filter(v => v === a).length >= categories.filter(v => v === b).length ? a : b)
      : null;

    // Category-specific suggestions
    if (mostFrequentCategory === 'health') {
      suggestions.push({
        title: 'Increase Daily Steps',
        description: 'Build on your health success by walking 10,000 steps daily',
        category: 'health',
        difficulty: 'Medium',
        estimatedDays: 30,
        reason: 'Perfect next step for your health journey!'
      });
      suggestions.push({
        title: 'Try a New Workout Style',
        description: 'Explore yoga, pilates, or strength training to diversify your fitness',
        category: 'health',
        difficulty: 'Medium',
        estimatedDays: 21,
        reason: 'Keep your health momentum going!'
      });
    }

    if (mostFrequentCategory === 'family') {
      suggestions.push({
        title: 'Weekly Family Game Night',
        description: 'Establish a regular family bonding tradition',
        category: 'family',
        difficulty: 'Easy',
        estimatedDays: 28,
        reason: 'Build on your family connection success!'
      });
    }

    if (mostFrequentCategory === 'career') {
      suggestions.push({
        title: 'Learn a New Professional Skill',
        description: 'Take an online course or certification in your field',
        category: 'career',
        difficulty: 'Hard',
        estimatedDays: 60,
        reason: 'Advance your career growth further!'
      });
    }

    // General suggestions based on patterns
    if (completedGoals.length >= 3) {
      suggestions.push({
        title: 'Mentor Someone Else',
        description: 'Share your goal-achieving expertise with others',
        category: 'personal',
        difficulty: 'Medium',
        estimatedDays: 90,
        reason: 'Your success can inspire others!'
      });
    }

    if (completedGoals.length >= 5) {
      suggestions.push({
        title: 'Write a Success Journal',
        description: 'Document your journey and lessons learned',
        category: 'personal',
        difficulty: 'Easy',
        estimatedDays: 30,
        reason: 'Capture your amazing progress!'
      });
    }

    // Default suggestions for new users
    if (completedGoals.length === 0) {
      suggestions.push(
        {
          title: 'Daily 15-Minute Walk',
          description: 'Start building a healthy habit with a short daily walk',
          category: 'health',
          difficulty: 'Easy',
          estimatedDays: 21,
          reason: 'Perfect first goal to build momentum!'
        },
        {
          title: 'Read 10 Pages Daily',
          description: 'Develop a reading habit with just 10 pages per day',
          category: 'personal',
          difficulty: 'Easy',
          estimatedDays: 30,
          reason: 'Great way to start your goal journey!'
        },
        {
          title: 'Call One Family Member Weekly',
          description: 'Strengthen family connections with regular check-ins',
          category: 'family',
          difficulty: 'Easy',
          estimatedDays: 28,
          reason: 'Build meaningful relationships!'
        }
      );
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
  };

  const suggestions = generateSuggestions();

  const handleCreateGoal = async (suggestion: GoalSuggestion) => {
    if (!onCreateGoal) return;
    
    const goalData = {
      title: suggestion.title,
      description: suggestion.description,
      category: suggestion.category,
      target_date: new Date(Date.now() + suggestion.estimatedDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    await onCreateGoal(goalData);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'health': 'bg-green-100 text-green-700',
      'family': 'bg-blue-100 text-blue-700',
      'career': 'bg-purple-100 text-purple-700',
      'personal': 'bg-orange-100 text-orange-700',
      'care': 'bg-pink-100 text-pink-700',
      'financial': 'bg-yellow-100 text-yellow-700',
      'home': 'bg-indigo-100 text-indigo-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (suggestions.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Smart Goal Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h4 className="font-medium text-slate-800">{suggestion.title}</h4>
                <p className="text-sm text-slate-600">{suggestion.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className={getCategoryColor(suggestion.category)} variant="secondary">
                    {suggestion.category}
                  </Badge>
                  <Badge className={getDifficultyColor(suggestion.difficulty)} variant="outline">
                    {suggestion.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Target className="h-3 w-3" />
                  {suggestion.estimatedDays} days
                </div>
                
                <div className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                  <Sparkles className="h-3 w-3 inline mr-1" />
                  {suggestion.reason}
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => handleCreateGoal(suggestion)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Goal
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSuggestionsCard;