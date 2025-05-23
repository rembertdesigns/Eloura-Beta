
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import ServiceHighlights from '@/components/ServiceHighlights';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-2 text-[#223b0a]">Meet Eloura</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The first real operating system for family care—of every generation
            </p>
          </div>
          <ValuePropositionSection />
        </div>
        <FeaturesSection />
        <ServiceHighlights />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
