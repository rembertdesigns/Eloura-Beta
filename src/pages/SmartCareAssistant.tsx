
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, FileText, BookOpen, Star, Calendar } from 'lucide-react';

const SmartCareAssistant = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      message: "Hi! I'm Eloura, your personal AI assistant. I'm here to help you navigate your busy life as a parent, caregiver, and goal-achiever. How can I support you today?",
      time: "02:11 PM"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const savedContent = [
    {
      id: 1,
      title: "Morning Routine Optimization",
      content: "Based on our conversation, here are 5 ways to streamline your morning routine...",
      date: "6/28/2025",
      type: "notes"
    },
    {
      id: 2,
      title: "Delegation Strategy for Eldercare",
      content: "Key points for managing parent care responsibilities with siblings...",
      date: "6/27/2025",
      type: "guides"
    }
  ];

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    // Add user message
    const userMessage = {
      type: 'user',
      message: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        type: 'assistant',
        message: "I understand you're looking for guidance on this. Let me provide you with some personalized suggestions based on your family's needs and preferences. This takes into account any care requirements and preferences you've shared with me...",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Eloura AI</h1>
            <p className="text-sm text-slate-600">Your intelligent assistant for life management and personalized guidance</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col border-r">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-medium text-slate-800">Chat with Eloura</h2>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${chat.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {chat.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                        🤖
                      </div>
                      <span className="text-xs text-slate-500">{chat.time}</span>
                    </div>
                  )}
                  <div className={`p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-slate-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{chat.message}</p>
                    {chat.type === 'user' && (
                      <div className="text-xs text-blue-100 mt-1 text-right">{chat.time}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                    🤖
                  </div>
                  <span className="text-xs text-slate-500">Typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-3">
              <Input
                placeholder="Ask Eloura anything about managing your life, goals, or daily challenges..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendQuestion}
                disabled={loading || !question.trim()}
                size="sm"
                className="bg-slate-600 hover:bg-slate-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Saved Content Section */}
        <div className="w-80 bg-white">
          {/* Saved Content Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-medium text-slate-800">Saved Content</h2>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="notes" className="h-full">
            <TabsList className="w-full grid grid-cols-2 m-4 mb-0">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="p-4 space-y-3 m-0">
              {savedContent.filter(item => item.type === 'notes').map((item) => (
                <Card key={item.id} className="border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-800 text-sm truncate">{item.title}</h3>
                          <Star className="h-3 w-3 text-orange-500 flex-shrink-0" />
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">{item.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="guides" className="p-4 space-y-3 m-0">
              {savedContent.filter(item => item.type === 'guides').map((item) => (
                <Card key={item.id} className="border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 text-sm truncate mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">{item.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SmartCareAssistant;
