
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 pb-20">
      
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-light text-slate-800">
            Home Base <span className="font-medium text-emerald-600">Toolkit</span>
          </h1>
          <p className="text-slate-600">One calm place for all your family's essential information</p>
        </div>

        {/* Toolkit Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(toolkitSections).map(([key, section]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                {section.icon}
                <span className="hidden sm:inline">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(toolkitSections).map(([key, section]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-slate-700">
                      <FolderOpen className="h-5 w-5 text-emerald-500" />
                      {section.title}
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAdding(!isAdding)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add New Item Form */}
                  {isAdding && (
                    <Card className="bg-slate-50">
                      <CardContent className="pt-4 space-y-3">
                        <Input placeholder="Title" />
                        <Textarea placeholder="Content, instructions, or notes..." rows={3} />
                        <div className="flex items-center gap-2">
                          <select className="p-2 border rounded text-sm">
                            <option>Select type</option>
                            <option>Routine</option>
                            <option>Document</option>
                            <option>Checklist</option>
                            <option>Notes</option>
                            <option>Contacts</option>
                            <option>Recipe</option>
                          </select>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm">Save</Button>
                          <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Items */}
                  <div className="grid gap-4">
                    {section.items.map((item, index) => (
                      <Card key={index} className="border">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={getTypeColor(item.type)}>
                                {getTypeIcon(item.type)}
                                <span className="ml-1 capitalize">{item.type.replace('-', ' ')}</span>
                              </Badge>
                              <h3 className="font-medium text-slate-700">{item.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              {item.shared.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  Shared with {item.shared.length}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-slate-50 p-3 rounded-lg mb-3">
                            <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans">
                              {item.content}
                            </pre>
                          </div>

                          {item.shared.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-slate-700">Shared with:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.shared.map((person, personIndex) => (
                                  <Badge key={personIndex} variant="outline" className="text-xs">
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
        </Tabs>

        {/* Sharing Permissions Info */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium text-slate-700 mb-2">Smart Sharing Permissions</h3>
                <p className="text-sm text-slate-600">
                  Your toolkit automatically manages what each person can see. Partners see everything, 
                  babysitters only see child-related sections, and health aides access relevant medical information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default HomeBaseToolkit;
