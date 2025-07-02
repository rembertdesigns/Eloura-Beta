
import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-medium text-slate-800">Chat with Eloura</h2>
      </div>
    </div>
  );
};

export default ChatHeader;
