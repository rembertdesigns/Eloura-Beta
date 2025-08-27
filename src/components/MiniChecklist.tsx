import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  Plus, 
  Users, 
  UserPlus, 
  Edit3,
  CheckCircle2,
  Circle,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MiniChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [householdName, setHouseholdName] = useState('');
  const [newTask, setNewTask] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const { toast } = useToast();

  const checklistItems = [
    {
      id: 'household-name',
      title: 'Give your Household a name',
      description: 'Set your household name so everyone knows whose tasks these are!',
      icon: Home,
      action: 'modal'
    },
    {
      id: 'first-task',
      title: 'Add your first task',
      description: 'Start organizing your to-dos and see your planner come to life!',
      icon: Plus,
      action: 'modal'
    },
    {
      id: 'invite-someone',
      title: 'Invite someone new',
      description: 'Build your support network and share the household management!',
      icon: UserPlus,
      action: 'modal'
    }
  ];

  const handleCheck = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleSaveHouseholdName = () => {
    if (householdName.trim()) {
      setCheckedItems(prev => ({ ...prev, 'household-name': true }));
      const remaining = checklistItems.length - Object.values({...checkedItems, 'household-name': true}).filter(Boolean).length;
      toast({
        title: "Great job! 🎉",
        description: remaining > 0 ? `Welcome to ${householdName}! Just ${remaining} more step${remaining > 1 ? 's' : ''} to unlock your dashboard.` : `Welcome to ${householdName}! Your dashboard is ready!`,
      });
      setHouseholdName('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setCheckedItems(prev => ({ ...prev, 'first-task': true }));
      const remaining = checklistItems.length - Object.values({...checkedItems, 'first-task': true}).filter(Boolean).length;
      toast({
        title: "Awesome! ✨",
        description: remaining > 0 ? `"${newTask}" added! ${remaining} more step${remaining > 1 ? 's' : ''} to go.` : `"${newTask}" added! Your dashboard is ready!`,
      });
      setNewTask('');
    }
  };

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      setCheckedItems(prev => ({ ...prev, 'invite-someone': true }));
      const remaining = checklistItems.length - Object.values({...checkedItems, 'invite-someone': true}).filter(Boolean).length;
      toast({
        title: "Perfect! 🌟",
        description: remaining > 0 ? `Invitation sent to ${inviteEmail}! ${remaining} more step${remaining > 1 ? 's' : ''} to complete.` : `Invitation sent to ${inviteEmail}! You're all set!`,
      });
      setInviteEmail('');
    }
  };


  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const renderActionButton = (item: any) => {
    const IconComponent = item.icon;
    
    if (item.action === 'modal') {
      if (item.id === 'household-name') {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 hover:bg-primary/10 border-primary/30"
                aria-label="Set household name"
              >
                <IconComponent className="h-4 w-4 mr-1" />
                Set Name
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Give your Household a name</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="e.g., The Smith Family, Johnson Household"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                />
                <Button onClick={handleSaveHouseholdName} className="w-full">
                  Save Household Name
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        );
      }
      
      if (item.id === 'first-task') {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 hover:bg-primary/10 border-primary/30"
                aria-label="Add first task"
              >
                <IconComponent className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your first task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="e.g., Pick up groceries, Call dentist"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <Button onClick={handleAddTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        );
      }
      
      if (item.id === 'invite-someone') {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 hover:bg-primary/10 border-primary/30"
                aria-label="Invite someone to your village"
              >
                <IconComponent className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite someone to your village</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Button onClick={handleSendInvite} className="w-full">
                  Send Invite
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        );
      }
    }
    
    
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Motivational Header */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          You're just a few steps from a simpler routine! ✨
        </p>
        <p className="text-xs text-muted-foreground">
          Completing these steps unlocks your full Eloura experience.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-background to-muted/20 border-2 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Get Started Checklist
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-medium">
              {completedCount}/{totalCount} completed
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-3 bg-muted" />
            <p className="text-xs text-muted-foreground text-center">
              {completedCount === totalCount 
                ? "🎉 All done! Your dashboard is ready!" 
                : `${Math.round(progressPercentage)}% complete`
              }
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {checklistItems.map((item) => {
            const isCompleted = checkedItems[item.id];
            const IconComponent = item.icon;
            
            return (
              <div 
                key={item.id}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  isCompleted 
                    ? 'animate-scale-in' 
                    : 'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]'
                }`}
                onClick={() => !isCompleted && handleCheck(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !isCompleted) {
                    e.preventDefault();
                    handleCheck(item.id);
                  }
                }}
                aria-label={`${isCompleted ? 'Completed:' : 'Click to complete:'} ${item.title}`}
              >
                <div className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-sm' 
                    : 'bg-background border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg group-hover:shadow-primary/10'
                }`}>
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={isCompleted}
                      onChange={() => handleCheck(item.id)}
                      className="transition-all duration-200"
                      aria-hidden="true"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-full transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-200 text-green-700' 
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <h4 className={`font-semibold transition-all duration-300 ${
                        isCompleted 
                          ? 'text-green-800 line-through opacity-80' 
                          : 'text-foreground group-hover:text-primary'
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                    <p className={`text-sm leading-relaxed transition-all duration-300 ${
                      isCompleted 
                        ? 'text-green-600/80' 
                        : 'text-muted-foreground group-hover:text-foreground/80'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {!isCompleted && (
                    <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {renderActionButton(item)}
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="flex-shrink-0 animate-scale-in">
                      <CheckCircle2 className="h-6 w-6 text-green-600 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {completedCount === totalCount && (
            <div className="text-center py-6 px-4 animate-fade-in animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-green-800 mb-2 text-lg">🎉 All set up!</h4>
              <p className="text-sm text-green-600 leading-relaxed max-w-md mx-auto">
                Fantastic! You're ready to start using Eloura to manage your family and care responsibilities. 
                <br />
                <span className="font-medium">Your dashboard is now fully unlocked!</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniChecklist;