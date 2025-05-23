
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Eloura has completely transformed how I manage care for both my kids and my mother. I finally feel like I can breathe.",
      author: "Sarah K., Mother & Daughter",
      rating: 5
    },
    {
      quote: "The village support feature alone saved my relationship with my siblings. We finally have clarity on who's doing what for dad.",
      author: "Michael T., Family Caregiver",
      rating: 5
    },
    {
      quote: "As a working parent with eldercare responsibilities, Eloura gives me the structured support I've been desperately searching for.",
      author: "Jamie L., Sandwich Generation",
      rating: 5
    },
    {
      quote: "From lunchboxes to pillboxes—Eloura helps me manage it all with intuitive tools designed for modern caregivers.",
      author: "Alex P., Caregiver",
      rating: 5
    },
    {
      quote: "The daily brief feature is a lifesaver. I always know what needs my attention most, whether it's my kids or my parents.",
      author: "Taylor R., Busy Parent",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-[#223b0a]">
            Discover What Our Clients Are Saying
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of families finding calm in the chaos with Eloura.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden rounded-xl">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#223b0a]">
                    {'★'.repeat(testimonial.rating)}
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
