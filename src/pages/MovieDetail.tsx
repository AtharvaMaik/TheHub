
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMovieDetails } from '@/services/movieService';
import { Movie } from '@/types/movie';
import { Star, Clock, User, Tag, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import AddToWatchlistDialog from '@/components/AddToWatchlistDialog';
import { getWatchlistsContainingMovie } from '@/services/watchlistService';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [movieInWatchlists, setMovieInWatchlists] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        toast.error('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const checkWatchlists = async () => {
      if (user && id) {
        try {
          const watchlistIds = await getWatchlistsContainingMovie(id);
          setMovieInWatchlists(watchlistIds);
        } catch (error) {
          console.error("Error checking watchlists:", error);
        }
      }
    };
    
    checkWatchlists();
  }, [user, id]);

  const handleAddToWatchlist = () => {
    if (!user) {
      toast.error("Please log in to add movies to your watchlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster Skeleton */}
            <div className="lg:w-1/3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            </div>
            
            {/* Details Skeleton */}
            <div className="lg:w-2/3">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              
              <div className="space-y-4 mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-cinema-text mb-4">Movie Not Found</h1>
          <p className="text-cinema-subtle mb-8">
            We couldn't find the movie you're looking for.
          </p>
          <Link to="/browse">
            <Button className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90">
              Browse Movies
            </Button>
          </Link>
        </main>
        
        <Footer />
      </div>
    );
  }

  const placeholderImage = "https://placehold.co/600x900/1E293B/E2E8F0?text=No+Image";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Movie Banner/Hero */}
        <div 
          className="w-full h-60 md:h-80 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${movie?.Poster !== "N/A" ? movie?.Poster : placeholderImage})`,
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark-blue via-cinema-dark-blue/80 to-transparent">
            <div className="container max-w-7xl mx-auto px-4 h-full flex items-end pb-8">
              <Link to="/search" className="absolute top-4 left-4 md:top-6 md:left-6">
                <Button variant="outline" size="sm" className="bg-cinema-dark-blue bg-opacity-60 text-cinema-text hover:bg-cinema-accent hover:text-cinema-dark-blue">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Movie Content */}
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="lg:w-1/3 flex-shrink-0">
              <Card className="overflow-hidden">
                <img
                  src={movie?.Poster !== "N/A" ? movie?.Poster : placeholderImage}
                  alt={movie?.Title}
                  className="w-full h-auto object-cover"
                />
              </Card>
              
              <div className="mt-4 flex gap-2">
                {user ? (
                  <AddToWatchlistDialog
                    movie={movie as Movie}
                    movieInWatchlists={movieInWatchlists}
                    onAddToWatchlist={() => {}}
                    trigger={
                      <Button 
                        className="w-full bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                      >
                        <Plus className="h-4 w-4 mr-1" /> 
                        {movieInWatchlists.length > 0 ? 'Edit Watchlists' : 'Add to Watchlist'}
                      </Button>
                    }
                  />
                ) : (
                  <Button 
                    className="w-full bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                    onClick={handleAddToWatchlist}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add to Watchlist
                  </Button>
                )}
              </div>
            </div>
            
            {/* Details */}
            <div className="lg:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold text-cinema-text mb-2">
                {movie?.Title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <span className="text-cinema-subtle">{movie?.Year}</span>
                {movie?.Runtime && movie?.Runtime !== "N/A" && (
                  <div className="flex items-center text-cinema-subtle">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{movie?.Runtime}</span>
                  </div>
                )}
                {movie?.imdbRating && movie?.imdbRating !== "N/A" && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{movie?.imdbRating}/10</span>
                  </div>
                )}
              </div>
              
              {movie?.Genre && movie?.Genre !== "N/A" && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.Genre.split(',').map((genre, index) => (
                    <Badge key={index} className="bg-cinema-card text-cinema-text">
                      {genre.trim()}
                    </Badge>
                  ))}
                </div>
              )}
              
              {movie?.Plot && movie?.Plot !== "N/A" && (
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-cinema-text mb-2">Synopsis</h2>
                  <p className="text-cinema-subtle">{movie?.Plot}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie?.Director && movie?.Director !== "N/A" && (
                  <div>
                    <h3 className="text-sm font-medium text-cinema-text mb-1 flex items-center">
                      <User className="h-4 w-4 mr-1" /> Director
                    </h3>
                    <p className="text-cinema-subtle">{movie?.Director}</p>
                  </div>
                )}
                
                {movie?.Actors && movie?.Actors !== "N/A" && (
                  <div>
                    <h3 className="text-sm font-medium text-cinema-text mb-1 flex items-center">
                      <User className="h-4 w-4 mr-1" /> Cast
                    </h3>
                    <p className="text-cinema-subtle">{movie?.Actors}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetail;
