import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Calendar, Users, Brain, PieChart, Folder, Check, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
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
      question: "What is Eloura?",
      answer: "Eloura is an AI-powered home base that helps families manage schedules, tasks, routines, and shared responsibilities in one place."
    },
    {
      question: "Who is the beta for?",
      answer: "Parents and caregivers who want to test early features and share honest feedback."
    },
    {
      question: "How do I join the beta?",
      answer: "Use your invite link or enter an invite code on the homepage. If you need an invite, join the waitlist."
    },
    {
      question: "Is the beta free?",
      answer: "Yes. Some features may become paid after public launch. We will give notice before any changes."
    },
    {
      question: "What should I expect in beta?",
      answer: "You may see bugs or unfinished areas. We push updates often. Your feedback helps us decide what to improve next."
    },
    {
      question: "How do I report a bug?",
      answer: "Use the Feedback Form to report any issues you have.",
      hasLink: true
    },
    {
      question: "How do I share product feedback or ideas?",
      answer: "Use the Feedback Form. Tell us what worked, what was confusing, or what you want us to add.",
      hasLink: true
    },
    {
      question: "What devices are supported right now?",
      answer: "Modern desktop and mobile browsers. For best results, use the latest Chrome or Safari."
    },
    {
      question: "Is there a mobile app yet?",
      answer: "Not yet. The web app works on phones and tablets. Native apps are planned."
    },
    {
      question: "Can I invite my partner or caregiver?",
      answer: "Yes. Add them to your Eloura \"Village\" to share calendars, tasks, and routines."
    },
    {
      question: "Will my data carry over after the beta?",
      answer: "Yes. Your account and core data will carry over as we move toward public launch."
    },
    {
      question: "How does Eloura handle privacy?",
      answer: "Your data stays yours. We use encryption and limit access internally. See our Privacy Policy for details."
    },
    {
      question: "Can I delete my account and data?",
      answer: "Yes. You can request deletion from Account settings. We will confirm when the deletion is complete."
    },
    {
      question: "How fast do you reply to support messages?",
      answer: "We aim to reply within 1 to 2 business days during beta."
    },
    {
      question: "Do you have a community space?",
      answer: "Yes. The Village community is available for beta members. Share tips, ask questions, and learn from others."
    },
    {
      question: "What features are in beta today?",
      answer: "Daily Brief, Smart Parenting Assistant, shared tasks and lists, routines, and the Village."
    },
    {
      question: "Will features change during beta?",
      answer: "Yes. We may add, remove, or refine features based on what we learn from you."
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
                        <div className="text-slate-600 leading-relaxed">
                          {faq.hasLink ? (
                            <span>
                              {faq.answer.split('Feedback Form').map((part, index, array) => (
                                <span key={index}>
                                  {part}
                                  {index < array.length - 1 && (
                                    <a 
                                      href="https://forms.gle/3m5w5APDfsRCgGsP9" 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-[#223b0a] hover:text-[#1a2e08] underline font-medium"
                                    >
                                      Feedback Form
                                    </a>
                                  )}
                                </span>
                              ))}
                            </span>
                          ) : (
                            <p>{faq.answer}</p>
                          )}
                        </div>
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
                <p className="text-white/70 mb-6">The operating system for modern families caregiving. Built for millennials and Gen Z who are redefining what care looks like.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-6">Product</h4>
                <ul className="space-y-3 text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
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
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-white/70">
              <p>© 2024 Eloura. Made with ❤️ for modern caregiving families.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HowItWorks;