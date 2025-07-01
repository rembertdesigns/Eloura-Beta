import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Phone, Calendar } from 'lucide-react';
const SupportNetwork = () => {
  const networkMembers = [{
    name: "Sarah (Sister)",
    availability: "Available today",
    lastHelp: "Picked up Emma",
    status: "active",
    avatar: "S"
  }, {
    name: "Dr. Peterson",
    availability: "Office hours",
    lastHelp: "Mom's checkup",
    status: "available",
    avatar: "D"
  }, {
    name: "Mrs. Johnson",
    availability: "Weekday evenings",
    lastHelp: "James tutoring",
    status: "scheduled",
    avatar: "J"
  }, {
    name: "Tom (Neighbor)",
    availability: "Emergency contact",
    lastHelp: "School pickup",
    status: "available",
    avatar: "T"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'available':
        return 'bg-blue-100 text-blue-700';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };
  return <Card className="border-0 shadow-lg hover-scale">
      
      
    </Card>;
};
export default SupportNetwork;