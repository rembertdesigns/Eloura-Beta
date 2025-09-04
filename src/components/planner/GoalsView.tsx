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
import { 
  Target, Users, Share, Plus, Calendar, Star, 
  TrendingUp, MessageSquare, Award, Archive, 
  CheckCircle, Heart, Flame, Edit
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  target_date: string;
  is_completed: boolean;
}

interface GoalsViewProps {
  goals: Goal[];
  onUpdateProgress: (goalId: string, progress: number) => Promise<void>;
  onAddGoal?: (goalData: {
    title: string;
    description?: string;
    category: string;
    target_date?: string;
  }) => Promise<void>;
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals, onUpdateProgress, onAddGoal }) => {
  const [activeGoalTab, setActiveGoalTab] = useState('active');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddGoal = async (goalData: any) => {
    if (onAddGoal) {
      await onAddGoal(goalData);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Work': 'bg-blue-100 text-blue-700',
      'Personal': 'bg-green-100 text-green-700',
      'Family': 'bg-purple-100 text-purple-700',
      'Health': 'bg-pink-100 text-pink-700',
      'Career': 'bg-blue-100 text-blue-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const transformedGoals = goals.map(goal => ({
    ...goal,
    priority: goal.progress > 70 ? 'High' : goal.progress > 30 ? 'Medium' : 'Low',
    color: getCategoryColor(goal.category || 'Personal'),
    motivation: `Achieve your ${goal.category?.toLowerCase() || 'personal'} goal`,
  }));

  const activeGoals = transformedGoals.filter(goal => !goal.is_completed);
  const completedGoals = transformedGoals.filter(goal => goal.is_completed);

  const categories = ['all', 'Career', 'Health', 'Family', 'Personal'];

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
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
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
                            {goal.category}
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onUpdateProgress(goal.id, Math.min(100, goal.progress + 10))}
                      >
                        <Target className="h-3 w-3 mr-1" />
                        Update Progress
                      </Button>
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
                            {goal.category}
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
                      <div className="text-sm text-slate-600">
                        Completed: {new Date(goal.target_date || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddGoalModal
        isOpen={showAddModal}
        onOpenChange={setShowAddModal}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
};

export default GoalsView;