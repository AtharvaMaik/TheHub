
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import MovieGrid from '@/components/MovieGrid';
import { searchMovies } from '@/services/movieService';
import { Movie } from '@/types/movie';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { user } = useAuth();
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      try {
        const results = await searchMovies(query);
        setMovies(results);
        
        if (results.length === 0) {
          toast.info(`No movies found for "${query}"`);
        }
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Failed to search movies. Please try again later.');
        toast.error('Failed to search movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold text-cinema-text mb-6">
          {query ? `Search results for "${query}"` : 'Search Movies'}
        </h1>
        
        <div className="mb-6">
          <SearchForm 
            onSearch={handleSearch} 
            initialValue={query}
          />
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="pt-4">
          <MovieGrid 
            movies={movies} 
            loading={loading}
            onAddToWatchlist={(movie) => {
              if (!user) {
                toast.error("Please log in to add movies to your watchlist");
              }
            }}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
