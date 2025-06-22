
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Plus, Check } from 'lucide-react';

interface SearchResultsProps {
  results: any[];
  searchQuery: string;
  myList: Set<number>;
  onPlay: (item: any) => void;
  onToggleList: (id: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchQuery,
  myList,
  onPlay,
  onToggleList
}) => {
  if (!searchQuery) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-white mb-4 font-serif">What are you looking for?</h3>
        <p className="text-gray-400 font-serif">Search for movies, TV shows, and more.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 font-serif">No results found for "{searchQuery}"</p>
        <p className="text-gray-500 text-sm mt-2 font-serif">Try searching for different keywords or browse our categories.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6 font-serif">
        Search Results for "{searchQuery}" ({results.length} found)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map(item => (
          <Card 
            key={item.id} 
            className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer group"
          >
            <CardContent className="p-0 relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover rounded-t" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-white text-black hover:bg-gray-200" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(item);
                    }}
                    aria-label={`Play ${item.title}`}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleList(item.id);
                    }}
                    className="bg-black/50 hover:bg-black/70"
                    aria-label={myList.has(item.id) ? `Remove ${item.title} from list` : `Add ${item.title} to list`}
                  >
                    {myList.has(item.id) ? (
                      <Check className="h-4 w-4 text-red-500" />
                    ) : (
                      <Plus className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm truncate font-serif text-white" title={item.title}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">★ {item.rating}</Badge>
                  {item.genre && (
                    <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                      {item.genre[0]}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
