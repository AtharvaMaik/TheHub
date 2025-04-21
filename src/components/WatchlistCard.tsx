
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, List, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Watchlist } from '@/types/movie';

interface WatchlistCardProps {
  watchlist: Watchlist;
  movieCount: number;
  username?: string;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ watchlist, movieCount, username }) => {
  return (
    <Link to={`/watchlist/${watchlist.id}`}>
      <Card className="h-full bg-cinema-card hover:border-cinema-accent transition-all duration-300 hover:shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-cinema-text line-clamp-1">
              {watchlist.name}
            </CardTitle>
            <Badge variant="outline" className="bg-cinema-dark-blue text-xs">
              {watchlist.isPublic ? 'Public' : 'Private'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-cinema-subtle text-sm line-clamp-2 mb-4 h-10">
            {watchlist.description || "No description"}
          </p>
          <div className="flex flex-wrap gap-2 items-center text-xs text-cinema-subtle mt-auto">
            <div className="flex items-center gap-1">
              <List className="h-3 w-3" />
              <span>{movieCount} movies</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(watchlist.updatedAt).toLocaleDateString()}</span>
            </div>
            {username && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{username}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-cinema-dark-blue bg-opacity-40 py-2 px-4">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-cinema-subtle">
              {new Date(watchlist.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center text-cinema-accent text-xs font-medium">
              <Eye className="h-3 w-3 mr-1" /> View
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default WatchlistCard;
