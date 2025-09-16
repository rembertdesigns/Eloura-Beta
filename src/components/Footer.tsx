
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#223b0a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-xl">
                <Heart className="h-6 w-6 text-[#223b0a]" />
              </div>
              <span className="text-2xl font-light">
                Eloura
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              The first real operating system for family care—of every generation.
            </p>
            <button className="bg-white hover:bg-gray-100 text-[#223b0a] font-medium px-4 py-2 rounded">
              JOIN WAITLIST
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4 border-b border-white/30 pb-2">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Our Features</li>
              <li>Support Options</li>
              <li>Blog</li>
              <li>FAQ</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4 border-b border-white/30 pb-2">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Daily Brief</li>
              <li>Village Support</li>
              <li>Smart Care Assistant</li>
              <li>Quick Planner & Insights</li>
              <li>Home Base Toolkit</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4 border-b border-white/30 pb-2">
              <a 
                href="https://forms.gle/3m5w5APDfsRCgGsP9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#a8e6ff] transition-colors"
              >
                Contact Us
              </a>
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#a8e6ff]" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#a8e6ff]" />
                <span>info@eloura.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-[#a8e6ff] shrink-0" />
                <span>123 Care Lane, Suite 100<br />Supportville, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Eloura. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#a8e6ff]">Privacy Policy</a>
            <a href="#" className="hover:text-[#a8e6ff]">Terms of Service</a>
            <a href="#" className="hover:text-[#a8e6ff]">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
