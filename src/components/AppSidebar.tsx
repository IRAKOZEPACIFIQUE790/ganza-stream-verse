
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
    <Sidebar className="bg-black border-none shadow-2xl min-h-screen w-16 px-0 py-4 flex items-center">
      <SidebarContent className="flex flex-col items-center w-full h-full gap-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full flex">
                  <SidebarMenuButton
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    className={`relative flex flex-col items-center gap-1 w-full py-3 group
                      ${currentView === item.view ? "text-red-600 font-semibold" : "text-gray-400"}
                    `}
                  >
                    {/* Active Indicator */}
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 
                        h-6 w-1 rounded-r-lg bg-red-600 transition-all
                        ${currentView === item.view ? "opacity-100" : "opacity-0"}
                      `}
                    />
                    <item.icon size={26} />
                    <span className="text-xs font-semibold hidden transition-all">
                      {item.title}
                    </span>
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
