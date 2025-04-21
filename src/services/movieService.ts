
import { Movie, MovieDetailResponse, MovieSearchResponse } from "@/types/movie";

// Replace with valid API key
// Free OMDB API key for development purposes
const OMDB_API_KEY = "58e91598";

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
    );
    const data: MovieSearchResponse = await response.json();
    
    if (data.Response === "True") {
      return data.Search;
    } else {
      console.error("Movie search failed:", data);
      return [];
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (imdbId: string): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${OMDB_API_KEY}`
    );
    const data: MovieDetailResponse = await response.json();
    
    if (data.Response === "True") {
      return data;
    } else {
      console.error("Movie details fetch failed:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

