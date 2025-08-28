
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import SavedContentItem from './SavedContentItem';

interface SavedContentItem {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'notes' | 'guides';
}

interface SavedContentProps {
  savedContent: SavedContentItem[];
}

const SavedContent = ({ savedContent }: SavedContentProps) => {
  return (
    <div className="w-80 bg-white">
      {/* Saved Content Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-medium text-gray-900">Saved Content</h2>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notes" className="h-full">
        <TabsList className="w-full grid grid-cols-2 m-4 mb-0">
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="p-4 space-y-3 m-0">
          {savedContent.filter(item => item.type === 'notes').map((item) => (
            <SavedContentItem key={item.id} {...item} />
          ))}
        </TabsContent>

        <TabsContent value="guides" className="p-4 space-y-3 m-0">
          {savedContent.filter(item => item.type === 'guides').map((item) => (
            <SavedContentItem key={item.id} {...item} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedContent;
