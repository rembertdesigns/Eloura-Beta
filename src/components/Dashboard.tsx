
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Users, 
  Brain, 
  Heart, 
  Plus, 
  Bell, 
  FileText, 
  BarChart3, 
  Home,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const mustDoTasks = [
    { id: 1, text: "Pick up kids from school", urgent: true, completed: false },
    { id: 2, text: "Call mom about doctor's appointment", urgent: true, completed: false },
    { id: 3, text: "Submit project proposal", urgent: false, completed: true },
    { id: 4, text: "Grocery shopping", urgent: false, completed: false },
    { id: 5, text: "Schedule parent-teacher conference", urgent: false, completed: false }
  ];

  const todaysSchedule = [
    { time: "9:00 AM", event: "Team meeting", category: "work", color: "bg-blue-100 text-blue-700" },
    { time: "11:30 AM", event: "Doctor visit with mom", category: "family", color: "bg-green-100 text-green-700" },
    { time: "2:00 PM", event: "Kids pickup", category: "parenting", color: "bg-purple-100 text-purple-700" },
    { time: "4:00 PM", event: "Soccer practice", category: "parenting", color: "bg-purple-100 text-purple-700" },
    { time: "6:00 PM", event: "Family dinner", category: "family", color: "bg-green-100 text-green-700" }
  ];

  const taskCategories = [
    {
      title: "Personal",
      tasks: ["Exercise routine", "Read book chapter"],
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Family & Parenting",
      tasks: ["Soccer practice", "Plan weekend activity"],
      color: "border-green-200 bg-green-50"
    },
    {
      title: "Career",
      tasks: ["Submit proposal", "Team meeting prep"],
      color: "border-purple-200 bg-purple-50"
    }
  ];

  const villageMembers = [
    { name: "Mom", status: "Available today", role: "Helper", initial: "M" },
    { name: "Sarah (neighbor)", status: "Carpool buddy", role: "Active", initial: "S" }
  ];

  const activeDelegations = [
    { task: "Grocery shopping", delegatedTo: "Partner", due: "Today 3 PM", status: "pending" },
    { task: "Laundry pickup", delegatedTo: "Mom", due: "Completed ✓", status: "completed" }
  ];

  const careCircle = [
    { item: "Mom's doctor visit", time: "Today 11:30 AM", status: "Needs attention", urgent: true },
    { item: "Dad's medication", time: "Refill due Tomorrow", status: "On track", urgent: false }
  ];

  const pendingCount = mustDoTasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800">Good Morning, Linda</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-slate-600">Today's Balance:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                1/5 - Take it easy
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <Heart className="h-5 w-5" />
            <span className="text-sm font-medium">You're doing amazing!</span>
          </div>
        </div>

        {/* Gentle Suggestion */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <Brain className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Gentle Suggestion</h3>
                <p className="text-sm text-slate-600">
                  You have 2 urgent tasks today. Consider delegating grocery shopping to free up time for the important calls. 
                  Remember to take a 10-minute break after your team meeting! 💙
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Add */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-slate-800">Quick Add</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" size="sm" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Task
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Event
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Delegate
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Reminder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Must-Do Today */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-slate-800">Must-Do Today</CardTitle>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {pendingCount} pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mustDoTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  <Checkbox 
                    checked={task.completed}
                    className={task.completed ? "data-[state=checked]:bg-green-500" : ""}
                  />
                  <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.text}
                  </span>
                  {task.urgent && !task.completed && (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                      urgent
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-slate-800">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-sm font-medium text-blue-600 w-16">
                    {item.time}
                  </div>
                  <div className="flex-1 text-sm text-slate-700">
                    {item.event}
                  </div>
                  <Badge className={`text-xs ${item.color} border-0`}>
                    {item.category}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Task Manager */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-slate-800">Task Manager</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {taskCategories.map((category, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${category.color}`}>
                  <h4 className="font-medium text-slate-800 mb-3">{category.title}</h4>
                  <div className="space-y-2">
                    {category.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="text-sm text-slate-600 p-2 bg-white rounded">
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Village */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-800">
                <Users className="h-5 w-5 text-green-600" />
                Village
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {villageMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">{member.initial}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">{member.name}</div>
                    <div className="text-xs text-slate-500">{member.status}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {member.role}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Delegations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-800">
                <ArrowRight className="h-5 w-5 text-blue-600" />
                Active Delegations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeDelegations.map((delegation, index) => (
                <div key={index} className={`p-3 rounded-lg ${delegation.status === 'completed' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                  <div className="text-sm font-medium text-slate-800">{delegation.task}</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Delegated to: {delegation.delegatedTo}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Due: {delegation.due}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Care Circle */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-800">
                <Heart className="h-5 w-5 text-red-500" />
                Care Circle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {careCircle.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-sm font-medium text-slate-800">{item.item}</div>
                  <div className="text-xs text-slate-600">{item.time}</div>
                  <div className={`text-xs ${item.urgent ? 'text-red-600' : 'text-green-600'}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
