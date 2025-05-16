import React from 'react';
import { 
  BarChart,
  Calendar, 
  CheckSquare, 
  Home, 
  Inbox, 
  LayoutDashboard, 
  List, 
  Settings, 
  StickyNote, 
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { useBoard } from '../context/BoardContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const { board } = useBoard();
  
  return (
    <aside 
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform lg:static',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-heading text-lg font-semibold">TaskFlow</h2>
            <p className="text-xs text-muted-foreground">Premium Task Manager</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-auto p-2">
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="secondary" className="justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Boards
          </Button>
          <Button variant="ghost" className="justify-start">
            <CheckSquare className="mr-2 h-4 w-4" />
            Tasks
          </Button>
          <Button variant="ghost" className="justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="justify-start">
            <BarChart className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button variant="ghost" className="justify-start">
            <Inbox className="mr-2 h-4 w-4" />
            Inbox
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        {/* Boards */}
        <div className="mb-2">
          <h3 className="px-2 text-xs font-medium uppercase text-muted-foreground">
            Recent Boards
          </h3>
        </div>
        
        <div className="flex flex-col gap-1">
          <Button variant="secondary" className="justify-start">
            <StickyNote className="mr-2 h-4 w-4" />
            {board.title}
          </Button>
          <Button variant="ghost" className="justify-start">
            <StickyNote className="mr-2 h-4 w-4" />
            Marketing Campaign
          </Button>
          <Button variant="ghost" className="justify-start">
            <StickyNote className="mr-2 h-4 w-4" />
            Design System
          </Button>
          <Button variant="ghost" className="justify-start">
            <StickyNote className="mr-2 h-4 w-4" />
            Roadmap 2023
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        {/* Team */}
        <div className="mb-2">
          <h3 className="px-2 text-xs font-medium uppercase text-muted-foreground">
            Team
          </h3>
        </div>
        
        <div className="flex flex-col gap-1 px-1 py-2">
          <div className="flex -space-x-2">
            {board.members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            
            {board.members.length > 4 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                +{board.members.length - 4}
              </div>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className="mt-2 justify-start">
            <Users className="mr-2 h-4 w-4" />
            Manage Team
          </Button>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;