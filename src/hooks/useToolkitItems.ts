import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type ToolkitItemRow = Database['public']['Tables']['toolkit_items']['Row'];
type ToolkitItemInsert = Database['public']['Tables']['toolkit_items']['Insert'];
type ToolkitItemUpdate = Database['public']['Tables']['toolkit_items']['Update'];

export interface ToolkitItem {
  id: string;
  user_id: string;
  title: string;
  content?: string | null;
  item_type: 'routine' | 'document' | 'checklist' | 'notes' | 'contacts' | 'recipe';
  category: 'childcare' | 'eldercare' | 'emergency' | 'meals';
  attachments: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  shared_with: string[];
  visibility: 'private' | 'shared' | 'public';
  created_at: string;
  updated_at: string;
}

export const useToolkitItems = (category?: string) => {
  const { user } = useAuth();
  const [items, setItems] = useState<ToolkitItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('toolkit_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      const transformedItems = (data || []).map(item => ({
        ...item,
        attachments: Array.isArray(item.attachments) ? item.attachments as Array<{name: string; url: string; type: string}> : [],
        item_type: item.item_type as ToolkitItem['item_type'],
        category: item.category as ToolkitItem['category'],
        visibility: item.visibility as ToolkitItem['visibility']
      }));
      
      setItems(transformedItems);
    } catch (error) {
      console.error('Error fetching toolkit items:', error);
      toast.error('Failed to load toolkit items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData: Omit<ToolkitItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('toolkit_items')
        .insert([{
          ...itemData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      const transformedItem = {
        ...data,
        attachments: Array.isArray(data.attachments) ? data.attachments as Array<{name: string; url: string; type: string}> : [],
        item_type: data.item_type as ToolkitItem['item_type'],
        category: data.category as ToolkitItem['category'],
        visibility: data.visibility as ToolkitItem['visibility']
      };
      
      setItems(prev => [transformedItem, ...prev]);
      toast.success('Item added successfully');
      return data;
    } catch (error) {
      console.error('Error adding toolkit item:', error);
      toast.error('Failed to add item');
      throw error;
    }
  };

  const updateItem = async (id: string, updates: Partial<ToolkitItem>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('toolkit_items')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      const transformedItem = {
        ...data,
        attachments: Array.isArray(data.attachments) ? data.attachments as Array<{name: string; url: string; type: string}> : [],
        item_type: data.item_type as ToolkitItem['item_type'],
        category: data.category as ToolkitItem['category'],
        visibility: data.visibility as ToolkitItem['visibility']
      };
      
      setItems(prev => prev.map(item => item.id === id ? transformedItem : item));
      toast.success('Item updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating toolkit item:', error);
      toast.error('Failed to update item');
      throw error;
    }
  };

  const deleteItem = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('toolkit_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting toolkit item:', error);
      toast.error('Failed to delete item');
      throw error;
    }
  };

  const uploadFile = async (file: File, itemId?: string) => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('toolkit-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('toolkit-files')
        .getPublicUrl(fileName);

      return {
        name: file.name,
        url: urlData.publicUrl,
        type: file.type,
        path: fileName
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      throw error;
    }
  };

  useEffect(() => {
    fetchItems();

    // Set up real-time subscription
    const subscription = supabase
      .channel('toolkit_items_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'toolkit_items',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchItems(); // Refetch items when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, category]);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    uploadFile,
    refetch: fetchItems
  };
};