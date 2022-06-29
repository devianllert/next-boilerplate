import * as React from 'react';
import {
  combine,
  sample,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import { useStore } from 'effector-react';
import { persist } from 'effector-storage/local';
import * as uuid from 'uuid';

import { loadTodos, saveTodos } from '../api';
import { filters } from '../lib';
import { Todo, TodoFilters, UpdateTodoDto } from '../types';

export const todoTitleChangeEvent = createEvent<string>();
export const setFilterEvent = createEvent<TodoFilters>();
export const insert = createEvent<string>();
export const update = createEvent<Todo>();
export const remove = createEvent<Todo['id']>();

export const $todoTitle = createStore('')
  .on(todoTitleChangeEvent, (_, text) => text)
  .on(insert, () => '');

export const $todosFilter = createStore<TodoFilters>('all')
  .on(setFilterEvent, (_, newFilter) => newFilter);

export const $todos = createStore<Todo[]>([])
  .on(insert, (todos, title) => {
    const newTodo: Todo = {
      id: uuid.v4(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    return [...todos, newTodo];
  })
  .on(remove, (todos, idToDelete) => todos.filter((todo) => todo.id !== idToDelete))
  .on(update, (todos, todoUpdate) => todos.map((found) => {
    if (found.id === todoUpdate.id) {
      return { ...found, ...todoUpdate };
    }

    return found;
  }));

persist({ store: $todos, key: 'todos' });

export const submit = createEvent<React.SyntheticEvent>();

submit.watch((event) => event.preventDefault());

sample({
  clock: submit,
  source: $todoTitle,
  target: insert,
});

export const $todosFiltered = combine(
  $todos,
  $todosFilter,
  (todoList, filter) => filters[filter](todoList),
);

export const $todoListEmpty = $todosFiltered.map((todos) => todos.length === 0);

export const todosLoadFx = createEffect(() => {
  const todos = loadTodos();

  return todos;
});

export const todosSaveFx = createEffect((todos: Todo[]) => {
  saveTodos(todos);
});

export const useTodos = () => {
  return useStore($todos);
};
