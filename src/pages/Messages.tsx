import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Send, Pin, Users, Smile, Paperclip, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const Messages = () => {
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
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
      return 0;
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
    <div className="flex h-screen bg-white">
      {/* Conversations Sidebar */}
      <div className={`${showChat && selectedConversation ? 'w-1/3' : 'w-full'} bg-white border-r border-gray-200 flex flex-col shadow-2xl transition-all duration-300`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Messages</h1>
              <p className="text-sm text-gray-600">Stay connected with your village</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-3">
                    <h4 className="font-medium">Settings</h4>
                    <p className="text-sm text-muted-foreground">Message settings coming soon</p>
                  </div>
                </PopoverContent>
              </Popover>
              <Button size="sm" disabled>
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mb-4">
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
              <Badge variant="secondary">{conversations.length}</Badge>
            </div>
            
            <div className="space-y-2">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No conversations yet</p>
                  <p className="text-sm text-muted-foreground">Start messaging your village members</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const conversationName = conversation.name || 'Unknown';
                  const initials = getInitials(conversationName);
                  
                  return (
                    <div
                      key={conversation.id}
                      className={`relative p-3 rounded-xl cursor-pointer transition-all duration-200 shadow-sm ${
                        selectedConversationId === conversation.id
                          ? 'bg-blue-50 border border-blue-200 shadow-md'
                          : 'hover:bg-gray-50 hover:shadow-sm'
                      } ${conversation.is_pinned ? 'ring-1 ring-yellow-200 bg-yellow-50' : ''}`}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      {conversation.is_pinned && (
                        <Pin className="absolute top-2 right-2 h-3 w-3 text-yellow-500" />
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversationName}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(conversation.last_message_at)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-yellow-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePin(conversation.id);
                                }}
                              >
                                <Pin className={`h-3 w-3 ${conversation.is_pinned ? 'text-yellow-500' : 'text-gray-400'}`} />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.last_message || 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {showChat && selectedConversation && (
        <div className="flex-1 flex flex-col shadow-2xl bg-white border-l border-gray-200">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {getInitials(selectedConversation.name || 'Unknown')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedConversation.name || 'Unknown'}</h3>
                  <p className="text-sm text-gray-500">Messages</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShowChat(false);
                  setSelectedConversationId(null);
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.is_sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-xs lg:max-w-md">
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.is_sent
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    
                    <div className={`flex items-center mt-1 ${message.is_sent ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(message.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" disabled>
                <Paperclip className="h-4 w-4 text-gray-400" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="ghost" size="sm" disabled>
                <Smile className="h-4 w-4 text-gray-400" />
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!messageInput.trim()}
                className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-xs text-gray-400 mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;