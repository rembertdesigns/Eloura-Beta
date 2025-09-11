
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Dashboard from '@/components/Dashboard';
import MobileHeader from '@/components/MobileHeader';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1">
          <MobileHeader />
          <Dashboard />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
