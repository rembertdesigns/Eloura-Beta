
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import MobileHeader from '@/components/MobileHeader';
import SmartCareAssistant from './SmartCareAssistant';

const SmartCareAssistantLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <MobileHeader />
          <SmartCareAssistant />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SmartCareAssistantLayout;
