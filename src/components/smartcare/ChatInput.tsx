
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
    <div className="p-4 border-t bg-white">
      <div className="flex gap-3">
        <Input
          placeholder="Ask Eloura anything about managing your life, goals, or daily challenges..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1"
        />
        <Button 
          onClick={onSend}
          disabled={loading || !question.trim()}
          size="sm"
          className="bg-slate-600 hover:bg-slate-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
