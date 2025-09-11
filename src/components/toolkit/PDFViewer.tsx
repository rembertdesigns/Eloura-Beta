import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText } from 'lucide-react';

interface PDFViewerProps {
  fileUrl: string;
  fileName: string;
  trigger?: React.ReactNode;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, fileName, trigger }) => {
  const [open, setOpen] = useState(false);

  const isPDF = fileName.toLowerCase().endsWith('.pdf');

  const handleViewPDF = () => {
    if (isPDF) {
      setOpen(true);
    } else {
      // For non-PDF files, open in new tab
      window.open(fileUrl, '_blank');
    }
  };

  const openInNewTab = () => {
    window.open(fileUrl, '_blank');
  };

  if (!isPDF) {
    // For non-PDF files, just return a clickable link
    return (
      <div onClick={handleViewPDF} className="cursor-pointer">
        {trigger || (
          <div className="flex items-center gap-1 hover:underline">
            <FileText className="h-3 w-3" />
            <span>{fileName}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div onClick={handleViewPDF} className="cursor-pointer">
        {trigger || (
          <div className="flex items-center gap-1 hover:underline">
            <FileText className="h-3 w-3" />
            <span>{fileName}</span>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {fileName}
              </DialogTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={openInNewTab}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Open in new tab
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 min-h-0">
            <iframe
              src={fileUrl}
              className="w-full h-full border rounded"
              title={fileName}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PDFViewer;