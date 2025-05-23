
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Eloura has completely transformed how I manage care for both my kids and my mother. I finally feel like I can breathe.",
      author: "Sarah K., Mother & Daughter"
    },
    {
      quote: "The village support feature alone saved my relationship with my siblings. We finally have clarity on who's doing what for dad.",
      author: "Michael T., Family Caregiver"
    },
    {
      quote: "As a working parent with eldercare responsibilities, Eloura gives me the structured support I've been desperately searching for.",
      author: "Jamie L., Sandwich Generation"
    }
  ];

  return (
    <section className="py-20 bg-[#fff5e9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-[#223b0a]">
            What caregivers are saying
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of families finding calm in the chaos with Eloura.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden rounded-xl">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#a8e6ff]">
                    ★★★★★
                  </div>
                  <p className="text-lg mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="text-sm font-medium text-slate-800">
                    {testimonial.author}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
