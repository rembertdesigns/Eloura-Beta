import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_read: boolean;
  conversation_id: string;
}

interface Conversation {
  id: string;
  name: string;
  last_message: string;
  last_message_at: string;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember?: any;
  conversations: Conversation[];
  messages: Message[];
  onSendMessage: (conversationId: string, content: string) => void;
  onCreateConversation: (memberName: string) => Promise<string>;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  selectedMember,
  conversations = [],
  messages = [],
  onSendMessage,
  onCreateConversation
}) => {
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedMember && isOpen && conversations.length >= 0) {
      // Find existing conversation or create new one
      const existingConversation = conversations.find(c => 
        c.name && c.name.toLowerCase().includes(selectedMember.name?.toLowerCase() || '')
      );
      
      if (existingConversation) {
        setCurrentConversationId(existingConversation.id);
      } else {
        // Create new conversation
        handleCreateConversation();
      }
    }
  }, [selectedMember, isOpen, conversations]);

  const handleCreateConversation = async () => {
    if (!selectedMember) return;
    
    setLoading(true);
    try {
      const conversationId = await onCreateConversation(selectedMember.name);
      setCurrentConversationId(conversationId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentConversationId) return;

    setLoading(true);
    try {
      await onSendMessage(currentConversationId, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const conversationMessages = messages.filter(m => m.conversation_id === currentConversationId);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5" />
            {selectedMember ? `Message ${selectedMember.name}` : 'Messages'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {!selectedMember ? (
            // Conversation List View
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-2 p-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setCurrentConversationId(conversation.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentConversationId === conversation.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-gray-50 border-gray-200'
                      } border`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{conversation.name}</h4>
                          <p className="text-xs text-gray-500 truncate">
                            {conversation.last_message || 'No messages yet'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {conversation.last_message_at && 
                              new Date(conversation.last_message_at).toLocaleDateString()
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {conversations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No conversations yet</p>
                      <p className="text-sm">Start messaging your village members</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : currentConversation ? (
            // Individual Conversation View
            <>
              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === 'current-user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_id === 'current-user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_id === 'current-user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.created_at).toLocaleDateString()} {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {conversationMessages.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Start the conversation with {selectedMember.name}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex-shrink-0 p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message ${selectedMember.name}...`}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading || !newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            // Loading State
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Loading conversation...</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;