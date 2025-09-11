
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import MobileHeader from '@/components/MobileHeader';
import Village from './Village';

const VillageLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <MobileHeader />
          <Village />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default VillageLayout;
