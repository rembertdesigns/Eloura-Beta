
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3, Users, MessageSquare, Settings, Brain, FolderOpen } from 'lucide-react';
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
              className={`group flex items-center gap-5 px-5 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg border-l-4 border-primary-foreground/30'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm hover:translate-x-1'
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-foreground/20 ring-2 ring-primary-foreground/30'
                    : 'bg-sidebar-accent group-hover:bg-primary/10 group-hover:scale-110'
                }`}
              >
                <item.icon className={`h-7 w-7 flex-shrink-0 transition-all duration-200 ${
                  isActive ? 'text-primary-foreground' : 'text-sidebar-foreground group-hover:text-primary'
                }`} />
              </div>
              {!collapsed && (
                <span className={`text-base font-semibold transition-all duration-200 ${
                  isActive ? 'text-primary-foreground' : 'text-sidebar-foreground'
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
    <Sidebar className="bg-sidebar border-r border-sidebar-border shadow-xl rounded-r-2xl overflow-hidden">
      <SidebarContent className="px-2 py-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderNavItems(mainNavigationItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator */}
        <div className="mx-4 my-6 h-px bg-sidebar-border" />

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderNavItems(settingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
