
import React, { useState } from 'react';
import SmartCareHeader from '@/components/smartcare/SmartCareHeader';
import ChatHeader from '@/components/smartcare/ChatHeader';
import ChatMessages from '@/components/smartcare/ChatMessages';
import ChatInput from '@/components/smartcare/ChatInput';
import SavedContent from '@/components/smartcare/SavedContent';

const SmartCareAssistant = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant' as const,
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
      type: "notes" as const
    },
    {
      id: 2,
      title: "Delegation Strategy for Eldercare",
      content: "Key points for managing parent care responsibilities with siblings...",
      date: "6/27/2025",
      type: "guides" as const
    }
  ];

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      message: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        type: 'assistant' as const,
        message: "I understand you're looking for guidance on this. Let me provide you with some personalized suggestions based on your family's needs and preferences. This takes into account any care requirements and preferences you've shared with me...",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <SmartCareHeader />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col border-r">
          <ChatHeader />
          <ChatMessages chatHistory={chatHistory} loading={loading} />
          <ChatInput
            question={question}
            setQuestion={setQuestion}
            onSend={handleSendQuestion}
            loading={loading}
            onKeyPress={handleKeyPress}
          />
        </div>

        <SavedContent savedContent={savedContent} />
      </div>
    </div>
  );
};

export default SmartCareAssistant;
