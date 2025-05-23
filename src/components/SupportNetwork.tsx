
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Phone, Calendar } from 'lucide-react';

const SupportNetwork = () => {
  const networkMembers = [
    {
      name: "Sarah (Sister)",
      availability: "Available today",
      lastHelp: "Picked up Emma",
      status: "active",
      avatar: "S"
    },
    {
      name: "Dr. Peterson",
      availability: "Office hours",
      lastHelp: "Mom's checkup",
      status: "available",
      avatar: "D"
    },
    {
      name: "Mrs. Johnson",
      availability: "Weekday evenings",
      lastHelp: "James tutoring",
      status: "scheduled",
      avatar: "J"
    },
    {
      name: "Tom (Neighbor)",
      availability: "Emergency contact",
      lastHelp: "School pickup",
      status: "available",
      avatar: "T"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'available': return 'bg-blue-100 text-blue-700';
      case 'scheduled': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card className="border-0 shadow-lg hover-scale">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <Users className="h-5 w-5 text-green-500" />
          Support Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {networkMembers.map((member, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-medium">
                  {member.avatar}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-slate-700 text-sm truncate">{member.name}</h4>
                  <Badge className={`${getStatusColor(member.status)} border-0 text-xs`}>
                    {member.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{member.availability}</p>
                <p className="text-xs text-slate-400">Last: {member.lastHelp}</p>
              </div>

              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Coordination */}
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-700 text-sm">Need help this week?</h4>
              <p className="text-xs text-slate-600">Send a quick request to your network</p>
            </div>
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Ask for help
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportNetwork;
