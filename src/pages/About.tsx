import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
const About = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleAboutUs = () => {
    navigate('/about');
  };

  const handleLogin = () => {
    navigate('/auth');
  };
  return <>
      <SEOHead title="About Us - Eloura" description="Learn about Eloura's mission to help families manage care with less stress and more support." keywords="about eloura, family care, caregiving support, our mission" />
      
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Navigation - Clean and professional */}
        <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 py-3 sm:py-4 border-b border-[#E1CFE3]/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-[#223B0A] to-[#D7642A] p-2 rounded-xl">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-medium text-[#302D2C]">Eloura - Beta</span>
              </div>
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <button onClick={handleAboutUs} className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors min-h-[44px] flex items-center px-2">About Us</button>
                <a href="#features" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors min-h-[44px] flex items-center px-2">Features</a>
              </div>
              <Button className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-4 sm:px-6 min-h-[44px] touch-manipulation" onClick={handleLogin}>
                Log In
              </Button>
            </div>
          </div>
        </nav>
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

        {/* Enhanced CTA Section with urgency */}
        <section className="py-24 bg-gradient-to-r from-[#223B0A] to-[#302D2C] text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What to Expect</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">Eloura is still evolving. As a beta user, you'll be among the first to try it out, explore new features and help shape where we go next. If you notice any issues - please let us know by submitting feedback below.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Button size="lg" className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-full px-8 text-lg font-semibold" onClick={handleGetStarted}>
                Try Eloura Beta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-[#FCC931] text-white hover:bg-[#FCC931] hover:text-[#223B0A] rounded-full px-8 text-lg font-semibold" onClick={() => window.open('https://forms.gle/3m5w5APDfsRCgGsP9', '_blank')}>
                Share Feedback
              </Button>
            </div>
            <p className="text-sm text-white/70">✓ No credit card required • ✓ Cancel anytime • ✓ Setup in under 5 minutes</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#302D2C] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-[#FCC931] to-[#D7642A] p-2 rounded-xl">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-medium">Eloura</span>
                </div>
                <p className="text-white/70 mb-6">The operating system for modern families caregiving. Built for millennials and Gen Z who are redefining what care looks like.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-6">Product</h4>
                <ul className="space-y-3 text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-6">Support</h4>
                <ul className="space-y-3 text-white/70">
                  <li><a href="https://forms.gle/3m5w5APDfsRCgGsP9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-6">Company</h4>
                <ul className="space-y-3 text-white/70">
                  <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-white/70">
              <p>© 2024 Eloura. Made with ❤️ for modern caregiving families.</p>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default About;