
import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-cinema-dark-blue border-t border-cinema-card py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5 text-cinema-accent" />
              <span className="text-lg font-bold text-cinema-text">THE HUB</span>
            </div>
            <p className="text-cinema-subtle text-sm">
              Elevating movie experiences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-sm">
            <Link to="/" className="text-cinema-text hover:text-cinema-accent">Home</Link>
            <Link to="/browse" className="text-cinema-text hover:text-cinema-accent">Browse</Link>
            <Link to="/popular" className="text-cinema-text hover:text-cinema-accent">Popular</Link>
            <Link to="/about" className="text-cinema-text hover:text-cinema-accent">About</Link>
            <Link to="/privacy" className="text-cinema-text hover:text-cinema-accent">Privacy</Link>
            <Link to="/terms" className="text-cinema-text hover:text-cinema-accent">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-cinema-card text-center text-xs text-cinema-subtle">
          <p>© {new Date().getFullYear()} THE HUB. All rights reserved by the president of the united states, and atharva maikhuri since they both are practically equivalent</p>
          <p className="mt-1">All hail Atharva The Great</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
