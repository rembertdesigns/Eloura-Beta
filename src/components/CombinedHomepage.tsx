
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Leaf, Sun, Wind, ArrowRight, Users, Brain, Shield, Calculator, Clock, CheckCircle, Star, Quote, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CombinedHomepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLogin = () => {
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

      {/* Hero Section - Warm and inviting */}
      <section className="bg-gradient-to-br from-[#FFE5C4] via-[#E1CFE3]/30 to-[#FCC931]/20 py-[20px]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-light text-[#223B0A] mb-8 leading-tight">
              The foundation for
              <br />
              <span className="font-semibold bg-gradient-to-r from-[#D7642A] to-[#FCC931] bg-clip-text text-transparent">
                calmer caregiving
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#302D2C] mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether you're raising children, supporting aging parents, or both—Eloura helps millennial and Gen Z caregivers carry it all with less stress and more support.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button 
                size="lg" 
                className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8 text-lg"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-[#D7642A] text-[#D7642A] hover:bg-[#D7642A] hover:text-white rounded-full px-8 text-lg">
                Watch Demo
              </Button>
            </div>

            {/* Hero Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              
              
              
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced PR Coverage Banner */}
      <section className="py-12 bg-gradient-to-r from-[#223B0A] to-[#302D2C] relative overflow-hidden">
        {/* Background pattern for sophistication */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Quote className="h-4 w-4 text-[#FCC931] mr-2" />
              <span className="text-white/90 text-sm font-medium">As seen in top publications</span>
            </div>
            <h2 className="text-white text-lg mb-2 font-light">Trusted by leading media outlets</h2>
            <p className="text-white/80 text-sm max-w-2xl mx-auto">
              Our innovative approach to family caregiving has been recognized by major publications across tech, health, and family wellness
            </p>
          </div>

          {/* Publication logos with enhanced design */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {/* TechCrunch */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <div className="text-[#00D084] text-xl font-bold mb-1">TC</div>
                  <div className="text-white/90 font-semibold text-sm">TechCrunch</div>
                  <div className="text-white/60 text-xs mt-1">"Revolutionary caregiving platform"</div>
                </div>
              </div>
            </div>

            {/* Forbes */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <div className="text-[#0973BA] text-xl font-bold mb-1">F</div>
                  <div className="text-white/90 font-semibold text-sm">Forbes</div>
                  <div className="text-white/60 text-xs mt-1">"The future of family care"</div>
                </div>
              </div>
            </div>

            {/* Fast Company */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <div className="text-[#FC3F1D] text-xl font-bold mb-1">FC</div>
                  <div className="text-white/90 font-semibold text-sm">Fast Company</div>
                  <div className="text-white/60 text-xs mt-1">"Most innovative startup"</div>
                </div>
              </div>
            </div>

            {/* Parents Magazine */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <div className="text-[#E91E63] text-xl font-bold mb-1">P</div>
                  <div className="text-white/90 font-semibold text-sm">Parents</div>
                  <div className="text-white/60 text-xs mt-1">"Game-changing for families"</div>
                </div>
              </div>
            </div>

            {/* AARP */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <div className="text-[#A91E2C] text-xl font-bold mb-1">A</div>
                  <div className="text-white/90 font-semibold text-sm">AARP</div>
                  <div className="text-white/60 text-xs mt-1">"Essential caregiving tool"</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured quote section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <Quote className="h-8 w-8 text-[#FCC931] mx-auto mb-4" />
                <blockquote className="text-white text-lg md:text-xl font-light italic mb-6 leading-relaxed">
                  "Eloura represents a fundamental shift in how we think about family caregiving. It's not just an app—it's a movement towards more sustainable, technology-enabled care that respects both caregivers and care recipients."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FCC931] to-[#D7642A] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SJ</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Sarah Johnson</div>
                    <div className="text-white/70 text-sm">Senior Editor, Fast Company</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Press kit CTA */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-2 text-sm">
              <ArrowRight className="mr-2 h-4 w-4" />
              View Press Kit
            </Button>
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

      {/* Features Section - Professional and detailed */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
              Everything your family needs,
              <br />
              <span className="font-semibold">beautifully organized</span>
            </h2>
            <p className="text-xl text-[#302D2C] max-w-3xl mx-auto">
              From lunchboxes to pillboxes, Eloura brings calm to the chaos of modern caregiving with tools designed for your generation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Feature 1 */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#FFE5C4]/60 to-[#FCC931]/30 rounded-3xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/60 rounded-full p-6 w-fit mx-auto mb-4">
                    <Sun className="h-16 w-16 text-[#D7642A]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#223B0A]">Your Daily Brief Dashboard</h3>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-light text-[#223B0A] mb-6">
                Start each day with clarity
              </h3>
              <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                Get a personalized morning brief that prioritizes your day—from doctor appointments to school events, meal prep to medication reminders. AI-powered insights help you focus on what truly matters while reducing overwhelm.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FCC931] rounded-full"></div>
                  <span className="text-[#302D2C]">Smart task prioritization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D7642A] rounded-full"></div>
                  <span>Calendar integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#223B0A] rounded-full"></div>
                  <span>Gentle reminders</span>
                </li>
              </ul>
              <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature 2 */}
            <div>
              <h3 className="text-3xl font-light text-[#223B0A] mb-6">
                Your support village, organized
              </h3>
              <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                Stop the family group chat chaos. Coordinate with family, friends, and caregivers seamlessly. Delegate tasks, share updates, and ensure everyone knows their role in caring for your loved ones.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E1CFE3] rounded-full"></div>
                  <span className="text-[#302D2C]">Task delegation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FCC931] rounded-full"></div>
                  <span>Real-time updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D7642A] rounded-full"></div>
                  <span>Shared calendars</span>
                </li>
              </ul>
              <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full">
                See How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div>
              <div className="bg-gradient-to-br from-[#E1CFE3]/40 to-[#FFE5C4]/60 rounded-3xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/60 rounded-full p-6 w-fit mx-auto mb-4">
                    <Wind className="h-16 w-16 text-[#223B0A]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#223B0A]">Village Coordination Hub</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mental Load Test Section */}
      <section className="py-20 bg-gradient-to-br from-[#FCC931] via-[#D7642A] to-[#223B0A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image/Visual */}
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&crop=center" alt="Woman taking assessment on laptop" className="rounded-2xl w-full h-64 object-cover mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/90 rounded-xl p-4 text-center">
                    <Clock className="h-6 w-6 text-[#223B0A] mx-auto mb-2" />
                    <div className="text-sm font-semibold text-[#223B0A]">2 mins</div>
                    <div className="text-xs text-[#302D2C]">Quick test</div>
                  </div>
                  <div className="bg-white/90 rounded-xl p-4 text-center">
                    <CheckCircle className="h-6 w-6 text-[#223B0A] mx-auto mb-2" />
                    <div className="text-sm font-semibold text-[#223B0A]">Free</div>
                    <div className="text-xs text-[#302D2C]">No cost</div>
                  </div>
                  <div className="bg-white/90 rounded-xl p-4 text-center">
                    <Star className="h-6 w-6 text-[#223B0A] mx-auto mb-2" />
                    <div className="text-sm font-semibold text-[#223B0A]">Personal</div>
                    <div className="text-xs text-[#302D2C]">Custom tips</div>
                  </div>
                </div>
              </div>
              
              {/* Floating testimonial */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl max-w-xs border border-[#E1CFE3]/20">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#FCC931] text-[#FCC931]" />)}
                </div>
                <p className="text-sm text-[#302D2C] italic mb-2">
                  "This test opened my eyes to how much I was carrying mentally. Game changer!"
                </p>
                <div className="text-xs text-[#302D2C]/70">- Sarah M., Mom of 2</div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 w-fit mb-6">
                <span className="text-sm font-medium text-white/90">🧠 Mental Health Assessment</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                What's Your Mental Load Score?
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Take our scientifically-backed 2-minute assessment to discover how much mental energy you're spending on caregiving and get personalized recommendations to lighten your load.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold text-white mb-1">15,847</div>
                  <div className="text-sm text-white/80">Caregivers tested</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold text-white mb-1">73%</div>
                  <div className="text-sm text-white/80">Reduced their load</div>
                </div>
              </div>

              <Button size="lg" className="bg-white hover:bg-white/90 text-[#223B0A] rounded-full px-8 text-lg font-semibold shadow-lg">
                <Brain className="mr-3 h-6 w-6" />
                Take the Mental Load Test
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-white/70 mt-4">
                ✓ No email required • ✓ Instant results • ✓ Evidence-based assessment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Load Worth Section */}
      

      {/* What Makes Us Different Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#223B0A] mb-6">
              What is it that makes us different?
            </h2>
            <p className="text-xl text-[#302D2C] max-w-4xl mx-auto leading-relaxed">
              We understand that caregiving is both practical and emotional. Our tools address both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-[#E1CFE3]/30">
              <CardContent className="p-8 text-center">
                <div className="bg-white/60 rounded-full p-6 w-fit mx-auto mb-6">
                  <div className="text-4xl">🧘‍♀️</div>
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-4">Daily Zen</h3>
                <p className="text-[#302D2C] text-sm leading-relaxed">
                  Morning mindfulness meets practical planning
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-[#FCC931]/30">
              <CardContent className="p-8 text-center">
                <div className="bg-white/60 rounded-full p-6 w-fit mx-auto mb-6">
                  <Users className="h-12 w-12 text-[#223B0A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-4">Family Flow</h3>
                <p className="text-[#302D2C] text-sm leading-relaxed">
                  Coordinate care without the chaos
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-[#D7642A]/30">
              <CardContent className="p-8 text-center">
                <div className="bg-white/60 rounded-full p-6 w-fit mx-auto mb-6">
                  <Brain className="h-12 w-12 text-[#223B0A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-4">Smart Guidance</h3>
                <p className="text-[#302D2C] text-sm leading-relaxed">
                  AI that understands your caregiving style
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-[#FFE5C4]/50">
              <CardContent className="p-8 text-center">
                <div className="bg-white/60 rounded-full p-6 w-fit mx-auto mb-6">
                  <Shield className="h-12 w-12 text-[#223B0A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#223B0A] mb-4">Stress Relief</h3>
                <p className="text-[#302D2C] text-sm leading-relaxed">
                  Tools designed to reduce overwhelm
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1CFE3]/30 to-[#FFE5C4]/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-[#223B0A] mb-12">
            Trusted by thousands of modern caregiving families
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">15,000+</div>
              <div className="text-[#302D2C]">Active families</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">94%</div>
              <div className="text-[#302D2C]">Report reduced stress</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">4.9★</div>
              <div className="text-[#302D2C]">App store rating</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">50M+</div>
              <div className="text-[#302D2C]">Tasks organized</div>
            </div>
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

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-[#FFE5C4]/40 to-[#E1CFE3]/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center text-[#223B0A] mb-16">
            Frequently asked questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {["Is Eloura suitable for all types of caregiving?", "How does the village coordination work?", "Can I use Eloura offline?", "What makes Eloura different from other apps?"].map((question, index) => <div key={index} className="bg-[#FFE5C4]/60 rounded-2xl p-6 flex items-center justify-between hover:bg-[#FFE5C4]/80 transition-colors cursor-pointer">
                <span className="text-[#302D2C] font-medium">{question}</span>
                <ArrowRight className="h-5 w-5 text-[#223B0A]" />
              </div>)}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-full px-8">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#223B0A] to-[#302D2C] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to transform your
            <br />
            <span className="font-semibold">caregiving experience?</span>
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of families finding calm in the chaos. Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button 
              size="lg" 
              className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-full px-8 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              Start 14-Day Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 text-lg">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-white/70">No credit card required • Cancel anytime • Setup in under 5 minutes</p>
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
