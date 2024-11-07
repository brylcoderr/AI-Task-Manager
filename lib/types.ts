export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  dueDate?: string;
}

export interface TaskStore {
  tasks: Task[];
  categories: string[];
}