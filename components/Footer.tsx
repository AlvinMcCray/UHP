
import React from 'react';
import { Youtube, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="mb-10 md:mb-0">
            <h4 className="text-2xl font-black uppercase mb-6 tracking-tight">Under Human Power</h4>
            <p className="text-neutral-500 max-w-sm">
              Documenting the intersection of technology, human endurance, and the systems we build to push beyond the possible.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Explore</h5>
              <ul className="space-y-2 text-neutral-500 text-sm">
                <li className="hover:text-yellow-500 cursor-pointer">Live Tracker</li>
                <li className="hover:text-yellow-500 cursor-pointer">The Gear</li>
                <li className="hover:text-yellow-500 cursor-pointer">Journal</li>
                <li className="hover:text-yellow-500 cursor-pointer">Manifesto</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Connect</h5>
              <ul className="space-y-2 text-neutral-500 text-sm">
                <li className="hover:text-yellow-500 cursor-pointer">Newsletter</li>
                <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
                <li className="hover:text-yellow-500 cursor-pointer">Press Kit</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-yellow-500 hover:text-black transition-all">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-yellow-500 hover:text-black transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-yellow-500 hover:text-black transition-all">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} UNDER HUMAN POWER. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
