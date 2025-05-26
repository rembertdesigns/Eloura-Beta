
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import ServiceHighlights from '@/components/ServiceHighlights';

// Import the new variations
import HomeVariation1 from '@/components/variations/HomeVariation1';
import HomeVariation2 from '@/components/variations/HomeVariation2';
import HomeVariation3 from '@/components/variations/HomeVariation3';
import HomeVariation4 from '@/components/variations/HomeVariation4';

const Index = () => {
  const [currentVariation, setCurrentVariation] = useState(1);

  const renderVariation = () => {
    switch(currentVariation) {
      case 1:
        return <HomeVariation1 />;
      case 2:
        return <HomeVariation2 />;
      case 3:
        return <HomeVariation3 />;
      case 4:
        return <HomeVariation4 />;
      default:
        return <HomeVariation1 />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Design Variation Selector */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3 border">
        <div className="text-xs font-medium mb-2 text-[#302D2C]">Design Variations:</div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentVariation(num)}
              className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                currentVariation === num 
                  ? 'bg-[#223B0A] text-white' 
                  : 'bg-gray-100 text-[#302D2C] hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {renderVariation()}
    </div>
  );
};

export default Index;
