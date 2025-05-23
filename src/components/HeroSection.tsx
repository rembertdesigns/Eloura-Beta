
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#a8e6ff]/30 to-white py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 z-10 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-medium leading-tight text-[#223b0a] mb-6">
              Compassionate Home Caregiving Support
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-xl mb-8">
              Whether you're raising children, supporting aging parents, or both—Eloura helps you carry it all with less stress and more support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-md">
                GET STARTED <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#a8e6ff] bg-transparent text-[#223b0a] hover:bg-[#a8e6ff]/10 rounded-md flex gap-2">
                <Phone className="h-4 w-4" /> CALL US
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto bg-[#223b0a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">Providing care with compassion</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#a8e6ff]/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#223b0a]/10 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
