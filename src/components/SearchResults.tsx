
import React, { useState } from 'react';
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
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());

  const handleImageError = (itemId: number) => {
    setFailedImages(prev => new Set(prev).add(itemId));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleImageLoad = (itemId: number) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleImageLoadStart = (itemId: number) => {
    setLoadingImages(prev => new Set(prev).add(itemId));
  };

  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=300&h=450&fit=crop";
  };

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
              <div className="relative w-full h-64">
                {loadingImages.has(item.id) && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center rounded-t">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
                <img 
                  src={failedImages.has(item.id) ? getFallbackImage() : item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-t"
                  onError={() => handleImageError(item.id)}
                  onLoad={() => handleImageLoad(item.id)}
                  onLoadStart={() => handleImageLoadStart(item.id)}
                />
                {failedImages.has(item.id) && (
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Fallback Image
                  </div>
                )}
              </div>
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
