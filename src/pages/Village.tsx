import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Heart, Star, Phone, Mail, MessageSquare, UserPlus, Edit } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';
const Village = () => {
  const stats = [{
    icon: Users,
    label: "Helpers",
    value: "4",
    color: "text-green-600"
  }, {
    icon: Calendar,
    label: "Active Tasks",
    value: "4",
    color: "text-blue-600"
  }, {
    icon: Heart,
    label: "Open Requests",
    value: "2",
    color: "text-purple-600"
  }, {
    icon: Star,
    label: "Avg Rating",
    value: "4.6",
    color: "text-yellow-600"
  }];
  const careCircleMembers = [{
    id: 1,
    name: "Mom (Patricia)",
    role: "Parent",
    avatar: "M",
    rating: 5,
    ratingCount: 5,
    description: "Great with kids, loves to help with meals",
    phone: "(555) 123-4567",
    email: "patricia@email.com",
    lastContact: "2 days ago",
    status: "Available",
    statusColor: "bg-green-100 text-green-700"
  }, {
    id: 2,
    name: "Mike (Partner)",
    role: "Co-parent",
    avatar: "M",
    rating: 5,
    ratingCount: 5,
    description: "Great with school stuff, weekend activities",
    phone: "(555) 456-7890",
    email: "mike@email.com",
    lastContact: "Today",
    status: "Available evenings",
    statusColor: "bg-blue-100 text-blue-700"
  }];
  const delegationTasks = [{
    id: 1,
    title: "Grocery shopping",
    assignedTo: "Mike (Partner)",
    due: "Today, 6 PM",
    priority: "High",
    priorityColor: "bg-red-100 text-red-700",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-700",
    description: "Don't forget organic milk and vegetables for dinner"
  }, {
    id: 2,
    title: "Pick up dry cleaning",
    assignedTo: "Mom (Patricia)",
    due: "Yesterday",
    priority: "Low",
    priorityColor: "bg-gray-100 text-gray-700",
    status: "Completed",
    statusColor: "bg-green-100 text-green-700",
    description: "Thank you! ❤️"
  }, {
    id: 3,
    title: "Soccer carpool",
    assignedTo: "Sarah Johnson",
    due: "Wednesday, 3 PM",
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-700",
    status: "Scheduled",
    statusColor: "bg-purple-100 text-purple-700",
    description: "Taking kids to practice, I'll pick up after"
  }];
  const helpRequests = [{
    id: 1,
    title: "Need babysitter for date night",
    category: "Childcare",
    categoryColor: "bg-pink-100 text-pink-700",
    date: "Saturday, Dec 16",
    time: "6:00 PM - 11:00 PM",
    responses: 2,
    status: "Open",
    statusColor: "bg-green-100 text-green-700"
  }, {
    id: 2,
    title: "School pickup emergency",
    category: "Transportation",
    categoryColor: "bg-blue-100 text-blue-700",
    date: "Today",
    time: "3:15 PM",
    responses: 1,
    status: "Fulfilled",
    statusColor: "bg-blue-100 text-blue-700"
  }, {
    id: 3,
    title: "Help with moving furniture",
    category: "Household",
    categoryColor: "bg-green-100 text-green-700",
    date: "This weekend",
    time: "Morning",
    responses: 0,
    status: "Open",
    statusColor: "bg-green-100 text-green-700"
  }];
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />);
  };
  const renderPersonCard = (person: any) => <Card key={person.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-lg flex-shrink-0">
            {person.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
              <Badge className={`${person.statusColor} border-0 flex-shrink-0 ml-2`}>
                {person.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {renderStars(person.rating)}
              <span className="text-sm text-gray-500 ml-1">({person.ratingCount}/5)</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{person.description}</p>
            
            <div className="space-y-1 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 truncate">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{person.phone}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{person.email}</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">Last contact: {person.lastContact}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="h-8 flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
  const renderTaskCard = (task: any) => <Card key={task.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
          <div className="flex gap-2 flex-shrink-0 ml-2">
            <Badge className={`${task.statusColor} border-0`}>
              {task.status}
            </Badge>
            <Badge className={`${task.priorityColor} border-0`}>
              {task.priority}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div>Assigned to: <span className="font-medium">{task.assignedTo}</span></div>
          <div>Due: <span className="font-medium">{task.due}</span></div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-1">{task.description}</p>
        
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" className="h-8">
            <MessageSquare className="h-4 w-4 mr-1" />
            Follow up
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>;
  const renderHelpRequestCard = (request: any) => <Card key={request.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Badge className={`${request.categoryColor} border-0 flex-shrink-0`}>
            {request.category}
          </Badge>
          <Badge className={`${request.statusColor} border-0 flex-shrink-0`}>
            {request.status}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-3">{request.title}</h3>
        
        <div className="space-y-1 mb-4 text-sm text-gray-600">
          <div>{request.date} {request.time}</div>
          <div>{request.responses} responses</div>
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" className="h-8">
            <MessageSquare className="h-4 w-4 mr-1" />
            View Responses
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Edit className="h-4 w-4 mr-1" />
            Edit Request
          </Button>
        </div>
      </CardContent>
    </Card>;
  return <div className="min-h-screen warm-gradient pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Village</h1>
            <p className="text-gray-600">Your support network and helping hands</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Send Message
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Helper
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="care-circle" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="care-circle" className="text-base">Care Circle</TabsTrigger>
            <TabsTrigger value="delegations" className="text-base">Active Tasks</TabsTrigger>
            <TabsTrigger value="help-requests" className="text-base">Help Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="care-circle" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careCircleMembers.map(renderPersonCard)}
            </div>
          </TabsContent>

          <TabsContent value="delegations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {delegationTasks.map(renderTaskCard)}
            </div>
          </TabsContent>

          <TabsContent value="help-requests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpRequests.map(renderHelpRequestCard)}
              
              {/* Empty state card for requesting help */}
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors h-full">
                <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-700 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-500 mb-4">Ask your village for support</p>
                  <Button className="bg-gray-800 hover:bg-gray-900">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Request Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <FeatureFooter />
    </div>;
};
export default Village;