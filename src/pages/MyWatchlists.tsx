
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserWatchlists } from '@/services/watchlistService';
import { Watchlist } from '@/types/movie';
import WatchlistCard from '@/components/WatchlistCard';
import { toast } from 'sonner';

const MyWatchlists = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchWatchlists = async () => {
      setLoading(true);
      try {
        const lists = await getUserWatchlists();
        setWatchlists(lists);
      } catch (error) {
        console.error('Error fetching watchlists:', error);
        toast.error('Failed to load your watchlists');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-cinema-text">My Watchlists</h1>
          <Button
            onClick={() => navigate('/create-watchlist')}
            className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Watchlist
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-cinema-accent animate-spin" />
          </div>
        ) : watchlists.length === 0 ? (
          <div className="text-center py-20 bg-cinema-card bg-opacity-30 rounded-lg">
            <h2 className="text-xl font-medium text-cinema-text mb-3">No watchlists yet</h2>
            <p className="text-cinema-subtle mb-6">Create your first watchlist to start collecting movies</p>
            <Button
              onClick={() => navigate('/create-watchlist')}
              className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Watchlist
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlists.map((watchlist) => (
              <WatchlistCard 
                key={watchlist.id} 
                watchlist={watchlist} 
                movieCount={0} // We'll update this later
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyWatchlists;
