import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Calendar, Users, Brain, PieChart, Folder, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const HowItWorks = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const steps = [
    {
      number: 1,
      title: "Set Up Your Family Profile",
      description: "Tell us about your family structure, caregiving responsibilities, and priorities. This helps Eloura personalize your experience.",
      icon: Users,
      color: "bg-[#a8e6ff]"
    },
    {
      number: 2,
      title: "Get Your Daily Brief",
      description: "Every morning, receive an AI-generated summary of your day's priorities, tasks, and reminders for both childcare and eldercare.",
      icon: Calendar,
      color: "bg-[#223b0a]"
    },
    {
      number: 3,
      title: "Build Your Village",
      description: "Invite family members, caregivers, and support network. Delegate tasks and coordinate care with real-time status tracking.",
      icon: Users,
      color: "bg-[#a8e6ff]"
    },
    {
      number: 4,
      title: "Access Smart Guidance",
      description: "Get personalized advice for caregiving decisions through our Smart Care Assistant, trained on expert knowledge.",
      icon: Brain,
      color: "bg-[#223b0a]"
    },
    {
      number: 5,
      title: "Track & Optimize",
      description: "Use insights to see what's working, what's overwhelming, and optimize your caregiving approach over time.",
      icon: PieChart,
      color: "bg-[#a8e6ff]"
    }
  ];

  const features = [
    {
      title: "Daily Brief",
      description: "AI-powered morning summary of your day's priorities",
      icon: Calendar
    },
    {
      title: "Village Network",
      description: "Coordinate with your support team in real-time",
      icon: Users
    },
    {
      title: "Smart Assistant",
      description: "Get expert guidance for caregiving decisions",
      icon: Brain
    },
    {
      title: "Insights Dashboard",
      description: "Visual analytics to optimize your care approach",
      icon: PieChart
    },
    {
      title: "Home Base Toolkit",
      description: "Centralized hub for routines, contacts, and resources",
      icon: Folder
    }
  ];

  const faqs = [
    {
      question: "How does Eloura help with both childcare and eldercare?",
      answer: "Eloura is designed for the sandwich generation - those caring for both children and aging parents. Our AI understands the unique challenges of managing multiple generations and provides tailored guidance, scheduling, and coordination tools for both types of caregiving responsibilities."
    },
    {
      question: "Is my family's information secure and private?",
      answer: "Absolutely. We use enterprise-grade security measures including end-to-end encryption, secure data storage, and strict privacy controls. Your family's information is never shared with third parties, and you maintain full control over who has access to what information within your network."
    },
    {
      question: "How does the AI Daily Brief work?",
      answer: "Each morning, our AI analyzes your calendar, tasks, family schedules, and priorities to create a personalized brief. It highlights the most important items for the day, suggests optimal scheduling, and alerts you to potential conflicts or opportunities for efficiency."
    },
    {
      question: "Can I invite family members who aren't tech-savvy?",
      answer: "Yes! Eloura is designed to be intuitive for users of all technical skill levels. We provide simple onboarding, clear interfaces, and optional training resources. Family members can participate as much or as little as they're comfortable with."
    },
    {
      question: "What makes Eloura different from other family apps?",
      answer: "Eloura is specifically built for caregivers managing multiple generations. Unlike general family apps, we understand the complexity of coordinating medical appointments, school schedules, medication reminders, and emotional support across different age groups and needs."
    },
    {
      question: "How much does Eloura cost?",
      answer: "We offer a 14-day free trial so you can experience the full value of Eloura. After the trial, we have affordable monthly and annual plans designed to provide significant value for busy caregiving families. Contact us for current pricing details."
    },
    {
      question: "Can I use Eloura if I only have children or only aging parents?",
      answer: "Absolutely! While Eloura excels at managing multi-generational care, it's equally powerful for families focused on childcare only or eldercare only. The AI and coordination tools adapt to your specific family structure and needs."
    },
    {
      question: "How quickly can I get started?",
      answer: "You can set up your basic profile in under 5 minutes and start receiving value immediately. The more information you add about your family's routines and preferences, the more personalized and helpful Eloura becomes over time."
    },
    {
      question: "Do I need to download an app?",
      answer: "Eloura works seamlessly in your web browser on any device - desktop, tablet, or mobile. No app download required, though we're working on native mobile apps for even better convenience."
    },
    {
      question: "What if I need help getting started?",
      answer: "We provide comprehensive onboarding support including setup guidance, video tutorials, and responsive customer support. Our team is committed to helping every family succeed with Eloura."
    }
  ];

  return (
    <>
      <SEOHead
        title="How It Works - Eloura Family Care Management | Step-by-Step Guide"
        description="Learn how Eloura simplifies family caregiving in 5 easy steps. From setup to daily coordination, discover how our AI-powered platform helps manage childcare and eldercare."
        keywords="how eloura works, family care setup, caregiving app tutorial, daily brief, village coordination, smart care assistant, family management steps"
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#f8fdff] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-light text-[#223b0a] mb-6">
                How <span className="font-medium">Eloura Works</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                From setup to daily coordination, see how Eloura transforms the way families manage caregiving responsibilities across generations.
              </p>
              <Button 
                size="lg" 
                className="bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-full px-8"
                onClick={() => navigate('/auth')}
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-4">
                  Get started in <span className="font-medium">5 simple steps</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Designed for busy families, Eloura gets you organized and coordinated quickly.
                </p>
              </div>

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    <div className={`flex-shrink-0 order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-white shadow-lg border border-slate-100">
                        <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center`}>
                          <step.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className={`flex-1 text-center lg:text-left order-2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <span className="bg-[#a8e6ff] text-[#223b0a] text-sm font-medium px-3 py-1 rounded-full">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-2xl font-medium text-[#223b0a] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Overview */}
        <section className="py-20 bg-gradient-to-br from-[#f8fdff] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-4">
                  Everything you need in <span className="font-medium">one place</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Comprehensive tools designed specifically for modern caregiving families.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border border-slate-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-[#223b0a] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20" id="faq">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-[#223b0a] mb-4">
                  Frequently Asked <span className="font-medium">Questions</span>
                </h2>
                <p className="text-lg text-slate-600">
                  Everything you need to know about Eloura and how it works.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Collapsible
                    key={index}
                    open={openFAQ === index}
                    onOpenChange={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <Card className="border border-slate-200">
                      <CollapsibleTrigger className="w-full p-6 text-left hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-slate-800 pr-4">
                            {faq.question}
                          </h3>
                          <ChevronDown 
                            className={`h-5 w-5 text-slate-500 transition-transform flex-shrink-0 ${
                              openFAQ === index ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-6 pb-6">
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#223b0a] to-[#1a2e08] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Ready to simplify your family's care coordination?
              </h2>
              <p className="text-xl text-[#a8e6ff]/90 mb-8">
                Join thousands of families who have reduced stress and improved coordination with Eloura.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#a8e6ff] hover:bg-[#7ad1f5] text-[#223b0a] font-medium rounded-full px-8"
                  onClick={() => navigate('/auth')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 rounded-full px-8"
                  onClick={() => window.open('https://forms.gle/3m5w5APDfsRCgGsP9', '_blank')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorks;