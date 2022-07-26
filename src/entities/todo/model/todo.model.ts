import * as React from 'react';
import {
  combine,
  sample,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import * as uuid from 'uuid';

import axios from 'axios';
import { filters } from '../lib';
import {
  Todo, UpdateTodoDto, TodoFilters, CreateTodoDto,
} from '../types';
import { appStarted } from '@/shared/lib/init';

export const todosLoadFx = createEffect(async () => axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos'));
export const todosAddFx = createEffect(async (createTodoDto: CreateTodoDto) => axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', createTodoDto));
export const todosUpdateFx = createEffect(async (updateTodoDto: UpdateTodoDto) => axios.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${updateTodoDto.id}`, updateTodoDto));
export const todosRemoveFx = createEffect(async (id: string) => axios.delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`));

export const titleChanged = createEvent<string>();
export const todoAdded = createEvent<string>();
export const todoUpdated = createEvent<UpdateTodoDto>();
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
  .on(todosLoadFx.doneData, (_, response) => response.data)
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

sample({
  clock: todoAdded,
  fn: (title) => ({
    title,
    completed: false,
  }),
  target: todosAddFx,
});

sample({
  clock: todoUpdated,
  target: todosUpdateFx,
});

sample({
  clock: todoRemoved,
  target: todosRemoveFx,
});

sample({
  clock: [todosAddFx.done, todosRemoveFx.done, todosUpdateFx.done],
  target: todosLoadFx,
});

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
