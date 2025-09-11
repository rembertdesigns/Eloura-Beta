import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Heart, MessageSquare, UserPlus, MoreVertical } from 'lucide-react';
import AddVillageMemberModal from '@/components/village/AddVillageMemberModal';
import RequestHelpModal from '@/components/village/RequestHelpModal';
import MessageModal from '@/components/village/MessageModal';
import CareCircleEnhanced from '@/components/village/CareCircleEnhanced';
import ActiveTasksEnhanced from '@/components/village/ActiveTasksEnhanced';
import HelpRequestsLogsEnhanced from '@/components/village/HelpRequestsLogsEnhanced';
import { useVillageData } from '@/hooks/useVillageData';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Village = () => {
  const { analytics, loading, villageMembers, addVillageMember, addHelpRequest, conversations, messages, createConversation, sendMessage } = useVillageData();
  const [showAddMember, setShowAddMember] = useState(false);
  const [showRequestHelp, setShowRequestHelp] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMobileActions, setShowMobileActions] = useState(false);
  
  const stats = [
    {
      icon: Users,
      label: "Village Members",
      value: analytics.totalMembers.toString(),
      color: "text-green-600"
    },
    {
      icon: Calendar,
      label: "Active Tasks",
      value: analytics.activeTasks.toString(),
      color: "text-blue-600"
    },
    {
      icon: Heart,
      label: "Open Requests",
      value: analytics.openRequests.toString(),
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Page Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Users className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">My Village</h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Your community support network and connections</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col flex-1">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between py-4 sm:py-6 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">All the people in your support network - your village of care</p>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex gap-3 flex-shrink-0">
            <Button variant="outline" className="flex items-center gap-2 text-sm touch-manipulation min-h-[44px]" onClick={() => setShowMessage(true)}>
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">Send Message</span>
              <span className="md:hidden">Message</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-sm touch-manipulation min-h-[44px]" onClick={() => setShowAddMember(true)}>
              <UserPlus className="h-4 w-4" />
              <span className="hidden md:inline">Add Member</span>
              <span className="md:hidden">Add</span>
            </Button>
          </div>

          {/* Mobile Actions Menu */}
          <div className="sm:hidden flex items-center gap-2 flex-shrink-0">
            <Sheet open={showMobileActions} onOpenChange={setShowMobileActions}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="touch-manipulation min-h-[44px] min-w-[44px]">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="pt-6 space-y-3">
                  <Button 
                    className="w-full justify-start touch-manipulation min-h-[44px]" 
                    onClick={() => {
                      setShowAddMember(true);
                      setShowMobileActions(false);
                    }}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Village Member
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start touch-manipulation min-h-[44px]" 
                    onClick={() => {
                      setShowMessage(true);
                      setShowMobileActions(false);
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start touch-manipulation min-h-[44px]" 
                    onClick={() => {
                      setShowRequestHelp(true);
                      setShowMobileActions(false);
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Request Help
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Stats Cards - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <IconComponent className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="circle" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-3 sm:mb-4 h-auto">
              <div className="col-span-3 sm:col-span-1">
                <div className="grid grid-cols-3 w-full h-full">
                  <TabsTrigger value="circle" className="text-xs px-2 py-2 sm:px-3 sm:py-3 min-h-[44px]">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Circle</span>
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="text-xs px-2 py-2 sm:px-3 sm:py-3 min-h-[44px]">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Tasks</span>
                  </TabsTrigger>
                  <TabsTrigger value="help" className="text-xs px-2 py-2 sm:px-3 sm:py-3 min-h-[44px]">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Help</span>
                  </TabsTrigger>
                </div>
              </div>
            </TabsList>

            <div className="flex-1 overflow-auto">
              <TabsContent value="circle" className="mt-0 h-full">
                <div className="p-4">
                  <p className="text-gray-500">Care circle content coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-0 h-full">
                <div className="p-4">
                  <p className="text-gray-500">Active tasks content coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="help" className="mt-0 h-full">
                <div className="p-4">
                  <p className="text-gray-500">Help requests content coming soon</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <AddVillageMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        onSave={addVillageMember}
      />

      <div>
        {showRequestHelp && <p>Request help modal placeholder</p>}
        {showMessage && <p>Message modal placeholder</p>}
      </div>
    </div>
  );
};

export default Village;