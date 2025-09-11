import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, BarChart3, Users, MessageSquare, Settings, Brain, FolderOpen, TrendingUp, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Daily Brief', url: '/daily-brief', icon: Calendar },
  { title: 'Planner', url: '/planner-insights', icon: BarChart3 },
  { title: 'Insights', url: '/insights', icon: TrendingUp },
  { title: 'Village', url: '/village', icon: Users },
  { title: 'Messages', url: '/messages', icon: MessageSquare },
  { title: 'Smart Care Assistant', url: '/smart-care-assistant', icon: Brain },
  { title: 'Home Base Toolkit', url: '/home-base-toolkit', icon: FolderOpen },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { toast } = useToast();

  // Show on mobile and tablet (hide only on desktop lg+ breakpoint)
  // Use window width directly to include tablets up to 1024px
  const [showMobileHeader, setShowMobileHeader] = React.useState(false);
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      setShowMobileHeader(window.innerWidth < 1024); // Show on screens smaller than lg (1024px)
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!showMobileHeader) return null;

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/auth');
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNavClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          {/* Logo or brand can go here */}
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-auto min-w-0 hover:bg-accent"
              aria-label="Open navigation menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent 
            side="right" 
            className="w-80 sm:w-96 p-0"
          >
            <div className="flex flex-col h-full">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Navigation</h2>
              </div>
              
              <nav className="flex-1 px-3">
                <div className="space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <button
                        key={item.title}
                        onClick={() => handleNavClick(item.url)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors min-h-[48px] ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors min-h-[48px] text-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MobileHeader;