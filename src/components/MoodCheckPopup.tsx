import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Settings, X } from 'lucide-react';

interface MoodCheckPopupProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MoodCheckPopup = ({ selectedMood, onMoodSelect, isOpen, onOpenChange }: MoodCheckPopupProps) => {
  const [frequency, setFrequency] = useState('daily');
  const [showSettings, setShowSettings] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Energized', color: 'bg-green-50 border-green-200 text-green-700' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { emoji: '😰', label: 'Overwhelmed', color: 'bg-red-50 border-red-200 text-red-700' },
    { emoji: '😴', label: 'Tired', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { emoji: '🤔', label: 'Focused', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { emoji: '😑', label: 'Neutral', color: 'bg-gray-50 border-gray-200 text-gray-700' }
  ];

  const getMoodAdvice = (mood: string) => {
    switch (mood) {
      case 'Overwhelmed':
        return "Remember: You don't have to do everything today. Focus on your top 3 priorities.";
      case 'Tired':
        return "Be gentle with yourself. Consider delegating one task today or taking a short break.";
      case 'Energized':
        return "Great energy today! Maybe tackle that challenging task you've been putting off.";
      case 'Calm':
        return "Wonderful! This peaceful energy will help you navigate today smoothly.";
      case 'Focused':
        return "Perfect mindset for deep work. Consider blocking time for your most important tasks.";
      default:
        return "Every feeling is valid. Check in with yourself throughout the day.";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-orange-500" />
            How are you feeling today?
          </DialogTitle>
        </DialogHeader>

        {!showSettings ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood.label}
                  variant="outline"
                  onClick={() => onMoodSelect(mood.label)}
                  className={`p-4 h-auto flex flex-col items-center gap-2 hover:scale-105 transition-all ${
                    selectedMood === mood.label ? mood.color : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </Button>
              ))}
            </div>

            {selectedMood && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 leading-relaxed">
                  {getMoodAdvice(selectedMood)}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSettings(true)}
                className="flex-1"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={() => onOpenChange(false)} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Check-in Frequency</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSettings(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {[
                { value: 'never', label: 'Never remind me' },
                { value: 'daily', label: 'Once daily' },
                { value: 'twice', label: 'Twice daily' },
                { value: 'weekly', label: 'Weekly' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={frequency === option.value ? "default" : "outline"}
                  onClick={() => setFrequency(option.value)}
                  className="w-full justify-start"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <p className="text-xs text-gray-600">
              Regular check-ins help you stay connected with yourself and adjust your day as needed.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MoodCheckPopup;