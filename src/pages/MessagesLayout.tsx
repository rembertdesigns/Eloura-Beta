
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Messages from './Messages';
import FeatureFooter from '@/components/FeatureFooter';

const MessagesLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <Messages />
        </SidebarInset>
      </div>
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </SidebarProvider>
  );
};

export default MessagesLayout;
