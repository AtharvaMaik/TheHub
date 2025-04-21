
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Plot?: string;
  imdbRating?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetailResponse extends Movie {
  Response: string;
}

export interface Watchlist {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WatchlistMovie {
  id: string;
  watchlistId: string;
  movieId: string;
  addedAt: string;
  movie: Movie;
}
