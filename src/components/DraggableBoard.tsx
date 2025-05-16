import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useBoard } from '../context/BoardContext';
import { Task } from '../types';
import { cn } from '../lib/utils';
import BoardColumn from './BoardColumn';
import { Button } from './ui/button';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Plus } from 'lucide-react';

interface DraggableBoardProps {
  className?: string;
}

export function DraggableBoard({ className }: DraggableBoardProps) {
  const { board, addColumn, moveTask } = useBoard();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // Configure DnD sensors with a minimum activation delay to improve user experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    
    // Find the task across all columns
    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic (optional)
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }
    
    const taskId = active.id as string;
    const overId = over.id as string;
    
    // Find which column has the task being dragged
    let sourceColumnId = '';
    for (const column of board.columns) {
      if (column.tasks.some(task => task.id === taskId)) {
        sourceColumnId = column.id;
        break;
      }
    }
    
    // Find which column is the destination
    // If dropping onto another task, find its column
    let destinationColumnId = '';
    let newIndex;
    
    // Check if dropping on a task
    for (const column of board.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === overId);
      if (taskIndex >= 0) {
        destinationColumnId = column.id;
        newIndex = taskIndex;
        break;
      }
    }
    
    // If dropping on a column
    if (!destinationColumnId) {
      destinationColumnId = overId;
    }
    
    // Move the task if we have both source and destination
    if (sourceColumnId && destinationColumnId) {
      moveTask(taskId, sourceColumnId, destinationColumnId, newIndex);
    }
    
    setActiveTask(null);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  return (
    <div className={cn('h-full w-full', className)}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ScrollArea className="h-full w-full" type="hover">
          <div className="flex h-full gap-4 p-4">
            {/* Board Columns */}
            {board.columns.map((column) => (
              <BoardColumn key={column.id} column={column} />
            ))}
            
            {/* Add Column Form */}
            {isAddingColumn ? (
              <div className="flex h-fit min-w-[280px] flex-col rounded-lg border bg-card p-3 dark:border-slate-800">
                <input
                  type="text"
                  className="w-full rounded border border-input bg-transparent p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring dark:border-slate-700"
                  placeholder="Enter column title..."
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddColumn();
                    if (e.key === 'Escape') {
                      setIsAddingColumn(false);
                      setNewColumnTitle('');
                    }
                  }}
                  autoFocus
                />
                <div className="mt-2 flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsAddingColumn(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={handleAddColumn}
                  >
                    Add Column
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-fit min-w-[280px] items-center">
                <Button
                  variant="outline"
                  className="border-dashed w-full dark:border-slate-700"
                  onClick={() => setIsAddingColumn(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Column
                </Button>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DndContext>
    </div>
  );
}

export default DraggableBoard;