import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3, Users, MessageSquare, Settings, Brain, FolderOpen, TrendingUp } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

const mainNavigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Daily Brief',
    url: '/daily-brief',
    icon: Calendar,
  },
  {
    title: 'Planner',
    url: '/planner-insights',
    icon: BarChart3,
  },
  {
    title: 'Insights',
    url: '/insights',
    icon: TrendingUp,
  },
  {
    title: 'Village',
    url: '/village',
    icon: Users,
  },
  {
    title: 'Messages',
    url: '/messages',
    icon: MessageSquare,
  },
  {
    title: 'Smart Care Assistant',
    url: '/smart-care-assistant',
    icon: Brain,
  },
  {
    title: 'Home Base Toolkit',
    url: '/home-base-toolkit',
    icon: FolderOpen,
  },
];

const settingsItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const renderNavItems = (items: typeof mainNavigationItems) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              aria-label={`Navigate to ${item.title}`}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#223B0A] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon 
                className={`h-5 w-5 flex-shrink-0 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-500'
                }`}
                strokeWidth={1.5}
              />
              {!collapsed && (
                <span className={`text-sm font-medium ${
                  isActive ? 'text-white' : 'text-gray-700'
                }`}>
                  {item.title}
                </span>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar className="bg-white border-r border-gray-200 shadow-sm">
      <SidebarContent className="px-4 py-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderNavItems(mainNavigationItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer to push settings to bottom */}
        <div className="flex-1" />

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 mt-8">
              {renderNavItems(settingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}