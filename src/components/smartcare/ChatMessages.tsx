
import React from 'react';
import ChatMessage from './ChatMessage';

interface ChatMessage {
  type: 'user' | 'assistant';
  message: string;
  time: string;
}

interface ChatMessagesProps {
  chatHistory: ChatMessage[];
  loading: boolean;
}

const ChatMessages = ({ chatHistory, loading }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
      {chatHistory.map((chat, index) => (
        <ChatMessage
          key={index}
          type={chat.type}
          message={chat.message}
          time={chat.time}
        />
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
              🤖
            </div>
            <span className="text-xs text-slate-500">Typing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
