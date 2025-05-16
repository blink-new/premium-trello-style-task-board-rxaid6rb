import { Board, Column, Task, User } from '../types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'Taylor Swift',
    email: 'taylor@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    role: 'member',
  },
  {
    id: 'user-3',
    name: 'Marcus Lee',
    email: 'marcus@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    role: 'member',
  },
  {
    id: 'user-4',
    name: 'Sophia Chen',
    email: 'sophia@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    role: 'viewer',
  },
];

// Mock tasks
const todoTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design new dashboard layout',
    description: 'Create a modern, clean dashboard with clear data visualization.',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[0],
    tags: ['design', 'ui/ux'],
    checklists: [
      {
        id: 'checklist-1',
        title: 'Design Requirements',
        items: [
          { id: 'item-1', text: 'Wireframes', completed: true },
          { id: 'item-2', text: 'Color palette', completed: true },
          { id: 'item-3', text: 'Typography', completed: false },
          { id: 'item-4', text: 'Component library', completed: false },
        ],
      },
    ],
  },
  {
    id: 'task-2',
    title: 'Research competitor features',
    description: 'Analyze top 5 competitors and list their unique selling points.',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[1],
    tags: ['research', 'marketing'],
  },
  {
    id: 'task-3',
    title: 'Set up analytics tracking',
    description: 'Implement Google Analytics and set up custom event tracking.',
    status: 'todo',
    priority: 'low',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[2],
    tags: ['development', 'analytics'],
  },
];

const inProgressTasks: Task[] = [
  {
    id: 'task-4',
    title: 'Develop authentication system',
    description: 'Implement secure login, registration, and password reset flows.',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[2],
    tags: ['development', 'security'],
    checklists: [
      {
        id: 'checklist-2',
        title: 'Authentication Features',
        items: [
          { id: 'item-5', text: 'Login form', completed: true },
          { id: 'item-6', text: 'Registration form', completed: true },
          { id: 'item-7', text: 'Password reset', completed: false },
          { id: 'item-8', text: 'Email verification', completed: false },
          { id: 'item-9', text: 'OAuth integration', completed: false },
        ],
      },
    ],
  },
  {
    id: 'task-5',
    title: 'Create onboarding flow',
    description: 'Design and implement a smooth onboarding experience for new users.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[0],
    tags: ['design', 'user experience'],
  },
];

const reviewTasks: Task[] = [
  {
    id: 'task-6',
    title: 'Optimize database queries',
    description: 'Review and optimize slow database queries to improve performance.',
    status: 'review',
    priority: 'high',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[2],
    tags: ['development', 'performance'],
    comments: [
      {
        id: 'comment-1',
        text: 'I\'ve identified the main bottleneck in the user search query.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        user: mockUsers[2],
      },
      {
        id: 'comment-2',
        text: 'Great work! Let\'s add an index to improve that query.',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        user: mockUsers[0],
      },
    ],
  },
  {
    id: 'task-7',
    title: 'Finalize pricing page',
    description: 'Complete the pricing page design and implement it.',
    status: 'review',
    priority: 'medium',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[1],
    tags: ['design', 'pricing'],
  },
];

const doneTasks: Task[] = [
  {
    id: 'task-8',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for continuous integration and deployment.',
    status: 'done',
    priority: 'high',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[2],
    tags: ['devops', 'automation'],
  },
  {
    id: 'task-9',
    title: 'Create brand guidelines',
    description: 'Develop comprehensive brand guidelines for design consistency.',
    status: 'done',
    priority: 'medium',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[0],
    tags: ['design', 'branding'],
  },
  {
    id: 'task-10',
    title: 'User feedback survey',
    description: 'Create and send out a user feedback survey to gather insights.',
    status: 'done',
    priority: 'low',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: mockUsers[3],
    tags: ['research', 'user feedback'],
  },
];

// Mock columns
export const mockColumns: Column[] = [
  {
    id: 'column-1',
    title: 'To Do',
    tasks: todoTasks,
    color: '#4A5A99', // Slate Blue
  },
  {
    id: 'column-2',
    title: 'In Progress',
    tasks: inProgressTasks,
    color: '#FF6F59', // Coral Orange
    limit: 5, // WIP limit example
  },
  {
    id: 'column-3',
    title: 'Review',
    tasks: reviewTasks,
    color: '#FFB259', // Amber
  },
  {
    id: 'column-4',
    title: 'Done',
    tasks: doneTasks,
    color: '#2DAA91', // Teal
  },
];

// Mock board
export const mockBoard: Board = {
  id: 'board-1',
  title: 'Product Development',
  description: 'Track all tasks related to our product development cycle',
  columns: mockColumns,
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  members: mockUsers,
};