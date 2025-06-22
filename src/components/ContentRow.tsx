
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, Plus, Check, ChevronRight } from 'lucide-react';

interface ContentRowProps {
  title: string;
  items: any[];
  myList: Set<number>;
  onPlay: (item: any) => void;
  onToggleList: (id: number) => void;
  onSeeAll?: () => void;
}

const ContentRow: React.FC<ContentRowProps> = ({
  title,
  items,
  myList,
  onPlay,
  onToggleList,
  onSeeAll
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

  return (
    <TooltipProvider>
      <div className="ml-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white font-serif">{title}</h2>
          {onSeeAll && (
            <Button
              variant="ghost"
              onClick={onSeeAll}
              className="text-gray-400 hover:text-white hover:scale-105 flex items-center gap-1 font-serif transition-all duration-200"
            >
              See All
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          )}
        </div>
        <div className="flex space-x-5 overflow-x-auto pb-2 scrollbar-hide">
          {items.map(item => (
            <Card
              key={item.id}
              className="flex-shrink-0 w-48 bg-black/0 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/30 cursor-pointer group hover:z-10 relative"
              style={{ minWidth: '12rem' }}
            >
              <CardContent className="p-0 relative overflow-hidden">
                <div className="relative w-full h-72">
                  {loadingImages.has(item.id) && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  <img 
                    src={failedImages.has(item.id) ? getFallbackImage() : item.image}
                    alt={item.title}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                  <div className="flex mb-6 space-x-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-white text-black hover:bg-gray-100 hover:scale-110 transition-all duration-200 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlay(item);
                          }}
                          aria-label={`Play ${item.title}`}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Play {item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="bg-black/40 hover:bg-black/80 hover:scale-110 transition-all duration-200 shadow-lg"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            onToggleList(item.id); 
                          }}
                          aria-label={myList.has(item.id) ? `Remove ${item.title} from list` : `Add ${item.title} to list`}
                        >
                          {myList.has(item.id) ? (
                            <Check className="h-4 w-4 text-red-600" />
                          ) : (
                            <Plus className="h-4 w-4 text-white" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{myList.has(item.id) ? 'Remove from My List' : 'Add to My List'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="p-2 bg-gradient-to-t from-black via-black/80 to-transparent group-hover:from-gray-900 transition-colors duration-300">
                  <h3 className="font-semibold text-xs text-white truncate font-serif group-hover:text-red-400 transition-colors duration-300" title={item.title}>
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="text-xs hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 cursor-help">
                          ★ {item.rating}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rating: {item.rating}/10</p>
                      </TooltipContent>
                    </Tooltip>
                    {item.genre && item.genre.length > 0 && (
                      <Badge variant="outline" className="text-xs text-gray-400 border-gray-600 hover:border-red-500/50 hover:text-red-400 transition-colors duration-200">
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
    </TooltipProvider>
  );
};

export default ContentRow;
