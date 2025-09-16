import React from 'react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
const About = () => {
  return <>
      <SEOHead title="About Us - Eloura" description="Learn about Eloura's mission to help families manage care with less stress and more support." keywords="about eloura, family care, caregiving support, our mission" />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#a8e6ff]/20 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-light text-[#223b0a] mb-8">Who We Are</h1>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
                [Add your story here - Why did you start Eloura? What inspired you to help families with caregiving? Share your personal journey and mission.]
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-6">
                    Our mission is to make family caregiving feel manageable.
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    [Expand on your mission here - How do you help families? What makes your approach unique? What impact do you want to create?]
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="aspect-square bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#223b0a] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-slate-50 rounded-xl p-8">
                  <div className="aspect-square bg-gradient-to-br from-[#223b0a]/10 to-[#a8e6ff]/20 rounded-lg"></div>
                </div>
                <div>
                  <blockquote className="text-2xl md:text-3xl font-light text-[#223b0a] mb-6 leading-relaxed">
                    "[Add your inspiring quote here about caregiving, family support, or your vision for the future.]"
                  </blockquote>
                  <p className="text-slate-600 font-medium">
                    — [Your Name], Founder of Eloura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#223b0a] to-[#1a2e08] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-[#a8e6ff]/90 mb-8">
                [Add your call-to-action message here]
              </p>
              <Button size="lg" className="bg-[#a8e6ff] hover:bg-[#7ad1f5] text-[#223b0a] font-medium rounded-md">
                GET STARTED TODAY
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default About;