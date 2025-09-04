import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, X } from 'lucide-react';
import { useToolkitItems, type ToolkitItem } from '@/hooks/useToolkitItems';

interface AddItemModalProps {
  category: 'childcare' | 'eldercare' | 'emergency' | 'meals';
}

const AddItemModal: React.FC<AddItemModalProps> = ({ category }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [itemType, setItemType] = useState<ToolkitItem['item_type']>('notes');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addItem, uploadFile } = useToolkitItems();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Upload files first
      const attachments = [];
      for (const file of files) {
        const uploadedFile = await uploadFile(file);
        if (uploadedFile) {
          attachments.push(uploadedFile);
        }
      }

      await addItem({
        title: title.trim(),
        content: content.trim() || undefined,
        item_type: itemType,
        category,
        attachments,
        shared_with: [],
        visibility: 'private'
      });

      // Reset form
      setTitle('');
      setContent('');
      setItemType('notes');
      setFiles([]);
      setOpen(false);
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-3 w-3 mr-1" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Content, instructions, or notes..."
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <Select value={itemType} onValueChange={(value: ToolkitItem['item_type']) => setItemType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="checklist">Checklist</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="contacts">Contacts</SelectItem>
                <SelectItem value="recipe">Recipe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-3 w-3 mr-1" />
                  Upload Files
                </label>
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600 truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!title.trim() || isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Item'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;