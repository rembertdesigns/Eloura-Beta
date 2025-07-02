
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, BookOpen, Star } from 'lucide-react';

interface SavedContentItemProps {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'notes' | 'guides';
}

const SavedContentItem = ({ title, content, date, type }: SavedContentItemProps) => {
  const iconConfig = {
    notes: { icon: FileText, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
    guides: { icon: BookOpen, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' }
  };

  const config = iconConfig[type];
  const IconComponent = config.icon;

  return (
    <Card className="border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-slate-800 text-sm truncate">{title}</h3>
              {type === 'notes' && <Star className="h-3 w-3 text-orange-500 flex-shrink-0" />}
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 mb-2">{content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedContentItem;
