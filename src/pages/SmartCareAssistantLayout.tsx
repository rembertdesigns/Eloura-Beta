
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import SmartCareAssistant from './SmartCareAssistant';

const SmartCareAssistantLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <SmartCareAssistant />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SmartCareAssistantLayout;
