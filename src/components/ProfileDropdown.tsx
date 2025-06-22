
import React from 'react';
import { User, Settings, History, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface ProfileDropdownProps {
  currentUser: string;
  onProfileSwitch: (profile: string) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ currentUser, onProfileSwitch }) => {
  const { toast } = useToast();

  const profiles = [
    { name: 'Profile 1', avatar: 'P1', color: 'bg-red-600' },
    { name: 'Profile 2', avatar: 'P2', color: 'bg-blue-600' },
    { name: 'Profile 3', avatar: 'P3', color: 'bg-green-600' },
  ];

  const handleProfileSwitch = (profile: string) => {
    onProfileSwitch(profile);
    toast({
      title: "Profile Switched",
      description: `Switched to ${profile}`
    });
  };

  const handleMenuAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality coming soon...`
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={currentUser} />
            <AvatarFallback className="bg-red-600 text-white text-sm">
              {currentUser.charAt(currentUser.length - 1)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block font-serif">{currentUser}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-gray-900 border-gray-800" align="end">
        <DropdownMenuLabel className="font-serif text-white">Switch Profiles</DropdownMenuLabel>
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.name}
            onClick={() => handleProfileSwitch(profile.name)}
            className="flex items-center gap-2 text-white hover:bg-gray-800 cursor-pointer"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className={`${profile.color} text-white text-xs`}>
                {profile.avatar}
              </AvatarFallback>
            </Avatar>
            <span className="font-serif">{profile.name}</span>
            {profile.name === currentUser && <span className="ml-auto text-red-500 text-xs">Current</span>}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="bg-gray-800" />
        
        <DropdownMenuItem
          onClick={() => handleMenuAction('Account Settings')}
          className="flex items-center gap-2 text-white hover:bg-gray-800 cursor-pointer"
        >
          <Settings className="h-4 w-4" />
          <span className="font-serif">Account Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleMenuAction('Watch History')}
          className="flex items-center gap-2 text-white hover:bg-gray-800 cursor-pointer"
        >
          <History className="h-4 w-4" />
          <span className="font-serif">Watch History</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-800" />
        
        <DropdownMenuItem
          onClick={() => handleMenuAction('Sign Out')}
          className="flex items-center gap-2 text-red-400 hover:bg-gray-800 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-serif">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
