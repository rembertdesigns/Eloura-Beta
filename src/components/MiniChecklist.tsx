import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Home, 
  Plus, 
  Users, 
  UserPlus, 
  Edit3,
  CheckCircle2,
  Circle,
  Sparkles,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const MiniChecklist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [householdName, setHouseholdName] = useState('');
  const [newTask, setNewTask] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('helper');
  const [householdDialogOpen, setHouseholdDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const savedHouseholdName = localStorage.getItem('householdName');
    const savedTasks = localStorage.getItem('userTasks');
    const savedInvites = localStorage.getItem('pendingInvites');
    
    if (savedHouseholdName) {
      setCheckedItems(prev => ({ ...prev, 'household-name': true }));
    }
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      if (tasks.length > 0) {
        setCheckedItems(prev => ({ ...prev, 'first-task': true }));
      }
    }
    if (savedInvites) {
      const invites = JSON.parse(savedInvites);
      if (invites.length > 0) {
        setCheckedItems(prev => ({ ...prev, 'invite-someone': true }));
      }
    }
  }, []);

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

  const roles = [
    { value: 'caregiver', label: 'Primary Caregiver', description: 'Full access to manage family care' },
    { value: 'helper', label: 'Helper', description: 'Can view schedules and help with tasks' },
    { value: 'family', label: 'Family Member', description: 'Access to family information and updates' },
    { value: 'emergency', label: 'Emergency Contact', description: 'Limited access for emergencies only' }
  ];

  const handleSaveHouseholdName = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (householdName.trim()) {
      localStorage.setItem('householdName', householdName.trim());
      setCheckedItems(prev => ({ ...prev, 'household-name': true }));
      const remaining = checklistItems.length - Object.values({...checkedItems, 'household-name': true}).filter(Boolean).length;
      toast({
        title: "Great job! 🎉",
        description: remaining > 0 ? `Welcome to ${householdName}! Just ${remaining} more step${remaining > 1 ? 's' : ''} to unlock your dashboard.` : `Welcome to ${householdName}! Your dashboard is ready!`,
      });
      setHouseholdName('');
      setHouseholdDialogOpen(false);
    }
  };

  const handleAddTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newTask.trim()) {
      // Save task to localStorage
      const existingTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
      const newTaskObj = {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      existingTasks.push(newTaskObj);
      localStorage.setItem('userTasks', JSON.stringify(existingTasks));
      
      setCheckedItems(prev => ({ ...prev, 'first-task': true }));
      const remaining = checklistItems.length - Object.values({...checkedItems, 'first-task': true}).filter(Boolean).length;
      toast({
        title: "Awesome! ✨",
        description: remaining > 0 ? `"${newTask}" added! ${remaining} more step${remaining > 1 ? 's' : ''} to go.` : `"${newTask}" added! Your dashboard is ready!`,
      });
      setNewTask('');
      setTaskDialogOpen(false);
    }
  };

  const handleSendInvite = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim() || !user) return;
    
    try {
      // Create invitation in database
      const { data: invitation, error: inviteError } = await supabase
        .from('village_invitations')
        .insert({
          inviter_id: user.id,
          invited_email: inviteEmail.trim(),
          invited_name: inviteName.trim(),
          role: selectedRole,
          personal_message: `I'd love to have you as part of my support network on Eloura. This will help us coordinate and stay connected as we manage our household together.`
        })
        .select('*')
        .single();

      if (inviteError) throw inviteError;

      // Get inviter profile for email
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, household_name')
        .eq('id', user.id)
        .single();

      // Send invitation email
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'village-invitation',
          email: inviteEmail.trim(),
          data: {
            invitedName: inviteName.trim(),
            inviterName: profile?.full_name || user.user_metadata?.full_name || user.email || 'A family member',
            inviterEmail: user.email,
            role: roles.find(r => r.value === selectedRole)?.label || selectedRole,
            personalMessage: `I'd love to have you as part of my support network on Eloura. This will help us coordinate and stay connected as we manage our household together.`,
            signupUrl: `https://elouraapp.com/village-invite?token=${invitation.invitation_token}`
          }
        }
      });

      if (emailError) {
        console.error('Failed to send invitation email:', emailError);
        toast({
          title: "Invitation created",
          description: `Invitation created for ${inviteEmail}, but failed to send email. You can share the link manually.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Invite sent! ✉️",
          description: `Invitation sent to ${inviteEmail}`,
        });
      }

      // Clear form and close dialog
      setInviteName('');
      setInviteEmail('');
      setSelectedRole('helper');
      setInviteDialogOpen(false);

      // Mark as completed
      handleCheck('invite-someone');
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
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
          <Dialog open={householdDialogOpen} onOpenChange={setHouseholdDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 hover:bg-primary/10 border-primary/30"
                aria-label="Set household name"
                onClick={(e) => e.stopPropagation()}
              >
                <IconComponent className="h-4 w-4 mr-1" />
                Set Name
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Give your Household a name</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveHouseholdName} className="space-y-4">
                <Input
                  placeholder="e.g., The Smith Family, Johnson Household"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveHouseholdName(e);
                    }
                  }}
                />
                <Button type="submit" className="w-full" disabled={!householdName.trim()}>
                  Save Household Name
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        );
      }
      
      if (item.id === 'first-task') {
        return (
          <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 hover:bg-primary/10 border-primary/30"
                aria-label="Add first task"
                onClick={(e) => e.stopPropagation()}
              >
                <IconComponent className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your first task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4">
                <Input
                  placeholder="e.g., Pick up groceries, Call dentist"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTask(e);
                    }
                  }}
                />
                <Button type="submit" className="w-full" disabled={!newTask.trim()}>
                  Add Task
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        );
      }
      
      if (item.id === 'invite-someone') {
        return (
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 hover:bg-primary/10 border-primary/30"
                aria-label="Invite someone to your village"
                onClick={(e) => e.stopPropagation()}
              >
                <IconComponent className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite someone to your village</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg z-50">
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value} className="cursor-pointer hover:bg-accent">
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit"
                  className="w-full" 
                  disabled={!inviteName.trim() || !inviteEmail.trim()}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invite
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        );
      }
    }
    
    
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Motivational Header */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          You're just a few steps from a simpler routine! ✨
        </p>
        <p className="text-xs text-muted-foreground">
          Completing these steps unlocks your full Eloura experience.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-background to-muted/20 border-2 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Get Started Checklist
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-medium text-xs">
              {completedCount}/{totalCount} completed
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-1">
            <Progress value={progressPercentage} className="h-2 bg-muted" />
            <p className="text-xs text-muted-foreground text-center">
              {completedCount === totalCount 
                ? "🎉 All done! Your dashboard is ready!" 
                : `${Math.round(progressPercentage)}% complete`
              }
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {checklistItems.map((item) => {
            const isCompleted = checkedItems[item.id];
            const IconComponent = item.icon;
            
            return (
              <div 
                key={item.id}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  isCompleted 
                    ? 'animate-scale-in' 
                    : 'hover:scale-[1.01] hover:shadow-md active:scale-[0.99]'
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
                <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 ${
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
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-full transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-200 text-green-700' 
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110'
                      }`}>
                        <IconComponent className="h-3 w-3" />
                      </div>
                      <h4 className={`font-semibold text-sm transition-all duration-300 ${
                        isCompleted 
                          ? 'text-green-800 line-through opacity-80' 
                          : 'text-foreground group-hover:text-primary'
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                    <p className={`text-xs leading-relaxed transition-all duration-300 ${
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
                      <CheckCircle2 className="h-5 w-5 text-green-600 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {completedCount === totalCount && (
            <div className="text-center py-4 px-4 animate-fade-in animate-scale-in">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse shadow-lg">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-bold text-green-800 mb-1 text-base">🎉 All set up!</h4>
              <p className="text-xs text-green-600 leading-relaxed max-w-md mx-auto">
                You're ready to start using Eloura! Your dashboard is now fully unlocked.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniChecklist;