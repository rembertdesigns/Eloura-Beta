import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Send, Pin, Users, Smile, Paperclip, Settings, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { NewConversationModal } from '@/components/NewConversationModal';

const Messages = () => {
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);
  
  const { user } = useAuth();
  const { conversations, messages, loading, fetchMessages, sendMessage, togglePin } = useMessages();

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedConversationId) {
      await sendMessage(selectedConversationId, messageInput);
      setMessageInput('');
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowChat(true);
    fetchMessages(conversationId);
  };

  const handleConversationCreated = (conversationId: string) => {
    handleSelectConversation(conversationId);
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const filteredConversations = conversations
    .filter(conv => {
      const name = conv.name || 'Unknown';
      const lastMessage = conv.last_message || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMM d, h:mm a');
    } catch {
      return '';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Please sign in to view messages.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Page Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">Messages</h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Connect and communicate with your village</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className={`${showChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-200 bg-white`}>
          {/* Search and Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Conversations</h2>
              <Button
                size="sm"
                onClick={() => setShowNewConversationModal(true)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p className="mb-2">No conversations yet</p>
                <Button
                  variant="outline"
                  onClick={() => setShowNewConversationModal(true)}
                >
                  Start a conversation
                </Button>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversationId === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback className="text-sm">
                        {getInitials(conversation.name || 'Unknown')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {conversation.name || 'Unknown'}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {conversation.is_pinned && (
                            <Pin className="h-3 w-3 text-blue-500" />
                          )}
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(conversation.updated_at)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.last_message || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${showChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowChat(false)}
                      className="md:hidden"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-sm">
                        {getInitials(selectedConversation.name || 'Unknown')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedConversation.name || 'Unknown'}
                      </h3>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(selectedConversation.id)}
                    >
                      <Pin className={`h-4 w-4 ${selectedConversation.is_pinned ? 'text-blue-500' : 'text-gray-400'}`} />
                    </Button>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        <div className="space-y-1">
                          <Button variant="ghost" className="w-full justify-start text-sm">
                            View Profile
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm">
                            Mute
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm text-red-600">
                            Delete Chat
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(message.created_at)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No conversation selected</p>
                <p className="text-sm">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Conversation Modal */}
      <NewConversationModal
        open={showNewConversationModal}
        onOpenChange={setShowNewConversationModal}
        onConversationCreated={handleConversationCreated}
      />
    </div>
  );
};

export default Messages;