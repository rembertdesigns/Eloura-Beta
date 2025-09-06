
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Star, Trash2 } from 'lucide-react';
import { useSavedContent } from '@/hooks/useSavedContent';
import { useToast } from '@/hooks/use-toast';

interface SavedContentData {
  id: string;
  title: string;
  content: string;
  date_saved: string;
  category: 'notes' | 'guides';
}

interface SavedContentItemProps extends SavedContentData {
  onView: (content: SavedContentData) => void;
}

const SavedContentItem = ({ id, title, content, date_saved, category, onView }: SavedContentItemProps) => {
  const { deleteSavedContent } = useSavedContent();
  const { toast } = useToast();
  
  const iconConfig = {
    notes: { icon: FileText, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
    guides: { icon: BookOpen, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' }
  };

  const config = iconConfig[category];
  const IconComponent = config.icon;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const success = await deleteSavedContent(id);
    if (!success) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const handleClick = () => {
    onView({ id, title, content, date_saved, category });
  };

  return (
    <Card className="border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer shadow-sm group" onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900 text-sm truncate">{title}</h3>
              {category === 'notes' && <Star className="h-3 w-3 text-orange-500 flex-shrink-0" />}
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">{content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {new Date(date_saved).toLocaleDateString()}
              </span>
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedContentItem;
