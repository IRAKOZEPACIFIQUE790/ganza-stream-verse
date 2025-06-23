
import { useState } from 'react';
import { Menu, X, Home, Search, Video, Tv, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileMenuProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { title: "Home", view: "home", icon: Home },
  { title: "Search", view: "search", icon: Search },
  { title: "Movies", view: "movies", icon: Video },
  { title: "TV Shows", view: "shows", icon: Tv },
  { title: "My List", view: "mylist", icon: List },
];

export default function MobileMenu({ currentView, onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-black border-gray-800 w-64">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-red-600 font-serif">GanZa</h2>
            </div>
            <nav className="flex-1">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => handleNavigate(item.view)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentView === item.view
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-serif">{item.title}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
