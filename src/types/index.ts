// Task status types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

// Priority levels
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

// Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate?: string;
  createdAt: string;
  assignee?: User;
  tags: string[];
  attachments?: Attachment[];
  checklists?: Checklist[];
  comments?: Comment[];
}

// Column interface
export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color?: string;
  limit?: number; // Optional WIP limit
  collapsed?: boolean;
}

// Board interface
export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
  members: User[];
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'member' | 'viewer';
}

// Attachment interface
export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: User;
}

// Checklist item
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

// Checklist
export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

// Comment
export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: User;
  reactions?: Reaction[];
}

// Reaction
export interface Reaction {
  id: string;
  emoji: string;
  count: number;
  users: User[];
}