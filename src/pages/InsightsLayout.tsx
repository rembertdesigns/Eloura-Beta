import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Insights from './Insights';

const InsightsLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <Insights />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InsightsLayout;