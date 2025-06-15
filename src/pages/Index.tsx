import { useState, useEffect } from 'react';
import { Play, Plus, Info, Search, User, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for content with African/Rwandan imagery
const featuredContent = {
  id: 1,
  title: "Breaking Boundaries",
  description: "A thrilling sci-fi adventure that pushes the limits of human imagination. When a team of scientists discovers a way to travel between parallel dimensions, they must face the consequences of their groundbreaking discovery.",
  backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
  trailer: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
  genre: ["Sci-Fi", "Thriller", "Action"],
  rating: "9.2",
  year: "2024",
  duration: "2h 15m"
};

const contentRows = [
  {
    title: "Trending Now",
    items: [
      { id: 1, title: "Rwandan Warriors", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=450&fit=crop", rating: "8.9", genre: ["Action"] },
      { id: 2, title: "African Horizons", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=300&h=450&fit=crop", rating: "8.5", genre: ["Drama"] },
      { id: 3, title: "Kigali Nights", image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=300&h=450&fit=crop", rating: "9.1", genre: ["Thriller"] },
      { id: 4, title: "Safari Chronicles", image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=450&fit=crop", rating: "8.7", genre: ["Adventure"] },
      { id: 5, title: "Ubuntu Stories", image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=300&h=450&fit=crop", rating: "8.3", genre: ["Drama"] }
    ]
  },
  {
    title: "Action & Adventure",
    items: [
      { id: 6, title: "Virunga Legends", image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=300&h=450&fit=crop", rating: "8.8", genre: ["Action"] },
      { id: 7, title: "East African Quest", image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=450&fit=crop", rating: "8.4", genre: ["Action", "Adventure"] },
      { id: 8, title: "Nile Adventures", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop", rating: "8.6", genre: ["Adventure"] },
      { id: 9, title: "Highland Warriors", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", rating: "9.0", genre: ["Action"] },
      { id: 10, title: "Serengeti Winds", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=300&h=450&fit=crop", rating: "8.2", genre: ["Adventure"] }
    ]
  },
  {
    title: "Drama Series",
    items: [
      { id: 11, title: "Rwandan Heritage", image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=300&h=450&fit=crop", rating: "9.3", genre: ["Drama"] },
      { id: 12, title: "Village Tales", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=450&fit=crop", rating: "8.9", genre: ["Drama"] },
      { id: 13, title: "African Dreams", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop", rating: "8.7", genre: ["Drama"] },
      { id: 14, title: "Golden Savanna", image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=450&fit=crop", rating: "9.1", genre: ["Drama"] },
      { id: 15, title: "Modern Rwanda", image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=300&h=450&fit=crop", rating: "8.5", genre: ["Drama"] }
    ]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [myList, setMyList] = useState(new Set());
  const [currentUser, setCurrentUser] = useState('Profile 1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('');
  const { toast } = useToast();

  const toggleMyList = (contentId) => {
    const newList = new Set(myList);
    if (newList.has(contentId)) {
      newList.delete(contentId);
      toast({
        title: "Removed from My List",
        description: "Content has been removed from your list.",
      });
    } else {
      newList.add(contentId);
      toast({
        title: "Added to My List",
        description: "Content has been added to your list.",
      });
    }
    setMyList(newList);
  };

  const playContent = (content) => {
    setIsPlaying(true);
    toast({
      title: "Playing Now",
      description: `Now playing: ${content.title}`,
    });
    // In a real app, this would navigate to video player
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setSearchQuery('');
    setSelectedGenre('');
    toast({
      title: "Navigation",
      description: `Switched to ${view.charAt(0).toUpperCase() + view.slice(1)}`,
    });
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
    setCurrentView('genre');
    setSearchQuery('');
    toast({
      title: "Genre Filter",
      description: `Showing ${genre} content`,
    });
  };

  const filteredContent = searchQuery 
    ? contentRows.flatMap(row => row.items).filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const myListContent = contentRows.flatMap(row => row.items).filter(item => 
    myList.has(item.id)
  );

  const movieContent = contentRows.flatMap(row => row.items).filter(item => 
    Math.random() > 0.5
  );

  const showContent = contentRows.flatMap(row => row.items).filter(item => 
    !movieContent.includes(item)
  );

  const genreContent = contentRows.flatMap(row => row.items).filter(item => 
    item.genre && item.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
  );

  const getCurrentContent = () => {
    switch (currentView) {
      case 'movies':
        return movieContent;
      case 'shows':
        return showContent;
      case 'mylist':
        return myListContent;
      case 'genre':
        return genreContent;
      default:
        return [];
    }
  };

  const getCurrentTitle = () => {
    switch (currentView) {
      case 'movies':
        return 'Movies';
      case 'shows':
        return 'TV Shows';
      case 'mylist':
        return 'My List';
      case 'genre':
        return `${selectedGenre} Movies & Shows`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold text-red-600 cursor-pointer" onClick={() => handleNavigation('home')}>GanZa</h1>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => handleNavigation('home')}
                className={`hover:text-gray-300 transition-colors ${currentView === 'home' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('movies')}
                className={`hover:text-gray-300 transition-colors ${currentView === 'movies' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                Movies
              </button>
              <button 
                onClick={() => handleNavigation('shows')}
                className={`hover:text-gray-300 transition-colors ${currentView === 'shows' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                TV Shows
              </button>
              <button 
                onClick={() => handleNavigation('mylist')}
                className={`hover:text-gray-300 transition-colors ${currentView === 'mylist' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                My List
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/50 border-gray-700 pl-10 w-64"
              />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
              <User className="h-5 w-5" />
              <span className="hidden md:block">{currentUser}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Search Results */}
      {searchQuery && (
        <div className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredContent.map((item) => (
                  <Card key={item.id} className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <CardContent className="p-0">
                      <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t" />
                      <div className="p-3">
                        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="text-xs">★ {item.rating}</Badge>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => playContent(item)}
                              className="h-6 w-6 p-0"
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => toggleMyList(item.id)}
                              className="h-6 w-6 p-0"
                            >
                              {myList.has(item.id) ? 
                                <Check className="h-3 w-3 text-red-500" /> : 
                                <Plus className="h-3 w-3 text-white" />
                              }
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category View (Movies, Shows, My List, Genre) */}
      {!searchQuery && currentView !== 'home' && (
        <div className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{getCurrentTitle()}</h2>
            {getCurrentContent().length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {getCurrentContent().map((item) => (
                  <Card key={item.id} className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <CardContent className="p-0 relative">
                      <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-white text-black hover:bg-gray-200"
                            onClick={() => playContent(item)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMyList(item.id);
                            }}
                            className="bg-black/50 hover:bg-black/70"
                          >
                            {myList.has(item.id) ? 
                              <Check className="h-4 w-4 text-red-500" /> : 
                              <Plus className="h-4 w-4 text-white" />
                            }
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                        <Badge variant="secondary" className="text-xs mt-2">★ {item.rating}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400">
                  {currentView === 'mylist' ? 'Your list is empty. Add some content to get started!' : 
                   currentView === 'genre' ? `No ${selectedGenre} content available.` :
                   'No content available in this category.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      {!searchQuery && currentView === 'home' && (
        <section className="relative h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredContent.backdrop})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>
          <div className="relative container mx-auto px-4 z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">{featuredContent.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge className="bg-red-600 text-white">★ {featuredContent.rating}</Badge>
                <span className="text-gray-300">{featuredContent.year}</span>
                <span className="text-gray-300">{featuredContent.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredContent.genre.map((genre) => (
                  <Badge 
                    key={genre} 
                    variant="outline" 
                    className="text-white border-gray-500 cursor-pointer hover:bg-red-600 hover:border-red-600 transition-colors"
                    onClick={() => handleGenreFilter(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {featuredContent.description}
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={() => playContent(featuredContent)}
                  disabled={isPlaying}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {isPlaying ? 'Playing...' : 'Play'}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-gray-600 hover:bg-gray-700">
                      <Info className="mr-2 h-5 w-5" />
                      More Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{featuredContent.title}</DialogTitle>
                      <DialogDescription>
                        <img src={featuredContent.trailer} alt={featuredContent.title} className="w-full h-64 object-cover rounded mb-4" />
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge className="bg-red-600 text-white">★ {featuredContent.rating}</Badge>
                          <span>{featuredContent.year}</span>
                          <span>{featuredContent.duration}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{featuredContent.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredContent.genre.map((genre) => (
                            <Badge key={genre} variant="outline" className="text-white border-gray-500">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => playContent(featuredContent)}
                            className="bg-white text-black hover:bg-gray-200"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Play
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => toggleMyList(featuredContent.id)}
                          >
                            {myList.has(featuredContent.id) ? 
                              <Check className="mr-2 h-4 w-4 text-red-500" /> : 
                              <Plus className="mr-2 h-4 w-4 text-white" />
                            }
                            My List
                          </Button>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  onClick={() => toggleMyList(featuredContent.id)}
                  className="border border-gray-600 hover:bg-gray-800"
                >
                  {myList.has(featuredContent.id) ? 
                    <Check className="mr-2 h-5 w-5 text-red-500" /> : 
                    <Plus className="mr-2 h-5 w-5 text-white" />
                  }
                  My List
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      {!searchQuery && currentView === 'home' && (
        <section className="py-16 space-y-12">
          {contentRows.map((row, rowIndex) => (
            <div key={rowIndex} className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">{row.title}</h2>
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {row.items.map((item) => (
                  <Card 
                    key={item.id} 
                    className="flex-shrink-0 w-48 bg-gray-900 border-gray-800 hover:scale-105 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
                  >
                    <CardContent className="p-0 relative">
                      <img src={item.image} alt={item.title} className="w-full h-72 object-cover rounded-t" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-white text-black hover:bg-gray-200"
                            onClick={() => playContent(item)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMyList(item.id);
                            }}
                            className="bg-black/50 hover:bg-black/70"
                          >
                            {myList.has(item.id) ? 
                              <Check className="h-4 w-4 text-red-500" /> : 
                              <Plus className="h-4 w-4 text-white" />
                            }
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                        <Badge variant="secondary" className="text-xs mt-2">★ {item.rating}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-red-600 mb-4">GanZa</h3>
              <p className="text-gray-400 text-sm">Your premium streaming destination for African content</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <button 
                  onClick={() => handleNavigation('movies')} 
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Movies
                </button>
                <button 
                  onClick={() => handleNavigation('shows')} 
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  TV Shows
                </button>
                <button 
                  onClick={() => handleGenreFilter('Action')} 
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Action & Adventure
                </button>
                <button 
                  onClick={() => handleGenreFilter('Drama')} 
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Drama Series
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <button className="block hover:text-white transition-colors cursor-pointer">
                  Manage Profiles
                </button>
                <button className="block hover:text-white transition-colors cursor-pointer">
                  Account Settings
                </button>
                <button 
                  onClick={() => {
                    toast({
                      title: "Help Center",
                      description: "Opening help resources...",
                    });
                  }}
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Help Center
                </button>
                <button 
                  onClick={() => {
                    toast({
                      title: "Sign Out",
                      description: "Signing out of your account...",
                    });
                  }}
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <button className="block hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
                <button className="block hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
                <button 
                  onClick={() => {
                    toast({
                      title: "Contact Us",
                      description: "Call us at +250796011540",
                    });
                  }}
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us: +250796011540
                </button>
                <button className="block hover:text-white transition-colors cursor-pointer">
                  About GanZa
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 GanZa by Pacifique. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Index;
