
import React from 'react';
import { Calendar, Users, Brain } from 'lucide-react';

const ValuePropositionSection = () => {
  const values = [
    {
      icon: <Calendar className="h-12 w-12 text-white" />,
      title: "Daily Brief",
      description: "AI-generated summary of top tasks, events, and reminders for both childcare and eldercare."
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "Village Support",
      description: "Coordinate the people helping you care with real-time delegation and status tracking."
    },
    {
      icon: <Brain className="h-12 w-12 text-white" />,
      title: "Peace of Mind",
      description: "Personalized guidance for the countless decisions caregivers make daily."
    }
  ];

  return (
    <div className="container mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-[#223b0a] rounded-full p-6 mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-medium text-[#223b0a] mb-3">{value.title}</h3>
            <p className="text-slate-600 mb-4">{value.description}</p>
            <button className="mt-auto text-[#223b0a] font-medium border-b-2 border-[#223b0a] hover:border-[#a8e6ff] transition-colors">
              GET STARTED
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuePropositionSection;
