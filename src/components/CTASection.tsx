
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#223b0a] to-[#1a2e08] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Schedule an Assessment Today
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-6">
            Whether it's a tantrum or a telehealth appointment
          </p>
          <p className="text-lg text-[#a8e6ff]/90 mb-8">
            Eloura helps you stay calm, clear, and connected.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-[#a8e6ff] hover:bg-[#7ad1f5] text-[#223b0a] font-medium rounded-md">
              CONTACT US
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-md">
              JOIN THE WAITLIST
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
