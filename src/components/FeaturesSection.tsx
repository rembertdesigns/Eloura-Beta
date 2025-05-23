
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Brain, PieChart, Folder } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Daily Brief",
      description: "AI-generated summary of top tasks, events, and reminders for both childcare and eldercare.",
      icon: Calendar,
      color: "bg-[#a8e6ff]"
    },
    {
      title: "Village Support Network",
      description: "Coordinate the people helping you care with real-time delegation and status tracking.",
      icon: Users,
      color: "bg-[#223b0a]"
    },
    {
      title: "Smart Care Assistant",
      description: "Personalized guidance for the countless decisions caregivers make daily.",
      icon: Brain,
      color: "bg-[#a8e6ff]"
    },
    {
      title: "Quick Planner & Insights",
      description: "Visual system that reveals what's working, what's overwhelming, and what's ahead.",
      icon: PieChart,
      color: "bg-[#223b0a]"
    },
    {
      title: "Home Base Toolkit",
      description: "One calm place for routines, contacts, meal ideas, and care instructions.",
      icon: Folder,
      color: "bg-[#a8e6ff]"
    }
  ];

  return (
    <section className="py-16 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-4">
            One system for <span className="font-medium">all your caregiving</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From lunchboxes to pillboxes—Eloura helps you manage it all with intuitive tools designed for modern caregivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover-scale bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
