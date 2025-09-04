import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ArrowRight, Star, Brain, Clock, CheckCircle, Quote, ExternalLink, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CombinedHomepage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/auth');
  };
  const handleLogin = () => {
    navigate('/auth');
  };
  const handleMentalLoadTest = () => {
    // For now, navigate to auth - could be a separate mental load test page
    navigate('/auth');
  };
  return <div className="min-h-screen bg-white">
      {/* Navigation - Clean and professional */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 py-4 border-b border-[#E1CFE3]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#223B0A] to-[#D7642A] p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-medium text-[#302D2C]">Eloura</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors">About Us</a>
              <a href="#features" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors">Features</a>
              
              <a href="#community" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors flex items-center gap-1">
                Community
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#resources" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors">Resources</a>
            </div>
            <Button className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-6" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean Simple Style */}
      <section className="bg-gradient-to-br from-[#E1CFE3]/40 via-[#FFE5C4]/30 to-[#E1CFE3]/20 py-32 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Award badge */}
            

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-light text-[#223B0A] mb-8 leading-tight">
              Make family caregiving
              <br />
              <span className="font-medium">feel manageable</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#302D2C]/80 mb-12 leading-relaxed max-w-3xl mx-auto">
              The digital daily planner that helps you coordinate care, reduce mental load, and stay connected with your family.
            </p>

            {/* CTA Button */}
            <Button size="lg" className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-full px-12 py-4 text-lg font-medium shadow-lg" onClick={handleGetStarted}>
              Try for free
            </Button>

            {/* Small print */}
            <p className="text-sm text-[#302D2C]/60 mt-4">
              14-day free trial, no credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Built for Caregivers Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1CFE3]/30 via-white to-[#FFE5C4]/20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-light text-[#223B0A] mb-8 leading-tight">
              Built for caregivers. Better for everyone.
            </h2>
            
            <p className="text-lg md:text-xl text-[#302D2C]/80 mb-12 leading-relaxed max-w-3xl mx-auto">
              Eloura turns your overwhelming to-dos into manageable plans with smart coordination, AI task breakdown, and tools that cut through the chaos. Designed for family harmony and smarter planning, your way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8 py-4 text-lg font-medium" onClick={handleGetStarted}>
                Start planning on desktop
              </Button>
              <Button size="lg" variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A]/5 rounded-full px-8 py-4 text-lg font-medium" onClick={handleGetStarted}>
                Start planning on mobile
              </Button>
            </div>

            <p className="text-sm text-[#302D2C]/60">
              Available on iOS, Android & Desktop
            </p>
          </div>
        </div>
      </section>

      {/* Device Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center relative max-w-6xl mx-auto">
            {/* Tablet */}
            <div className="relative z-10">
              <div className="bg-gray-100 rounded-2xl p-4 shadow-2xl" style={{
              width: '400px',
              height: '300px'
            }}>
                <div className="bg-white rounded-lg w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3"></div>
                    <p className="text-sm">Tablet View</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 z-20">
              <div className="bg-gray-900 rounded-3xl p-2 shadow-xl" style={{
              width: '180px',
              height: '360px'
            }}>
                <div className="bg-white rounded-2xl w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3"></div>
                    <p className="text-xs">Phone View</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Apple Watch */}
            <div className="absolute left-1/3 bottom-0 z-15">
              <div className="bg-gray-800 rounded-2xl p-2 shadow-lg" style={{
              width: '120px',
              height: '140px'
            }}>
                <div className="bg-black rounded-xl w-full h-full flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg mx-auto mb-2"></div>
                    <p className="text-xs">Watch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop */}
            <div className="absolute right-0 top-1/4 z-5">
              <div className="bg-gray-100 rounded-t-xl shadow-2xl" style={{
              width: '500px',
              height: '320px'
            }}>
                <div className="bg-white rounded-t-lg w-full h-5/6 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                    <p className="text-sm">Desktop View</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-1/6 rounded-b-xl flex items-center justify-center">
                  <div className="w-32 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Every Family Type Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFE5C4]/40 to-[#E1CFE3]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
              For Every Family Type
            </h2>
            <p className="text-xl text-[#302D2C] max-w-3xl mx-auto leading-relaxed">
              Whether you're flying solo, juggling dual careers, co-parenting, or managing multiple generations—Eloura adapts to your unique caregiving situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Solo */}
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 h-40 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-[#223B0A] rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#223B0A] mb-3">Solo</h3>
              <p className="text-[#302D2C] text-sm leading-relaxed">
                Single parents and independent caregivers managing it all
              </p>
            </div>

            {/* Dual */}
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 h-40 flex items-center justify-center">
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-[#D7642A] rounded-full"></div>
                  <div className="w-12 h-12 bg-[#223B0A] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#223B0A] mb-3">Dual</h3>
              <p className="text-[#302D2C] text-sm leading-relaxed">
                Partners coordinating care together as a team
              </p>
            </div>

            {/* Split/Co-Parent */}
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 h-40 flex items-center justify-center">
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#FCC931] rounded-full border-2 border-[#223B0A]"></div>
                    <Heart className="w-4 h-4 text-[#223B0A] absolute top-1 left-1" />
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#E1CFE3] rounded-full border-2 border-[#223B0A]"></div>
                    <Heart className="w-4 h-4 text-[#223B0A] absolute top-1 left-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#223B0A] mb-3">Split/Co-Parent</h3>
              <p className="text-[#302D2C] text-sm leading-relaxed">
                Shared custody and co-parenting coordination
              </p>
            </div>

            {/* Multi-Gen */}
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 h-40 flex items-center justify-center">
                <div className="flex items-end gap-1">
                  <div className="w-6 h-8 bg-[#223B0A] rounded-full"></div>
                  <div className="w-8 h-12 bg-[#D7642A] rounded-full"></div>
                  <div className="w-6 h-6 bg-[#FCC931] rounded-full"></div>
                  <div className="w-4 h-4 bg-[#E1CFE3] rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#223B0A] mb-3">Multi-Gen</h3>
              <p className="text-[#302D2C] text-sm leading-relaxed">
                Sandwich generation caring for kids and parents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Scheduler Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* iPhone Mockup */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{
                  aspectRatio: '9/19.5'
                }}>
                    {/* Status Bar */}
                    <div className="bg-black text-white text-xs px-6 py-2 flex justify-between items-center">
                      <span className="font-medium">1:33</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="text-white">📶 📶 🔋</div>
                      </div>
                    </div>
                    {/* Screen Content - Blank for now */}
                    <div className="h-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                        <p className="text-sm">App Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
                The AI scheduler that
                <br />
                <span className="font-semibold">gets it done</span>
              </h2>
              <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                Eloura's AI helps you plan faster by turning your tasks into a clear, realistic schedule. Just type or speak what's on your mind and it will break things down, estimate how long each step might take, and organize everything into a plan that works for your day.
              </p>
              <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full px-8 py-6 text-lg font-medium">
                How AI helps you plan smarter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* To-Do List Section */}
      <section className="py-24 bg-gradient-to-br from-[#E1CFE3]/30 to-[#FFE5C4]/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
                Your to-do list, finally
                <br />
                <span className="font-semibold">doable</span>
              </h2>
              <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                Add what's on your mind, break it into steps, and see exactly what needs your attention. When you're ready, turn any task into a scheduled plan with one tap so you can move from braindump to follow-through without overthinking it.
              </p>
              <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full px-8 py-6 text-lg font-medium">
                How to-dos get done with Eloura
              </Button>
            </div>

            {/* iPhone Mockup */}
            <div>
              <div className="relative max-w-sm mx-auto">
                <div className="bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{
                  aspectRatio: '9/19.5'
                }}>
                    {/* Status Bar */}
                    <div className="bg-black text-white text-xs px-6 py-2 flex justify-between items-center">
                      <span className="font-medium">1:28</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="text-white">📶 📶 🔋</div>
                      </div>
                    </div>
                    {/* Screen Content - Blank for now */}
                    <div className="h-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                        <p className="text-sm">To-Do List Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Device Sync Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Angled MacBook Mockup */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-2xl mx-auto">
                <div className="transform rotate-12 perspective-1000">
                  <div className="bg-gray-300 rounded-xl p-1 shadow-2xl">
                    <div className="bg-black rounded-lg h-3 flex items-center justify-start px-2 mb-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-b-lg" style={{
                    aspectRatio: '16/10'
                  }}>
                      {/* Screen Content - Blank */}
                      <div className="h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-b-lg flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="w-20 h-20 bg-gray-300 rounded-2xl mx-auto mb-4"></div>
                          <p className="text-sm">Desktop Interface</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* MacBook Base */}
                  <div className="bg-gray-300 h-4 rounded-b-2xl transform -skew-x-12 mx-auto" style={{
                  width: '90%'
                }}></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
                One planner, synced
                <br />
                <span className="font-semibold">across every device</span>
              </h2>
              <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                Plan on your computer with Eloura's web app and pick up right where you left off on mobile. Everything stays connected across desktop, phone, tablet, and watch so your schedule is always up to date, no matter where you're working.
              </p>
              <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full px-8 py-6 text-lg font-medium">
                How planning stays in sync
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Tracking Section */}
      <section className="py-24 bg-gradient-to-br from-[#FFE5C4]/40 to-[#E1CFE3]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
                Track your mood and
                <br />
                <span className="font-semibold">build better days</span>
              </h2>
              <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                Log how you feel, reflect on your day, and start noticing what supports your focus and energy. Mood check-ins help you build better routines, spot patterns over time, and make small adjustments that actually stick.
              </p>
              <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full px-8 py-6 text-lg font-medium">
                How mood tracking builds better habits
              </Button>
            </div>

            {/* iPhone Mockup */}
            <div>
              <div className="relative max-w-sm mx-auto">
                <div className="bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{
                  aspectRatio: '9/19.5'
                }}>
                    {/* Status Bar */}
                    <div className="bg-black text-white text-xs px-6 py-2 flex justify-between items-center">
                      <span className="font-medium">1:28</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="text-white">📶 📶 🔋</div>
                      </div>
                    </div>
                    {/* Screen Content - Blank for now */}
                    <div className="h-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                        <p className="text-sm">Mood Tracking Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for the way you work Section */}
      <section className="py-24 bg-gradient-to-br from-[#E1CFE3]/20 to-[#FFE5C4]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
              Designed for the way you work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Care Coordination */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#223B0A] rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Care Coordination</h3>
                <p className="text-[#302D2C] leading-relaxed">
                  Keep everyone in your care network informed and aligned.
                </p>
              </CardContent>
            </Card>

            {/* Smart Reminders */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#D7642A] rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Smart Reminders</h3>
                <p className="text-[#302D2C] leading-relaxed">
                  Never miss important appointments or medication times.
                </p>
              </CardContent>
            </Card>

            {/* Auto-scheduling */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#FCC931] rounded-xl flex items-center justify-center mb-4">
                  <div className="text-white text-sm">❄️</div>
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Auto-scheduling</h3>
                <p className="text-[#302D2C] leading-relaxed">
                  Automate scheduling your tasks to your calendar.
                </p>
              </CardContent>
            </Card>

            {/* Weekly Review and Planning */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#E1CFE3] rounded-xl flex items-center justify-center mb-4">
                  <div className="text-[#223B0A] text-sm">✓</div>
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Weekly Review and Planning</h3>
                <p className="text-[#302D2C] leading-relaxed">
                  Be intentional about your weekly goals and progress.
                </p>
              </CardContent>
            </Card>

            {/* Keyboard shortcuts */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#D7642A] rounded-xl flex items-center justify-center mb-4">
                  <div className="text-white text-sm">⌘</div>
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Keyboard shortcuts</h3>
                <p className="text-[#302D2C] leading-relaxed">
                  Move faster and do everything with your keyboard.
                </p>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#223B0A] rounded-xl flex items-center justify-center mb-4">
                  <div className="text-white text-sm">📊</div>
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Analytics</h3>
                <p className="text-[#302D2C] leading-relaxed">
                  Understand how you spend your time at work.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center text-[#223B0A] mb-4">
            Real stories from caregivers like you
          </h2>
          <p className="text-lg text-center text-[#302D2C] mb-16 max-w-2xl mx-auto">
            See how Eloura is transforming the lives of millennial and Gen Z caregivers everywhere
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            quote: "Eloura completely transformed how I manage care for my kids and aging parents. I finally feel like I have my life back.",
            author: "Sarah M.",
            role: "Working Mom of 2, Caring for Dad",
            rating: 5
          }, {
            quote: "The village feature saved my relationship with my siblings. We're finally coordinated on mom's care instead of stressed and scattered.",
            author: "Marcus K.",
            role: "Tech Professional, Sandwich Generation",
            rating: 5
          }, {
            quote: "As someone juggling toddler tantrums and parent doctor visits, Eloura gives me the structure and peace of mind I desperately needed.",
            author: "Priya L.",
            role: "Entrepreneur & Caregiver",
            rating: 5
          }].map((testimonial, index) => <Card key={index} className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-[#FFE5C4]/20 to-[#E1CFE3]/20">
                <CardContent className="p-8">
                  <div className="text-[#FCC931] mb-4 text-lg">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-[#302D2C] mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-[#223B0A]">{testimonial.author}</div>
                    <div className="text-sm text-[#302D2C]/70">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>


      {/* Enhanced CTA Section with urgency */}
      <section className="py-24 bg-gradient-to-r from-[#223B0A] to-[#302D2C] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="bg-[#FCC931]/10 backdrop-blur-sm rounded-xl p-2 w-fit mx-auto mb-6">
            <span className="text-sm font-medium text-[#FCC931]">⏰ Limited Time: 14-Day Free Trial</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to transform your
            <br />
            <span className="font-semibold">caregiving experience?</span>
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join 15,000+ families who've reduced their caregiving stress by 50%. Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button size="lg" className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-full px-8 text-lg font-semibold" onClick={handleGetStarted}>
              Join 15,000+ families reducing stress
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-[#FCC931] text-white hover:bg-[#FCC931] hover:text-[#223B0A] rounded-full px-8 text-lg font-semibold" onClick={handleMentalLoadTest}>
              <Brain className="mr-2 h-5 w-5" />
              Get Mental Load Score
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
              <p className="text-white/70 mb-6">
                The operating system for modern family caregiving. Built for millennials and Gen Z who are redefining what care looks like.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/70">
            <p>© 2024 Eloura. Made with ❤️ for modern caregiving families.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default CombinedHomepage;