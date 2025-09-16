import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ArrowRight, Star, Brain, Clock, CheckCircle, Quote, ExternalLink, Users, Shield, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CombinedHomepage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const handleGetStarted = () => {
    navigate('/auth');
  };
  const handleAboutUs = () => {
    navigate('/about');
  };
  const handleLogin = () => {
    navigate('/auth');
  };
  const handleMentalLoadTest = () => {
    // For now, navigate to auth - could be a separate mental load test page
    navigate('/auth');
  };
  return <div className="min-h-screen bg-white overflow-x-hidden">
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
            <div className="flex items-center gap-4">
              <Button className="hidden md:block bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-4 sm:px-6 min-h-[44px] touch-manipulation" onClick={handleLogin}>
                Log In
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden bg-white border-b border-[#E1CFE3]/20 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <button onClick={() => {
            handleAboutUs();
            setMobileMenuOpen(false);
          }} className="text-left text-[#302D2C] hover:text-[#223B0A] font-medium py-2">
                About Us
              </button>
               <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#302D2C] hover:text-[#223B0A] font-medium py-2">
                Features
              </a>
              <Button className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-6 py-2 mt-4 w-full" onClick={() => {
            handleLogin();
            setMobileMenuOpen(false);
          }}>
                Log In
              </Button>
            </div>
          </div>
        </div>}

      {/* Hero Section - Clean Simple Style */}
      

      {/* Built for Caregivers Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1CFE3]/30 via-white to-[#FFE5C4]/20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-light text-[#223B0A] mb-8 leading-tight">

Built for families. Better for everyone.</h2>
            
            <p className="text-lg md:text-xl text-[#302D2C]/80 mb-12 leading-relaxed max-w-3xl mx-auto">Eloura is an all-in-one way to manage family life without the overwhelm. It lightens the mental load of parenting so you can spend less time managing and more time connecting.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8 py-4 text-lg font-medium" onClick={handleGetStarted}>
                Start planning on desktop
              </Button>
              
            </div>

            <p className="text-sm text-[#302D2C]/60">Available on Desktop only. iOS & Android Coming Soon</p>
          </div>
        </div>
      </section>

      {/* Device Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Mobile Layout - Stacked vertically */}
          <div className="lg:hidden space-y-8 max-w-md mx-auto">
            {/* Phone - Enhanced Dashboard replica */}
            <div className="flex justify-center">
              <div className="bg-gray-900 rounded-3xl p-2 shadow-xl" style={{
                width: '180px',
                height: '360px'
              }}>
                <div className="bg-white rounded-2xl w-full h-full flex">
                  {/* Mini sidebar */}
                  <div className="w-8 bg-gray-100 rounded-l-2xl flex flex-col items-center py-2">
                    <div className="w-4 h-4 bg-green-600 rounded mb-1"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded mb-1"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded mb-1"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded mb-1"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  </div>
                  {/* Main content */}
                  <div className="flex-1 p-2 rounded-r-2xl overflow-hidden">
                    {/* Header */}
                    <div className="text-[6px] font-medium mb-1">Good Morning, Sarah ☀️</div>
                    <div className="text-right text-[5px] text-green-600 font-bold mb-1">Mental Load: 4/10</div>
                    
                    {/* Daily tip */}
                    <div className="bg-blue-50 rounded p-1 mb-2">
                      <div className="text-[4px] text-blue-600 font-medium">💡 Schedule 15min breaks today</div>
                    </div>

                    {/* Quick Add buttons */}
                    <div className="flex gap-1 mb-2">
                      <div className="bg-orange-100 rounded text-[3px] px-1 py-0.5 text-orange-700">+ Task</div>
                      <div className="bg-purple-100 rounded text-[3px] px-1 py-0.5 text-purple-700">+ Event</div>
                    </div>
                    
                    {/* Must-Do Today */}
                    <div className="mb-2">
                      <div className="text-[5px] font-medium text-gray-700 mb-1">Must-Do Today (3)</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 border border-red-300 rounded-sm"></div>
                          <div className="text-[4px] text-gray-600">Emma's soccer practice 3pm</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
                          <div className="text-[4px] text-gray-400 line-through">Pediatrician appt</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 border border-orange-300 rounded-sm"></div>
                          <div className="text-[4px] text-gray-600">Grocery pickup by 5pm</div>
                        </div>
                      </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="mb-2">
                      <div className="text-[5px] font-medium text-gray-700 mb-1">Schedule</div>
                      <div className="space-y-0.5">
                        <div className="text-[4px] text-gray-600">9am Team meeting</div>
                        <div className="text-[4px] text-gray-600">12pm Lunch w/ Mom</div>
                        <div className="text-[4px] text-gray-600">3pm Emma's soccer</div>
                        <div className="text-[4px] text-gray-600">6pm Family dinner</div>
                      </div>
                    </div>

                    {/* Family Updates */}
                    <div>
                      <div className="text-[5px] font-medium text-gray-700 mb-1">Family</div>
                      <div className="bg-green-50 rounded p-1">
                        <div className="text-[4px] text-green-700">Emma completed homework ✓</div>
                        <div className="text-[4px] text-blue-700">Village helped with carpools</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet - Village replica */}
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-2xl p-4 shadow-2xl" style={{
                width: '300px',
                height: '225px'
              }}>
                <div className="bg-white rounded-lg w-full h-full p-4">
                  <div className="text-xs font-semibold mb-2">My Village</div>
                  {/* Stats cards */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-green-50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-green-600">5</div>
                      <div className="text-[6px] text-gray-600">Members</div>
                    </div>
                    <div className="bg-blue-50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-blue-600">3</div>
                      <div className="text-[6px] text-gray-600">Tasks</div>
                    </div>
                    <div className="bg-purple-50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-purple-600">1</div>
                      <div className="text-[6px] text-gray-600">Requests</div>
                    </div>
                  </div>
                  {/* Tabs */}
                  <div className="flex gap-1 text-[6px] border-b mb-2">
                    <div className="px-2 py-1 bg-gray-100 rounded-t">Care Circle</div>
                    <div className="px-2 py-1 text-gray-500">Active Tasks</div>
                    <div className="px-2 py-1 text-gray-500">Help & Logs</div>
                  </div>
                  <div className="text-[6px] text-gray-600">Village members and connections...</div>
                </div>
              </div>
            </div>

            {/* Desktop - Daily Brief replica */}
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-t-xl shadow-2xl" style={{
                width: '320px',
                height: '200px'
              }}>
                <div className="bg-white rounded-t-lg w-full h-4/5 p-3">
                  <div className="text-xs font-semibold mb-2">Hi, Sarah - Monday, 9/16</div>
                  <div className="text-right text-xs text-green-600 font-bold mb-2">75% Complete</div>
                  {/* Status cards */}
                  <div className="grid grid-cols-4 gap-1 mb-2">
                    <div className="bg-orange-50 rounded p-1 text-center border border-orange-200">
                      <div className="text-xs font-bold text-orange-600">4</div>
                      <div className="text-[6px] text-gray-600">Today</div>
                    </div>
                    <div className="bg-blue-50 rounded p-1 text-center border border-blue-200">
                      <div className="text-xs font-bold text-blue-600">8</div>
                      <div className="text-[6px] text-gray-600">Done</div>
                    </div>
                    <div className="bg-green-50 rounded p-1 text-center border border-green-200">
                      <div className="text-xs font-bold text-green-600">5</div>
                      <div className="text-[6px] text-gray-600">Village</div>
                    </div>
                    <div className="bg-purple-50 rounded p-1 text-center border border-purple-200">
                      <div className="text-xs font-bold text-purple-600">3</div>
                      <div className="text-[6px] text-gray-600">Goals</div>
                    </div>
                  </div>
                  <div className="text-[6px] text-gray-600">All Tasks section...</div>
                </div>
                <div className="bg-gray-200 h-1/5 rounded-b-xl flex items-center justify-center">
                  <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Overlapping as before */}
          <div className="hidden lg:flex justify-center items-center relative max-w-6xl mx-auto">
            {/* Tablet - Village replica */}
            <div className="relative z-10">
              <div className="bg-gray-100 rounded-2xl p-4 shadow-2xl" style={{
                width: '400px',
                height: '300px'
              }}>
                <div className="bg-white rounded-lg w-full h-full p-6">
                  <div className="text-lg font-semibold mb-4">My Village</div>
                  {/* Stats cards */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                      <div className="text-lg font-bold text-green-600">5</div>
                      <div className="text-xs text-gray-600">Village Members</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">3</div>
                      <div className="text-xs text-gray-600">Active Tasks</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                      <div className="text-lg font-bold text-purple-600">1</div>
                      <div className="text-xs text-gray-600">Open Requests</div>
                    </div>
                  </div>
                  {/* Tabs */}
                  <div className="flex gap-2 text-sm border-b mb-4">
                    <div className="px-4 py-2 bg-gray-100 rounded-t border-b-2 border-blue-500">Care Circle</div>
                    <div className="px-4 py-2 text-gray-500">Active Tasks</div>
                    <div className="px-4 py-2 text-gray-500">Help & Logs</div>
                  </div>
                  <div className="text-sm text-gray-600">Village members and care coordination...</div>
                </div>
              </div>
            </div>

            {/* Phone - Enhanced Dashboard replica */}
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 z-20">
              <div className="bg-gray-900 rounded-3xl p-2 shadow-xl" style={{
                width: '180px',
                height: '360px'
              }}>
                <div className="bg-white rounded-2xl w-full h-full flex">
                  {/* Mini sidebar */}
                  <div className="w-8 bg-gray-100 rounded-l-2xl flex flex-col items-center py-3">
                    <div className="w-5 h-5 bg-green-600 rounded mb-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  </div>
                  {/* Main content */}
                  <div className="flex-1 p-3 rounded-r-2xl overflow-hidden">
                    {/* Header */}
                    <div className="text-[7px] font-medium mb-2">Good Morning, Sarah ☀️</div>
                    <div className="text-right text-[6px] text-green-600 font-bold mb-2">Mental Load: 4/10</div>
                    
                    {/* Daily tip */}
                    <div className="bg-blue-50 rounded p-2 mb-3">
                      <div className="text-[5px] text-blue-600 font-medium">💡 Schedule 15min breaks today</div>
                    </div>

                    {/* Quick Add buttons */}
                    <div className="flex gap-1 mb-3">
                      <div className="bg-orange-100 rounded text-[4px] px-1 py-0.5 text-orange-700">+ Task</div>
                      <div className="bg-purple-100 rounded text-[4px] px-1 py-0.5 text-purple-700">+ Event</div>
                    </div>
                    
                    {/* Must-Do Today */}
                    <div className="mb-3">
                      <div className="text-[6px] font-medium text-gray-700 mb-1">Must-Do Today (3)</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 border border-red-300 rounded-sm"></div>
                          <div className="text-[5px] text-gray-600">Emma's soccer practice 3pm</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
                          <div className="text-[5px] text-gray-400 line-through">Pediatrician appt</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 border border-orange-300 rounded-sm"></div>
                          <div className="text-[5px] text-gray-600">Grocery pickup by 5pm</div>
                        </div>
                      </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="mb-3">
                      <div className="text-[6px] font-medium text-gray-700 mb-1">Schedule</div>
                      <div className="space-y-0.5">
                        <div className="text-[5px] text-gray-600">9am Team meeting</div>
                        <div className="text-[5px] text-gray-600">12pm Lunch w/ Mom</div>
                        <div className="text-[5px] text-gray-600">3pm Emma's soccer</div>
                        <div className="text-[5px] text-gray-600">6pm Family dinner</div>
                      </div>
                    </div>

                    {/* Family Updates */}
                    <div>
                      <div className="text-[6px] font-medium text-gray-700 mb-1">Family</div>
                      <div className="bg-green-50 rounded p-1">
                        <div className="text-[5px] text-green-700">Emma completed homework ✓</div>
                        <div className="text-[5px] text-blue-700">Village helped with carpools</div>
                      </div>
                    </div>
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

            {/* Laptop - Daily Brief replica */}
            <div className="absolute right-0 top-1/4 z-5">
              <div className="bg-gray-100 rounded-t-xl shadow-2xl" style={{
                width: '500px',
                height: '320px'
              }}>
                <div className="bg-white rounded-t-lg w-full h-5/6 p-6">
                  <div className="text-lg font-semibold mb-3">Hi, Sarah - Monday, 9/16</div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600">Your daily family dashboard</div>
                    <div className="text-2xl font-bold text-green-600">75% Complete</div>
                  </div>
                  {/* Status cards */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                      <div className="text-xl font-bold text-orange-600">4</div>
                      <div className="text-xs text-gray-600">Today's Tasks</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                      <div className="text-xl font-bold text-blue-600">8</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                      <div className="text-xl font-bold text-green-600">5</div>
                      <div className="text-xs text-gray-600">Village</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                      <div className="text-xl font-bold text-purple-600">3</div>
                      <div className="text-xs text-gray-600">Goals</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">All Tasks section with priorities and scheduling...</div>
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
            <p className="text-xl text-[#302D2C] max-w-3xl mx-auto leading-relaxed">Families come in all structures. Whether you're parenting solo, sharing the load with a partner, co-parenting across household or caring for multiple generations, Eloura adapts to the way your family works.</p>
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
              <p className="text-[#302D2C] text-sm leading-relaxed">For single parents and independent caregivers managing it all.</p>
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
              <p className="text-[#302D2C] text-sm leading-relaxed">For partners coordinating care and routines together.</p>
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
              <p className="text-[#302D2C] text-sm leading-relaxed">Fr parents sharing custody and responsibilities across homes.</p>
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
              <p className="text-[#302D2C] text-sm leading-relaxed">For families balancing care for children and aging parents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Scheduler Section */}
      

      {/* To-Do List Section */}
      

      {/* Cross-Device Sync Section */}
      

      {/* Mood Tracking Section */}
      

      {/* Designed for the way you work Section */}
      <section className="py-24 bg-gradient-to-br from-[#E1CFE3]/20 to-[#FFE5C4]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Care Coordination */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#223B0A] rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Care Coordination</h3>
                <p className="text-[#302D2C] leading-relaxed">Keep everyone in your care circle informed and aligned.</p>
              </CardContent>
            </Card>

            {/* Smart Reminders */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#D7642A] rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Daily Brief</h3>
                <p className="text-[#302D2C] leading-relaxed">See the most important tasks in one view</p>
              </CardContent>
            </Card>

            {/* Auto-scheduling */}
            

            {/* Weekly Review and Planning */}
            <Card className="border-none shadow-lg rounded-2xl bg-white p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#E1CFE3] rounded-xl flex items-center justify-center mb-4">
                  <div className="text-[#223B0A] text-sm">✓</div>
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-3">Build Your Village</h3>
                <p className="text-[#302D2C] leading-relaxed">Coordinate and share the load with trusted people easily.</p>
              </CardContent>
            </Card>

            {/* Keyboard shortcuts */}
            

            {/* Analytics */}
            
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      


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
              <p className="text-white/70 mb-6">The life management system for modern families. </p>
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
            <p>© 2025 Eloura. Made with ❤️ for families.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default CombinedHomepage;