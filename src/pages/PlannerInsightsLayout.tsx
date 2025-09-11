
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import MobileHeader from '@/components/MobileHeader';
import PlannerInsights from './PlannerInsights';

const PlannerInsightsLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <MobileHeader />
          <PlannerInsights />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PlannerInsightsLayout;
