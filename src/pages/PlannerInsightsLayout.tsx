
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import PlannerInsights from './PlannerInsights';
import FeatureFooter from '@/components/FeatureFooter';

const PlannerInsightsLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <SidebarInset>
          <PlannerInsights />
        </SidebarInset>
      </div>
      <div className="lg:hidden">
        <FeatureFooter />
      </div>
    </SidebarProvider>
  );
};

export default PlannerInsightsLayout;
