import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import AddGoalModal from '@/components/AddGoalModal';
import UpdateGoalModal from '@/components/UpdateGoalModal';
import GoalCelebrationModal from '@/components/GoalCelebrationModal';
import GoalHistoryModal from '@/components/GoalHistoryModal';
import GoalSuggestionsCard from '@/components/GoalSuggestionsCard';
import { 
  Target, Users, Share, Plus, Calendar, Star, 
  TrendingUp, MessageSquare, Award, Archive, 
  CheckCircle, Heart, Flame, Edit, History
} from 'lucide-react';

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
  last_completed_at?: string;
  is_recurring?: boolean;
  sharing_enabled?: boolean;
}

interface GoalsViewProps {
  goals: Goal[];
  onUpdateProgress: (goalId: string, progress: number) => Promise<void>;
  onUpdateGoal?: (goalId: string, updates: any) => Promise<void>;
  onAddGoal?: (goalData: {
    title: string;
    description?: string;
    category: string;
    target_date?: string;
  }) => Promise<void>;
  onCompleteGoal?: (goalId: string) => Promise<void>;
  onAddReflection?: (goalId: string, reflection: any) => Promise<void>;
  onRestartGoal?: (goalId: string) => Promise<void>;
  onShareGoal?: (goalId: string) => Promise<void>;
}

const GoalsView: React.FC<GoalsViewProps> = ({ 
  goals, 
  onUpdateProgress, 
  onUpdateGoal, 
  onAddGoal,
  onCompleteGoal,
  onAddReflection,
  onRestartGoal,
  onShareGoal
}) => {
  const [activeGoalTab, setActiveGoalTab] = useState('active');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [celebratingGoal, setCelebratingGoal] = useState<Goal | null>(null);

  const handleAddGoal = async (goalData: any) => {
    if (onAddGoal) {
      await onAddGoal(goalData);
    }
  };

  const handleUpdateGoal = async (goalId: string, updates: any) => {
    if (onUpdateGoal) {
      await onUpdateGoal(goalId, updates);
    }
  };

  const handleOpenUpdateModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowUpdateModal(true);
  };

  const handleGoalCompleted = (goal: Goal) => {
    setCelebratingGoal(goal);
    setShowCelebrationModal(true);
  };

  const handleShowHistory = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowHistoryModal(true);
  };

  const handleCelebrationClose = () => {
    setCelebratingGoal(null);
    setShowCelebrationModal(false);
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

  const getCategoryLabel = (category: string) => {
    const categoryObj = categories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.label : category;
  };

  const transformedGoals = goals.map(goal => ({
    ...goal,
    priority: goal.progress > 70 ? 'High' : goal.progress > 30 ? 'Medium' : 'Low',
    color: getCategoryColor(goal.category || 'Personal'),
    motivation: `Achieve your ${goal.category?.toLowerCase() || 'personal'} goal`,
  }));

  const activeGoals = transformedGoals.filter(goal => !goal.is_completed);
  const completedGoals = transformedGoals.filter(goal => goal.is_completed);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'health', label: 'Health' },
    { value: 'family', label: 'Family' },
    { value: 'career', label: 'Career' },
    { value: 'personal', label: 'Personal' },
    { value: 'care', label: 'Care' },
    { value: 'financial', label: 'Financial' },
    { value: 'home', label: 'Home' }
  ];

  const filteredGoals = activeGoals.filter(goal => 
    filterCategory === 'all' || goal.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Goal Management</h2>
          <p className="text-slate-600">Track, plan, and achieve your goals</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 z-50">
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="default" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      <Tabs value={activeGoalTab} onValueChange={setActiveGoalTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="archived">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Goals</h3>
              <p className="text-gray-500">Create your first goal to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGoals.map((goal) => (
                <Card key={goal.id} className="shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{goal.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${goal.color}`}>
                            {getCategoryLabel(goal.category)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {goal.priority} Priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-semibold">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-slate-700">Why this matters</span>
                      </div>
                      <p className="text-sm text-slate-600">{goal.motivation}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">Due: {goal.target_date || 'Ongoing'}</span>
                      </div>
                      <div className="flex gap-2">
                        {(goal.completion_count || 0) > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleShowHistory(goal)}
                          >
                            <History className="h-3 w-3 mr-1" />
                            History
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleOpenUpdateModal(goal)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Update Progress
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          {completedGoals.length === 0 ? (
            <div className="text-center py-12">
              <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Completed Goals</h3>
              <p className="text-gray-500">Complete your first goal to see it here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="shadow-lg opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{goal.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${goal.color}`}>
                            {getCategoryLabel(goal.category)}
                          </Badge>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">Completed</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={100} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">
                          Completed: {new Date(goal.last_completed_at || goal.target_date || Date.now()).toLocaleDateString()}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleShowHistory(goal)}
                        >
                          <History className="h-3 w-3 mr-1" />
                          View History
                        </Button>
                      </div>
                      {(goal.completion_count || 0) > 1 && (
                        <div className="text-xs text-blue-600">
                          Completed {goal.completion_count} times • Best streak: {goal.best_streak || 0} days
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Smart Goal Suggestions */}
      <GoalSuggestionsCard 
        completedGoals={completedGoals}
        onCreateGoal={handleAddGoal}
      />

      {/* Modals */}
      <AddGoalModal
        isOpen={showAddModal}
        onOpenChange={setShowAddModal}
        onAddGoal={handleAddGoal}
      />

      <UpdateGoalModal
        isOpen={showUpdateModal}
        onOpenChange={setShowUpdateModal}
        goal={selectedGoal}
        onUpdateGoal={handleUpdateGoal}
        onGoalCompleted={handleGoalCompleted}
      />

      <GoalCelebrationModal
        isOpen={showCelebrationModal}
        onOpenChange={setShowCelebrationModal}
        goal={celebratingGoal}
        onAddReflection={onAddReflection}
        onRestartGoal={onRestartGoal}
        onShareGoal={onShareGoal}
        onClose={handleCelebrationClose}
      />

      <GoalHistoryModal
        isOpen={showHistoryModal}
        onOpenChange={setShowHistoryModal}
        goal={selectedGoal}
        onRestartGoal={onRestartGoal}
      />
    </div>
  );
};

export default GoalsView;