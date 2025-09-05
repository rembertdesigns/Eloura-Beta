
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';
import SavedContentItem from './SavedContentItem';
import { useSavedContent } from '@/hooks/useSavedContent';

interface SavedContentProps {
  savedContent?: never; // Deprecated prop
  onNewConversation: () => void;
}

const SavedContent = ({ onNewConversation }: SavedContentProps) => {
  const { savedContent, loading, getContentByCategory } = useSavedContent();

  if (loading) {
    return (
      <div className="w-full bg-white h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full flex flex-col">
      {/* Saved Content Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-medium text-gray-900">Saved Content</h2>
          </div>
          <Button
            onClick={onNewConversation}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notes" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-2 m-4 mb-0 flex-shrink-0">
          <TabsTrigger value="notes">Notes ({getContentByCategory('notes').length})</TabsTrigger>
          <TabsTrigger value="guides">Guides ({getContentByCategory('guides').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="p-4 space-y-3 m-0 flex-1 overflow-auto">
          {getContentByCategory('notes').length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No notes saved yet</p>
              <p className="text-sm mt-2">Save helpful AI responses as notes for quick reference</p>
            </div>
          ) : (
            getContentByCategory('notes').map((item) => (
              <SavedContentItem key={item.id} {...item} category={item.category as 'notes' | 'guides'} />
            ))
          )}
        </TabsContent>

        <TabsContent value="guides" className="p-4 space-y-3 m-0 flex-1 overflow-auto">
          {getContentByCategory('guides').length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No guides saved yet</p>
              <p className="text-sm mt-2">Save comprehensive AI responses as guides for future reference</p>
            </div>
          ) : (
            getContentByCategory('guides').map((item) => (
              <SavedContentItem key={item.id} {...item} category={item.category as 'notes' | 'guides'} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedContent;
