
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-light text-slate-800">
              Eloura
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              Features
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              How It Works
            </Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-slate-800"
              onClick={() => navigate('/invite')}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-slate-800 hidden md:flex"
              onClick={handleAuthAction}
            >
              {user ? 'Sign Out' : 'Log In'}
            </Button>
            {!user && (
              <Button 
                className="bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-full"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden text-slate-600">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
