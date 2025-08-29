
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
              <a href="#pricing" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors">Pricing</a>
              <a href="#community" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors flex items-center gap-1">
                Community
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#resources" className="text-[#302D2C] hover:text-[#223B0A] font-medium transition-colors">Resources</a>
            </div>
            <Button 
              className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-6"
              onClick={handleLogin}
            >
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
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-12 border border-[#E1CFE3]/30">
              <span className="text-[#223B0A] font-medium">
                Named <strong>Best Family Care App</strong> by <strong>TechCrunch</strong>
              </span>
            </div>

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
            <Button 
              size="lg" 
              className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-full px-12 py-4 text-lg font-medium shadow-lg"
              onClick={handleGetStarted}
            >
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
              <Button 
                size="lg" 
                className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8 py-4 text-lg font-medium"
                onClick={handleGetStarted}
              >
                Start planning on desktop
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A]/5 rounded-full px-8 py-4 text-lg font-medium"
                onClick={handleGetStarted}
              >
                Start planning on mobile
              </Button>
            </div>

            <p className="text-sm text-[#302D2C]/60">
              Available on iOS, Android & Desktop
            </p>
          </div>
        </div>
      </section>

      {/* For Every Family Type Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1CFE3]/20 via-white to-[#FFE5C4]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
              For Every Family Type
            </h2>
            <p className="text-lg md:text-xl text-[#302D2C]/80 max-w-3xl mx-auto">
              Whether you're flying solo, juggling dual careers, co-parenting, or managing multiple generations—Eloura adapts to your unique caregiving situation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Solo */}
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-[#223B0A] rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#223B0A] mb-4">Solo</h3>
                <p className="text-[#302D2C]/70">
                  Single parents and independent caregivers managing it all
                </p>
              </CardContent>
            </Card>

            {/* Dual */}
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-10 bg-[#D7642A] rounded-full"></div>
                    <div className="w-10 h-10 bg-[#223B0A] rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#223B0A] mb-4">Dual</h3>
                <p className="text-[#302D2C]/70">
                  Partners coordinating care together as a team
                </p>
              </CardContent>
            </Card>

            {/* Split/Co-Parent */}
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-10 bg-[#FCC931] rounded-full"></div>
                    <div className="w-10 h-10 bg-[#E1CFE3] rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#223B0A] mb-4">Split/Co-Parent</h3>
                <p className="text-[#302D2C]/70">
                  Shared custody and co-parenting coordination
                </p>
              </CardContent>
            </Card>

            {/* Multi-Gen */}
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="flex justify-center gap-1">
                    <div className="w-8 h-8 bg-[#223B0A] rounded-full"></div>
                    <div className="w-8 h-8 bg-[#D7642A] rounded-full"></div>
                    <div className="w-8 h-8 bg-[#FCC931] rounded-full"></div>
                    <div className="w-8 h-8 bg-[#E1CFE3] rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#223B0A] mb-4">Multi-Gen</h3>
                <p className="text-[#302D2C]/70">
                  Sandwich generation caring for kids and parents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Device Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center relative max-w-6xl mx-auto">
            {/* Tablet */}
            <div className="relative z-10">
              <div className="bg-gray-100 rounded-2xl p-4 shadow-2xl" style={{ width: '400px', height: '300px' }}>
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
              <div className="bg-gray-900 rounded-3xl p-2 shadow-xl" style={{ width: '180px', height: '360px' }}>
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
              <div className="bg-gray-800 rounded-2xl p-2 shadow-lg" style={{ width: '120px', height: '140px' }}>
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
              <div className="bg-gray-100 rounded-t-xl shadow-2xl" style={{ width: '500px', height: '320px' }}>
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

      {/* Real Stories from Caregivers Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1CFE3]/40 via-[#FFE5C4]/20 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
              Real stories from caregivers like you
            </h2>
            <p className="text-lg md:text-xl text-[#302D2C]/80 max-w-3xl mx-auto">
              See how Eloura is transforming the lives of millennial and Gen Z caregivers everywhere
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FCC931] text-[#FCC931]" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-[#223B0A]/20 mb-4" />
                <p className="text-[#302D2C] mb-6 leading-relaxed">
                  "Eloura completely transformed how I manage care for my kids and aging parents. I finally feel like I have my life back."
                </p>
                <div>
                  <p className="font-semibold text-[#223B0A]">Sarah M.</p>
                  <p className="text-sm text-[#302D2C]/70">Working Mom of 2, Caring for Dad</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FCC931] text-[#FCC931]" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-[#223B0A]/20 mb-4" />
                <p className="text-[#302D2C] mb-6 leading-relaxed">
                  "The village feature saved my relationship with my siblings. We're finally coordinated on mom's care instead of stressed and scattered."
                </p>
                <div>
                  <p className="font-semibold text-[#223B0A]">Marcus K.</p>
                  <p className="text-sm text-[#302D2C]/70">Tech Professional, Sandwich Generation</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#E1CFE3]/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FCC931] text-[#FCC931]" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-[#223B0A]/20 mb-4" />
                <p className="text-[#302D2C] mb-6 leading-relaxed">
                  "As someone juggling toddler tantrums and parent doctor visits, Eloura gives me the structure and peace of mind I desperately needed."
                </p>
                <div>
                  <p className="font-semibold text-[#223B0A]">Priya L.</p>
                  <p className="text-sm text-[#302D2C]/70">Entrepreneur & Caregiver</p>
                </div>
              </CardContent>
            </Card>
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
            <Button 
              size="lg" 
              className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-full px-8 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              Join 15,000+ families reducing stress
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-[#FCC931] text-white hover:bg-[#FCC931] hover:text-[#223B0A] rounded-full px-8 text-lg font-semibold"
              onClick={handleMentalLoadTest}
            >
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
