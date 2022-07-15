import * as React from 'react';
import {
  combine,
  sample,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import { persist as persistLocalStorage } from 'effector-storage/local';
import * as uuid from 'uuid';

import { loadTodos, saveTodos } from '../api';
import { filters } from '../lib';
import { Todo, TodoFilters } from '../types';
import { appStarted } from '@/shared/lib/init';

export const titleChanged = createEvent<string>();

export const todoAdded = createEvent<string>();
export const todoUpdated = createEvent<Todo>();
export const todoRemoved = createEvent<Todo['id']>();

export const filterChanged = createEvent<TodoFilters>();

export const $todoTitle = createStore('')
  .on(titleChanged, (_, text) => text)
  .reset(todoAdded);

export const $todosFilter = createStore<TodoFilters>('all').on(filterChanged, (_, newFilter) => newFilter);

sample({
  clock: appStarted,
  fn: (ctx) => (ctx.query.filter ?? 'all') as TodoFilters,
  target: $todosFilter,
});

export const $todos = createStore<Todo[]>([])
  .on(todoAdded, (todos, title) => {
    const newTodo: Todo = {
      id: uuid.v4(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    return [...todos, newTodo];
  })
  .on(todoRemoved, (todos, idToDelete) => todos.filter((todo) => todo.id !== idToDelete))
  .on(todoUpdated, (todos, todoUpdate) => todos.map((found) => {
    if (found.id === todoUpdate.id) {
      return { ...found, ...todoUpdate };
    }

    return found;
  }));

persistLocalStorage({ store: $todos, key: 'todos' });

export const submit = createEvent<React.SyntheticEvent>();

submit.watch((event) => event.preventDefault());

sample({
  clock: submit,
  source: $todoTitle,
  filter: (value) => !!value.trim(),
  target: todoAdded,
});

export const $todosFilteredList = combine($todos, $todosFilter, (todoList, filter) => filters[filter](todoList));

export const $todosCount = $todosFilteredList.map((todos) => todos.length);

export const $isTodoListEmpty = $todosCount.map((count) => count === 0);

export const todosLoadFx = createEffect(() => {
  const todos = loadTodos();

  return todos;
});

export const todosSaveFx = createEffect((todos: Todo[]) => {
  saveTodos(todos);
});
