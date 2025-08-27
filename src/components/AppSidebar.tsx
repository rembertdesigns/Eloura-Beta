
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
              aria-label={`Navigate to ${item.title}`}
              className={`group flex items-center gap-5 px-4 py-4 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-sidebar active:scale-[0.98] ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 border-l-4 border-primary-foreground/30'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md hover:translate-x-1 hover:shadow-primary/10'
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isActive
                    ? 'bg-primary-foreground/25 ring-2 ring-primary-foreground/40 shadow-lg shadow-primary-foreground/20'
                    : 'bg-sidebar-accent/80 group-hover:bg-primary/15 group-hover:scale-110 group-hover:shadow-md'
                }`}
              >
                <item.icon 
                  className={`h-7 w-7 transition-all duration-300 ${
                    isActive 
                      ? 'text-primary-foreground drop-shadow-sm' 
                      : 'text-sidebar-foreground group-hover:text-primary group-hover:scale-110'
                  }`}
                  strokeWidth={2.5}
                  fill={isActive ? 'currentColor' : 'none'}
                />
              </div>
              {!collapsed && (
                <span className={`text-lg font-bold transition-all duration-300 leading-tight truncate ${
                  isActive ? 'text-primary-foreground drop-shadow-sm' : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
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
      <SidebarContent className="px-3 py-8">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {renderNavItems(mainNavigationItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced Separator with more spacing */}
        <div className="mx-4 my-8 h-px bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-60" />

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {renderNavItems(settingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
