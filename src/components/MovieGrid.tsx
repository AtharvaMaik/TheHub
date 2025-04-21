
import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';
import { Skeleton } from './ui/skeleton';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  onAddToWatchlist?: (movie: Movie) => void;
  watchlistMovieIds?: string[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading = false, 
  onAddToWatchlist,
  watchlistMovieIds = [] 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="aspect-[2/3] w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-cinema-subtle">
        <p className="text-lg">No movies found</p>
        <p className="text-sm mt-2">Try adjusting your search or check back later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID}
          movie={movie}
          inWatchlist={watchlistMovieIds?.includes(movie.imdbID)}
          onAddToWatchlist={() => onAddToWatchlist?.(movie)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
