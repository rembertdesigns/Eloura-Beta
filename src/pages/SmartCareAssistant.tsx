import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, Bookmark, CheckCircle, Star, Baby, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureFooter from '@/components/FeatureFooter';

const SmartCareAssistant = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    { text: "What's a low-sodium dinner for Dad?", category: "eldercare", icon: "🍽️" },
    { text: "My 3-year-old won't nap—help?", category: "childcare", icon: "😴" },
    { text: "How to prepare for memory decline?", category: "eldercare", icon: "🧠" },
    { text: "Toddler dinner ideas for picky eaters", category: "childcare", icon: "🥕" },
    { text: "Managing medication schedules", category: "eldercare", icon: "💊" },
    { text: "Gentle potty training tips", category: "childcare", icon: "🚽" }
  ];

  const savedAnswers = [
    {
      id: 1,
      question: "What's a good bedtime routine for toddlers?",
      answer: "A consistent bedtime routine typically includes: bath time (15 mins), quiet story reading (10 mins), gentle lullabies or soft music...",
      category: "childcare",
      saved: true,
      tried: false
    },
    {
      id: 2,
      question: "How to make home safer for seniors?",
      answer: "Start with these key areas: Install grab bars in bathroom, improve lighting throughout the house, remove tripping hazards...",
      category: "eldercare",
      saved: true,
      tried: true
    }
  ];

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    // Simulate AI response
    setTimeout(() => {
      const mockResponse = {
        question: question,
        answer: "Here's a personalized suggestion based on your family's needs and preferences. This takes into account any dietary restrictions and care requirements you've shared with Eloura...",
        category: question.toLowerCase().includes('dad') || question.toLowerCase().includes('senior') ? 'eldercare' : 'childcare'
      };
      setChatHistory([mockResponse, ...chatHistory]);
      setQuestion('');
      setLoading(false);
    }, 2000);
  };

  const handlePromptClick = (prompt) => {
    setQuestion(prompt.text);
  };

  return (
    <div className="min-h-screen warm-gradient pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-light text-slate-800">
            Smart Care <span className="text-gradient-orange font-medium">Assistant</span>
          </h1>
          <p className="text-slate-600">Personalized guidance for your daily caregiving decisions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Input */}
            <Card className="card-warm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Brain className="h-5 w-5 text-orange-600" />
                  Ask Your Care Question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="What caregiving challenge can I help you with today? Be as specific as possible..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  className="border-orange-200 focus:border-orange-400"
                />
                <Button 
                  onClick={handleSendQuestion}
                  disabled={loading || !question.trim()}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Get Personalized Guidance
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Chat History */}
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <Card key={index} className="card-warm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <Brain className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-700 mb-2">{chat.question}</p>
                          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <p className="text-slate-600 leading-relaxed">{chat.answer}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                              <Bookmark className="h-4 w-4 mr-2" />
                              Save to Toolkit
                            </Button>
                            <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Tried
                            </Button>
                            <Badge variant="secondary" className={chat.category === 'childcare' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                              {chat.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Suggestions & Saved */}
          <div className="space-y-6">
            {/* Suggested Prompts */}
            <Card className="card-warm">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-green-50"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <span className="mr-2">{prompt.icon}</span>
                    <span className="text-sm">{prompt.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Saved Answers */}
            <Card className="card-warm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-slate-700">
                  <Star className="h-5 w-5 text-orange-500" />
                  Saved Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedAnswers.map((item) => (
                  <div key={item.id} className="p-3 border border-white/50 rounded-lg space-y-2 bg-white/40">
                    <h4 className="text-sm font-medium text-slate-700">{item.question}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.answer}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${item.category === 'childcare' ? 'border-green-200 text-green-700' : 'border-orange-200 text-orange-700'}`}>
                        {item.category === 'childcare' ? (
                          <><Baby className="h-3 w-3 mr-1" /> Child</>
                        ) : (
                          <><Heart className="h-3 w-3 mr-1" /> Elder</>
                        )}
                      </Badge>
                      {item.tried && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          ✓ Tried
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Insights */}
            <Card className="card-warm bg-gradient-to-br from-orange-50/80 to-green-50/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-700">Linked Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-white/60 rounded text-sm border border-white/50">
                  <p className="text-slate-600">💡 Added "Low-sodium recipes" to your Meal Toolkit</p>
                </div>
                <div className="p-2 bg-white/60 rounded text-sm border border-white/50">
                  <p className="text-slate-600">📅 Created reminder for dad's medication review</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FeatureFooter />
    </div>
  );
};

export default SmartCareAssistant;
