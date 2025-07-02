
import React, { useState } from 'react';
import { Search, Plus, Phone, Video, MoreHorizontal, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Mom (Patricia)',
    lastMessage: "Don't worry about the groceries, I'll handle it!",
    timestamp: '2 min ago',
    unreadCount: 2,
    avatar: 'M',
    isOnline: true
  },
  {
    id: '2',
    name: 'Mike (Partner)',
    lastMessage: 'Kids are at soccer practice, picking up at 5',
    timestamp: '1 hour ago',
    avatar: 'M'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    lastMessage: 'Can do carpool Wednesday if you need!',
    timestamp: '3 hours ago',
    unreadCount: 1,
    avatar: 'S'
  },
  {
    id: '4',
    name: 'Lisa Martinez',
    lastMessage: 'Emma did great with math homework today 📚',
    timestamp: 'Yesterday',
    avatar: 'L'
  },
  {
    id: '5',
    name: 'Village Group',
    lastMessage: 'Thanks everyone for helping with the bake sa...',
    timestamp: '2 days ago',
    avatar: 'V'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: "Hi honey! I saw your message about needing help with groceries.",
    timestamp: '10:30 AM',
    isSent: false
  },
  {
    id: '2',
    content: "Oh mom, you don't have to! I know you're busy with dad's appointment today.",
    timestamp: '10:32 AM',
    isSent: true
  },
  {
    id: '3',
    content: "Don't be silly! That's what family is for. I can stop by the store after the appointment.",
    timestamp: '10:33 AM',
    isSent: false
  },
  {
    id: '4',
    content: "You're the best! I really appreciate it. The list is on the fridge.",
    timestamp: '10:35 AM',
    isSent: true
  },
  {
    id: '5',
    content: "Don't worry about the groceries, I'll handle it! ❤️",
    timestamp: '10:36 AM',
    isSent: false
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversations Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
              <p className="text-sm text-gray-600">Stay connected with your village</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
              <Badge variant="secondary">2</Badge>
            </div>
            
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {conversation.timestamp}
                          </span>
                          {conversation.unreadCount && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {selectedConversation.avatar}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                {selectedConversation.isOnline && (
                  <p className="text-sm text-green-600">Online</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isSent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isSent ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
