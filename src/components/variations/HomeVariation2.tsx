
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Leaf, Sun, Moon, Wind, ArrowRight, Star } from 'lucide-react';

const HomeVariation2 = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-light text-white">Eloura</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-white/90 hover:text-white">Features</a>
              <a href="#" className="text-white/90 hover:text-white">Wellness</a>
              <a href="#" className="text-white/90 hover:text-white">Community</a>
            </div>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full backdrop-blur-sm">
              Try Free Today
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Nature Background */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Nature Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E1CFE3] via-[#FFE5C4] to-[#FCC931]/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23223B0A" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light text-[#223B0A] mb-8 leading-tight">
              Calm your mind.<br />
              <span className="font-medium">Nurture your family.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#302D2C] mb-12 max-w-3xl mx-auto leading-relaxed">
              Find peace in your caregiving journey with mindful tools designed for modern families.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button size="lg" className="bg-[#223B0A] hover:bg-[#302D2C] text-white rounded-full px-8">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full">
                Explore Features
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-fit">
                  <Leaf className="h-8 w-8 text-[#223B0A]" />
                </div>
                <h3 className="font-medium text-[#223B0A] mb-2">Stress less</h3>
                <p className="text-sm text-[#302D2C]/70">Reduce caregiving overwhelm</p>
              </div>
              <div className="text-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-fit">
                  <Sun className="h-8 w-8 text-[#D7642A]" />
                </div>
                <h3 className="font-medium text-[#223B0A] mb-2">Sleep more</h3>
                <p className="text-sm text-[#302D2C]/70">Rest easy with organized care</p>
              </div>
              <div className="text-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-fit">
                  <Wind className="h-8 w-8 text-[#FCC931]" />
                </div>
                <h3 className="font-medium text-[#223B0A] mb-2">Live mindfully</h3>
                <p className="text-sm text-[#302D2C]/70">Present moments with loved ones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features as Mindfulness Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center text-[#223B0A] mb-4">
            We're here to help you feel centered.
          </h2>
          <p className="text-lg text-center text-[#302D2C] mb-16 max-w-2xl mx-auto">
            Discover tools designed to bring calm and clarity to your caregiving journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Morning Meditation Brief",
                description: "Start your day with a mindful overview of what needs your attention, delivered with gentle guidance.",
                icon: Sun,
                color: "from-[#FCC931]/20 to-[#D7642A]/10"
              },
              {
                title: "Harmony Hub",
                description: "A peaceful space to coordinate care with your support network, reducing family stress and confusion.",
                icon: Wind,
                color: "from-[#E1CFE3]/30 to-[#FFE5C4]/20"
              },
              {
                title: "Mindful Care Assistant",
                description: "Gentle, personalized guidance for caregiving decisions, helping you trust your instincts.",
                icon: Leaf,
                color: "from-[#223B0A]/10 to-[#E1CFE3]/20"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg rounded-3xl overflow-hidden">
                <div className={`h-40 bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-16 w-16 text-[#223B0A]" />
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-medium text-[#223B0A] mb-4">{feature.title}</h3>
                  <p className="text-[#302D2C] mb-6 leading-relaxed">{feature.description}</p>
                  <Button variant="outline" className="border-[#223B0A] text-[#223B0A] hover:bg-[#223B0A] hover:text-white rounded-full">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials as Reviews */}
      <section className="py-20 bg-gradient-to-br from-[#FFE5C4]/30 to-[#E1CFE3]/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center text-[#223B0A] mb-4">
            Over 10,000 5-star reviews
          </h2>
          <p className="text-center text-[#302D2C] mb-12">
            Join the community of caregivers finding peace
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                quote: "Eloura brought such peace to our chaotic family life. I actually sleep better now.",
                author: "Maya S.",
                rating: 5
              },
              {
                quote: "The mindful approach to caregiving has transformed how I handle stress.",
                author: "David L.",
                rating: 5
              },
              {
                quote: "Finally, a tool that understands the emotional side of caring for family.",
                author: "Jennifer M.",
                rating: 5
              },
              {
                quote: "I feel more present with my kids and parents thanks to Eloura's guidance.",
                author: "Alex R.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-none shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-[#FCC931] mb-3">
                    {'★'.repeat(review.rating)}
                  </div>
                  <p className="text-[#302D2C] mb-4 text-sm italic">"{review.quote}"</p>
                  <div className="text-xs font-medium text-[#223B0A]">{review.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#223B0A] to-[#302D2C] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light mb-6">
            Start your free trial of<br />Eloura Premium.
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Unlimited access to guided caregiving tools, family coordination features, and mindful support.
          </p>
          <Button size="lg" className="bg-[#FCC931] hover:bg-[#D7642A] text-[#302D2C] rounded-full px-8 mb-4">
            Try 7 Days Free
          </Button>
          <p className="text-sm text-white/70">Cancel anytime. No commitments.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#302D2C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-[#FCC931]" />
              <span className="text-xl font-light">Eloura</span>
            </div>
            <p className="text-white/70">
              Mindful caregiving for modern families
            </p>
          </div>
          <div className="text-center text-white/50 text-sm">
            <p>© 2024 Eloura. Made with care for caregivers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeVariation2;
