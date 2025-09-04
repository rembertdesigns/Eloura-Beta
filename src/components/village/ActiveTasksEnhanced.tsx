import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Edit, Filter, CheckCircle, Clock, Heart, FileText, Calendar, BarChart3 } from 'lucide-react';
import { useVillageData } from '@/hooks/useVillageData';

const ActiveTasksEnhanced = () => {
  const { delegationTasks, analytics, loading, error, updateTask } = useVillageData();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  const priorities = ["All", "high", "normal", "low"];
  const statuses = ["All", "pending", "in_progress", "completed", "scheduled"];
  
  // Get unique assignees from delegation tasks
  const assignees = ["All", ...Array.from(new Set(delegationTasks.map(task => 
    task.village_members?.name || 'Unassigned'
  )))];

  // Helper functions for styling
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'normal':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'scheduled':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTasks = delegationTasks.filter(task => {
    const matchesPriority = !filterPriority || filterPriority === "All" || task.priority === filterPriority;
    const matchesStatus = !filterStatus || filterStatus === "All" || task.status === filterStatus;
    const matchesAssignee = !filterAssignee || filterAssignee === "All" || 
      task.village_members?.name === filterAssignee || 
      (!task.village_members?.name && filterAssignee === 'Unassigned');
    return matchesPriority && matchesStatus && matchesAssignee;
  });

  const handleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on tasks:`, selectedTasks);
    // Here you would implement the bulk action logic
    setSelectedTasks([]);
  };

  const sendThankYou = (taskId: number) => {
    console.log(`Sending thank you for task ${taskId}`);
    // Here you would implement the thank you functionality
  };

  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Checkbox
            checked={selectedTasks.includes(task.id)}
            onCheckedChange={() => handleTaskSelection(task.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
              <div className="flex gap-2 flex-shrink-0 ml-2">
                <Badge className={`${getStatusColor(task.status)} border-0`}>
                  {task.status || 'pending'}
                </Badge>
                <Badge className={`${getPriorityColor(task.priority)} border-0`}>
                  {task.priority || 'normal'}
                </Badge>
              </div>
            </div>

            {/* Progress bar for ongoing tasks */}
            {task.status !== "Completed" && (
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div>Assigned to: <span className="font-medium">{task.village_members?.name || 'Unassigned'}</span></div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Due: <span className="font-medium">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</span></span>
                {task.recurring && <Badge variant="outline" className="text-xs">Recurring</Badge>}
              </div>
              <div>Category: <span className="font-medium">{task.category || 'General'}</span></div>
            </div>

            <p className="text-sm text-gray-600 mb-3 flex-1">{task.description}</p>

            {/* Attachments */}
            {task.attachments.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{task.attachments.length} attachment(s)</span>
                </div>
              </div>
            )}

            {/* Notes */}
            {task.notes && (
              <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                <strong>Notes:</strong> {task.notes}
              </div>
            )}

            {/* Last update */}
            <div className="text-xs text-gray-400 mb-3">
              Last updated: {task.lastUpdate}
            </div>

            <div className="flex gap-2 mt-auto">
              <Button variant="outline" size="sm" className="h-8">
                <MessageSquare className="h-4 w-4 mr-1" />
                Follow up
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              {task.status === "completed" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={() => sendThankYou(task.id)}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Thanks
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTimelineView = () => (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <Card key={task.id} className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={() => handleTaskSelection(task.id)}
                />
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.village_members?.name || 'Unassigned'} • {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(task.status)} border-0`}>{task.status || 'pending'}</Badge>
                <Badge className={`${getPriorityColor(task.priority)} border-0`}>{task.priority || 'normal'}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with filters and controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Tasks</h3>
          <p className="text-sm text-gray-600">Manage and track delegated tasks and responsibilities</p>
        </div>
        
        {/* View toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('timeline')}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Timeline
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="h-4 w-4 text-gray-400" />
        
        <select 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {priorities.map(priority => (
            <option key={priority} value={priority === "All" ? "" : priority}>
              Priority: {priority}
            </option>
          ))}
        </select>
        
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map(status => (
            <option key={status} value={status === "All" ? "" : status}>
              Status: {status}
            </option>
          ))}
        </select>
        
        <select 
          value={filterAssignee} 
          onChange={(e) => setFilterAssignee(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {assignees.map(assignee => (
            <option key={assignee} value={assignee === "All" ? "" : assignee}>
              Assignee: {assignee}
            </option>
          ))}
        </select>
      </div>

      {/* Bulk actions */}
      {selectedTasks.length > 0 && (
        <div className="flex gap-2 items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm text-gray-600">{selectedTasks.length} task(s) selected:</span>
          <Button size="sm" onClick={() => handleBulkAction('complete')}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark Complete
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction('reassign')}>
            Reassign
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction('followup')}>
            Follow Up
          </Button>
        </div>
      )}

      {/* Task content */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(renderTaskCard)}
        </div>
      ) : (
        renderTimelineView()
      )}

      {/* Task analytics summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Task Analytics</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {analytics.completedTasks}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {analytics.inProgressTasks}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {analytics.recurringTasks}
              </div>
              <div className="text-sm text-gray-600">Recurring</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {analytics.avgProgress}%
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveTasksEnhanced;