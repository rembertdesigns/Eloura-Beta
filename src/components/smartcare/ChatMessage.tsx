
import React from 'react';

interface ChatMessageProps {
  type: 'user' | 'assistant';
  message: string;
  time: string;
}

const ChatMessage = ({ type, message, time }: ChatMessageProps) => {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${type === 'user' ? 'order-2' : 'order-1'}`}>
        {type === 'assistant' && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
              🤖
            </div>
            <span className="text-xs text-slate-500">{time}</span>
          </div>
        )}
        <div className={`p-3 rounded-lg ${
          type === 'user' 
            ? 'bg-blue-600 text-white' 
            : 'bg-white border border-slate-200'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
          {type === 'user' && (
            <div className="text-xs text-blue-100 mt-1 text-right">{time}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
