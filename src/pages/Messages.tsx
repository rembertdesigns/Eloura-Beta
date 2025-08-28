
import React, { useState, useEffect } from 'react';
import { Search, Plus, Phone, Video, MoreHorizontal, Send, Pin, Users, AtSign, Smile, Paperclip, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar: string;
  isOnline?: boolean;
  isPinned?: boolean;
  isTyping?: boolean;
  lastSeen?: string;
  isGroup?: boolean;
  memberCount?: number;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Mom (Patricia)',
    lastMessage: "Don't worry about the groceries, I'll handle it!",
    timestamp: '2 min ago',
    unreadCount: 2,
    avatar: 'M',
    isOnline: true,
    isPinned: true,
    isTyping: false
  },
  {
    id: '2',
    name: 'Mike (Partner)',
    lastMessage: 'Kids are at soccer practice, picking up at 5',
    timestamp: '1 hour ago',
    avatar: 'M',
    isOnline: true,
    isPinned: false,
    isTyping: true
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    lastMessage: 'Can do carpool Wednesday if you need!',
    timestamp: '3 hours ago',
    unreadCount: 1,
    avatar: 'S',
    isPinned: false,
    lastSeen: '3 hours ago'
  },
  {
    id: '4',
    name: 'Lisa Martinez',
    lastMessage: 'Emma did great with math homework today 📚',
    timestamp: 'Yesterday',
    avatar: 'L',
    isPinned: false,
    lastSeen: 'Yesterday'
  },
  {
    id: '5',
    name: 'Village Group',
    lastMessage: 'Thanks everyone for helping with the bake sa...',
    timestamp: '2 days ago',
    avatar: 'V',
    isGroup: true,
    memberCount: 8,
    isPinned: false
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: "Hi honey! I saw your message about needing help with groceries.",
    timestamp: '10:30 AM',
    isSent: false,
    isRead: true,
    isDelivered: true
  },
  {
    id: '2',
    content: "Oh mom, you don't have to! I know you're busy with dad's appointment today.",
    timestamp: '10:32 AM',
    isSent: true,
    isRead: true,
    isDelivered: true
  },
  {
    id: '3',
    content: "Don't be silly! That's what family is for. I can stop by the store after the appointment.",
    timestamp: '10:33 AM',
    isSent: false,
    isRead: true,
    isDelivered: true
  },
  {
    id: '4',
    content: "You're the best! I really appreciate it. The list is on the fridge.",
    timestamp: '10:35 AM',
    isSent: true,
    isRead: false,
    isDelivered: true
  },
  {
    id: '5',
    content: "Don't worry about the groceries, I'll handle it! ❤️",
    timestamp: '10:36 AM',
    isSent: false,
    isRead: false,
    isDelivered: true
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
    }
  };

  const togglePin = (conversationId: string) => {
    // Toggle pin status
    console.log('Toggle pin for:', conversationId);
  };

  const filteredConversations = conversations
    .filter(conv => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Pin conversations first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-3">
                    <h4 className="font-medium">Settings</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dark Mode</span>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
              <Badge variant="secondary">2</Badge>
            </div>
            
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`relative p-3 rounded-xl cursor-pointer transition-all duration-200 shadow-sm ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-blue-50 border border-blue-200 shadow-md'
                      : 'hover:bg-gray-50 hover:shadow-sm'
                  } ${conversation.isPinned ? 'ring-1 ring-yellow-200 bg-yellow-50' : ''}`}
                   onClick={() => {
                     setSelectedConversation(conversation);
                     setShowChat(true);
                   }}
                >
                  {conversation.isPinned && (
                    <Pin className="absolute top-2 right-2 h-3 w-3 text-yellow-500" />
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className={`${conversation.isGroup ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} font-medium`}>
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && !conversation.isGroup && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                      {conversation.isGroup && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center">
                          <Users className="h-2 w-2" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium text-gray-900 truncate ${conversation.unreadCount ? 'font-semibold' : ''}`}>
                            {conversation.name}
                          </p>
                          {conversation.isGroup && (
                            <Badge variant="outline" className="text-xs px-1">
                              {conversation.memberCount}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {conversation.timestamp}
                          </span>
                          {conversation.unreadCount && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                              {conversation.unreadCount}
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
                            <Pin className={`h-3 w-3 ${conversation.isPinned ? 'text-yellow-500' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-sm text-gray-600 truncate ${conversation.unreadCount ? 'font-medium text-gray-800' : ''}`}>
                          {conversation.isTyping ? (
                            <span className="text-green-600 italic">typing...</span>
                          ) : (
                            conversation.lastMessage
                          )}
                        </p>
                      </div>
                      
                      {!conversation.isOnline && !conversation.isGroup && conversation.lastSeen && (
                        <p className="text-xs text-gray-400 mt-1">
                          Last seen {conversation.lastSeen}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`${selectedConversation.isGroup ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} font-medium`}>
                      {selectedConversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.isOnline && !selectedConversation.isGroup && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {selectedConversation.isGroup && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center">
                      <Users className="h-2 w-2" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                    {selectedConversation.isGroup && (
                      <Badge variant="outline" className="text-xs">
                        {selectedConversation.memberCount} members
                      </Badge>
                    )}
                  </div>
                  {selectedConversation.isTyping ? (
                    <p className="text-sm text-green-600 italic">typing...</p>
                  ) : selectedConversation.isOnline ? (
                    <p className="text-sm text-green-600">Online</p>
                  ) : selectedConversation.lastSeen ? (
                    <p className="text-sm text-gray-500">Last seen {selectedConversation.lastSeen}</p>
                  ) : null}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" title="Voice call">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Video call">
                  <Video className="h-4 w-4" />
                </Button>
                {selectedConversation.isGroup && (
                  <Button variant="outline" size="sm" title="Mention someone">
                    <AtSign className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  title="Close conversation"
                  onClick={() => {
                    setShowChat(false);
                    setSelectedConversation(null);
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-xs lg:max-w-md">
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.isSent
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  <div className={`flex items-center mt-1 space-x-1 ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                    {message.isSent && (
                      <div className="flex items-center space-x-1">
                        {message.isDelivered && (
                          <div className="w-3 h-3 text-gray-400">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                            </svg>
                          </div>
                        )}
                        {message.isRead && (
                          <div className="w-3 h-3 text-blue-500">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
