import { Todo, TodoFilters } from '../types';

export const filters: Record<TodoFilters, (todos: Todo[]) => Todo[]> = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed),
};
