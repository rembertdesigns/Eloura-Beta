
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Home, Calendar, Users, Clock, Shield, Star, ArrowRight } from 'lucide-react';

const HomeVariation4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5C4] to-[#E1CFE3]/30">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#D7642A] to-[#223B0A] p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-[#223B0A]">Eloura</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">Family Hub</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">How It Works</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">Reviews</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">Support</a>
            </div>
            <Button className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-xl font-semibold">
              Start Today
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-[#223B0A] mb-6 leading-tight">
                The All-in-One<br />
                Smart Family<br />
                <span className="text-[#D7642A]">Care Hub</span>
              </h1>
              <p className="text-xl text-[#302D2C] mb-8 leading-relaxed">
                Get the whole family organized with one beautiful, easy-to-use system. From scheduling appointments to coordinating care, Eloura makes family life smoother.
              </p>
              
              {/* Integration Icons */}
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <div className="text-sm text-[#302D2C] font-medium">Seamlessly syncs with:</div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#FCC931] rounded flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#E1CFE3] rounded flex items-center justify-center">
                    <Users className="h-4 w-4 text-[#302D2C]" />
                  </div>
                  <div className="w-8 h-8 bg-[#223B0A] rounded flex items-center justify-center">
                    <Home className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-xl font-semibold px-8">
                Start Free Trial
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-[#FFE5C4] to-[#E1CFE3]/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[#D7642A] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#FCC931] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#223B0A] rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#223B0A] mb-2">Today's Family Dashboard</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#D7642A]" />
                        <span className="text-sm text-[#302D2C]">Mom's doctor appointment</span>
                      </div>
                      <span className="text-xs text-[#302D2C]">2 PM</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#223B0A]" />
                        <span className="text-sm text-[#302D2C]">Kids pickup - Sarah</span>
                      </div>
                      <span className="text-xs text-[#302D2C]">3:30 PM</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#FCC931]" />
                        <span className="text-sm text-[#302D2C]">Dad's medication reminder</span>
                      </div>
                      <span className="text-xs text-[#302D2C]">6 PM</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#223B0A] mb-2">Everything organized, everyone informed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the New Frame */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-[#E1CFE3]/30 to-[#FCC931]/20 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <Home className="h-24 w-24 text-[#223B0A] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#223B0A] mb-2">Your Family Command Center</h3>
                  <p className="text-[#302D2C]">One beautiful hub for all your care coordination</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-[#223B0A] mb-6">
                Meet the New Eloura 2.0
              </h2>
              <p className="text-lg text-[#302D2C] mb-6 leading-relaxed">
                We've reimagined family care coordination from the ground up. Now with smarter scheduling, better family communication, and tools designed specifically for the sandwich generation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#302D2C]">
                  <div className="w-2 h-2 bg-[#D7642A] rounded-full"></div>
                  <span>Smart scheduling that learns your family's patterns</span>
                </li>
                <li className="flex items-center gap-3 text-[#302D2C]">
                  <div className="w-2 h-2 bg-[#FCC931] rounded-full"></div>
                  <span>Real-time updates for all family caregivers</span>
                </li>
                <li className="flex items-center gap-3 text-[#302D2C]">
                  <div className="w-2 h-2 bg-[#223B0A] rounded-full"></div>
                  <span>Emergency contact system with one-touch access</span>
                </li>
              </ul>
              <Button className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-xl font-semibold">
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How Much Is Your Peace of Mind Worth? */}
      <section className="py-20 bg-gradient-to-br from-[#E1CFE3]/20 to-[#FFE5C4]/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#223B0A] mb-6">
            How Much Is Your Mental Load Worth?
          </h2>
          <p className="text-lg text-[#302D2C] mb-12 max-w-2xl mx-auto">
            Stop feeling overwhelmed by family caregiving. Eloura organizes everything so you can focus on what matters most - being present with your loved ones.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-[#FCC931] p-6">
                <div className="text-4xl mb-4">🤯</div>
                <h3 className="text-xl font-bold text-white mb-2">Before Eloura</h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3 text-[#302D2C] text-sm">
                  <li>• Forgetting appointments</li>
                  <li>• Family miscommunication</li>
                  <li>• Constant mental juggling</li>
                  <li>• Stress and overwhelm</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-[#223B0A] text-white">
              <div className="bg-[#D7642A] p-6">
                <div className="text-4xl mb-4">😌</div>
                <h3 className="text-xl font-bold text-white mb-2">After Eloura</h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3 text-white text-sm">
                  <li>• Everything organized automatically</li>
                  <li>• Family stays in sync</li>
                  <li>• Mental load reduced by 70%</li>
                  <li>• More quality time together</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-[#E1CFE3] p-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold text-[#302D2C] mb-2">The Result</h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3 text-[#302D2C] text-sm">
                  <li>• Confident caregiving</li>
                  <li>• Better family relationships</li>
                  <li>• Peace of mind daily</li>
                  <li>• Time for self-care</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Button size="lg" className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-xl font-semibold px-8">
            Calculate My Savings
          </Button>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#223B0A] mb-4">
            "It's a great way for grandparents to view all the latest grandchild updates."
          </h2>
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#FCC931] fill-current" />
              ))}
            </div>
            <p className="text-[#302D2C]">
              <strong>TODAY</strong> • <strong>TechRadar</strong> • <strong>The Verge</strong>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-[#FFE5C4] to-[#E1CFE3]/30 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">👵👴</div>
                <h3 className="text-2xl font-bold text-[#223B0A] mb-4">4-Month Free Returns</h3>
                <p className="text-[#302D2C] mb-4">
                  If you don't absolutely love how Eloura transforms your family's care coordination, return it for a full refund.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-[#D7642A]" />
                  <span className="text-sm font-semibold text-[#302D2C]">100% Money-Back Guarantee</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <blockquote className="text-lg text-[#302D2C] italic border-l-4 border-[#D7642A] pl-6">
                "I love having this on every shelf and on my phone. Family members all have the app, so we can see what's happening and coordinate care in real time."
              </blockquote>
              <div className="text-sm text-[#302D2C]">
                <strong>— Kim Y.</strong>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#FCC931] fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#FFE5C4]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#223B0A] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                category: "GENERAL",
                questions: [
                  "What devices work with Eloura?",
                  "How do I set up my family's care network?",
                  "Can I use Eloura if my family lives far apart?"
                ]
              },
              {
                category: "CAREGIVING",
                questions: [
                  "How does Eloura help with elderly parent care?",
                  "Can I manage multiple family members?",
                  "What if there's a care emergency?"
                ]
              }
            ].map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="font-bold text-[#223B0A] mb-3">{section.category}</h3>
                {section.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="bg-white rounded-xl p-4 mb-2 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <span className="text-[#302D2C]">{question}</span>
                    <ArrowRight className="h-5 w-5 text-[#223B0A]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D7642A] to-[#223B0A] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Eloura, helping families care better.
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of families who've found peace of mind with Eloura's smart care coordination.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-[#302D2C] rounded-xl font-semibold">
              Order Now - $39/month
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl">
              Try 30 Days Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#302D2C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-[#FCC931]" />
                <span className="text-xl font-semibold">Eloura</span>
              </div>
              <p className="text-white/70">
                Smart family care coordination for the sandwich generation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Features</li>
                <li>How It Works</li>
                <li>Pricing</li>
                <li>Family Plans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Help Center</li>
                <li>Setup Guide</li>
                <li>Contact Us</li>
                <li>Warranty</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/50 text-sm">
            <p>© 2024 Eloura Inc. Designed with care for caregiving families.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeVariation4;
