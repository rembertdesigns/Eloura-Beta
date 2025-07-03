
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Trash } from 'lucide-react';

const FamilySettings = () => {
  const [familyMembers] = useState([
    { id: 1, name: 'Sarah Johnson', relationship: 'Self', isPrimary: true },
    { id: 2, name: 'Mike Johnson', relationship: 'Spouse', isPrimary: false },
    { id: 3, name: 'Emma Johnson', relationship: 'Daughter', isPrimary: false },
    { id: 4, name: 'Noah Johnson', relationship: 'Son', isPrimary: false },
    { id: 5, name: 'Margaret Smith', relationship: 'Mother', isPrimary: false }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Family Members
            </CardTitle>
            <Button className="bg-[#223b0a] hover:bg-[#1a2e08]">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-slate-600">{member.relationship}</p>
                  </div>
                  {member.isPrimary && (
                    <Badge variant="secondary">Primary Caregiver</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!member.isPrimary && (
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium">Dr. Sarah Williams</h4>
            <p className="text-sm text-slate-600">Primary Care Physician</p>
            <p className="text-sm text-slate-600">(555) 987-6543</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium">Emergency Services</h4>
            <p className="text-sm text-slate-600">911</p>
          </div>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Emergency Contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilySettings;
