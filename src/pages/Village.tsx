import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Heart, MessageSquare, UserPlus, Menu } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';
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
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col flex-1">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between py-4 sm:py-6 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 truncate">My Village</h1>
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
              <span className="hidden md:inline">Add Village Member</span>
              <span className="md:hidden">Add Member</span>
            </Button>
          </div>

          {/* Mobile Actions Menu */}
          <div className="sm:hidden">
            <Sheet open={showMobileActions} onOpenChange={setShowMobileActions}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="touch-manipulation min-h-[44px] min-w-[44px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <div className="py-4 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 touch-manipulation min-h-[52px]" 
                    onClick={() => {
                      setShowMessage(true);
                      setShowMobileActions(false);
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button 
                    className="w-full justify-start gap-3 bg-green-600 hover:bg-green-700 touch-manipulation min-h-[52px]" 
                    onClick={() => {
                      setShowAddMember(true);
                      setShowMobileActions(false);
                    }}
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Village Member
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
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                      <IconComponent className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500 truncate">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section - Mobile optimized */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="care-circle" className="w-full flex flex-col h-full">
            {/* Mobile - Scrollable tabs */}
            <div className="sm:hidden overflow-x-auto mb-4 flex-shrink-0">
              <TabsList className="flex w-max min-w-full h-auto">
                <TabsTrigger value="care-circle" className="text-xs whitespace-nowrap px-3 py-2 min-h-[44px]">Care Circle</TabsTrigger>
                <TabsTrigger value="delegations" className="text-xs whitespace-nowrap px-3 py-2 min-h-[44px]">Active Tasks</TabsTrigger>
                <TabsTrigger value="help-requests" className="text-xs whitespace-nowrap px-3 py-2 min-h-[44px]">Help & Logs</TabsTrigger>
              </TabsList>
            </div>

            {/* Desktop - Standard tabs */}
            <div className="hidden sm:block">
              <TabsList className="grid w-full grid-cols-3 mb-4 flex-shrink-0">
                <TabsTrigger value="care-circle" className="text-sm min-h-[44px]">Care Circle</TabsTrigger>
                <TabsTrigger value="delegations" className="text-sm min-h-[44px]">Active Tasks</TabsTrigger>
                <TabsTrigger value="help-requests" className="text-sm min-h-[44px]">Help Requests & Logs</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="care-circle" className="h-full overflow-auto pb-safe">
                <CareCircleEnhanced />
              </TabsContent>

              <TabsContent value="delegations" className="h-full overflow-auto pb-safe">
                <ActiveTasksEnhanced />
              </TabsContent>

              <TabsContent value="help-requests" className="h-full overflow-auto pb-safe">
                <HelpRequestsLogsEnhanced />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
      
      <AddVillageMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        onSave={addVillageMember}
      />
      
      <RequestHelpModal
        isOpen={showRequestHelp}
        onClose={() => setShowRequestHelp(false)}
        onSubmit={addHelpRequest}
        villageMembers={villageMembers}
      />
      
      <MessageModal
        isOpen={showMessage}
        onClose={() => setShowMessage(false)}
        selectedMember={selectedMember}
        conversations={conversations}
        messages={messages}
        onSendMessage={sendMessage}
        onCreateConversation={createConversation}
      />
    </div>
  );
};

export default Village;
