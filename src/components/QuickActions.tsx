
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, MessageCircle, Car, ShoppingCart, Stethoscope, GraduationCap, Utensils, Sparkles } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Calendar,
      label: "Schedule",
      description: "Add appointment",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Car,
      label: "Transport",
      description: "Arrange pickup",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: ShoppingCart,
      label: "Groceries",
      description: "Add to list",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: Stethoscope,
      label: "Health",
      description: "Log care notes",
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: GraduationCap,
      label: "School",
      description: "Check updates",
      color: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      icon: Utensils,
      label: "Meals",
      description: "Plan & prep",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      icon: MessageCircle,
      label: "Coordinate",
      description: "Message network",
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      icon: Plus,
      label: "Quick Add",
      description: "Custom task",
      color: "bg-slate-500 hover:bg-slate-600"
    }
  ];

  return (
    <Card className="border-0 shadow-lg hover-scale">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <Plus className="h-5 w-5 text-blue-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-3 border-0 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className={`p-3 rounded-xl ${action.color} transition-transform group-hover:scale-110`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <div className="font-medium text-slate-700 text-sm">{action.label}</div>
                <div className="text-xs text-slate-500 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* AI Smart Suggestions */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <h4 className="font-medium text-slate-700 mb-2">💡 AI Assistant</h4>
          <p className="text-sm text-slate-600 mb-3">
            I can help you organize your day and coordinate with your support network.
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              Get Suggestions
            </Button>
            <Button size="sm" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
