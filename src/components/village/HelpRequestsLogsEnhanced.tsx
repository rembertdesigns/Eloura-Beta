import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageSquare, Edit, Plus, Search, Trophy, Clock, FileText, Star, TrendingUp, Calendar, Filter } from 'lucide-react';

const HelpRequestsLogsEnhanced = () => {
  const [newCommLog, setNewCommLog] = useState({ contact: '', type: '', notes: '' });
  const [showCommLogForm, setShowCommLogForm] = useState(false);
  const [searchLogs, setSearchLogs] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('');

  const helpRequests = [
    {
      id: 1,
      title: "Need babysitter for date night",
      category: "Childcare",
      categoryColor: "bg-pink-100 text-pink-700",
      date: "Saturday, Dec 16",
      time: "6:00 PM - 11:00 PM",
      responses: 2,
      status: "Open",
      statusColor: "bg-green-100 text-green-700",
      urgent: false,
      requestedBy: "You",
      description: "Looking for someone to watch the kids while we go out for our anniversary"
    },
    {
      id: 2,
      title: "School pickup emergency",
      category: "Transportation",
      categoryColor: "bg-blue-100 text-blue-700",
      date: "Today",
      time: "3:15 PM",
      responses: 1,
      status: "Fulfilled",
      statusColor: "bg-blue-100 text-blue-700",
      urgent: true,
      requestedBy: "You",
      description: "Stuck in meeting, need someone to pick up kids from school"
    }
  ];

  const requestTemplates = [
    { title: "Last-minute babysitter", category: "Childcare", description: "Need someone to watch the kids" },
    { title: "School pickup", category: "Transportation", description: "Emergency school pickup needed" },
    { title: "Meal drop-off", category: "Meals", description: "Could use a meal delivery" },
    { title: "Pet care", category: "Pet Care", description: "Need someone to watch/walk pets" },
    { title: "Errand help", category: "Errands", description: "Need help with errands" }
  ];

  const commLogs = [
    {
      id: 1,
      contact: "Mom (Patricia)",
      type: "Phone call",
      notes: "Called to check on her appointment. She's doing well and confirmed grocery pickup tomorrow.",
      timestamp: "Today, 2:30 PM",
      loggedBy: "You",
      category: "Health"
    },
    {
      id: 2,
      contact: "Mike (Partner)",
      type: "Text message",
      notes: "Confirmed soccer practice carpool. He'll pick up kids at 3 PM.",
      timestamp: "Yesterday, 8:45 AM",
      loggedBy: "You",
      category: "Transportation"
    },
    {
      id: 3,
      contact: "Dr. Peterson",
      type: "Visit",
      notes: "Annual checkup completed. All vitals normal. Next appointment in 6 months.",
      timestamp: "3 days ago",
      loggedBy: "Mike (Partner)",
      category: "Health"
    },
    {
      id: 4,
      contact: "Sarah Johnson",
      type: "Email",
      notes: "Coordinated playdate for next weekend. Kids are excited!",
      timestamp: "1 week ago",
      loggedBy: "You",
      category: "Social"
    }
  ];

  const topHelpers = [
    { name: "Mike (Partner)", helpCount: 15, badge: "🏆 Super Helper" },
    { name: "Mom (Patricia)", helpCount: 12, badge: "⭐ Reliable" },
    { name: "Sarah Johnson", helpCount: 8, badge: "🚗 Transport Hero" }
  ];

  const filteredLogs = commLogs.filter(log => {
    const matchesSearch = !searchLogs || 
      log.contact.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.type.toLowerCase().includes(searchLogs.toLowerCase());
    const matchesType = !filterType || log.type === filterType;
    return matchesSearch && matchesType;
  });

  const logTypes = ["All", "Phone call", "Text message", "Email", "Visit", "Video call"];

  const handleAddCommLog = () => {
    if (newCommLog.contact && newCommLog.type && newCommLog.notes) {
      console.log('Adding communication log:', newCommLog);
      setNewCommLog({ contact: '', type: '', notes: '' });
      setShowCommLogForm(false);
    }
  };

  const useTemplate = (template: any) => {
    console.log('Using template:', template);
    // Here you would open a form with the template data pre-filled
  };

  const renderHelpRequestCard = (request: any) => (
    <Card key={request.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Badge className={`${request.categoryColor} border-0 flex-shrink-0`}>
            {request.category}
          </Badge>
          <Badge className={`${request.statusColor} border-0 flex-shrink-0`}>
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
            <span>{request.date} {request.time}</span>
          </div>
          <div>{request.responses} responses</div>
          <div>Requested by: {request.requestedBy}</div>
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" className="h-8">
            <MessageSquare className="h-4 w-4 mr-1" />
            View Responses
          </Button>
          <Button variant="outline" size="sm" className="h-8">
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
              <h4 className="font-semibold text-gray-900">{log.contact}</h4>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{log.type}</p>
                <Badge variant="outline" className="text-xs">{log.category}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400">
            <div>{log.timestamp}</div>
            <div>by {log.loggedBy}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600">{log.notes}</p>
      </CardContent>
    </Card>
  );

  return (
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
              <Button className="bg-gray-800 hover:bg-gray-900">
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
                    value={newCommLog.contact}
                    onChange={(e) => setNewCommLog({...newCommLog, contact: e.target.value})}
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
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Requests Fulfilled</span>
                  <span className="font-medium">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Response Time</span>
                  <span className="font-medium">2.3 hours</span>
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
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{helper.helpCount}</span>
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
                  <span className="font-medium">{commLogs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Most Active Contact</span>
                  <span className="font-medium">Mike</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Help Request Categories</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">35%</div>
                <div className="text-sm text-gray-600">Childcare</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25%</div>
                <div className="text-sm text-gray-600">Transportation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">20%</div>
                <div className="text-sm text-gray-600">Errands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">20%</div>
                <div className="text-sm text-gray-600">Other</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="templates" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Request Templates</h3>
          <p className="text-sm text-gray-600 mb-6">Use these templates to quickly create common help requests</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requestTemplates.map((template, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => useTemplate(template)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{template.title}</h4>
                    <Badge variant="outline" className="text-xs">{template.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HelpRequestsLogsEnhanced;