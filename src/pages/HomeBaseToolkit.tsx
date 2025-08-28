
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, Plus, Share2, Lock, FileText, Phone, Calendar, Utensils, Baby, Heart, Upload } from 'lucide-react';
import FeatureFooter from '@/components/FeatureFooter';

const HomeBaseToolkit = () => {
  const [activeTab, setActiveTab] = useState('childcare');
  const [isAdding, setIsAdding] = useState(false);

  const toolkitSections = {
    childcare: {
      icon: <Baby className="h-5 w-5" />,
      title: "Childcare Routines",
      items: [
        { type: "routine", title: "Bedtime Routine (3-year-old)", content: "7:00 PM - Bath time (15 mins)\n7:15 PM - Quiet play\n7:30 PM - Story time\n8:00 PM - Lights out", shared: ["Sarah (Partner)", "Mom (Grandma)"] },
        { type: "document", title: "School Emergency Contacts", content: "Emergency contact form for Little Learners Preschool", shared: ["Maria (Nanny)"] },
        { type: "checklist", title: "Daily Prep Checklist", content: "□ Pack lunch\n□ Check weather for clothes\n□ Grab water bottle\n□ Art supplies for show-and-tell", shared: [] }
      ]
    },
    eldercare: {
      icon: <Heart className="h-5 w-5" />,
      title: "Elder Care Notes",
      items: [
        { type: "routine", title: "Dad's Morning Routine", content: "7:00 AM - Blood pressure check\n7:30 AM - Medication (with breakfast)\n8:00 AM - Light walk\n9:00 AM - News/coffee time", shared: ["Lisa (Sister)"] },
        { type: "document", title: "Power of Attorney Documents", content: "Legal documents for medical decisions", shared: ["Lisa (Sister)", "Mom"] },
        { type: "notes", title: "Medication Schedule", content: "Metoprolol 50mg - Morning with food\nLisinopril 10mg - Evening\nNote: Check BP before evening dose", shared: ["Lisa (Sister)", "Home Health Aide"] }
      ]
    },
    emergency: {
      icon: <Phone className="h-5 w-5" />,
      title: "Emergency & Medical",
      items: [
        { type: "contacts", title: "Emergency Contacts", content: "Pediatrician: Dr. Smith (555) 123-4567\nDad's Cardiologist: Dr. Johnson (555) 234-5678\nPoison Control: 1-800-222-1222", shared: ["All family members"] },
        { type: "document", title: "Medical History - Kids", content: "Allergy information, vaccination records, medical conditions", shared: ["Sarah (Partner)", "Maria (Nanny)"] },
        { type: "document", title: "Dad's Medical Summary", content: "Current conditions, medications, recent test results", shared: ["Lisa (Sister)", "Home Health Aide"] }
      ]
    },
    meals: {
      icon: <Utensils className="h-5 w-5" />,
      title: "Meal Prep & Plans",
      items: [
        { type: "meal-plan", title: "Weekly Family Meal Plan", content: "Mon: Spaghetti & meatballs\nTue: Grilled chicken & veggies\nWed: Leftover night\nThu: Taco Thursday\nFri: Pizza night", shared: ["Sarah (Partner)"] },
        { type: "recipe", title: "Dad's Low-Sodium Recipes", content: "Heart-healthy recipes approved by cardiologist", shared: ["Lisa (Sister)"] },
        { type: "notes", title: "Kids' Food Preferences", content: "Emma: No tomatoes, loves pasta\nJake: Allergic to nuts, likes carrots", shared: ["Maria (Nanny)", "Mom (Grandma)"] }
      ]
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'routine': return <Calendar className="h-4 w-4" />;
      case 'checklist': return <Calendar className="h-4 w-4" />;
      case 'contacts': return <Phone className="h-4 w-4" />;
      case 'meal-plan': return <Utensils className="h-4 w-4" />;
      case 'recipe': return <Utensils className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-700';
      case 'routine': return 'bg-green-100 text-green-700';
      case 'checklist': return 'bg-purple-100 text-purple-700';
      case 'contacts': return 'bg-red-100 text-red-700';
      case 'meal-plan': return 'bg-orange-100 text-orange-700';
      case 'recipe': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 py-3 max-w-7xl flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 mb-3">
          <div className="text-center space-y-1 animate-fade-in">
            <h1 className="text-2xl font-light text-gray-900">
              Home Base <span className="font-medium text-emerald-600">Toolkit</span>
            </h1>
            <p className="text-sm text-gray-600">One calm place for all your family's essential information</p>
          </div>
        </div>

        {/* Toolkit Tabs */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
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
                        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                          <FolderOpen className="h-4 w-4 text-emerald-500" />
                          {section.title}
                        </CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsAdding(!isAdding)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Item
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3 overflow-auto">
                      {/* Add New Item Form */}
                      {isAdding && (
                        <Card className="bg-gray-50 shadow-sm">
                          <CardContent className="pt-3 space-y-2">
                            <Input placeholder="Title" className="h-8" />
                            <Textarea placeholder="Content, instructions, or notes..." rows={2} />
                            <div className="flex items-center gap-2">
                              <select className="p-1 border rounded text-xs">
                                <option>Select type</option>
                                <option>Routine</option>
                                <option>Document</option>
                                <option>Checklist</option>
                                <option>Notes</option>
                                <option>Contacts</option>
                                <option>Recipe</option>
                              </select>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload File
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="h-7 text-xs">Save</Button>
                              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)} className="h-7 text-xs">
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Existing Items */}
                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1">
                        {section.items.map((item, index) => (
                          <Card key={index} className="border shadow-sm">
                            <CardContent className="pt-3 pb-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={`${getTypeColor(item.type)} text-xs py-0`}>
                                    {getTypeIcon(item.type)}
                                    <span className="ml-1 capitalize">{item.type.replace('-', ' ')}</span>
                                  </Badge>
                                  <h3 className="font-medium text-sm text-gray-900">{item.title}</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Share2 className="h-3 w-3" />
                                  </Button>
                                  {item.shared.length > 0 && (
                                    <Badge variant="secondary" className="text-xs h-5">
                                      {item.shared.length}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-2 rounded-lg mb-2">
                                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">
                                  {item.content}
                                </pre>
                              </div>

                              {item.shared.length > 0 && (
                                <div className="space-y-1">
                                  <p className="text-xs font-medium text-gray-900">Shared with:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {item.shared.map((person, personIndex) => (
                                      <Badge key={personIndex} variant="outline" className="text-xs h-5">
                                        {person}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Sharing Permissions Info */}
        <div className="flex-shrink-0 mt-3">
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
