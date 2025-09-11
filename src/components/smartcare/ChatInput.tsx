
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  question: string;
  setQuestion: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput = ({ question, setQuestion, onSend, loading, onKeyPress }: ChatInputProps) => {
  return (
    <div className="p-3 sm:p-4 border-t bg-white flex-shrink-0 safe-area-inset-bottom">
      <div className="flex gap-2 sm:gap-3">
        <Input
          placeholder="Ask Eloura anything about managing your life..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1 min-h-[44px] text-sm sm:text-base px-3 sm:px-4"
        />
        <Button 
          onClick={onSend}
          disabled={loading || !question.trim()}
          size="sm"
          className="bg-slate-600 hover:bg-slate-700 min-h-[44px] min-w-[44px] px-3 touch-manipulation"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
