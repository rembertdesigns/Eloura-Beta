import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, Share2, Lock, FileText, Phone, Calendar, Utensils, Baby, Heart, Download, Trash2, Plus } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';
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

  const getTypeColor = (type: ToolkitItem['item_type']) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'routine': return 'bg-green-100 text-green-700 border-green-200';
      case 'checklist': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'contacts': return 'bg-red-100 text-red-700 border-red-200';
      case 'recipe': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'notes': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to access your toolkit.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col h-full justify-between">
        {/* Header */}
        <div className="flex-shrink-0 pt-6 pb-4">
          <div className="text-center space-y-1 animate-fade-in">
            <h1 className="text-2xl font-light text-gray-900">
              Home Base <span className="font-medium text-primary">Toolkit</span>
            </h1>
            <p className="text-sm text-gray-600">One calm place for all your family's essential information</p>
          </div>
        </div>

        {/* Toolkit Tabs */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ToolkitItem['category'])} className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 flex-shrink-0 mb-3">
              {Object.entries(toolkitSections).map(([key, section]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-sm py-2">
                  {section.icon}
                  <span className="hidden sm:inline">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-hidden">
              {Object.entries(toolkitSections).map(([key, section]) => (
                <TabsContent key={key} value={key} className="h-full overflow-auto">
                  <Card className="border-0 shadow-2xl h-full flex flex-col">
                    <CardHeader className="pb-2 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                            <FolderOpen className="h-4 w-4 text-primary" />
                            {section.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                        </div>
                        <AddItemModal category={key as ToolkitItem['category']} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3 overflow-auto">
                      {loading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span className="ml-2 text-gray-600">Loading items...</span>
                        </div>
                      ) : items.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="text-gray-400 mb-2">{section.icon}</div>
                          <h3 className="font-medium text-gray-900 mb-1">No items yet</h3>
                          <p className="text-sm text-gray-600">Add your first item to get started organizing your {section.title.toLowerCase()}.</p>
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          {items.map((item) => (
                            <Card key={item.id} className="border shadow-sm hover:shadow-md transition-shadow">
                              <CardContent className="pt-3 pb-3">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2 flex-1">
                                    <Badge variant="outline" className={`${getTypeColor(item.item_type)} text-xs py-1`}>
                                      {getTypeIcon(item.item_type)}
                                      <span className="ml-1 capitalize">{item.item_type}</span>
                                    </Badge>
                                    <h3 className="font-medium text-sm text-gray-900 truncate">{item.title}</h3>
                                  </div>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="Share">
                                      <Share2 className="h-3 w-3" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700" 
                                      onClick={() => deleteItem(item.id)}
                                      title="Delete"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                    {item.shared_with.length > 0 && (
                                      <Badge variant="secondary" className="text-xs h-5">
                                        {item.shared_with.length}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                
                                {item.content && (
                                  <div className="bg-gray-50 p-3 rounded-lg mb-2">
                                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                                      {item.content}
                                    </pre>
                                  </div>
                                )}

                                {item.attachments.length > 0 && (
                                  <div className="mb-2">
                                    <p className="text-xs font-medium text-gray-900 mb-1">Attachments:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {item.attachments.map((attachment, index) => (
                                        <Badge key={index} variant="outline" className="text-xs h-6">
                                          <Download className="h-3 w-3 mr-1" />
                                          <a 
                                            href={attachment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                          >
                                            {attachment.name}
                                          </a>
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {item.shared_with.length > 0 && (
                                  <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-900">Shared with:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {item.shared_with.map((personId, personIndex) => (
                                        <Badge key={personIndex} variant="outline" className="text-xs h-5">
                                          {personId}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Sharing Permissions Info */}
        <div className="flex-shrink-0 pt-4 pb-6">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">Smart Sharing Permissions</h3>
                  <p className="text-xs text-gray-600">
                    Your toolkit automatically manages what each person can see. Partners see everything, 
                    babysitters only see child-related sections, and health aides access relevant medical information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="md:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default HomeBaseToolkit;