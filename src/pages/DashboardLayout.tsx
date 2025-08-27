
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Dashboard from '@/components/Dashboard';
import FeatureFooter from '@/components/FeatureFooter';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1">
          <Dashboard />
        </SidebarInset>
      </div>
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
