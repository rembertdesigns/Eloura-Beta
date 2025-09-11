import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  History, 
  Trophy, 
  Flame, 
  Calendar, 
  Target, 
  Star,
  MessageSquare,
  TrendingUp,
  Award,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  progress: number;
  target_date: string;
  is_completed: boolean;
  completion_count?: number;
  current_streak?: number;
  best_streak?: number;
}

interface GoalCompletion {
  id: string;
  goal_id: string;
  completed_at: string;
  streak_count: number;
  reflection?: {
    reflection_text?: string;
    what_helped?: string;
    challenges_faced?: string;
    lessons_learned?: string;
    rating?: number;
  };
}

interface GoalHistoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onRestartGoal?: (goalId: string) => Promise<void>;
}

const GoalHistoryModal: React.FC<GoalHistoryModalProps> = ({
  isOpen,
  onOpenChange,
  goal,
  onRestartGoal
}) => {
  const [completions, setCompletions] = useState<GoalCompletion[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && goal) {
      fetchGoalHistory();
    }
  }, [isOpen, goal]);

  const fetchGoalHistory = async () => {
    if (!goal) return;
    
    setLoading(true);
    try {
      const { data: completionsData, error: completionsError } = await supabase
        .from('goal_completions')
        .select('*')
        .eq('goal_id', goal.id)
        .order('completed_at', { ascending: false });

      if (completionsError) throw completionsError;

      // Fetch reflections for each completion
      const completionsWithReflections = await Promise.all(
        (completionsData || []).map(async (completion) => {
          const { data: reflectionData } = await supabase
            .from('goal_reflections')
            .select('*')
            .eq('completion_id', completion.id)
            .single();

          return {
            ...completion,
            reflection: reflectionData
          };
        })
      );

      setCompletions(completionsWithReflections);
    } catch (error) {
      console.error('Error fetching goal history:', error);
      toast({
        title: "Error",
        description: "Failed to load goal history.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestartGoal = async () => {
    if (!goal || !onRestartGoal) return;
    
    try {
      await onRestartGoal(goal.id);
      onOpenChange(false);
      toast({
        title: "Goal restarted!",
        description: `"${goal.title}" is ready for another round!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restart goal. Please try again.",
        variant: "destructive"
      });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!goal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Goal History: {goal.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="completions">Completions</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Total Completions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goal.completion_count || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goal.current_streak || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    Best Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goal.best_streak || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    Last Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    {completions.length > 0 
                      ? formatDate(completions[0].completed_at).split(',')[0]
                      : 'Never'
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Goal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                  <Badge variant="outline">
                    Target: {goal.target_date ? formatDate(goal.target_date) : 'Ongoing'}
                  </Badge>
                </div>
                {goal.description && (
                  <p className="text-slate-600">{goal.description}</p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleRestartGoal} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Do It Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completions">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">Loading completions...</div>
                ) : completions.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No completions yet</p>
                  </div>
                ) : (
                  completions.map((completion, index) => (
                    <Card key={completion.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">
                                Completion #{completions.length - index}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                Streak: {completion.streak_count}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              {formatDate(completion.completed_at)}
                            </p>
                            
                            {completion.reflection && (
                              <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <MessageSquare className="h-4 w-4 text-slate-500" />
                                  <span className="text-sm font-medium">Reflection</span>
                                  {completion.reflection.rating && (
                                    <div className="flex ml-auto">
                                      {[1,2,3,4,5].map(star => (
                                        <Star 
                                          key={star}
                                          className={`h-3 w-3 ${
                                            star <= completion.reflection!.rating! 
                                              ? 'text-yellow-400 fill-yellow-400' 
                                              : 'text-gray-300'
                                          }`} 
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {completion.reflection.reflection_text && (
                                  <p className="text-sm text-slate-600 mb-2">
                                    {completion.reflection.reflection_text}
                                  </p>
                                )}
                                {completion.reflection.what_helped && (
                                  <p className="text-xs text-green-600">
                                    <strong>What helped:</strong> {completion.reflection.what_helped}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Progress Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {completions.length > 1 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">
                        You've completed this goal {completions.length} times with an average streak of{' '}
                        {Math.round(completions.reduce((sum, c) => sum + c.streak_count, 0) / completions.length)} days.
                      </p>
                      <p className="text-sm text-green-600">
                        Your consistency shows great dedication! 
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">
                      Complete this goal a few more times to see your progress patterns.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Achievement Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(goal.completion_count || 0) === 0 && (
                      <Badge variant="outline">Getting Started</Badge>
                    )}
                    {(goal.completion_count || 0) >= 1 && (goal.completion_count || 0) < 5 && (
                      <Badge className="bg-green-100 text-green-700">Goal Achiever</Badge>
                    )}
                    {(goal.completion_count || 0) >= 5 && (goal.completion_count || 0) < 10 && (
                      <Badge className="bg-blue-100 text-blue-700">Consistent Performer</Badge>
                    )}
                    {(goal.completion_count || 0) >= 10 && (
                      <Badge className="bg-purple-100 text-purple-700">Goal Master</Badge>
                    )}
                    <p className="text-sm text-slate-600">
                      {(goal.completion_count || 0) < 5 
                        ? "Keep going to unlock the next achievement level!"
                        : "You've mastered this goal! Consider setting new challenges."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {completions.some(c => c.reflection?.lessons_learned) && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {completions
                      .filter(c => c.reflection?.lessons_learned)
                      .slice(0, 3)
                      .map((completion, index) => (
                        <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                          "{completion.reflection?.lessons_learned}"
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GoalHistoryModal;