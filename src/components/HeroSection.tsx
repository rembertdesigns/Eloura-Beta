
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block bg-[#223b0a]/10 text-[#223b0a] px-4 py-1 rounded-full text-sm font-medium mb-2">
              NEW APP
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Meet the best all-in-one
              <span className="text-[#223b0a] font-medium block">caregiving system</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-xl">
              Whether you're raising children, supporting aging parents, or both—Eloura helps you carry it all with less stress and more support.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-full">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#a8e6ff] text-[#223b0a] hover:bg-[#a8e6ff]/10 rounded-full">
                How It Works
              </Button>
            </div>
            <div className="pt-6 flex items-center gap-4">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white -ml-2"></div>
                <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white -ml-2"></div>
              </div>
              <p className="text-sm text-slate-600">
                Join <span className="text-[#223b0a] font-medium">5,000+</span> caregivers using Eloura
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <div className="bg-white p-4 rounded-3xl shadow-xl border border-[#a8e6ff]/30">
                <div className="aspect-[9/16] bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 rounded-2xl flex items-center justify-center overflow-hidden">
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
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#a8e6ff]/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#223b0a]/10 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
