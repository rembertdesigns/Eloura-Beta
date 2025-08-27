import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Plus, 
  Users, 
  UserPlus, 
  Edit3,
  CheckCircle2,
  Circle
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
      description: 'Personalize your family space',
      icon: Home,
      action: 'modal'
    },
    {
      id: 'first-task',
      title: 'Add your first task',
      description: 'Start organizing your to-dos',
      icon: Plus,
      action: 'modal'
    },
    {
      id: 'invite-someone',
      title: 'Invite someone new',
      description: 'Expand your support network',
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
      toast({
        title: "Household name saved!",
        description: `Welcome to ${householdName}`,
      });
      setHouseholdName('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setCheckedItems(prev => ({ ...prev, 'first-task': true }));
      toast({
        title: "Task added!",
        description: `"${newTask}" has been added to your tasks`,
      });
      setNewTask('');
    }
  };

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      setCheckedItems(prev => ({ ...prev, 'invite-someone': true }));
      toast({
        title: "Invite sent!",
        description: `Invitation sent to ${inviteEmail}`,
      });
      setInviteEmail('');
    }
  };


  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklistItems.length;

  const renderActionButton = (item: any) => {
    const IconComponent = item.icon;
    
    if (item.action === 'modal') {
      if (item.id === 'household-name') {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
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
              <Button variant="outline" size="sm" className="h-8">
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
              <Button variant="outline" size="sm" className="h-8">
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-slate-800">
            Get Started Checklist
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {completedCount}/{totalCount} completed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {checklistItems.map((item) => {
          const isCompleted = checkedItems[item.id];
          const IconComponent = item.icon;
          
          return (
            <div 
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Checkbox
                checked={isCompleted}
                onChange={() => handleCheck(item.id)}
                className="flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className={`h-4 w-4 ${isCompleted ? 'text-green-600' : 'text-slate-600'}`} />
                  <h4 className={`font-medium ${isCompleted ? 'text-green-800 line-through' : 'text-slate-800'}`}>
                    {item.title}
                  </h4>
                </div>
                <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>
              
              {!isCompleted && (
                <div className="flex-shrink-0">
                  {renderActionButton(item)}
                </div>
              )}
              
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              )}
            </div>
          );
        })}
        
        {completedCount === totalCount && (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-medium text-green-800 mb-1">All set up!</h4>
            <p className="text-sm text-green-600">
              You're ready to start using Eloura to manage your family and care responsibilities.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MiniChecklist;