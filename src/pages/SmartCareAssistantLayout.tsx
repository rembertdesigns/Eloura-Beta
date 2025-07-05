
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import SmartCareAssistant from './SmartCareAssistant';
import FeatureFooter from '@/components/FeatureFooter';

const SmartCareAssistantLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <SmartCareAssistant />
        </SidebarInset>
      </div>
      <div className="md:hidden">
        <FeatureFooter />
      </div>
    </SidebarProvider>
  );
};

export default SmartCareAssistantLayout;
