import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import MobileHeader from '@/components/MobileHeader';
import Insights from './Insights';

const InsightsLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1">
          <MobileHeader />
          <Insights />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InsightsLayout;