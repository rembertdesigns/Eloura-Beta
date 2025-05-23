
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <div className="bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-light text-slate-800">
              Eloura
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 md:mb-0">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Features</h4>
              <ul className="space-y-2 text-slate-600">
                <li>Daily Brief</li>
                <li>Village Support</li>
                <li>Smart Care Assistant</li>
                <li>Planner & Insights</li>
                <li>Home Base Toolkit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Company</h4>
              <ul className="space-y-2 text-slate-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Connect</h4>
              <ul className="space-y-2 text-slate-600">
                <li>Contact</li>
                <li>Support</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500">
          <p>© {new Date().getFullYear()} Eloura. The first real operating system for family care—of every generation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
