import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Link as LinkIcon, 
  MessageSquare, 
  MoreHorizontal, 
  Paperclip 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Task } from '../types';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  className?: string;
}

export function TaskCard({ task, onClick, className }: TaskCardProps) {
  // Calculate checklist completion percentage
  const getChecklistCompletion = () => {
    if (!task.checklists || task.checklists.length === 0) return null;
    
    const totalItems = task.checklists.reduce((acc, list) => acc + list.items.length, 0);
    const completedItems = task.checklists.reduce(
      (acc, list) => acc + list.items.filter(item => item.completed).length, 
      0
    );
    
    const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    return { completed: completedItems, total: totalItems, percentage };
  };

  const checklistData = getChecklistCompletion();
  
  // Format due date
  const formattedDueDate = task.dueDate 
    ? format(new Date(task.dueDate), 'MMM d')
    : null;
  
  // Define priority colors
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'urgent': return 'bg-red-500/10 text-red-600';
      case 'high': return 'bg-coral-500/10 text-coral-600';
      case 'medium': return 'bg-amber-500/10 text-amber-600';
      case 'low': return 'bg-emerald-500/10 text-emerald-600';
      default: return 'bg-slate-500/10 text-slate-600';
    }
  };
  
  return (
    <div 
      className={cn(
        'group relative flex flex-col rounded-lg border bg-card p-4 shadow-sm card-shadow card-shadow-hover',
        'transition-all hover:cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Card Header */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-medium text-sm text-card-foreground line-clamp-2">{task.title}</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            // Handle menu click
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Options</span>
        </Button>
      </div>
      
      {/* Priority Badge */}
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge variant="outline" className={cn('text-xs font-medium', getPriorityColor())}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Badge>
        
        {/* Tags */}
        {task.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {task.tags.length > 2 && (
          <Badge variant="secondary" className="text-xs">
            +{task.tags.length - 2}
          </Badge>
        )}
      </div>
      
      {/* Task Description */}
      {task.description && (
        <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}
      
      {/* Checklist Progress */}
      {checklistData && (
        <div className="mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>
              {checklistData.completed}/{checklistData.total} completed
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div 
              className="h-full rounded-full bg-primary transition-all" 
              style={{ width: `${checklistData.percentage}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Card Footer */}
      <div className="mt-auto flex items-center justify-between pt-2">
        {/* Left side: Due date and attachments */}
        <div className="flex gap-3">
          {formattedDueDate && (
            <div className="flex items-center gap-1 text-xs">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className={cn(
                'text-muted-foreground',
                new Date(task.dueDate!) < new Date() && 'text-destructive'
              )}>
                {formattedDueDate}
              </span>
            </div>
          )}
          
          {task.attachments && task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Paperclip className="h-3.5 w-3.5" />
              <span>{task.attachments.length}</span>
            </div>
          )}
          
          {task.comments && task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>
        
        {/* Right side: Assignee */}
        {task.assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
            <AvatarFallback className="text-xs">
              {task.assignee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}

export default TaskCard;