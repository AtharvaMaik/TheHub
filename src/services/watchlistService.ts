import { supabase } from "@/integrations/supabase/client";
import { Movie, Watchlist, WatchlistMovie } from "@/types/movie";
import { toast } from "sonner";
import { getMovieDetails } from "./movieService";

/**
 * Creates a new watchlist
 */
export const createWatchlist = async (name: string, description: string, isPublic: boolean): Promise<Watchlist | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("Not authenticated");
    
    const { data, error } = await supabase
      .from("watchlists")
      .insert({
        name,
        description,
        is_public: isPublic,
        user_id: user.user.id
      })
      .select()
      .single();

    if (error) throw error;
    
    // Map database fields to our interface fields
    return mapDbWatchlistToInterface(data);
  } catch (error: any) {
    toast.error(`Failed to create watchlist: ${error.message}`);
    console.error("Error creating watchlist:", error);
    return null;
  }
};

/**
 * Fetches all watchlists for the current user
 */
export const getUserWatchlists = async (): Promise<Watchlist[]> => {
  try {
    const { data, error } = await supabase
      .from("watchlists")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    // Map each database record to our interface
    return data ? data.map(watchlist => mapDbWatchlistToInterface(watchlist)) : [];
  } catch (error: any) {
    toast.error(`Failed to fetch watchlists: ${error.message}`);
    console.error("Error fetching watchlists:", error);
    return [];
  }
};

/**
 * Fetches all public watchlists from all users
 */
export const getPublicWatchlists = async (): Promise<Watchlist[]> => {
  try {
    const { data, error } = await supabase
      .from("watchlists")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    // Map each database record to our interface
    return data ? data.map(watchlist => mapDbWatchlistToInterface(watchlist)) : [];
  } catch (error: any) {
    console.error("Error fetching public watchlists:", error);
    return [];
  }
};

/**
 * Fetches a single watchlist by ID
 */
export const getWatchlistById = async (id: string): Promise<Watchlist | null> => {
  try {
    const { data, error } = await supabase
      .from("watchlists")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    
    // Map database fields to our interface fields
    return mapDbWatchlistToInterface(data);
  } catch (error: any) {
    console.error("Error fetching watchlist:", error);
    return null;
  }
};

/**
 * Updates an existing watchlist
 */
export const updateWatchlist = async (id: string, updates: Partial<Watchlist>): Promise<Watchlist | null> => {
  try {
    // Convert interface fields to database fields
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.isPublic !== undefined) dbUpdates.is_public = updates.isPublic;

    const { data, error } = await supabase
      .from("watchlists")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    
    // Map database fields to our interface fields
    return mapDbWatchlistToInterface(data);
  } catch (error: any) {
    toast.error(`Failed to update watchlist: ${error.message}`);
    console.error("Error updating watchlist:", error);
    return null;
  }
};

/**
 * Deletes a watchlist
 */
export const deleteWatchlist = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("watchlists")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete watchlist: ${error.message}`);
    console.error("Error deleting watchlist:", error);
    return false;
  }
};

/**
 * Adds a movie to a watchlist
 */
export const addMovieToWatchlist = async (watchlistId: string, movieId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("watchlist_movies")
      .insert({
        watchlist_id: watchlistId,
        movie_id: movieId,
      });

    if (error) throw error;
    return true;
  } catch (error: any) {
    // Don't show duplicate errors as toasts
    if (!error.message.includes('duplicate key')) {
      toast.error(`Failed to add movie to watchlist: ${error.message}`);
    }
    console.error("Error adding movie to watchlist:", error);
    return false;
  }
};

/**
 * Removes a movie from a watchlist
 */
export const removeMovieFromWatchlist = async (watchlistId: string, movieId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("watchlist_movies")
      .delete()
      .eq("watchlist_id", watchlistId)
      .eq("movie_id", movieId);

    if (error) throw error;
    return true;
  } catch (error: any) {
    toast.error(`Failed to remove movie from watchlist: ${error.message}`);
    console.error("Error removing movie from watchlist:", error);
    return false;
  }
};

/**
 * Gets all movies in a watchlist
 */
export const getWatchlistMovies = async (watchlistId: string): Promise<Movie[]> => {
  try {
    const { data, error } = await supabase
      .from("watchlist_movies")
      .select("movie_id")
      .eq("watchlist_id", watchlistId);

    if (error) throw error;
    
    if (!data || data.length === 0) return [];
    
    // Fetch detailed movie info for each movie ID
    const movies = await Promise.all(
      data.map(async (item) => {
        const movieDetails = await getMovieDetails(item.movie_id);
        return movieDetails;
      })
    );
    
    // Filter out any null movies
    return movies.filter(Boolean) as Movie[];
  } catch (error: any) {
    toast.error(`Failed to fetch watchlist movies: ${error.message}`);
    console.error("Error fetching watchlist movies:", error);
    return [];
  }
};

/**
 * Checks if a movie is in any of the user's watchlists
 */
export const getWatchlistsContainingMovie = async (movieId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("watchlist_movies")
      .select("watchlist_id")
      .eq("movie_id", movieId);

    if (error) throw error;
    
    return data?.map(item => item.watchlist_id) || [];
  } catch (error: any) {
    console.error("Error checking watchlists for movie:", error);
    return [];
  }
};

/**
 * Helper function to map database field names to interface field names
 */
const mapDbWatchlistToInterface = (dbWatchlist: any): Watchlist => {
  return {
    id: dbWatchlist.id,
    name: dbWatchlist.name,
    description: dbWatchlist.description || "",
    isPublic: dbWatchlist.is_public,
    userId: dbWatchlist.user_id,
    createdAt: dbWatchlist.created_at,
    updatedAt: dbWatchlist.updated_at
  };
};
