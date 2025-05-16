import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, Plus } from 'lucide-react';
import { Column, Task } from '../types';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import TaskCard from './TaskCard';
import { useBoard } from '../context/BoardContext';
import { Badge } from './ui/badge';

interface BoardColumnProps {
  column: Column;
  className?: string;
}

export function BoardColumn({ column, className }: BoardColumnProps) {
  const { toggleCollapseColumn, addTask } = useBoard();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(column.id, { title: newTaskTitle });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
  
  // Column color style (default to primary if not specified)
  const columnColor = column.color || 'hsl(var(--primary))';
  
  // Check if column is at or over capacity
  const isAtCapacity = column.limit && column.tasks.length >= column.limit;
  
  return (
    <div className={cn(
      'flex h-full min-w-[280px] flex-col rounded-lg border bg-background dark:border-slate-800',
      className
    )}>
      {/* Column Header */}
      <div className="flex items-center justify-between border-b px-3 py-2 dark:border-slate-800">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => toggleCollapseColumn(column.id)}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: columnColor }}
            />
            <h3 className="text-sm font-medium">{column.title}</h3>
          </div>
          
          <Badge variant="outline" className="font-mono text-xs dark:border-slate-700">
            {column.tasks.length}{column.limit ? `/${column.limit}` : ''}
          </Badge>
          
          {column.collapsed ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={() => setIsAddingTask(true)}
            disabled={isAtCapacity}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add task</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>
      
      {/* Column Body */}
      {!column.collapsed && (
        <div className="flex flex-col gap-2 overflow-y-auto p-3 scrollbar-thin">
          {/* Add Task Input */}
          {isAddingTask && (
            <div className="mb-1 rounded-md border bg-card p-2 shadow-sm dark:border-slate-700">
              <input
                type="text"
                className="w-full rounded border-0 bg-transparent p-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => setIsAddingTask(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={handleAddTask}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
          
          {/* Task Cards */}
          {column.tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => {
                // Handle task click (open detail view)
              }}
            />
          ))}
          
          {/* Empty State */}
          {column.tasks.length === 0 && !isAddingTask && (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 text-center dark:border-slate-700">
              <p className="text-sm text-muted-foreground">No tasks yet</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => setIsAddingTask(true)}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Task
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Column Footer - only shown when collapsed */}
      {column.collapsed && (
        <div className="p-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{column.tasks.length} tasks</span>
            {column.limit && (
              <span>
                {Math.round((column.tasks.length / column.limit) * 100)}% full
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardColumn;