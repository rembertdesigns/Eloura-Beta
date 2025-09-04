import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Phone, Mail, MessageSquare, Star, Clock, Wifi, WifiOff, UserPlus, Filter } from 'lucide-react';
import { useVillageData } from '@/hooks/useVillageData';

const CareCircleEnhanced = () => {
  const { villageMembers, loading, error } = useVillageData();
  const [filterRole, setFilterRole] = useState('');
  const [filterGroup, setFilterGroup] = useState('');

  const groups = ["All", "Family", "Neighbors", "Extended Family", "Friends"];
  const allRoles = ["Childcare", "Transportation", "Meal Support", "School Support", "Emergency Contact"];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'available evenings':
      case 'available weekdays':
        return 'bg-blue-100 text-blue-700';
      case 'busy':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredMembers = villageMembers.filter(member => {
    const matchesRole = !filterRole || (member.roles && member.roles.some(role => role.toLowerCase().includes(filterRole.toLowerCase())));
    const matchesGroup = !filterGroup || filterGroup === "All" || member.group_name === filterGroup;
    return matchesRole && matchesGroup;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  const renderPersonCard = (person: any) => (
    <Card key={person.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar with online status */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-lg">
              {person.avatar}
            </div>
            {/* Online status indicator */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${person.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
              {person.isOnline ? <Wifi className="h-2 w-2 text-white m-0.5" /> : <WifiOff className="h-2 w-2 text-white m-0.5" />}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.group_name || person.relationship}</p>
              </div>
              <Badge className={`${getStatusColor(person.status)} border-0 flex-shrink-0 ml-2`}>
                {person.status || 'Available'}
              </Badge>
            </div>
            
            {/* Multiple Role Badges */}
            <div className="flex flex-wrap gap-1 mb-2">
              {person.roles.map((role, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {renderStars(person.rating)}
              <span className="text-sm text-gray-500 ml-1">({person.ratingCount}/5)</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{person.description}</p>
            
            {/* Skills */}
            <div className="mb-2">
              <p className="text-xs text-gray-500 mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {person.skills.map((skill, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-3">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{person.recentActivity}</span>
              </div>
            </div>
            
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
                <span className="text-xs text-gray-400">Added: {new Date(person.created_at).toLocaleDateString()}</span>
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
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Care Circle</h3>
          <p className="text-sm text-gray-600">Specific people in your village who provide care and support for particular situations or individuals</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select 
              value={filterGroup} 
              onChange={(e) => setFilterGroup(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {groups.map(group => (
                <option key={group} value={group === "All" ? "" : group}>{group}</option>
              ))}
            </select>
          </div>
          
          <Input
            placeholder="Filter by role..."
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(renderPersonCard)}
        
        {/* Add Member Card */}
        <Card className="bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors h-full">
          <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">Add Village Member</h3>
            <p className="text-sm text-gray-500 mb-4">Expand your care circle</p>
            <Button className="bg-gray-800 hover:bg-gray-900">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareCircleEnhanced;