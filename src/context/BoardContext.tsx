import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Board, Column, Task } from '../types';
import { mockBoard } from '../data/mockData';

// Define the context type
interface BoardContextType {
  board: Board;
  
  // Column operations
  addColumn: (title: string) => void;
  updateColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  toggleCollapseColumn: (columnId: string) => void;
  
  // Task operations
  addTask: (columnId: string, task: Partial<Task>) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, sourceColumnId: string, destinationColumnId: string, newIndex?: number) => void;
}

// Create context with a default undefined value
const BoardContext = createContext<BoardContextType | undefined>(undefined);

// Provider component
export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<Board>(mockBoard);

  // Column operations
  const addColumn = (title: string) => {
    setBoard(prevBoard => {
      const newColumn: Column = {
        id: `column-${Date.now()}`,
        title,
        tasks: [],
      };
      
      return {
        ...prevBoard,
        columns: [...prevBoard.columns, newColumn],
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const updateColumn = (columnId: string, title: string) => {
    setBoard(prevBoard => {
      const updatedColumns = prevBoard.columns.map(column => 
        column.id === columnId ? { ...column, title } : column
      );
      
      return {
        ...prevBoard,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const deleteColumn = (columnId: string) => {
    setBoard(prevBoard => {
      const updatedColumns = prevBoard.columns.filter(column => column.id !== columnId);
      
      return {
        ...prevBoard,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const toggleCollapseColumn = (columnId: string) => {
    setBoard(prevBoard => {
      const updatedColumns = prevBoard.columns.map(column =>
        column.id === columnId 
          ? { ...column, collapsed: !column.collapsed } 
          : column
      );
      
      return {
        ...prevBoard,
        columns: updatedColumns,
      };
    });
  };

  // Task operations
  const addTask = (columnId: string, taskData: Partial<Task>) => {
    setBoard(prevBoard => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title || 'New Task',
        description: taskData.description || '',
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        createdAt: new Date().toISOString(),
        dueDate: taskData.dueDate,
        assignee: taskData.assignee,
        tags: taskData.tags || [],
        attachments: taskData.attachments || [],
        checklists: taskData.checklists || [],
        comments: taskData.comments || [],
      };
      
      const updatedColumns = prevBoard.columns.map(column => 
        column.id === columnId 
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      );
      
      return {
        ...prevBoard,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const updateTask = (taskId: string, updatedTaskData: Partial<Task>) => {
    setBoard(prevBoard => {
      const updatedColumns = prevBoard.columns.map(column => {
        const taskIndex = column.tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) return column;
        
        const updatedTasks = [...column.tasks];
        updatedTasks[taskIndex] = { 
          ...updatedTasks[taskIndex], 
          ...updatedTaskData,
        };
        
        return { ...column, tasks: updatedTasks };
      });
      
      return {
        ...prevBoard,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const deleteTask = (taskId: string) => {
    setBoard(prevBoard => {
      const updatedColumns = prevBoard.columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId),
      }));
      
      return {
        ...prevBoard,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const moveTask = (
    taskId: string, 
    sourceColumnId: string, 
    destinationColumnId: string,
    newIndex?: number
  ) => {
    setBoard(prevBoard => {
      // Find source column and task
      const sourceColumn = prevBoard.columns.find(col => col.id === sourceColumnId);
      if (!sourceColumn) return prevBoard;
      
      const taskToMove = sourceColumn.tasks.find(task => task.id === taskId);
      if (!taskToMove) return prevBoard;
      
      // Create updated columns
      const updatedColumns = prevBoard.columns.map(column => {
        // Remove from source column
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId),
          };
        }
        
        // Add to destination column
        if (column.id === destinationColumnId) {
          const updatedTasks = [...column.tasks];
          
          // Update task status to match destination column
          const updatedTask = {
            ...taskToMove,
            status: column.tasks.length > 0 ? column.tasks[0].status : 'todo',
          };
          
          // Insert at specific index or at the end
          if (newIndex !== undefined) {
            updatedTasks.splice(newIndex, 0, updatedTask);
          } else {
            updatedTasks.push(updatedTask);
          }
          
          return {
            ...column,
            tasks: updatedTasks,
          };
        }
        
        return column;
      });
      
      return {
        ...prevBoard,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const value = {
    board,
    addColumn,
    updateColumn,
    deleteColumn,
    toggleCollapseColumn,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

// Custom hook to use the board context
export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};