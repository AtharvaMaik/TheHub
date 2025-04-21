
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getUserWatchlists, addMovieToWatchlist } from '@/services/watchlistService';
import { Movie, Watchlist } from '@/types/movie';
import { Loader2, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddToWatchlistDialogProps {
  movie: Movie;
  movieInWatchlists: string[];
  onAddToWatchlist: () => void;
  trigger?: React.ReactNode;
}

const AddToWatchlistDialog: React.FC<AddToWatchlistDialogProps> = ({ 
  movie, 
  movieInWatchlists,
  onAddToWatchlist,
  trigger 
}) => {
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchWatchlists = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const lists = await getUserWatchlists();
        setWatchlists(lists);
      } catch (error) {
        console.error('Error fetching watchlists:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchWatchlists();
    }
  }, [user, open]);

  const handleAddToWatchlist = async (watchlistId: string) => {
    if (!user) {
      toast.error('Please log in to add movies to watchlists');
      return;
    }
    
    if (movieInWatchlists.includes(watchlistId)) {
      toast.info('This movie is already in the selected watchlist');
      return;
    }

    setAdding(prev => ({ ...prev, [watchlistId]: true }));
    
    try {
      const success = await addMovieToWatchlist(watchlistId, movie.imdbID);
      
      if (success) {
        toast.success(`Added "${movie.Title}" to watchlist`);
        onAddToWatchlist();
        movieInWatchlists.push(watchlistId);
      } else {
        toast.error('Failed to add movie to watchlist');
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      toast.error('An error occurred');
    } finally {
      setAdding(prev => ({ ...prev, [watchlistId]: false }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add to Watchlist
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-cinema-card border-cinema-card/30">
        <DialogHeader>
          <DialogTitle className="text-cinema-text">Add to Watchlist</DialogTitle>
          <DialogDescription className="text-cinema-subtle">
            Choose a watchlist to add "{movie.Title}" to:
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[300px] overflow-y-auto py-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 text-cinema-accent animate-spin" />
            </div>
          ) : watchlists.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-cinema-subtle mb-4">You don't have any watchlists yet</p>
              <Button 
                onClick={() => {
                  setOpen(false);
                  window.location.href = '/create-watchlist';
                }}
                className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
              >
                <Plus className="h-4 w-4 mr-1" /> Create Watchlist
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {watchlists.map((watchlist) => {
                const isInWatchlist = movieInWatchlists.includes(watchlist.id);
                return (
                  <div 
                    key={watchlist.id}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-cinema-dark-blue/40 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-cinema-text">{watchlist.name}</h3>
                      {watchlist.description && (
                        <p className="text-xs text-cinema-subtle line-clamp-1">{watchlist.description}</p>
                      )}
                    </div>
                    {isInWatchlist ? (
                      <Button variant="ghost" size="sm" disabled className="text-green-500">
                        <Check className="h-4 w-4 mr-1" /> Added
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToWatchlist(watchlist.id)}
                        disabled={adding[watchlist.id]}
                        className="border-cinema-card/30 text-cinema-text hover:bg-cinema-accent hover:text-cinema-dark-blue"
                      >
                        {adding[watchlist.id] ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="border-cinema-card/30 text-cinema-text"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setOpen(false);
              window.location.href = '/create-watchlist';
            }}
            className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
          >
            <Plus className="h-4 w-4 mr-1" /> New Watchlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWatchlistDialog;
