import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Send, Pin, Users, Smile, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useMessagesData } from '@/hooks/useMessagesData';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const Messages = () => {
  const { user } = useAuth();
  const {
    conversations,
    messages,
    loading,
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    togglePin
  } = useMessagesData();

  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversationId) {
      sendMessage(selectedConversationId, messageInput);
      setMessageInput('');
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowChat(true);
  };

  const filteredConversations = conversations
    .filter(conv => 
      conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Pin conversations first
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      // Then sort by last message time
      return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
    });

  // Show loading or redirect to auth if not authenticated
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Please log in to view messages.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading conversations...</p>
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
                className="text-sm"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" className="text-sm">
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
              <Badge variant="secondary">{filteredConversations.filter(c => c.unread_count > 0).length}</Badge>
            </div>
            
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No conversations yet</p>
                <p className="text-sm">Start a new conversation to get started!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
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
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className={`${conversation.is_group ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} font-medium`}>
                            {conversation.is_group ? <Users className="h-6 w-6" /> : conversation.participant_info?.avatar || conversation.name?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.is_group && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center">
                            <Users className="h-2 w-2" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className={`text-sm font-medium text-gray-900 truncate ${conversation.unread_count ? 'font-semibold' : ''}`}>
                              {conversation.name || 'Unknown'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {conversation.last_message_at ? formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true }) : ''}
                            </span>
                            {conversation.unread_count > 0 && (
                              <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                                {conversation.unread_count}
                              </Badge>
                            )}
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
                        
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-sm text-gray-600 truncate ${conversation.unread_count ? 'font-medium text-gray-800' : ''}`}>
                            {conversation.last_message || 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`${selectedConversation.is_group ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} font-medium`}>
                      {selectedConversation.is_group ? <Users className="h-6 w-6" /> : selectedConversation.participant_info?.avatar || selectedConversation.name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.is_group && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center">
                      <Users className="h-2 w-2" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                    {selectedConversation.is_group && (
                      <Badge variant="outline" className="text-xs">
                        Group
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.is_group ? 'Group conversation' : 'Direct message'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  title="Close conversation"
                  onClick={() => {
                    setShowChat(false);
                    setSelectedConversationId(null);
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No messages in this conversation yet</p>
                <p className="text-sm">Send a message to get started!</p>
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
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
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
              <Button variant="ghost" size="sm" title="Attach file">
                <Paperclip className="h-4 w-4 text-gray-500" />
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
              <Button variant="ghost" size="sm" title="Add emoji">
                <Smile className="h-4 w-4 text-gray-500" />
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!messageInput.trim()}
                className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600"
                title="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Keyboard shortcut hint */}
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