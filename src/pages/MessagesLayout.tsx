
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Messages from './Messages';

const MessagesLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <Messages />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MessagesLayout;
