
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Calendar, Users, Brain, Home, ArrowRight, Star, Phone, Mail } from 'lucide-react';

const HomeVariation1 = () => {
  return (
    <div className="min-h-screen bg-[#FFE5C4]">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 py-4 border-b border-[#E1CFE3]/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#223B0A] to-[#D7642A] p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-light text-[#302D2C]">Eloura</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A]">Features</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A]">How It Works</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A]">About</a>
            </div>
            <Button className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light text-[#223B0A] mb-6 leading-tight">
            The foundation<br />
            <span className="font-medium">for a calmer caregiving life.</span>
          </h1>
          <p className="text-xl text-[#302D2C] max-w-2xl mx-auto mb-12 leading-relaxed">
            Eloura helps millennial and Gen Z caregivers manage everything from lunchboxes to pillboxes with one beautifully simple system designed for modern families.
          </p>
          
          {/* Hero Visual */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#FCC931]/20 to-[#D7642A]/20 rounded-2xl p-6 text-center">
                  <Calendar className="h-12 w-12 text-[#223B0A] mx-auto mb-4" />
                  <h3 className="font-medium text-[#302D2C] mb-2">Daily Brief</h3>
                  <p className="text-sm text-[#302D2C]/70">AI-generated priorities</p>
                </div>
                <div className="bg-gradient-to-br from-[#E1CFE3]/40 to-[#FCC931]/20 rounded-2xl p-6 text-center">
                  <Users className="h-12 w-12 text-[#223B0A] mx-auto mb-4" />
                  <h3 className="font-medium text-[#302D2C] mb-2">Village Support</h3>
                  <p className="text-sm text-[#302D2C]/70">Coordinate your helpers</p>
                </div>
                <div className="bg-gradient-to-br from-[#FFE5C4]/60 to-[#E1CFE3]/40 rounded-2xl p-6 text-center">
                  <Brain className="h-12 w-12 text-[#223B0A] mx-auto mb-4" />
                  <h3 className="font-medium text-[#302D2C] mb-2">Smart Guidance</h3>
                  <p className="text-sm text-[#302D2C]/70">Personalized care insights</p>
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center text-[#223B0A] mb-16">
            A truly calming caregiving experience.
          </h2>
          
          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-[#E1CFE3]/30 to-[#FCC931]/20 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-20 w-20 text-[#223B0A] mx-auto mb-4" />
                    <div className="text-[#302D2C] font-medium">Your Daily Brief Dashboard</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl font-light text-[#223B0A] mb-6">
                  Never miss what matters most
                </h3>
                <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                  Get a personalized morning brief that prioritizes your day—from doctor appointments to school events, meal prep to medication reminders. Everything organized so you can focus on what truly matters.
                </p>
                <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-[#FCC931]/30 to-[#D7642A]/20 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-20 w-20 text-[#223B0A] mx-auto mb-4" />
                    <div className="text-[#302D2C] font-medium">Village Coordination Hub</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl font-light text-[#223B0A] mb-6">
                  Your support network, organized
                </h3>
                <p className="text-lg text-[#302D2C] mb-8 leading-relaxed">
                  Coordinate with family, friends, and caregivers seamlessly. Delegate tasks, share updates, and ensure everyone knows their role in caring for your loved ones.
                </p>
                <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full">
                  See How It Works
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#E1CFE3]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-[#223B0A] mb-12">
            Trusted by thousands of caregiving families
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">10,000+</div>
              <div className="text-[#302D2C]">Families supported</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">95%</div>
              <div className="text-[#302D2C]">Report reduced stress</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#223B0A] mb-2">4.9★</div>
              <div className="text-[#302D2C]">Average rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center text-[#223B0A] mb-12">
            What caregivers are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Eloura transformed how I manage care for my kids and aging parents. I finally feel in control.",
                author: "Sarah M., Working Mom",
                rating: 5
              },
              {
                quote: "The village feature saved my relationship with my siblings. We're finally coordinated on dad's care.",
                author: "Michael K., Son",
                rating: 5
              },
              {
                quote: "As someone in the sandwich generation, Eloura gives me the structure I desperately needed.",
                author: "Jamie L., Caregiver",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm bg-[#FFE5C4]/30">
                <CardContent className="p-6">
                  <div className="text-[#FCC931] mb-4">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-[#302D2C] mb-4 italic">"{testimonial.quote}"</p>
                  <div className="text-sm font-medium text-[#223B0A]">{testimonial.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#223B0A] to-[#302D2C] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light mb-6">
            Ready to transform your caregiving experience?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of families finding calm in the chaos with Eloura.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-full">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full">
              Schedule Demo
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
                <span className="text-xl font-light">Eloura</span>
              </div>
              <p className="text-white/70 mb-4">
                The operating system for modern family care.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-white/70">
                <li>Features</li>
                <li>How It Works</li>
                <li>Pricing</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-white/70">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@eloura.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-CARE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/70">
            <p>© 2024 Eloura. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeVariation1;
