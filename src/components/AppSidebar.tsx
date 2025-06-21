
import { Home, Video, List, Tv, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Search",
    view: "search",
    icon: Search,
  },
  {
    title: "Home",
    view: "home",
    icon: Home,
  },
  {
    title: "TV Shows",
    view: "shows",
    icon: Tv,
  },
  {
    title: "Movies",
    view: "movies",
    icon: Video,
  },
  {
    title: "My List",
    view: "mylist",
    icon: List,
  }
];

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar className="bg-black border-none min-h-screen w-16" collapsible="icon">
      <SidebarContent className="flex flex-col items-center w-full pt-8 pb-4">
        <SidebarGroup className="w-full">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <SidebarMenuButton
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    className={`relative flex flex-col items-center justify-center w-12 h-12 mx-auto rounded-lg transition-all duration-200 group hover:bg-gray-800/50
                      ${currentView === item.view ? "text-white bg-gray-800/30" : "text-gray-400 hover:text-white"}
                    `}
                  >
                    {/* Active indicator - red dot on the left */}
                    {currentView === item.view && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-r"></span>
                    )}
                    <item.icon size={24} className="mb-0" />
                    <span className="sr-only">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
