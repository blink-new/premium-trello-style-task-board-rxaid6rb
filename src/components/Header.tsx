import React, { useState } from 'react';
import { Bell, Calendar, Filter, Menu, Plus, Search, Settings, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useBoard } from '../context/BoardContext';

interface HeaderProps {
  onMenuClick: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { board } = useBoard();
  
  return (
    <header className={cn(
      'sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}>
      {/* Left side: Menu toggle and title */}
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-xl font-bold text-foreground">
            {board.title}
          </h1>
          <span className="hidden rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary md:inline-block">
            {board.members.length} Members
          </span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="ml-auto flex-1 md:ml-0 md:max-w-sm lg:max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right side: Actions and user */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-600">
          <Calendar className="h-5 w-5" />
          <span className="sr-only">Calendar</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-600">
          <Filter className="h-5 w-5" />
          <span className="sr-only">Filter</span>
        </Button>
        
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Plus className="mr-2 h-4 w-4" />
          <span>New Task</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-600">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
        </Button>

        <Button variant="ghost" size="icon" className="hidden text-slate-500 hover:text-slate-600 sm:flex">
          <Users className="h-5 w-5" />
          <span className="sr-only">Team</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="hidden text-slate-500 hover:text-slate-600 sm:flex">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        
        <div className="ml-2 flex items-center">
          <Avatar className="h-8 w-8 transition-all hover:scale-105">
            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80" alt="User" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;