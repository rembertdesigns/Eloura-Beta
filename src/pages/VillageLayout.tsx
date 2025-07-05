
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Village from './Village';

const VillageLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <Village />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default VillageLayout;
