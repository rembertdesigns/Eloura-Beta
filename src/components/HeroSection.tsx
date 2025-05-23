
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              The first true 
              <span className="text-[#223b0a] font-medium block"> operating system </span>
              for caregiving
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-xl">
              Whether you're raising children, supporting aging parents, or both—Eloura helps you carry it all with less stress and more support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-[#223b0a] hover:bg-[#1a2e08] text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-[#a8e6ff] text-[#223b0a] hover:bg-[#a8e6ff]/10">
                How It Works
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#a8e6ff]/30 hover-scale">
              <div className="aspect-video bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto bg-[#223b0a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500">App Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
