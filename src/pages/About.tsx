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
              <h1 className="text-4xl md:text-5xl font-light text-[#223b0a] mb-8">About Eloura</h1>
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
                    Who We Are
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Eloura is the first family management system powered by a dynamic AI assistant that adapts to your family's real needs. It is designed to reduce mental fatigue so you no longer have to play the role of full-time project manager in your own home.
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

        {/* What We Do Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-slate-50 rounded-xl p-8 shadow-sm">
                  <div className="aspect-square bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#223b0a] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-6">
                    What We Do
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Eloura takes the chaos out of family logistics. By simplifying routines, planning, and coordination, it helps parents spend more time with their families without carrying the invisible weight of managing it all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    To reduce the cognitive mental load of every parent, everywhere, so families can thrive together in love, presence, and connection.
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

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-12">
                Our Story
              </h2>
              
              {/* Image placeholder */}
              <div className="w-64 h-64 mx-auto mb-8 rounded-xl bg-gradient-to-br from-[#a8e6ff]/40 to-[#a8e6ff]/10 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#223b0a] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-medium text-[#223b0a] mb-6">
                  Hi I'm Linda McGee!
                </h3>
                <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                  <p>
                    As an eldest daughter and immigrant, I started carrying responsibility early and had to learn how to build my support system from scratch. That weight only grew heavier when I became a parent, as I felt the invisible mental load of running a family without enough support. I wanted a way to make space for the moments that matter most; the connection, the joy, the presence with my kids without carrying everything in my head.
                  </p>
                  <p>
                    Eloura is that answer. It is the first of its kind. A platform built to ease the cognitive mental load, restore a sense of community, and give parents the tools they need to feel supported instead of stretched thin.
                  </p>
                  <p>
                    At its heart, Eloura is about giving parents back what every family deserves: time, peace of mind, and the freedom to enjoy parenthood without being weighed down by it.
                  </p>
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