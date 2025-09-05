
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { BookmarkPlus } from 'lucide-react';

interface ChatMessageProps {
  type: 'user' | 'assistant';
  message: string;
  time: string;
  onSaveContent?: (content: string, category: 'notes' | 'guides') => void;
}

const ChatMessage = ({ type, message, time, onSaveContent }: ChatMessageProps) => {
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const handleSaveContent = (category: 'notes' | 'guides') => {
    if (onSaveContent) {
      onSaveContent(message, category);
      setShowSaveMenu(false);
    }
  };

  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${type === 'user' ? 'order-2' : 'order-1'}`}>
        {type === 'assistant' && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
              🤖
            </div>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        )}
        <div className={`relative group p-3 rounded-xl shadow-sm ${
          type === 'user' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 border border-gray-200'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
          {type === 'user' && (
            <div className="text-xs text-blue-100 mt-1 text-right">{time}</div>
          )}
          
          {/* Save button for assistant messages */}
          {type === 'assistant' && onSaveContent && (
            <DropdownMenu open={showSaveMenu} onOpenChange={setShowSaveMenu}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                >
                  <BookmarkPlus className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSaveContent('notes')}>
                  Save as Note
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSaveContent('guides')}>
                  Save as Guide
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
