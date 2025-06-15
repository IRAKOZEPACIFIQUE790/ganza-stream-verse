
import { Home, Video, List, Tv } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Sidebar navigation config
const items = [
  {
    title: "Home",
    view: "home",
    icon: Home,
  },
  {
    title: "Movies",
    view: "movies",
    icon: Video,
  },
  {
    title: "TV Shows",
    view: "shows",
    icon: Tv,
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
    <Sidebar className="bg-[#181818] border-none shadow-xl min-h-screen z-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="text-2xl font-bold text-red-600 px-2 tracking-wider">GanZa</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    className={`flex items-center gap-3 px-3 py-2 text-lg ${currentView === item.view ? "text-white font-semibold bg-red-700/20" : "text-gray-400"} hover:text-white`}
                  >
                    <item.icon />
                    <span className="hidden md:inline">{item.title}</span>
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
