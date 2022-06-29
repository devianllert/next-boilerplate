import { Todo } from '../types';

const TODOS_STORAGE_KEY = 'todos';

export function loadTodos(): Todo[] {
  const source = localStorage.getItem(TODOS_STORAGE_KEY);

  if (source) {
    return JSON.parse(source) as Todo[];
  }

  return [];
}

export function saveTodos(messages: Todo[]) {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(messages));
}
