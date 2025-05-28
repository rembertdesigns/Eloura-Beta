
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, CheckCircle, HelpCircle, MessageSquare, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';

const Village = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const villageMembers = [
    { id: 1, name: "Sarah (Partner)", role: "Co-parent", availability: "Available", tasks: 3, phone: "(555) 123-4567" },
    { id: 2, name: "Mom (Grandma)", role: "Babysitter", availability: "Weekends", tasks: 1, phone: "(555) 234-5678" },
    { id: 3, name: "Lisa (Sister)", role: "Elder Care Helper", availability: "Evenings", tasks: 2, phone: "(555) 345-6789" },
    { id: 4, name: "Maria (Nanny)", role: "Childcare", availability: "Mon-Fri 9-5", tasks: 0, phone: "(555) 456-7890" }
  ];

  const activeTasks = [
    { id: 1, task: "Pick up kids from school", assignedTo: "Sarah (Partner)", status: "pending", category: "childcare", dueTime: "3:30 PM" },
    { id: 2, task: "Dad's grocery shopping", assignedTo: "Lisa (Sister)", status: "in-progress", category: "eldercare", dueTime: "2:00 PM" },
    { id: 3, task: "Prepare after-school snacks", assignedTo: "Maria (Nanny)", status: "completed", category: "childcare", dueTime: "3:00 PM" },
    { id: 4, task: "Take mom to doctor appointment", assignedTo: "Unassigned", status: "needs-help", category: "eldercare", dueTime: "Tomorrow 10 AM" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'needs-help': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-light text-slate-800">
            Your <span className="font-medium text-emerald-600">Village</span>
          </h1>
          <p className="text-slate-600">Coordinate your support network with calm responsibility</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - People */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    Your People
                  </span>
                  <Button variant="ghost" size="sm">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {villageMembers.map((person) => (
                  <div key={person.id} className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-700">{person.name}</h4>
                      <Badge variant="outline" className="text-xs">{person.tasks} tasks</Badge>
                    </div>
                    <p className="text-sm text-slate-500">{person.role}</p>
                    <p className="text-xs text-slate-400">{person.availability}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Add Task */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Quick Assign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="What needs to be done?" />
                <select className="w-full p-2 border rounded-md text-sm">
                  <option>Choose category</option>
                  <option>Childcare</option>
                  <option>Eldercare</option>
                  <option>General</option>
                </select>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option>Assign to...</option>
                  {villageMembers.map((person) => (
                    <option key={person.id}>{person.name}</option>
                  ))}
                </select>
                <Button className="w-full" size="sm">Add Task</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Active Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Active Tasks & Coordination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-700">{task.task}</h4>
                        <p className="text-sm text-slate-500">Due: {task.dueTime}</p>
                        <p className="text-sm text-slate-600">Assigned to: {task.assignedTo}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="secondary">{task.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {task.status === 'needs-help' ? (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          I've Got It
                        </Button>
                      ) : task.status === 'pending' ? (
                        <Button variant="outline" size="sm">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Need Help
                        </Button>
                      ) : null}
                      
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>

                    {task.status === 'in-progress' && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Lisa:</strong> "At the store now, should I grab anything extra for dad?"
                        </p>
                        <div className="mt-2">
                          <Input placeholder="Reply..." className="text-sm" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FeatureFooter />
    </div>
  );
};

export default Village;
