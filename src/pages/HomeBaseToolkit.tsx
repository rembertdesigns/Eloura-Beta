import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, Share2, Lock, FileText, Phone, Calendar, Utensils, Baby, Heart, Download, Trash2, Plus } from 'lucide-react';
import AddItemModal from '@/components/toolkit/AddItemModal';
import { useToolkitItems, type ToolkitItem } from '@/hooks/useToolkitItems';
import { useAuth } from '@/contexts/AuthContext';

const HomeBaseToolkit = () => {
  const [activeTab, setActiveTab] = useState<ToolkitItem['category']>('childcare');
  const { user, loading: authLoading } = useAuth();
  const { items, loading, deleteItem } = useToolkitItems(activeTab);

  const toolkitSections = {
    childcare: {
      icon: <Baby className="h-5 w-5" />,
      title: "Childcare Routines",
      description: "Routines, schedules, and important childcare information"
    },
    eldercare: {
      icon: <Heart className="h-5 w-5" />,
      title: "Elder Care Notes",
      description: "Medical routines, care notes, and elder care information"
    },
    emergency: {
      icon: <Phone className="h-5 w-5" />,
      title: "Emergency & Medical", 
      description: "Emergency contacts, medical records, and health information"
    },
    meals: {
      icon: <Utensils className="h-5 w-5" />,
      title: "Meal Prep & Plans",
      description: "Meal plans, recipes, and dietary information"
    }
  };

  const getTypeIcon = (type: ToolkitItem['item_type']) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'routine': return <Calendar className="h-4 w-4" />;
      case 'checklist': return <Calendar className="h-4 w-4" />;
      case 'contacts': return <Phone className="h-4 w-4" />;
      case 'recipe': return <Utensils className="h-4 w-4" />;
      case 'notes': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderItemContent = (item: ToolkitItem) => {
    if (item.item_type === 'routine' || item.item_type === 'checklist') {
      const tasks = item.content ? JSON.parse(item.content) : [];
      
      return (
        <div className="space-y-2">
          {tasks.map((task: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              <span>{task.text || task}</span>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-sm text-gray-600">{item.content}</p>;
  };

  const renderSmartSharingPermissions = () => (
    <Card className="border border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Smart Sharing Permissions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-blue-700">Emergency contacts</span>
          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">Village Access</Badge>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-blue-700">Medical information</span>
          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">Trusted Only</Badge>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-blue-700">Meal preferences</span>
          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">Village Access</Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <FolderOpen className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">Home Base Toolkit</h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Essential documents and resources for your family</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 py-2 max-w-7xl space-y-2">
        {/* Category Tabs */}
        <Card className="w-full border-0 shadow-lg">
          <CardContent className="p-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-2">
              {/* Mobile: Horizontal scroll tabs */}
              <div className="sm:hidden">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="inline-flex w-max h-auto p-1 gap-1">
                    {Object.entries(toolkitSections).map(([key, section]) => (
                      <TabsTrigger 
                        key={key}
                        value={key as ToolkitItem['category']} 
                        className="flex flex-col items-center gap-1 min-w-[80px] px-2 py-2 text-xs flex-shrink-0"
                      >
                        {section.icon}
                        <span className="whitespace-nowrap">{section.title.split(' ')[0]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {/* Tablet & Desktop: Grid layout */}
              <div className="hidden sm:block">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 gap-2">
                  {Object.entries(toolkitSections).map(([key, section]) => (
                    <TabsTrigger 
                      key={key}
                      value={key as ToolkitItem['category']} 
                      className="flex flex-col items-center gap-2 p-3 min-h-[80px] text-xs"
                    >
                      {section.icon}
                      <span className="text-center leading-tight">{section.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Content */}
              {Object.entries(toolkitSections).map(([key, section]) => (
                <TabsContent key={key} value={key as ToolkitItem['category']} className="space-y-2 mt-2">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {section.icon}
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{section.title}</h3>
                        <p className="text-xs text-gray-600">{section.description}</p>
                      </div>
                    </div>
                    <AddItemModal category={key as ToolkitItem['category']} />
                  </div>

                  {/* Items Grid */}
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-sm text-gray-500">Loading...</div>
                    </div>
                  ) : items.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-200">
                      <CardContent className="text-center py-8">
                        <div className="text-gray-400 mb-2">{section.icon}</div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">No items yet</h4>
                        <p className="text-xs text-gray-600 mb-3">Add your first {section.title.toLowerCase()} to get started</p>
                        <AddItemModal category={key as ToolkitItem['category']} />
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {items.map((item) => (
                        <Card key={item.id} className="relative group hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                {getTypeIcon(item.item_type)}
                                <CardTitle className="text-sm font-medium truncate">{item.title}</CardTitle>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => {
                                    // Handle download if applicable
                                  }}
                                >
                                  <Download className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardHeader>
                          <CardContent className="pt-0">
                            {renderItemContent(item)}
                            {item.created_at && (
                              <p className="text-xs text-gray-400 mt-2">
                                Added {new Date(item.created_at).toLocaleDateString()}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Smart Sharing Permissions */}
        {renderSmartSharingPermissions()}
      </div>
    </div>
  );
};

export default HomeBaseToolkit;