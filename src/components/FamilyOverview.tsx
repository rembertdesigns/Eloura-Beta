
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Heart } from 'lucide-react';

const FamilyOverview = () => {
  const familyMembers = [
    {
      name: "Emma",
      role: "Daughter",
      age: 8,
      status: "at school",
      next: "Soccer practice at 4pm",
      color: "bg-pink-100 text-pink-700"
    },
    {
      name: "James",
      role: "Son",
      age: 12,
      status: "at school",
      next: "Piano lesson at 5pm",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Mom (Margaret)",
      role: "Parent",
      age: 72,
      status: "at home",
      next: "Doctor appointment Mon 2pm",
      color: "bg-purple-100 text-purple-700"
    }
  ];

  return (
    <Card className="border-0 shadow-lg hover-scale">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <Heart className="h-5 w-5 text-emerald-500" />
          Family Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyMembers.map((member, index) => (
            <div 
              key={index} 
              className="p-4 bg-gradient-to-br from-white to-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-slate-800">{member.name}</h3>
                  <p className="text-sm text-slate-500">{member.role}, {member.age}</p>
                </div>
                <Badge className={`${member.color} border-0 text-xs`}>
                  {member.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>{member.next}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Schedule Preview */}
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
          <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Today's Key Events
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">3:30 PM - Emma pickup from school</span>
              <Badge variant="outline" className="text-xs">You</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">4:00 PM - Emma soccer practice</span>
              <Badge variant="outline" className="text-xs">Sarah</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">5:00 PM - James piano lesson</span>
              <Badge variant="outline" className="text-xs">You</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyOverview;
