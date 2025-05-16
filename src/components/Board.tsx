import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useBoard } from '../context/BoardContext';
import { cn } from '../lib/utils';
import BoardColumn from './BoardColumn';
import { Button } from './ui/button';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface BoardProps {
  className?: string;
}

export function Board({ className }: BoardProps) {
  const { board, addColumn } = useBoard();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const newColumnInputRef = useRef<HTMLInputElement>(null);
  
  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddColumn();
    } else if (e.key === 'Escape') {
      setIsAddingColumn(false);
      setNewColumnTitle('');
    }
  };
  
  return (
    <div className={cn('h-full w-full', className)}>
      <ScrollArea className="h-full w-full" type="hover">
        <div className="flex h-full gap-4 p-4">
          {/* Board Columns */}
          {board.columns.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
          
          {/* Add Column Form */}
          {isAddingColumn ? (
            <div className="flex h-fit min-w-[280px] flex-col rounded-lg border bg-card p-3">
              <input
                ref={newColumnInputRef}
                type="text"
                className="w-full rounded border border-input bg-transparent p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Enter column title..."
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onKeyDown={handleKeyDown}
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
                className="border-dashed w-full"
                onClick={() => {
                  setIsAddingColumn(true);
                  setTimeout(() => newColumnInputRef.current?.focus(), 0);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Column
              </Button>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default Board;