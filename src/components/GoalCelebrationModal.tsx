import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Trophy, 
  Sparkles, 
  Heart, 
  RefreshCw, 
  Share2, 
  Star,
  ThumbsUp,
  Target,
  Flame,
  PartyPopper
} from 'lucide-react';
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

interface GoalCelebrationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onAddReflection?: (goalId: string, reflection: any) => Promise<void>;
  onRestartGoal?: (goalId: string) => Promise<void>;
  onShareGoal?: (goalId: string) => Promise<void>;
  onClose?: () => void;
}

const GoalCelebrationModal: React.FC<GoalCelebrationModalProps> = ({
  isOpen,
  onOpenChange,
  goal,
  onAddReflection,
  onRestartGoal,
  onShareGoal,
  onClose
}) => {
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionData, setReflectionData] = useState({
    reflection_text: '',
    what_helped: '',
    challenges_faced: '',
    lessons_learned: '',
    would_do_again: true,
    rating: 5
  });
  const { toast } = useToast();

  const handleClose = () => {
    setShowReflection(false);
    setReflectionData({
      reflection_text: '',
      what_helped: '',
      challenges_faced: '',
      lessons_learned: '',
      would_do_again: true,
      rating: 5
    });
    onClose?.();
    onOpenChange(false);
  };

  const handleSaveReflection = async () => {
    if (!goal || !onAddReflection) return;
    
    try {
      await onAddReflection(goal.id, reflectionData);
      toast({
        title: "Reflection saved!",
        description: "Your goal reflection has been recorded.",
      });
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save reflection. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRestartGoal = async () => {
    if (!goal || !onRestartGoal) return;
    
    try {
      await onRestartGoal(goal.id);
      toast({
        title: "Goal restarted!",
        description: `"${goal.title}" is ready for another round!`,
      });
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restart goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShareGoal = async () => {
    if (!goal || !onShareGoal) return;
    
    try {
      await onShareGoal(goal.id);
      toast({
        title: "Goal shared!",
        description: "Your achievement has been shared with your village!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share goal. Please try again.",
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

  const getCelebrationMessage = () => {
    const messages = [
      "Amazing work! You crushed this goal! 🎉",
      "Incredible achievement! You should be proud! ✨",
      "Way to go! You've accomplished something great! 🌟",
      "Outstanding! Your dedication really paid off! 🏆",
      "Fantastic job! You're making great progress! 💪"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (!goal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <PartyPopper className="h-6 w-6" />
            Goal Completed!
            <PartyPopper className="h-6 w-6" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!showReflection ? (
            <>
              {/* Celebration Content */}
              <div className="text-center space-y-4">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-800">{goal.title}</h3>
                  <p className="text-slate-600">{getCelebrationMessage()}</p>
                  <Badge className={`text-sm ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </Badge>
                </div>

                {/* Goal Stats */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center">
                      <Target className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-sm text-slate-600">Times Completed</div>
                    <div className="font-semibold text-lg">{(goal.completion_count || 0) + 1}</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center">
                      <Flame className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="text-sm text-slate-600">Current Streak</div>
                    <div className="font-semibold text-lg">{(goal.current_streak || 0) + 1}</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="text-sm text-slate-600">Best Streak</div>
                    <div className="font-semibold text-lg">{Math.max((goal.best_streak || 0), (goal.current_streak || 0) + 1)}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowReflection(true)}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Add Reflection
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRestartGoal}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Do It Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleShareGoal}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share Victory
                </Button>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleClose} size="lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Reflection Form */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-800">Reflect on Your Success</h3>
                  <p className="text-sm text-slate-600">Take a moment to capture what made this achievement possible</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>How would you rate this experience?</Label>
                    <RadioGroup 
                      value={reflectionData.rating.toString()} 
                      onValueChange={(value) => setReflectionData({...reflectionData, rating: parseInt(value)})}
                      className="flex justify-center gap-4 mt-2"
                    >
                      {[1,2,3,4,5].map(rating => (
                        <div key={rating} className="flex items-center space-x-1">
                          <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="flex">
                            <Star className={`h-4 w-4 ${rating <= reflectionData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>What are your overall thoughts on completing this goal?</Label>
                    <Textarea
                      placeholder="How do you feel about achieving this goal? What did it mean to you?"
                      value={reflectionData.reflection_text}
                      onChange={(e) => setReflectionData({...reflectionData, reflection_text: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>What helped you succeed?</Label>
                    <Textarea
                      placeholder="What strategies, habits, or support systems were key to your success?"
                      value={reflectionData.what_helped}
                      onChange={(e) => setReflectionData({...reflectionData, what_helped: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>What challenges did you face?</Label>
                    <Textarea
                      placeholder="What obstacles did you overcome along the way?"
                      value={reflectionData.challenges_faced}
                      onChange={(e) => setReflectionData({...reflectionData, challenges_faced: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>What did you learn?</Label>
                    <Textarea
                      placeholder="What insights or lessons will you take forward?"
                      value={reflectionData.lessons_learned}
                      onChange={(e) => setReflectionData({...reflectionData, lessons_learned: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="wouldDoAgain"
                      checked={reflectionData.would_do_again}
                      onChange={(e) => setReflectionData({...reflectionData, would_do_again: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="wouldDoAgain">I would pursue this goal again</Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowReflection(false)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleSaveReflection} className="flex-1">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Save Reflection
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalCelebrationModal;