export type TodoFilters = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type UpdateTodoDto = Partial<Omit<Todo, 'createdAt' | 'id'>>;
