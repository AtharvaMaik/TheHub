
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Eye, Plus, Star } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getWatchlistsContainingMovie } from '@/services/watchlistService';
import AddToWatchlistDialog from './AddToWatchlistDialog';

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist?: () => void;
  inWatchlist?: boolean;
}

const MovieCard = ({ movie, onAddToWatchlist, inWatchlist = false }: MovieCardProps) => {
  const placeholderImage = "https://placehold.co/300x450/1E293B/E2E8F0?text=No+Image";
  const { user } = useAuth();
  const [movieInWatchlists, setMovieInWatchlists] = useState<string[]>([]);
  
  useEffect(() => {
    const checkWatchlists = async () => {
      if (user && movie.imdbID) {
        try {
          const watchlistIds = await getWatchlistsContainingMovie(movie.imdbID);
          setMovieInWatchlists(watchlistIds);
        } catch (error) {
          console.error("Error checking watchlists:", error);
        }
      }
    };
    
    checkWatchlists();
  }, [user, movie.imdbID]);

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToWatchlist) {
      onAddToWatchlist();
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <Card className="movie-card bg-cinema-card overflow-hidden h-full hover:shadow-lg transition-all duration-300 group">
        <div className="relative aspect-[2/3] w-full">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage} 
            alt={movie.Title}
            className="object-cover w-full h-full" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            {movie.imdbRating && (
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <span className="text-sm font-medium text-white">{movie.imdbRating}</span>
              </div>
            )}
            
            <div className="flex gap-2 mt-auto">
              {user ? (
                <AddToWatchlistDialog
                  movie={movie}
                  movieInWatchlists={movieInWatchlists}
                  onAddToWatchlist={onAddToWatchlist || (() => {})}
                  trigger={
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full gap-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                      onClick={handleAddToWatchlist}
                    >
                      {inWatchlist || movieInWatchlists.length > 0 ? (
                        <>
                          <Eye className="h-3 w-3" /> In List
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" /> Add
                        </>
                      )}
                    </Button>
                  }
                />
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full gap-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  onClick={handleAddToWatchlist}
                >
                  <Plus className="h-3 w-3" /> Add
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-cinema-text line-clamp-1">{movie.Title}</h3>
          <p className="text-xs text-cinema-subtle">{movie.Year}</p>
        </div>
      </Card>
    </Link>
  );
};

export default MovieCard;
