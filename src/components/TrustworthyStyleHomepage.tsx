import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ArrowRight, Star, Brain, Clock, CheckCircle, Quote, ExternalLink, Shield, Users, Receipt, Play, Download, Menu, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrustworthyStyleHomepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="font-medium">Watch •</span>
            <span>After Family Crisis, Eloura Became a Family's Lifeline</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Header/Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#223B0A] to-[#D7642A] p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-medium text-gray-900">Eloura.</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#use-cases" className="text-gray-600 hover:text-gray-900 font-medium">Use Cases</a>
              <a href="#security" className="text-gray-600 hover:text-gray-900 font-medium">Security</a>
              <a href="#reviews" className="text-gray-600 hover:text-gray-900 font-medium">Reviews</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <div className="flex items-center gap-1">
                <a href="#resources" className="text-gray-600 hover:text-gray-900 font-medium">Resources</a>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleLogin}>
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleGetStarted}>
                Get started free
              </Button>
            </div>
            
            <Menu className="h-6 w-6 md:hidden text-gray-600" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=800&fit=crop&crop=center" 
            alt="Person with laptop managing family care" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
            Organize all of life's caregiving details,
            <br />
            <span className="font-semibold">quickly and effortlessly</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Eloura safeguards your family's important caregiving information in one place, ensuring you're prepared for anything that may come your way.
          </p>
          
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 text-lg font-semibold mb-4"
            onClick={handleGetStarted}
          >
            Get started free
          </Button>
          
          <p className="text-white/70 text-sm mb-12">
            No credit card required. Upgrade anytime with a 30-day money-back guarantee.
          </p>
          
          {/* Trust Logos */}
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-white font-semibold text-sm">Fast Company</div>
            <div className="text-white font-semibold text-sm">TechCrunch</div>
            <div className="text-white font-semibold text-sm">Forbes</div>
            <div className="text-white font-semibold text-sm">Parents</div>
            <div className="text-white font-semibold text-sm">AARP</div>
          </div>
        </div>
      </section>

      {/* Section 1: Secure Everything That Matters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Secure Everything That Matters
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-4">
              {[
                'Medical records & appointments',
                'Insurance policies & cards', 
                'Legal documents & wills',
                'Emergency contacts',
                'Medication schedules',
                'Care provider information',
                'Family medical history',
                'Treatment plans',
                'Therapy schedules',
                'School & childcare info'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            {/* Center - Visual */}
            <div className="flex justify-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 h-24"></div>
                  <div className="bg-green-50 rounded-lg p-4 h-24"></div>
                  <div className="bg-yellow-50 rounded-lg p-4 h-24"></div>
                  <div className="bg-purple-50 rounded-lg p-4 h-24"></div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              {[
                'Daily schedules & routines',
                'Financial accounts & budgets',
                'Educational support plans',
                'Behavioral interventions',
                'Communication aids',
                'Transportation arrangements',
                'Respite care contacts',
                'Support group info',
                'Family stories & memories',
                'And more...'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Problem Statement Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Families Spend Too Much Time, Money, and Mental Energy Managing Caregiving Information
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You lose 51+ hours a year</h3>
                <p className="text-gray-600 mb-4">Trying to stay on top of caregiving paperwork</p>
                <p className="text-sm text-gray-500">U.S. Bureau of Labor Statistics, 2023</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-6">
                  <Receipt className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You lose $1,268 a year</h3>
                <p className="text-gray-600 mb-4">In late fees, other extra charges, and care costs</p>
                <p className="text-sm text-gray-500">Cost Hidden Costs of Care, 2023</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-red-100 rounded-full p-4 w-fit mx-auto mb-6">
                  <Brain className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">84% of people are stressed</h3>
                <p className="text-gray-600 mb-4">Worrying about family care organization</p>
                <p className="text-sm text-gray-500">Family Care Survey, 2023</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: Life is Easier with Eloura */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Life is Easier with Eloura
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl h-64 flex items-center justify-center">
                  <Play className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Support for your family in case something happens to you</h3>
                  <p className="text-gray-600">36% of Eloura members are the primary 'operational' manager in the family</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Stress relief from managing multiple systems</h3>
                  <p className="text-gray-600">71% of members juggled 3+ paper and digital management systems before joining Eloura</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                  <ArrowRight className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smooth care transitions for families with aging parents</h3>
                  <p className="text-gray-600">23% of members worry about managing their parents' caregiving as they get older</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Rule at the Business of Life */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Master the Business of Caregiving
            </h2>
          </div>
          
          <div className="space-y-20">
            {/* Get organized in minutes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-3xl p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 mb-4 inline-block">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-sm text-gray-600">Document Analysis</div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-4">Get organized in minutes</h3>
                <p className="text-lg text-gray-600">AI analyzes your caregiving documents instantly, offering key insights and actionable summaries that help you stay organized effortlessly</p>
              </div>
            </div>
            
            {/* Share information your way */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-light text-gray-900 mb-4">Share information your way</h3>
                <p className="text-lg text-gray-600">Define your network of family members and trusted advisors, ensuring everyone has the right level of fine-grained access</p>
              </div>
              <div className="order-1 lg:order-2 bg-gray-100 rounded-3xl p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 mb-4 inline-block">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-600">Access Control</div>
                </div>
              </div>
            </div>
            
            {/* Back up your data easily */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-3xl p-8 h-48 flex items-center justify-center mb-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 mb-4 inline-block">
                    <Download className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-sm text-gray-600">Export Interface</div>
                </div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">Back up your data easily</h3>
              <p className="text-lg text-gray-600">Export or print documents from Eloura whenever you need</p>
            </div>
            
            {/* Use Eloura on the go */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-3xl p-8 h-48 flex items-center justify-center mb-6 max-w-sm mx-auto">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 mb-4 inline-block">
                    <div className="w-12 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Mobile App</div>
                </div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">Use Eloura on the go</h3>
              <p className="text-lg text-gray-600">Access and share important caregiving information from anywhere</p>
            </div>
            
            {/* Reminders save money, time */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-3xl p-8 max-w-md mx-auto mb-6">
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-700">Doctor appointment</span>
                    <span className="text-xs text-red-600">2 days</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-700">Medication refill</span>
                    <span className="text-xs text-yellow-600">1 week</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-700">Insurance renewal</span>
                    <span className="text-xs text-green-600">2 weeks</span>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">Reminders save money, time</h3>
              <p className="text-lg text-gray-600">Avoid late fees, other extra charges, and costs to your care quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Keep Your Information Safe */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Keep Your Information Safe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced security and compliance that ensures your family information remains private and protected
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Multi-factor authentication',
                description: 'For enhanced account security, Eloura requires two-factor authentication to protect against unauthorized access and phishing attacks.',
                icon: Shield
              },
              {
                title: 'Data encryption',
                description: 'Eloura data is encrypted in transit and at rest using 256-bit AES encryption keys.',
                icon: Shield
              },
              {
                title: 'Threat detection',
                description: 'Eloura employs user entity behavior analytics to monitor anomalies and unusual activities.',
                icon: Shield
              },
              {
                title: 'Tokenization',
                description: 'Tokenization removes sensitive data from the database and replaces it with a corresponding token, keeping sensitive information protected.',
                icon: Shield
              },
              {
                title: 'Stolen-password alerts',
                description: 'Eloura scans anonymized password data against dark web databases to detect breaches, then prompts you to change your password.',
                icon: Shield
              },
              {
                title: 'Biometric authentication',
                description: 'Eloura employs facial recognition and fingerprint authentication on our mobile and desktop applications.',
                icon: Shield
              }
            ].map((feature, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Customer Testimonials */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              What Our Members Say About Eloura
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: 'Sarah M.', role: 'Mom of 2' },
              { name: 'Marcus K.', role: 'Caregiver' },
              { name: 'Priya L.', role: 'Entrepreneur' }
            ].map((person, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="font-medium text-gray-900">{person.name}</div>
                <div className="text-sm text-gray-600">{person.role}</div>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                    <Play className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <Quote className="h-8 w-8 text-blue-600 mb-4" />
                    <blockquote className="text-lg text-gray-700 mb-6 italic">
                      "I was able to start recovery efforts immediately without scrambling to replace paperwork or remember what we lost. As challenging as the situation was, Eloura made the process so much easier. It gave us a head start when we needed it the most."
                    </blockquote>
                    <div className="font-medium text-gray-900">Jeremy W.</div>
                    <div className="text-sm text-gray-600">Eloura Member since 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "How long has Eloura been in business?",
              "What happens to my information if I stop subscribing to Eloura?",
              "How does Eloura's platform compare to other solutions?",
              "Is Eloura secure?",
              "Has Eloura been reviewed?",
              "Who are the people behind Eloura?",
              "How much does Eloura cost?"
            ].map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                <span className="text-gray-700 font-medium">{question}</span>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Case Study CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl h-32 shadow-lg"></div>
                <div className="bg-white rounded-2xl h-32 shadow-lg"></div>
                <div className="bg-white rounded-2xl h-32 shadow-lg"></div>
              </div>
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-6">
                  Read how 5 families found peace of mind with Eloura
                </h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Read case studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Pricing Teaser */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            3 pricing tiers, starting with free
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Learn more
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Work with an Expert</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Download iOS app</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Download Android app</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Resources</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Blog home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Organizing family care</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency preparedness</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tools & guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Partners</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Affiliates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Organizers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advisors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-300">
                <p>Eloura, 548 Market St San Francisco, CA 94104</p>
                <p>hello@eloura.com • Established 2024</p>
              </div>
              <div className="text-gray-300 text-sm">
                © 2024 by Eloura | Eloura for life™
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrustworthyStyleHomepage;
