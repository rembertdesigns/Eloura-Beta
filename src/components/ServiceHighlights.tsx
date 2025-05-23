
import React from 'react';
import { Button } from '@/components/ui/button';

const ServiceHighlights = () => {
  const services = [
    {
      title: "Smart Care Assistant",
      description: "Personalized guidance for the countless decisions caregivers make daily, whether for children or elderly parents.",
      alignment: "right",
      buttonText: "LEARN MORE"
    },
    {
      title: "Home Base Toolkit",
      description: "One calm place for routines, contacts, meal ideas, and care instructions for your entire family.",
      alignment: "left",
      buttonText: "LEARN MORE"
    },
    {
      title: "Village Support Network",
      description: "Coordinate the people helping you care with real-time delegation and status tracking.",
      alignment: "right",
      buttonText: "LEARN MORE"
    }
  ];

  return (
    <section className="py-16 bg-[#e8f7f0]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center font-medium text-[#223b0a] mb-12">
          Serving Families with Quality Caregiving Solutions
        </h2>
        
        <div className="space-y-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${service.alignment === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} 
              bg-white rounded-lg overflow-hidden shadow-sm`}
            >
              <div className="md:w-1/2 bg-[#a8e6ff]/20 p-8 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-medium text-[#223b0a] mb-3">{service.title}</h3>
                  <p className="mb-6 text-slate-600">{service.description}</p>
                  <Button 
                    variant="outline" 
                    className="self-center md:self-start border-[#223b0a] text-[#223b0a] hover:bg-[#223b0a] hover:text-white"
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 flex items-center justify-center p-12">
                <div className="bg-[#223b0a]/10 rounded-full w-32 h-32 flex items-center justify-center">
                  <span className="text-[#223b0a] font-light text-6xl">
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
