
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import DailyBrief from './DailyBrief';

const DailyBriefLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <DailyBrief />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DailyBriefLayout;
