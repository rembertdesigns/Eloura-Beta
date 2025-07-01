
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Heart, Star, Phone, Mail, MessageSquare, UserPlus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';

const Village = () => {
  const stats = [
    { icon: Users, label: "Helpers", value: "4", color: "text-green-600" },
    { icon: Calendar, label: "Active Tasks", value: "4", color: "text-blue-600" },
    { icon: Heart, label: "Open Requests", value: "2", color: "text-purple-600" },
    { icon: Star, label: "Avg Rating", value: "4.6", color: "text-yellow-600" }
  ];

  const careCircle = [
    {
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
      statusColor: "text-green-600"
    },
    {
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
      statusColor: "text-blue-600"
    }
  ];

  const delegations = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Neighbor",
      avatar: "S",
      rating: 4,
      ratingCount: 5,
      description: "Carpool partner, emergency contact",
      phone: "(555) 987-6543",
      email: "sarah.j@email.com",
      lastContact: "1 week ago",
      status: "Busy this week",
      statusColor: "text-orange-600"
    }
  ];

  const helpRequests = [
    {
      id: 1,
      name: "Lisa Martinez",
      role: "Friend",
      avatar: "L",
      rating: 4,
      ratingCount: 5,
      description: "Babysitting, emotional support",
      phone: "(555) 234-5678",
      email: "lisa.m@email.com",
      lastContact: "3 days ago",
      status: "Available weekends",
      statusColor: "text-purple-600"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderPersonCard = (person: any) => (
    <Card key={person.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-lg">
            {person.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
              <Badge variant="outline" className={`${person.statusColor} border-current`}>
                {person.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {renderStars(person.rating)}
              <span className="text-sm text-gray-500 ml-1">({person.ratingCount}/5)</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{person.description}</p>
            
            <div className="space-y-1 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{person.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{person.email}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Last contact: {person.lastContact}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen warm-gradient pb-20">
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
            return (
              <Card key={index} className="bg-white border-0 shadow-sm">
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
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Care Circle */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Care Circle</h2>
            <div className="space-y-4">
              {careCircle.map(renderPersonCard)}
            </div>
          </div>

          {/* Delegations */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Delegations</h2>
            <div className="space-y-4">
              {delegations.map(renderPersonCard)}
            </div>
          </div>

          {/* Help Requests */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Requests</h2>
            <div className="space-y-4">
              {helpRequests.map(renderPersonCard)}
            </div>
          </div>
        </div>
      </div>
      
      <FeatureFooter />
    </div>
  );
};

export default Village;
