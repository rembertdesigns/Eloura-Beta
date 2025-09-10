
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, BarChart3, Users, MessageSquare, Settings, Brain, FolderOpen, TrendingUp, LogOut } from 'lucide-react';
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
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const collapsed = state === 'collapsed';

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderNavItems = (items: typeof mainNavigationItems) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              aria-label={`Navigate to ${item.title}`}
              className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-sidebar active:scale-[0.98] ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 border-l-4 border-primary-foreground/30'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md hover:translate-x-1 hover:shadow-primary/10'
              }`}
            >
              <item.icon 
                className={`h-5 w-5 transition-all duration-300 flex-shrink-0 ${
                  isActive 
                    ? 'text-primary-foreground drop-shadow-sm' 
                    : 'text-sidebar-foreground group-hover:text-primary'
                }`}
                strokeWidth={2}
              />
              {!collapsed && (
                <span className={`text-sm font-medium transition-all duration-300 leading-tight ${
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

        {/* Enhanced Separator */}
        <div className="mx-4 my-8 h-px bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-60" />

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:ring-offset-2 focus:ring-offset-sidebar active:scale-[0.98] text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive hover:shadow-md hover:translate-x-1 hover:shadow-destructive/10 w-full"
                  >
                    <LogOut 
                      className="h-5 w-5 transition-all duration-300 flex-shrink-0 text-sidebar-foreground group-hover:text-destructive"
                      strokeWidth={2}
                    />
                    {!collapsed && (
                      <span className="text-sm font-medium transition-all duration-300 leading-tight text-sidebar-foreground group-hover:text-destructive">
                        Logout
                      </span>
                    )}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
