
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Heart, Users, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const FamilyOverview = () => {
  const { user } = useAuth();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [familyResult, eventsResult] = await Promise.all([
          supabase
            .from('family_members')
            .select('*')
            .eq('user_id', user.id),
          supabase
            .from('events')
            .select('*')
            .eq('user_id', user.id)
            .gte('start_time', new Date().toISOString().split('T')[0])
        ]);

        if (familyResult.error) console.error('Family members error:', familyResult.error);
        if (eventsResult.error) console.error('Events error:', eventsResult.error);

        setFamilyMembers(familyResult.data || []);
        setEvents(eventsResult.data || []);
      } catch (error) {
        console.error('Error fetching family data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Card className="border-0 shadow-lg hover-scale">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const todaysEvents = events.filter(event => {
    const today = new Date().toDateString();
    return new Date(event.start_time).toDateString() === today;
  });

  return (
    <Card className="border-0 shadow-lg hover-scale">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <Heart className="h-5 w-5 text-emerald-500" />
          Family Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {familyMembers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No family members added</h3>
            <p className="text-gray-600 mb-4">Add your family members to see their schedules and status.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Family Member
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="p-4 bg-gradient-to-br from-white to-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-800">{member.name}</h3>
                      <p className="text-sm text-slate-500">
                        {member.relationship}
                        {member.date_of_birth && `, ${new Date().getFullYear() - new Date(member.date_of_birth).getFullYear()}`}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                      {member.is_primary_caregiver ? 'Primary' : 'Family'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Schedule Preview */}
            {todaysEvents.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Today's Key Events
                </h4>
                <div className="space-y-2">
                  {todaysEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.title}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {event.category || 'Event'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyOverview;
