
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

const navigationItems = [
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

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-700'
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
