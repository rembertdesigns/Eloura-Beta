
import React from 'react';
import ChatMessage from './ChatMessage';

interface ChatMessage {
  id: string;
  user_id: string;
  session_id: string;
  message_content: string;
  sender: 'user' | 'assistant';
  created_at: string;
  updated_at: string;
}

interface ChatMessagesProps {
  chatHistory: ChatMessage[];
  loading: boolean;
  onSaveContent: (content: string, category: 'notes' | 'guides') => void;
}

const ChatMessages = ({ chatHistory, loading, onSaveContent }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
      {chatHistory.length === 0 && !loading && (
        <div className="flex justify-center items-center h-full">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Hi! I'm Eloura</h3>
            <p className="text-sm">Your personal AI assistant ready to help you navigate your busy life as a parent, caregiver, and goal-achiever.</p>
          </div>
        </div>
      )}
      
      {chatHistory.map((chat) => (
        <ChatMessage
          key={chat.id}
          type={chat.sender}
          message={chat.message_content}
          time={new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          onSaveContent={chat.sender === 'assistant' ? onSaveContent : undefined}
        />
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
              🤖
            </div>
            <span className="text-xs text-gray-500">Eloura is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
