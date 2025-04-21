
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  return (
    <header className="w-full bg-black/50 backdrop-blur-md border-b border-cinema-card/30 py-4 fixed top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-cinema-text">
            THE HUB
          </Link>
        </div>

        <form onSubmit={handleSearch} className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cinema-subtle" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-cinema-card text-cinema-text border-cinema-card focus:ring-cinema-accent"
            />
          </div>
        </form>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/my-watchlists')}
                className="text-cinema-text hover:text-cinema-accent"
              >
                My Lists
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/create-watchlist')}
                className="text-cinema-text border-cinema-accent hover:bg-cinema-accent hover:text-cinema-dark-blue"
              >
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/profile')}
                className="text-cinema-text hover:text-cinema-accent"
              >
                <User className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-cinema-text hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="text-cinema-text border-cinema-accent hover:bg-cinema-accent hover:text-cinema-dark-blue"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate('/auth?tab=signup')}
                className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                size="sm"
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
