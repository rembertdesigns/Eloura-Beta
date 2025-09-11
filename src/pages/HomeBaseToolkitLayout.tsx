
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import MobileHeader from '@/components/MobileHeader';
import HomeBaseToolkit from './HomeBaseToolkit';

const HomeBaseToolkitLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <MobileHeader />
          <HomeBaseToolkit />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default HomeBaseToolkitLayout;
