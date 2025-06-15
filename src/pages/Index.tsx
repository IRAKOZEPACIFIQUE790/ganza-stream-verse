import { useState, useEffect } from 'react';
import { Play, Plus, Info, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for content
const featuredContent = {
  id: 1,
  title: "Breaking Boundaries",
  description: "A thrilling sci-fi adventure that pushes the limits of human imagination. When a team of scientists discovers a way to travel between parallel dimensions, they must face the consequences of their groundbreaking discovery.",
  backdrop: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop",
  trailer: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=400&fit=crop",
  genre: ["Sci-Fi", "Thriller", "Action"],
  rating: "9.2",
  year: "2024",
  duration: "2h 15m"
};

const contentRows = [
  {
    title: "Trending Now",
    items: [
      { id: 1, title: "Space Odyssey", image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop", rating: "8.9" },
      { id: 2, title: "Ocean Deep", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: "8.5" },
      { id: 3, title: "City Lights", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=450&fit=crop", rating: "9.1" },
      { id: 4, title: "Forest Tales", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=450&fit=crop", rating: "8.7" },
      { id: 5, title: "Desert Storm", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=450&fit=crop", rating: "8.3" }
    ]
  },
  {
    title: "Action & Adventure",
    items: [
      { id: 6, title: "Thunder Strike", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", rating: "8.8" },
      { id: 7, title: "Mountain Peak", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: "8.4" },
      { id: 8, title: "River Run", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=450&fit=crop", rating: "8.6" },
      { id: 9, title: "Sky High", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: "9.0" },
      { id: 10, title: "Wind Walker", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=450&fit=crop", rating: "8.2" }
    ]
  },
  {
    title: "Drama Series",
    items: [
      { id: 11, title: "Midnight Stories", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=450&fit=crop", rating: "9.3" },
      { id: 12, title: "Garden Path", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=450&fit=crop", rating: "8.9" },
      { id: 13, title: "Blue Horizon", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: "8.7" },
      { id: 14, title: "Golden Hour", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=450&fit=crop", rating: "9.1" },
      { id: 15, title: "Silver Screen", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", rating: "8.5" }
    ]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [myList, setMyList] = useState(new Set());
  const [currentUser, setCurrentUser] = useState('Profile 1');

  const toggleMyList = (contentId) => {
    const newList = new Set(myList);
    if (newList.has(contentId)) {
      newList.delete(contentId);
    } else {
      newList.add(contentId);
    }
    setMyList(newList);
  };

  const filteredContent = searchQuery 
    ? contentRows.flatMap(row => row.items).filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold text-red-600">GanZa</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Movies</a>
              <a href="#" className="hover:text-gray-300 transition-colors">TV Shows</a>
              <a href="#" className="hover:text-gray-300 transition-colors">My List</a>
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredContent.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t" />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="text-xs">★ {item.rating}</Badge>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => toggleMyList(item.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className={`h-3 w-3 ${myList.has(item.id) ? 'text-red-500' : 'text-white'}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {!searchQuery && (
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
                  <Badge key={genre} variant="outline" className="text-white border-gray-500">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {featuredContent.description}
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  <Play className="mr-2 h-5 w-5" />
                  Play
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
                        <div className="flex flex-wrap gap-2">
                          {featuredContent.genre.map((genre) => (
                            <Badge key={genre} variant="outline" className="text-white border-gray-500">
                              {genre}
                            </Badge>
                          ))}
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
                  <Plus className={`mr-2 h-5 w-5 ${myList.has(featuredContent.id) ? 'text-red-500' : 'text-white'}`} />
                  My List
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      {!searchQuery && (
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
                          <Button size="sm" className="bg-white text-black hover:bg-gray-200">
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
                            <Plus className={`h-4 w-4 ${myList.has(item.id) ? 'text-red-500' : 'text-white'}`} />
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
              <p className="text-gray-400 text-sm">Your premium streaming destination</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Movies</p>
                <p>TV Shows</p>
                <p>Originals</p>
                <p>New Releases</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Manage Profiles</p>
                <p>Account Settings</p>
                <p>Help Center</p>
                <p>Sign Out</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Contact Us</p>
                <p>About GanZa</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 GanZa. All rights reserved.</p>
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
