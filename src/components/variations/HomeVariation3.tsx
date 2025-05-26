
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Zap, Users, Calendar, Brain, Play, ArrowRight } from 'lucide-react';

const HomeVariation3 = () => {
  return (
    <div className="min-h-screen bg-[#FFE5C4]">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#D7642A] to-[#FCC931] p-2 rounded-2xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#302D2C]">Eloura</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">For Families</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">Explore</a>
              <a href="#" className="text-[#302D2C] hover:text-[#223B0A] font-medium">Support</a>
            </div>
            <Button className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-2xl font-bold">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#223B0A] mb-6 leading-tight">
              Everything your mind needs
              <br />
              <span className="text-[#D7642A]">for family care</span>
            </h1>
            <p className="text-xl text-[#302D2C] mb-8 max-w-2xl mx-auto">
              The mental health app for every caregiving moment. Stress less, organize more, and find joy in caring for your loved ones.
            </p>
            
            {/* Hero Illustration */}
            <div className="relative mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-[#D7642A] rounded-3xl p-6 text-white text-center transform rotate-3">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-bold">Daily Brief</div>
                </div>
                <div className="bg-[#FCC931] rounded-3xl p-6 text-white text-center transform -rotate-2">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-bold">Village Hub</div>
                </div>
                <div className="bg-[#223B0A] rounded-3xl p-6 text-white text-center transform rotate-1">
                  <Brain className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-bold">Smart Care</div>
                </div>
                <div className="bg-[#E1CFE3] rounded-3xl p-6 text-[#302D2C] text-center transform -rotate-3">
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-bold">Quick Plan</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FCC931] rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-8 -right-6 w-8 h-8 bg-[#D7642A] rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 left-1/3 w-16 h-16 bg-[#E1CFE3] rounded-full opacity-40"></div>
            </div>

            <Button size="lg" className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-2xl font-bold px-8">
              <Play className="h-5 w-5 mr-2" />
              Try For Free
            </Button>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#223B0A] mb-4">
            What is it that makes us different?
          </h2>
          <p className="text-lg text-center text-[#302D2C] mb-16 max-w-2xl mx-auto">
            We understand that caregiving is both practical and emotional. Our tools address both.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Daily Zen",
                description: "Morning mindfulness meets practical planning",
                icon: "🧘‍♀️",
                color: "bg-[#E1CFE3]"
              },
              {
                title: "Family Flow",
                description: "Coordinate care without the chaos",
                icon: "👨‍👩‍👧‍👦",
                color: "bg-[#FCC931]"
              },
              {
                title: "Smart Guidance",
                description: "AI that understands your caregiving style",
                icon: "🧠",
                color: "bg-[#D7642A]"
              },
              {
                title: "Stress Relief",
                description: "Tools designed to reduce overwhelm",
                icon: "💆‍♀️",
                color: "bg-[#FFE5C4]"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg rounded-3xl overflow-hidden hover:scale-105 transition-transform">
                <div className={`${feature.color} p-8 text-center`}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#302D2C] mb-3">{feature.title}</h3>
                  <p className="text-[#302D2C] text-sm">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-20 bg-gradient-to-br from-[#223B0A] to-[#302D2C] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-6">
                The mental health app for every caregiving moment
              </h2>
              <p className="text-xl mb-8 text-white/90">
                From tantrum meltdowns to medication reminders, Eloura helps you stay centered and confident in your caregiving journey.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FCC931] mb-2">50k+</div>
                  <div className="text-white/80">Happy families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FCC931] mb-2">4.8★</div>
                  <div className="text-white/80">App store rating</div>
                </div>
              </div>
              <Button size="lg" className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-2xl font-bold">
                Download Now
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-[#FCC931]/20 to-[#D7642A]/20 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-4">Your Pocket Care Companion</h3>
                <p className="text-white/80">Everything you need, right at your fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-[#FFE5C4]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#223B0A] mb-4">
            Members are enjoying happier and healthier lives
          </h2>
          <p className="text-center text-[#302D2C] mb-12">
            Real stories from real caregivers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Eloura completely changed how I handle the stress of caring for three generations.",
                author: "Maria, 34",
                image: "👩‍💼"
              },
              {
                quote: "The daily brief feature is like having a personal assistant for family care.",
                author: "James, 41",
                image: "👨‍🏫"
              },
              {
                quote: "Finally, an app that gets how overwhelming sandwich generation life can be.",
                author: "Priya, 29",
                image: "👩‍⚕️"
              }
            ].map((review, index) => (
              <Card key={index} className="bg-white border-none shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{review.image}</div>
                  <p className="text-[#302D2C] mb-6 italic">"{review.quote}"</p>
                  <div className="text-sm font-bold text-[#223B0A]">{review.author}</div>
                  <div className="text-[#FCC931] mt-2">★★★★★</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#223B0A] mb-12">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 mb-12">
            {[
              "Is Eloura suitable for all types of caregiving?",
              "How does the village coordination work?",
              "Can I use Eloura offline?",
              "What makes Eloura different from other apps?"
            ].map((question, index) => (
              <div key={index} className="bg-[#FFE5C4] rounded-2xl p-4 text-left flex items-center justify-between">
                <span className="text-[#302D2C] font-medium">{question}</span>
                <ArrowRight className="h-5 w-5 text-[#223B0A]" />
              </div>
            ))}
          </div>
          <Button className="bg-[#D7642A] hover:bg-[#223B0A] text-white rounded-2xl font-bold">
            View All FAQs
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#FCC931] to-[#D7642A] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-8">
            Get your peace of mind
          </h2>
          <Button size="lg" className="bg-white hover:bg-gray-100 text-[#302D2C] rounded-2xl font-bold px-12">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#302D2C] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-6 w-6 text-[#FCC931]" />
            <span className="text-2xl font-bold">Eloura</span>
          </div>
          <p className="text-white/70 mb-8">Made with ❤️ for modern caregiving families</p>
          <div className="text-white/50 text-sm">
            <p>© 2024 Eloura Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeVariation3;
