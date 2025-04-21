
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Globe, Lock, Trash, Edit, Loader2, 
  Share2, AlertTriangle 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getWatchlistById, 
  getWatchlistMovies, 
  deleteWatchlist 
} from '@/services/watchlistService';
import { Watchlist, Movie } from '@/types/movie';
import MovieGrid from '@/components/MovieGrid';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const WatchlistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [watchlist, setWatchlist] = useState<Watchlist | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const watchlistData = await getWatchlistById(id);
        
        if (!watchlistData) {
          toast.error('Watchlist not found');
          navigate('/my-watchlists');
          return;
        }
        
        setWatchlist(watchlistData);
        setIsOwner(user?.id === watchlistData.userId);
        
        const moviesData = await getWatchlistMovies(id);
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        toast.error('Failed to load watchlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, [id, user, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    
    setDeleting(true);
    try {
      const success = await deleteWatchlist(id);
      if (success) {
        toast.success('Watchlist deleted successfully');
        navigate('/my-watchlists');
      } else {
        toast.error('Failed to delete watchlist');
      }
    } catch (error) {
      console.error('Error deleting watchlist:', error);
      toast.error('An error occurred while deleting the watchlist');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container max-w-7xl mx-auto px-4 py-8 mt-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-cinema-accent animate-spin mx-auto mb-4" />
            <p className="text-cinema-text">Loading watchlist...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!watchlist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container max-w-7xl mx-auto px-4 py-8 mt-16 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-cinema-text mb-2">Watchlist Not Found</h1>
            <p className="text-cinema-subtle mb-6">The watchlist you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button
              onClick={() => navigate('/my-watchlists')}
              className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
            >
              Go to My Watchlists
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="mb-2">
          <Button 
            variant="ghost" 
            className="text-cinema-text"
            onClick={() => navigate('/my-watchlists')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Watchlists
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-cinema-text">{watchlist.name}</h1>
              {watchlist.isPublic ? (
                <Globe className="h-4 w-4 text-cinema-accent" />
              ) : (
                <Lock className="h-4 w-4 text-cinema-subtle" />
              )}
            </div>
            {watchlist.description && (
              <p className="text-cinema-subtle">{watchlist.description}</p>
            )}
          </div>

          {isOwner && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-cinema-card/30 text-cinema-text"
                onClick={() => navigate(`/edit-watchlist/${watchlist.id}`)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="outline"
                className="border-cinema-card/30 text-cinema-text"
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                  >
                    <Trash className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-cinema-card border-cinema-card/30">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-cinema-text">Delete Watchlist</AlertDialogTitle>
                    <AlertDialogDescription className="text-cinema-subtle">
                      Are you sure you want to delete this watchlist? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent text-cinema-text border-cinema-card/30 hover:bg-cinema-card/80">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <div className="pt-4">
          {movies.length === 0 ? (
            <div className="text-center py-20 bg-cinema-card bg-opacity-30 rounded-lg">
              <h2 className="text-xl font-medium text-cinema-text mb-3">No movies in this watchlist yet</h2>
              <p className="text-cinema-subtle mb-6">Search for movies to add them to this list</p>
              <Button
                onClick={() => navigate('/search')}
                className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
              >
                Search Movies
              </Button>
            </div>
          ) : (
            <MovieGrid 
              movies={movies} 
              onAddToWatchlist={(movie) => {
                toast.error("Already in this watchlist");
              }}
              watchlistMovieIds={movies.map(movie => movie.imdbID)}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WatchlistDetail;
