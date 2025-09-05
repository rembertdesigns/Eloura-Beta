import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type SavedContentItem = Tables<'saved_content'>;

export const useSavedContent = () => {
  const [savedContent, setSavedContent] = useState<SavedContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load saved content
  const loadSavedContent = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('saved_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedContent((data as SavedContentItem[]) || []);
    } catch (error) {
      console.error('Error loading saved content:', error);
      toast({
        title: "Error",
        description: "Failed to load saved content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Save content
  const saveContent = async (title: string, content: string, category: 'notes' | 'guides') => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('saved_content')
        .insert({
          user_id: user.id,
          title,
          content,
          category
        })
        .select()
        .single();

      if (error) throw error;

      setSavedContent(prev => [data as SavedContentItem, ...prev]);
      
      toast({
        title: "Success",
        description: `Content saved to ${category}`,
      });

      return true;
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete saved content
  const deleteSavedContent = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_content')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedContent(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Success",
        description: "Content deleted",
      });

      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update saved content
  const updateSavedContent = async (id: string, updates: Partial<Pick<SavedContentItem, 'title' | 'content'>>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('saved_content')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setSavedContent(prev => prev.map(item => 
        item.id === id ? { ...item, ...(data as SavedContentItem) } : item
      ));

      toast({
        title: "Success",
        description: "Content updated",
      });

      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
      return false;
    }
  };

  // Filter content by category
  const getContentByCategory = (category: 'notes' | 'guides') => {
    return savedContent.filter(item => item.category === category);
  };

  // Load content on mount and when user changes
  useEffect(() => {
    loadSavedContent();
  }, [user]);

  // Set up real-time subscription for saved content
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('saved_content')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'saved_content',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newItem = payload.new as SavedContentItem;
          setSavedContent(current => {
            // Avoid duplicates
            if (current.some(item => item.id === newItem.id)) {
              return current;
            }
            return [newItem, ...current];
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'saved_content',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const updatedItem = payload.new as SavedContentItem;
          setSavedContent(current => 
            current.map(item => 
              item.id === updatedItem.id ? updatedItem : item
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'saved_content',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const deletedItem = payload.old as SavedContentItem;
          setSavedContent(current => 
            current.filter(item => item.id !== deletedItem.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    savedContent,
    loading,
    saveContent,
    deleteSavedContent,
    updateSavedContent,
    getContentByCategory,
    loadSavedContent
  };
};