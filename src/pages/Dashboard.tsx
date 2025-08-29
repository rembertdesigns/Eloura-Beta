
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <SidebarInset className="flex-1">
            <Dashboard />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
