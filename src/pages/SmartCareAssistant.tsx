
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureFooter from '@/components/FeatureFooter';

const SmartCareAssistant = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  
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
      <div className="min-h-screen bg-white flex items-center justify-center">
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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to use the Smart Care Assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl h-full flex flex-col flex-1">
        {/* Header */}
        <div className="flex-shrink-0 mb-4 sm:mb-6">
          <SmartCareHeader />
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex flex-1 min-h-0 mb-6 gap-4">
          {/* Chat Section - 60% of space */}
          <div className="flex-[3] flex flex-col shadow-xl bg-white border border-gray-200 rounded-lg overflow-hidden">
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
          <div className="flex-[2] shadow-xl bg-white border border-gray-200 rounded-lg overflow-hidden">
            <SavedContent onNewConversation={startNewConversation} />
          </div>
        </div>

        {/* Mobile/Tablet Layout - Tabbed interface */}
        <div className="lg:hidden flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-full max-w-sm grid-cols-2">
                <TabsTrigger value="chat" className="flex items-center gap-2 text-sm min-h-[44px]">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2 text-sm min-h-[44px]">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
              </TabsList>
              
              {/* New conversation button - mobile */}
              {activeTab === 'chat' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={startNewConversation}
                  className="touch-manipulation min-h-[44px] px-3"
                >
                  <span className="text-xs sm:text-sm">New Chat</span>
                </Button>
              )}
            </div>

            <div className="flex-1 min-h-0">
              <TabsContent value="chat" className="h-full flex flex-col shadow-xl bg-white border border-gray-200 rounded-lg overflow-hidden mt-0">
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
              </TabsContent>

              <TabsContent value="saved" className="h-full shadow-xl bg-white border border-gray-200 rounded-lg overflow-hidden mt-0 pb-safe">
                <SavedContent onNewConversation={() => {
                  startNewConversation();
                  setActiveTab('chat');
                }} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </div>
  );
};

export default SmartCareAssistant;
