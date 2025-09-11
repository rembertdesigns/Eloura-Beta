import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, MessageSquare, Edit, Plus, Search, Trophy, Clock, FileText, Star, TrendingUp, Calendar, Filter, Heart, Trash2 } from 'lucide-react';
import { useVillageData } from '@/hooks/useVillageData';
import RequestHelpModal from './RequestHelpModal';
import ViewResponsesModal from './ViewResponsesModal';
import EditHelpRequestModal from './EditHelpRequestModal';
import CreateTemplateModal from './CreateTemplateModal';

const HelpRequestsLogsEnhanced = () => {
  const { helpRequests, communicationLogs, analytics, loading, error, addHelpRequest, updateHelpRequest, deleteHelpRequest, addCommunicationLog, templates, addTemplate, deleteTemplate, villageMembers = [] } = useVillageData();
  const [newCommLog, setNewCommLog] = useState({ contact_name: '', type: '', notes: '', category: '' });
  const [showCommLogForm, setShowCommLogForm] = useState(false);
  const [showRequestHelp, setShowRequestHelp] = useState(false);
  const [showViewResponses, setShowViewResponses] = useState(false);
  const [showEditRequest, setShowEditRequest] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const [templateToUse, setTemplateToUse] = useState(null);
  const [searchLogs, setSearchLogs] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [thankYouNote, setThankYouNote] = useState('');
  const [selectedHelper, setSelectedHelper] = useState<any>(null);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center py-8">Loading...</div>;
  }

  // Only show error for critical failures, not conversation/message failures
  if (error && error.includes('village data')) {
    return <div className="text-red-600 text-center py-8">Error: {error}</div>;
  }

  // Helper functions for styling
  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'childcare':
        return 'bg-pink-100 text-pink-700';
      case 'transportation':
        return 'bg-blue-100 text-blue-700';
      case 'meals':
        return 'bg-green-100 text-green-700';
      case 'errands':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'fulfilled':
        return 'bg-blue-100 text-blue-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const requestTemplates = [
    { title: "Last-minute babysitter", category: "Childcare", description: "Need someone to watch the kids" },
    { title: "School pickup", category: "Transportation", description: "Emergency school pickup needed" },
    { title: "Meal drop-off", category: "Meals", description: "Could use a meal delivery" },
    { title: "Pet care", category: "Pet Care", description: "Need someone to watch/walk pets" },
    { title: "Errand help", category: "Errands", description: "Need help with errands" }
  ];

  // Get top helpers from analytics
  const topHelpers = analytics.topHelpers.map(helper => ({
    name: helper.name,
    helpCount: helper.helpCount,
    badge: helper.helpCount > 10 ? "🏆 Super Helper" : helper.helpCount > 5 ? "⭐ Reliable" : "👍 Helper"
  }));

  const filteredLogs = communicationLogs.filter(log => {
    const matchesSearch = !searchLogs || 
      log.contact_name.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.type.toLowerCase().includes(searchLogs.toLowerCase());
    const matchesType = !filterType || log.type === filterType;
    return matchesSearch && matchesType;
  });

  const logTypes = ["All", "Phone call", "Text message", "Email", "Visit", "Video call"];

  const handleAddCommLog = async () => {
    if (newCommLog.contact_name && newCommLog.type && newCommLog.notes) {
      const success = await addCommunicationLog(newCommLog);
      if (success) {
        setNewCommLog({ contact_name: '', type: '', notes: '', category: '' });
        setShowCommLogForm(false);
      }
    }
  };

  const useTemplate = (template: any) => {
    setTemplateToUse(template);
    setShowRequestHelp(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    const success = await deleteTemplate(templateId);
    if (success) {
      // Template removed from state automatically
    }
  };

  const handleThankYou = (helper: any) => {
    setSelectedHelper(helper);
    setIsThankYouModalOpen(true);
  };

  const sendThankYouNote = () => {
    if (thankYouNote.trim() && selectedHelper) {
      console.log('Sending thank you note to:', selectedHelper.name, 'Message:', thankYouNote);
      // Here you would send the thank you note
      setThankYouNote('');
      setSelectedHelper(null);
      setIsThankYouModalOpen(false);
    }
  };

  const renderHelpRequestCard = (request: any) => (
    <Card key={request.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Badge className={`${getCategoryColor(request.category)} border-0 flex-shrink-0`}>
            {request.category}
          </Badge>
          <Badge className={`${getStatusColor(request.status)} border-0 flex-shrink-0`}>
            {request.status}
          </Badge>
          {request.urgent && (
            <Badge className="bg-red-100 text-red-700 border-0 flex-shrink-0">
              Urgent
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-3">{request.title}</h3>
        
        <p className="text-sm text-gray-600 mb-3 flex-1">{request.description}</p>
        
        <div className="space-y-1 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(request.date).toLocaleDateString()} {request.time}</span>
          </div>
          <div>{request.responses_count || 0} responses</div>
          <div>Requested by: You</div>
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={() => {
              setSelectedRequest(request);
              setShowViewResponses(true);
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            View Responses
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => {
            setEditingRequest(request);
            setShowEditRequest(true);
          }}>
            <Edit className="h-4 w-4 mr-1" />
            Edit Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCommLogCard = (log: any) => (
    <Card key={log.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{log.contact_name}</h4>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{log.type}</p>
                <Badge variant="outline" className="text-xs">{log.category || 'General'}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400">
            <div>{new Date(log.created_at).toLocaleDateString()}</div>
            <div>by {log.logged_by}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600">{log.notes}</p>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Tabs defaultValue="help-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="help-requests">Help Requests</TabsTrigger>
          <TabsTrigger value="logs">Communication Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="help-requests" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpRequests.map(renderHelpRequestCard)}
            
            {/* Request Help Card */}
            <Card className="bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors h-full">
              <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-500 mb-4">Ask your village for support</p>
                <Button className="bg-gray-800 hover:bg-gray-900" onClick={() => setShowRequestHelp(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          {/* Communication Logs Header with Search */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Communication Logs</h3>
              <p className="text-sm text-gray-600">Track interactions and updates with village members</p>
            </div>
            <Button 
              onClick={() => setShowCommLogForm(!showCommLogForm)}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Log Communication
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs by contact, notes, or type..."
                value={searchLogs}
                onChange={(e) => setSearchLogs(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {logTypes.map(type => (
                  <option key={type} value={type === "All" ? "" : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Communication Log Form */}
          {showCommLogForm && (
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Add Communication Log</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <Input
                      placeholder="Who did you communicate with?"
                      value={newCommLog.contact_name}
                      onChange={(e) => setNewCommLog({...newCommLog, contact_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of Communication</label>
                    <select
                      value={newCommLog.type}
                      onChange={(e) => setNewCommLog({...newCommLog, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type...</option>
                      <option value="Phone call">Phone call</option>
                      <option value="Text message">Text message</option>
                      <option value="Email">Email</option>
                      <option value="Visit">Visit</option>
                      <option value="Video call">Video call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newCommLog.category}
                      onChange={(e) => setNewCommLog({...newCommLog, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category...</option>
                      <option value="Health">Health</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Social">Social</option>
                      <option value="Childcare">Childcare</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <Textarea
                      placeholder="What was discussed or accomplished?"
                      value={newCommLog.notes}
                      onChange={(e) => setNewCommLog({...newCommLog, notes: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddCommLog} className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Save Log
                    </Button>
                    <Button variant="outline" onClick={() => setShowCommLogForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Communication Logs List */}
          <div className="space-y-4">
            {filteredLogs.map(renderCommLogCard)}
            {filteredLogs.length === 0 && (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Request Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">This Month</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Requests Made</span>
                    <span className="font-medium">{helpRequests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Requests Fulfilled</span>
                    <span className="font-medium">{helpRequests.filter(r => r.status === 'fulfilled').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Open Requests</span>
                    <span className="font-medium">{helpRequests.filter(r => r.status === 'open').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Helpers Leaderboard */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Top Helpers</h4>
                </div>
                <div className="space-y-3">
                  {topHelpers.map((helper, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{helper.name}</div>
                        <div className="text-xs text-gray-600">{helper.badge}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{helper.helpCount}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleThankYou(helper)}
                          className="text-xs px-2 py-1 h-6 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Thank
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communication Stats */}
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold text-gray-900">Communication</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Logs</span>
                    <span className="font-medium">{communicationLogs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-medium">{communicationLogs.filter(log => {
                      const logDate = new Date(log.created_at);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return logDate >= weekAgo;
                    }).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Most Active Contact</span>
                    <span className="font-medium">{
                      communicationLogs.length > 0 
                        ? Object.entries(
                            communicationLogs.reduce((acc, log) => {
                              acc[log.contact_name] = (acc[log.contact_name] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).sort(([,a], [,b]) => Number(b) - Number(a))[0]?.[0] || 'None'
                        : 'None'
                    }</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-indigo-600" />
                <h4 className="font-semibold text-gray-900">Help Request Categories</h4>
              </div>
              {helpRequests.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {Object.entries(
                    helpRequests.reduce((acc, request) => {
                      acc[request.category] = (acc[request.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([category, count]) => {
                    const percentage = Math.round((Number(count) / Number(helpRequests.length)) * 100);
                    const getColor = (cat: string) => {
                      switch (cat.toLowerCase()) {
                        case 'childcare': return 'text-pink-600';
                        case 'transportation': return 'text-blue-600';
                        case 'errands': return 'text-green-600';
                        default: return 'text-purple-600';
                      }
                    };
                    return (
                      <div key={category} className="text-center">
                        <div className={`text-2xl font-bold ${getColor(category)}`}>
                          {percentage}%
                        </div>
                        <div className="text-sm text-gray-600">{category}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No help requests yet. Create your first request to see category breakdown!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Request Templates</h3>
              <p className="text-sm text-gray-600">Use templates to quickly create common help requests</p>
            </div>
            <Button 
              onClick={() => setShowCreateTemplate(true)}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <Card key={template.id || index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{template.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{template.category}</Badge>
                      {template.is_custom && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => useTemplate(template)}
                    >
                      Use Template
                    </Button>
                    {!template.is_custom && (
                      <Badge variant="secondary" className="ml-2 text-xs">Default</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {templates.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <h3 className="text-lg font-medium mb-2">No templates yet</h3>
                <p className="text-sm">Create your first template to get started</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Thank You Modal */}
      <Dialog open={isThankYouModalOpen} onOpenChange={setIsThankYouModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Thank {selectedHelper?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Send a personalized thank you note to {selectedHelper?.name} for their amazing help and support!
              </p>
              
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-sm">{selectedHelper?.name}</span>
                  <Badge variant="outline" className="text-xs">{selectedHelper?.badge}</Badge>
                </div>
                <p className="text-xs text-gray-600">{selectedHelper?.helpCount} times helped</p>
              </div>
              
              <Textarea
                placeholder="Write your thank you message here... Express your gratitude for their help and support!"
                value={thankYouNote}
                onChange={(e) => setThankYouNote(e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsThankYouModalOpen(false);
                  setThankYouNote('');
                  setSelectedHelper(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={sendThankYouNote}
                disabled={!thankYouNote.trim()}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <Heart className="h-4 w-4 mr-2" />
                Send Thank You
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <RequestHelpModal
        isOpen={showRequestHelp}
        onClose={() => {
          setShowRequestHelp(false);
          setTemplateToUse(null);
        }}
        onSubmit={addHelpRequest}
        villageMembers={villageMembers}
        template={templateToUse}
      />
      
      <ViewResponsesModal
        isOpen={showViewResponses}
        onClose={() => {
          setShowViewResponses(false);
          setSelectedRequest(null);
        }}
        helpRequest={selectedRequest}
        responses={[]} // TODO: Implement responses fetching
        onAcceptResponse={(responseId) => console.log('Accept response:', responseId)}
        onDeclineResponse={(responseId) => console.log('Decline response:', responseId)}
        onSendThankYou={(responderId, message) => console.log('Thank you:', responderId, message)}
      />
      
      <EditHelpRequestModal
        isOpen={showEditRequest}
        onClose={() => {
          setShowEditRequest(false);
          setEditingRequest(null);
        }}
        onUpdate={updateHelpRequest}
        onDelete={deleteHelpRequest}
        request={editingRequest}
        villageMembers={villageMembers}
      />
      
      <CreateTemplateModal
        isOpen={showCreateTemplate}
        onClose={() => setShowCreateTemplate(false)}
        onSave={addTemplate}
      />
    </>
  );
};

export default HelpRequestsLogsEnhanced;