
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch, 
  initialValue = '',
  placeholder = 'Search for movies...'
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cinema-subtle" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-cinema-card text-cinema-text border-cinema-card focus:border-cinema-accent"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
