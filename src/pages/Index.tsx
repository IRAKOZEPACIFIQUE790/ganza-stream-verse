import { useState, useEffect } from 'react';
import { Play, Plus, Info, Search, User, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// Mock data for content with African/Rwandan imagery
const featuredContent = {
  id: 1,
  title: "Heritage of the Hills",
  description: "Experience the breathtaking beauty and rich cultural tapestry of Rwanda through this captivating documentary series. Journey through the land of a thousand hills as we explore ancient traditions, modern innovations, and the inspiring stories of resilience that define the heart of Africa. From the bustling streets of Kigali to the serene landscapes of Volcanoes National Park, discover the untold stories that celebrate the spirit of unity and progress.",
  backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
  trailer: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
  genre: ["Documentary", "Culture", "Nature"],
  rating: "9.4",
  year: "2024",
  duration: "3h 45m",
  heroImages: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&h=300&fit=crop"]
};
const contentRows = [{
  title: "Trending Now",
  items: [{
    id: 1,
    title: "Rwandan Warriors",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=450&fit=crop",
    rating: "8.9",
    genre: ["Action"]
  }, {
    id: 2,
    title: "African Horizons",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=300&h=450&fit=crop",
    rating: "8.5",
    genre: ["Drama"]
  }, {
    id: 3,
    title: "Kigali Nights",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=300&h=450&fit=crop",
    rating: "9.1",
    genre: ["Thriller"]
  }, {
    id: 4,
    title: "Safari Chronicles",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=450&fit=crop",
    rating: "8.7",
    genre: ["Adventure"]
  }, {
    id: 5,
    title: "Ubuntu Stories",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=300&h=450&fit=crop",
    rating: "8.3",
    genre: ["Drama"]
  }]
}, {
  title: "Action & Adventure",
  items: [{
    id: 6,
    title: "Virunga Legends",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=300&h=450&fit=crop",
    rating: "8.8",
    genre: ["Action"]
  }, {
    id: 7,
    title: "East African Quest",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=450&fit=crop",
    rating: "8.4",
    genre: ["Action", "Adventure"]
  }, {
    id: 8,
    title: "Nile Adventures",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop",
    rating: "8.6",
    genre: ["Adventure"]
  }, {
    id: 9,
    title: "Highland Warriors",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    rating: "9.0",
    genre: ["Action"]
  }, {
    id: 10,
    title: "Serengeti Winds",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=300&h=450&fit=crop",
    rating: "8.2",
    genre: ["Adventure"]
  }]
}, {
  title: "Drama Series",
  items: [{
    id: 11,
    title: "Rwandan Heritage",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=300&h=450&fit=crop",
    rating: "9.3",
    genre: ["Drama"]
  }, {
    id: 12,
    title: "Village Tales",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=450&fit=crop",
    rating: "8.9",
    genre: ["Drama"]
  }, {
    id: 13,
    title: "African Dreams",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop",
    rating: "8.7",
    genre: ["Drama"]
  }, {
    id: 14,
    title: "Golden Savanna",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=450&fit=crop",
    rating: "9.1",
    genre: ["Drama"]
  }, {
    id: 15,
    title: "Modern Rwanda",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=300&h=450&fit=crop",
    rating: "8.5",
    genre: ["Drama"]
  }]
}];
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [myList, setMyList] = useState(new Set());
  const [currentUser, setCurrentUser] = useState('Profile 1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('');
  const {
    toast
  } = useToast();
  const toggleMyList = contentId => {
    const newList = new Set(myList);
    if (newList.has(contentId)) {
      newList.delete(contentId);
      toast({
        title: "Removed from My List",
        description: "Content has been removed from your list."
      });
    } else {
      newList.add(contentId);
      toast({
        title: "Added to My List",
        description: "Content has been added to your list."
      });
    }
    setMyList(newList);
  };
  const playContent = content => {
    setIsPlaying(true);
    toast({
      title: "Playing Now",
      description: `Now playing: ${content.title}`
    });
    // In a real app, this would navigate to video player
    setTimeout(() => setIsPlaying(false), 3000);
  };
  // Move handleNavigation out so it can be used in sidebar
  const handleNavigation = (view) => {
    setCurrentView(view);
    setSearchQuery('');
    setSelectedGenre('');
    toast({
      title: "Navigation",
      description: `Switched to ${view.charAt(0).toUpperCase() + view.slice(1)}`
    });
  };
  const handleGenreFilter = genre => {
    setSelectedGenre(genre);
    setCurrentView('genre');
    setSearchQuery('');
    toast({
      title: "Genre Filter",
      description: `Showing ${genre} content`
    });
  };
  const filteredContent = searchQuery ? contentRows.flatMap(row => row.items).filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())) : [];
  const myListContent = contentRows.flatMap(row => row.items).filter(item => myList.has(item.id));
  const movieContent = contentRows.flatMap(row => row.items).filter(item => Math.random() > 0.5);
  const showContent = contentRows.flatMap(row => row.items).filter(item => !movieContent.includes(item));
  const genreContent = contentRows.flatMap(row => row.items).filter(item => item.genre && item.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase()));
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black">
        {/* Sidebar */}
        <AppSidebar currentView={currentView} onNavigate={handleNavigation} />
        
        {/* Main content area. Hide sidebar space on mobile */}
        <main className="flex-1 flex flex-col min-h-screen ml-0 md:ml-0">
          {/* Hero & search goes here */}
          
          {/* Search at the top right above hero */}
          <div className="flex justify-end pr-8 pt-8">
            <div className="relative w-full max-w-md ml-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search titles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-black/70 border-gray-700 pl-10 w-full rounded-full text-base"
              />
            </div>
          </div>

          {/* Modern Hero Banner */}
          {!searchQuery && currentView === "home" && (
            <section className="relative flex flex-col justify-between min-h-[55vh] md:min-h-[55vh] xl:min-h-[480px] px-8 pt-2 pb-8">
              {/* Background image and overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-20000 ease-out rounded-2xl overflow-hidden"
                style={{
                  backgroundImage: `url(${featuredContent.backdrop})`,
                  filter: "brightness(0.65)"
                }}
              ></div>

              {/* Floating photos */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {featuredContent.heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute opacity-25 blur-md hover:opacity-60 hover:blur-0 transition-all duration-1000 
                      ${index === 0 ? "top-10 right-24 w-32 h-24" :
                        index === 1 ? "top-36 right-64 w-28 h-20" :
                        index === 2 ? "bottom-28 right-56 w-28 h-24" :
                        "bottom-12 right-96 w-36 h-24"}`}
                    style={{
                      animation: "float 6s ease-in-out infinite",
                      animationDelay: `${index * 0.4}s`
                    }}
                  >
                    <img
                      src={image}
                      alt={`Hero img ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-2xl border border-white/10"
                    />
                  </div>
                ))}
              </div>

              {/* Hero Info */}
              <div className="relative z-20 flex flex-col md:flex-row items-start md:items-end md:gap-8 gap-6 h-full">
                <div className="flex flex-col gap-3 max-w-xl md:max-w-2xl xl:max-w-3xl mt-8 ml-1">
                  {/* Badges row */}
                  <div className="flex items-center space-x-4 mb-1 animate-fade-in">
                    <Badge className="bg-red-600 text-white text-lg px-4 py-2 font-semibold shadow-lg">
                      ⭐ {featuredContent.rating}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 font-semibold shadow-lg animate-pulse">
                      🏆 #1 Trending
                    </Badge>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl hero-text-shadow bg-gradient-to-r from-white via-gray-100 to-red-100 bg-clip-text text-transparent leading-tight font-light animate-fade-in animate-delay-100">
                    {featuredContent.title}
                  </h1>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-5 mb-1 animate-fade-in animate-delay-200">
                    <span className="text-gray-300 text-lg font-medium">{featuredContent.year}</span>
                    <span className="text-gray-300 text-lg font-medium">{featuredContent.duration}</span>
                    <span className="text-green-400 font-semibold">4K Ultra HD</span>
                  </div>
                  {/* Genre tags */}
                  <div className="flex flex-wrap gap-3 mb-1 animate-fade-in animate-delay-300">
                    {featuredContent.genre.map(genre => (
                      <Badge
                        key={genre}
                        variant="outline"
                        className="border-2 border-gray-400 hover:border-red-500 hover:bg-red-600/20 cursor-pointer transition-all duration-300 text-base px-4 py-2 font-medium backdrop-blur-sm bg-black/30"
                        onClick={() => handleGenreFilter(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  {/* Description */}
                  <p className="text-base md:text-xl text-gray-200 font-light animate-fade-in animate-delay-300 backdrop-blur-sm rounded-lg border border-white/10">
                    {featuredContent.description}
                  </p>
                  {/* Action buttons */}
                  <div className="flex items-center gap-4 mt-4">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold shadow-2xl" onClick={() => playContent(featuredContent)} disabled={isPlaying}>
                      <Play className="mr-4 h-7 w-7" fill="currentColor" />
                      {isPlaying ? "Playing..." : "Watch Now"}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg" variant="secondary" className="bg-gray-800/80 hover:bg-gray-700/80 text-xl px-8 py-4 h-auto font-bold backdrop-blur-sm border border-gray-600 hover:border-gray-500">
                          <Info className="mr-4 h-7 w-7" />
                          More Info
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{featuredContent.title}</DialogTitle>
                          <DialogDescription>
                            <img src={featuredContent.trailer} alt={featuredContent.title} className="w-full h-64 object-cover rounded mb-4" />
                            {/* ... keep existing code (modal content) the same ... */}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Button size="lg" variant="ghost" onClick={() => toggleMyList(featuredContent.id)} className="border-2 border-gray-600 hover:border-red-500 hover:bg-red-600/20 text-xl px-8 py-4 h-auto font-bold backdrop-blur-sm bg-black/30">
                      {myList.has(featuredContent.id) ? <Check className="mr-4 h-7 w-7 text-red-500" /> : <Plus className="mr-4 h-7 w-7 text-white" />}
                      My List
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Content rows (use original sections, but now indented/flexed beside sidebar) */}
          {!searchQuery && currentView === 'home' && <section className="py-16 space-y-12">
              {contentRows.map((row, rowIndex) => <div key={rowIndex} className="container mx-auto px-4">
                  <h2 className="text-2xl font-bold mb-6">{row.title}</h2>
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {row.items.map(item => <Card key={item.id} className="flex-shrink-0 w-48 bg-gray-900 border-gray-800 hover:scale-105 hover:bg-gray-800 transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-0 relative">
                          <img src={item.image} alt={item.title} className="w-full h-72 object-cover rounded-t" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-white text-black hover:bg-gray-200" onClick={() => playContent(item)}>
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={e => {
                        e.stopPropagation();
                        toggleMyList(item.id);
                      }} className="bg-black/50 hover:bg-black/70">
                                {myList.has(item.id) ? <Check className="h-4 w-4 text-red-500" /> : <Plus className="h-4 w-4 text-white" />}
                              </Button>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                            <Badge variant="secondary" className="text-xs mt-2">★ {item.rating}</Badge>
                          </div>
                        </CardContent>
                      </Card>)}
                  </div>
                </div>)}
            </section>}

          {/* Search Results */}
          {searchQuery && <div className="pt-24 pb-8">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
                {filteredContent.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredContent.map(item => <Card key={item.id} className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <CardContent className="p-0">
                          <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t" />
                          <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="secondary" className="text-xs">★ {item.rating}</Badge>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost" onClick={() => playContent(item)} className="h-6 w-6 p-0">
                                  <Play className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => toggleMyList(item.id)} className="h-6 w-6 p-0">
                                  {myList.has(item.id) ? <Check className="h-3 w-3 text-red-500" /> : <Plus className="h-3 w-3 text-white" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>)}
                  </div> : <div className="text-center py-16">
                    <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  </div>}
              </div>
            </div>}

          {/* Category View (Movies, Shows, My List, Genre) */}
          {!searchQuery && currentView !== 'home' && <div className="pt-24 pb-8">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">{getCurrentTitle()}</h2>
                {getCurrentContent().length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {getCurrentContent().map(item => <Card key={item.id} className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                        <CardContent className="p-0 relative">
                          <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-white text-black hover:bg-gray-200" onClick={() => playContent(item)}>
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={e => {
                        e.stopPropagation();
                        toggleMyList(item.id);
                      }} className="bg-black/50 hover:bg-black/70">
                                {myList.has(item.id) ? <Check className="h-4 w-4 text-red-500" /> : <Plus className="h-4 w-4 text-white" />}
                              </Button>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                            <Badge variant="secondary" className="text-xs mt-2">★ {item.rating}</Badge>
                          </div>
                        </CardContent>
                      </Card>)}
                  </div> : <div className="text-center py-16">
                    <p className="text-gray-400">
                      {currentView === 'mylist' ? 'Your list is empty. Add some content to get started!' : currentView === 'genre' ? `No ${selectedGenre} content available.` : 'No content available in this category.'}
                    </p>
                  </div>}
              </div>
            </div>}

          {/* Footer */}
          <footer className="bg-gray-900 py-12 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-red-600 mb-4 text-xl">GanZa</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Your premier destination for authentic African storytelling and premium entertainment content.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Browse</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <button onClick={() => handleNavigation('movies')} className="block hover:text-white transition-colors cursor-pointer">
                      Movies
                    </button>
                    <button onClick={() => handleNavigation('shows')} className="block hover:text-white transition-colors cursor-pointer">
                      TV Shows
                    </button>
                    <button onClick={() => handleGenreFilter('Action')} className="block hover:text-white transition-colors cursor-pointer">
                      Action & Adventure
                    </button>
                    <button onClick={() => handleGenreFilter('Drama')} className="block hover:text-white transition-colors cursor-pointer">
                      Drama Series
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Account</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <button onClick={() => {
                    toast({
                      title: "Manage Profiles",
                      description: "Profile management coming soon..."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Manage Profiles
                    </button>
                    <button onClick={() => {
                    toast({
                      title: "Account Settings",
                      description: "Opening account settings..."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Account Settings
                    </button>
                    <button onClick={() => {
                    toast({
                      title: "Help Center",
                      description: "Opening help resources..."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Help Center
                    </button>
                    <button onClick={() => {
                    toast({
                      title: "Sign Out",
                      description: "Signing out of your account..."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Sign Out
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Legal & Support</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <button onClick={() => {
                    toast({
                      title: "Privacy Policy",
                      description: "We protect your data with industry-standard encryption and never share personal information without consent."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Privacy Policy
                    </button>
                    <button onClick={() => {
                    toast({
                      title: "Terms of Service",
                      description: "By using GanZa, you agree to our fair use policy and content guidelines for respectful streaming."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Terms of Service
                    </button>
                    <button onClick={() => {
                    toast({
                      title: "About GanZa",
                      description: "GanZa celebrates African cinema and culture, bringing authentic stories from Rwanda and across the continent to global audiences."
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      About GanZa
                    </button>
                    <button onClick={() => {
                    toast({
                      title: "Contact Us",
                      description: "Call us at +250796011540 or email support@ganza.rw"
                    });
                  }} className="block hover:text-white transition-colors cursor-pointer">
                      Contact: +250796011540
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; 2024 GanZa by Pacifique. All rights reserved. | Celebrating African Stories Worldwide</p>
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
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(12deg); }
              50% { transform: translateY(-20px) rotate(12deg); }
            }
            
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            
            .animate-delay-100 {
              animation-delay: 0.5s;
            }
            
            .animate-delay-200 {
              animation-delay: 1s;
            }
            
            .animate-delay-300 {
              animation-delay: 1.5s;
            }
          `}</style>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
