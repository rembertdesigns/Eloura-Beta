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
            <Button className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-6" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with stronger headlines and early social proof */}
      <section className="bg-gradient-to-br from-[#FFE5C4] via-[#E1CFE3]/30 to-[#FCC931]/20 py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Social proof badge */}
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-[#E1CFE3]/30">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#FCC931] to-[#D7642A] rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-[#E1CFE3] to-[#223B0A] rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-[#223B0A] to-[#FCC931] rounded-full border-2 border-white"></div>
                </div>
                <span className="text-[#223B0A] font-medium text-sm">Trusted by 15,000+ caregiving families</span>
                <div className="flex gap-1 ml-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[#FCC931] text-[#FCC931]" />)}
                </div>
              </div>
            </div>

            {/* Stronger headline with specific benefits */}
            <h1 className="text-5xl md:text-7xl font-light text-[#223B0A] mb-8 leading-tight">
              Reduce caregiving stress by
              <br />
              <span className="font-semibold bg-gradient-to-r from-[#D7642A] to-[#FCC931] bg-clip-text text-transparent">
                50% with smart coordination
              </span>
            </h1>

            {/* More specific value proposition */}
            <p className="text-xl md:text-2xl text-[#302D2C] mb-8 max-w-4xl mx-auto leading-relaxed">
              Get personalized daily priorities, coordinate seamlessly with family, and reduce overwhelm with AI-powered tools designed for millennial and Gen Z caregivers managing kids, parents, or both.
            </p>

            {/* Immediate credibility with testimonial */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-3xl mx-auto border border-[#E1CFE3]/20">
              <div className="flex gap-1 justify-center mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#FCC931] text-[#FCC931]" />)}
              </div>
              <p className="text-[#302D2C] text-lg italic mb-3">
                "Eloura completely transformed how I manage care for my kids and aging parents. I finally feel like I have my life back."
              </p>
              <div className="text-sm font-medium text-[#223B0A]">Sarah M., Working Mom of 2, Caring for Dad</div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8 text-lg font-semibold" onClick={handleGetStarted}>
                Join 15,000+ families reducing stress
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" className="bg-[#FCC931] hover:bg-[#D7642A] text-[#223B0A] rounded-full px-8 text-lg font-semibold" onClick={handleMentalLoadTest}>
                <Brain className="mr-2 h-5 w-5" />
                Get Mental Load Score (2 min)
              </Button>
            </div>

            {/* Success metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#E1CFE3]/20">
                <div className="text-2xl font-bold text-[#223B0A] mb-1">3 hours</div>
                <div className="text-sm text-[#302D2C]">Average time saved per week</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#E1CFE3]/20">
                <div className="text-2xl font-bold text-[#223B0A] mb-1">94%</div>
                <div className="text-sm text-[#302D2C]">Report better family communication</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#E1CFE3]/20">
                <div className="text-2xl font-bold text-[#223B0A] mb-1">&lt;5 min</div>
                <div className="text-sm text-[#302D2C]">Setup time to get started</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Load Assessment Section - Made more prominent */}
      

      {/* Village Coordination Showcase - New dedicated section */}
      

      {/* Enhanced PR Coverage Banner */}
      

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
      

      {/* What Makes Us Different Section */}
      

      {/* Pricing Section - New transparent pricing */}
      

      {/* Stats Section */}
      

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

      {/* Enhanced FAQ Section */}
      

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