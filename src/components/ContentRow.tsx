
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  return (
    <div className="ml-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white font-serif">{title}</h2>
        {onSeeAll && (
          <Button
            variant="ghost"
            onClick={onSeeAll}
            className="text-gray-400 hover:text-white flex items-center gap-1 font-serif"
          >
            See All
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-5 overflow-x-auto pb-2 scrollbar-hide">
        {items.map(item => (
          <Card
            key={item.id}
            className="flex-shrink-0 w-48 bg-black/0 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg group"
            style={{ minWidth: '12rem', boxShadow: "0 3px 16px #0009" }}
          >
            <CardContent className="p-0 relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 group-hover:backdrop-blur transition-colors duration-200 flex items-end justify-center opacity-0 group-hover:opacity-100">
                <div className="flex mb-4 space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-white text-black hover:bg-gray-100"
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
                    className="bg-black/40 hover:bg-black/70"
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
                </div>
              </div>
              <div className="p-2 bg-black/70">
                <h3 className="font-semibold text-xs text-white truncate font-serif" title={item.title}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="secondary" className="text-xs">★ {item.rating}</Badge>
                  {item.genre && item.genre.length > 0 && (
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

export default ContentRow;
