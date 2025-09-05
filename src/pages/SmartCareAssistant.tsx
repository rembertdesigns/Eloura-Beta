
import React, { useState, useEffect } from 'react';
import SmartCareHeader from '@/components/smartcare/SmartCareHeader';
import ChatHeader from '@/components/smartcare/ChatHeader';
import ChatMessages from '@/components/smartcare/ChatMessages';
import ChatInput from '@/components/smartcare/ChatInput';
import SavedContent from '@/components/smartcare/SavedContent';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useSavedContent } from '@/hooks/useSavedContent';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SmartCareAssistant = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  
  const {
    messages,
    loading: chatLoading,
    sendMessage,
    startNewConversation
  } = useChatMessages();
  
  const {
    savedContent,
    saveContent,
    getContentByCategory
  } = useSavedContent();

  // Add welcome message when user first visits
  useEffect(() => {
    if (user && messages.length === 0) {
      // The welcome message will be handled by the chat system if needed
    }
  }, [user, messages]);

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    await sendMessage(question);
    setQuestion('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  const handleSaveContent = async (content: string, category: 'notes' | 'guides') => {
    // Extract a title from the content (first 50 characters)
    const title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
    
    const success = await saveContent(title, content, category);
    if (success) {
      toast({
        title: "Success",
        description: `Content saved to ${category}`,
      });
    }
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to use the Smart Care Assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 py-6 max-w-7xl h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 mb-6">
          <SmartCareHeader />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex min-h-0 mb-6">
          {/* Chat Section - 60% of space */}
          <div className="flex-[3] flex flex-col shadow-2xl bg-white border-r border-gray-200 mr-4 rounded-lg overflow-hidden">
            <ChatHeader />
            <ChatMessages 
              chatHistory={messages} 
              loading={chatLoading}
              onSaveContent={handleSaveContent}
            />
            <ChatInput
              question={question}
              setQuestion={setQuestion}
              onSend={handleSendQuestion}
              loading={chatLoading}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Saved Content - 40% of space */}
          <div className="flex-[2] shadow-2xl bg-white rounded-lg overflow-hidden">
            <SavedContent onNewConversation={startNewConversation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCareAssistant;
