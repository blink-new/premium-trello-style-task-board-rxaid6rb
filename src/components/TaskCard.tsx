import React from 'react';
import { Calendar, Clock, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '../lib/utils';
import { Task } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface TaskCardProps {
  task: Task;
  className?: string;
  onClick?: () => void;
}

export function TaskCard({ task, className, onClick }: TaskCardProps) {
  // Get priority color
  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive';
      case 'medium':
        return 'bg-orange-400 dark:bg-orange-500';
      case 'low':
        return 'bg-emerald-400 dark:bg-emerald-500';
      default:
        return 'bg-slate-400 dark:bg-slate-500';
    }
  };
  
  // Format date to display only the day and month
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Check if task is overdue
  const isOverdue = (dateString: string | undefined) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today && dueDate.toDateString() !== today.toDateString();
  };
  
  const priorityColor = getPriorityColor(task.priority);
  const formattedDate = formatDate(task.dueDate);
  const taskOverdue = isOverdue(task.dueDate);
  
  return (
    <div
      className={cn(
        'group relative flex flex-col gap-2 rounded-md border bg-card p-3 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:shadow-none dark:hover:border-slate-600',
        taskOverdue && 'border-destructive/30',
        className
      )}
      onClick={onClick}
    >
      {/* Priority indicator */}
      {task.priority && (
        <div className={cn('absolute right-2 top-2 h-2 w-2 rounded-full', priorityColor)} />
      )}
      
      {/* Task title */}
      <div className="pr-4">
        <h4 className="font-medium leading-tight">{task.title}</h4>
      </div>
      
      {/* Tags/labels */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Task details */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          {/* Due date */}
          {task.dueDate && (
            <div className={cn(
              'flex items-center gap-1',
              taskOverdue && 'text-destructive'
            )}>
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          )}
          
          {/* Time estimate */}
          {task.timeEstimate && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{task.timeEstimate}</span>
            </div>
          )}
          
          {/* Comments count */}
          {task.commentsCount && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.commentsCount}</span>
            </div>
          )}
          
          {/* Attachments count */}
          {task.attachmentsCount && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              <span>{task.attachmentsCount}</span>
            </div>
          )}
        </div>
        
        {/* Assignee */}
        {task.assignee && (
          <Avatar className="h-6 w-6 transition-transform hover:scale-105">
            <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
            <AvatarFallback className="text-[10px]">
              {task.assignee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      
      {/* Progress bar for tasks with checklists */}
      {task.checklistItems && task.checklistItems.length > 0 && (
        <div className="mt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {task.checklistCompleted} of {task.checklistItems.length}
            </span>
            <span className="text-muted-foreground">
              {Math.round((task.checklistCompleted / task.checklistItems.length) * 100)}%
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full bg-primary" 
              style={{ 
                width: `${(task.checklistCompleted / task.checklistItems.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
