
import React, { useState, useEffect } from 'react';
import { Watchlist } from '@/types/movie';
import { getPublicWatchlists } from '@/services/watchlistService';
import WatchlistCard from './WatchlistCard';
import { Skeleton } from './ui/skeleton';

const PublicWatchlistsGrid = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicWatchlists = async () => {
      setLoading(true);
      try {
        const publicLists = await getPublicWatchlists();
        setWatchlists(publicLists);
      } catch (error) {
        console.error('Error fetching public watchlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicWatchlists();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-48">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (watchlists.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-cinema-subtle">No public watchlists available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {watchlists.map((watchlist) => (
        <WatchlistCard 
          key={watchlist.id} 
          watchlist={watchlist} 
          movieCount={0} // We don't have the count here, so we'll default to 0
        />
      ))}
    </div>
  );
};

export default PublicWatchlistsGrid;
