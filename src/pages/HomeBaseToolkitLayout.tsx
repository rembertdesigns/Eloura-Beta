
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import HomeBaseToolkit from './HomeBaseToolkit';
import FeatureFooter from '@/components/FeatureFooter';

const HomeBaseToolkitLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <HomeBaseToolkit />
        </SidebarInset>
      </div>
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </SidebarProvider>
  );
};

export default HomeBaseToolkitLayout;
