
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, UserPlus, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
    setMobileMenuOpen(false);
  };

  const navigationLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer touch-manipulation" 
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          >
            <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-2 rounded-xl shadow-sm">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-light text-slate-800">
              Eloura
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Button 
                key={link.label}
                variant="ghost" 
                className="text-slate-600 hover:text-slate-800 transition-colors min-h-[44px] px-4"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </Button>
            ))}
            {user && (
              <Button 
                variant="ghost" 
                className="text-slate-600 hover:text-slate-800 min-h-[44px] px-4"
                onClick={() => {
                  navigate('/invite');
                  setMobileMenuOpen(false);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Team
              </Button>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-slate-800 min-h-[44px] px-4"
              onClick={handleAuthAction}
            >
              {user ? 'Sign Out' : 'Log In'}
            </Button>
            {!user && (
              <Button 
                className="bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-full min-h-[44px] px-6 shadow-sm touch-manipulation"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-slate-600 min-h-[44px] min-w-[44px] touch-manipulation" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/20 py-4 px-2">
            <div className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Button 
                  key={link.label}
                  variant="ghost" 
                  className="justify-start text-slate-600 hover:text-slate-800 min-h-[48px] px-4 w-full text-left"
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </Button>
              ))}
              {user && (
                <Button 
                  variant="ghost" 
                  className="justify-start text-slate-600 hover:text-slate-800 min-h-[48px] px-4 w-full text-left"
                  onClick={() => {
                    navigate('/invite');
                    setMobileMenuOpen(false);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Team
                </Button>
              )}
              <div className="pt-2 border-t border-slate-200/20 flex flex-col space-y-2">
                <Button 
                  variant="ghost" 
                  className="justify-start text-slate-600 hover:text-slate-800 min-h-[48px] px-4 w-full text-left"
                  onClick={handleAuthAction}
                >
                  {user ? 'Sign Out' : 'Log In'}
                </Button>
                {!user && (
                  <Button 
                    className="bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-full min-h-[48px] mx-4 touch-manipulation"
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
