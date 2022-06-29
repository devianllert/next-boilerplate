import * as React from 'react';
import { useEvent } from 'effector-react';
import { RiCloseLine } from 'react-icons/ri';

import { Box } from '@/shared/components/system/box';
import { Checkbox } from '@/shared/components/system/checkbox';

import { Todo } from '../types';
import { remove, update } from '../model';
import { IconButton } from '@/shared/components/system/icon-button';

export interface TodoItemProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  data: Todo;
}

export const TodoItem = (props: TodoItemProps) => {
  const {
    data,
    before,
    after,
  } = props;

  const onTodoUpdate = useEvent(update);
  const onTodoDelete = useEvent(remove);

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Checkbox
        checked={data.completed}
        onChange={(event) => onTodoUpdate({ ...data, completed: event.target.checked })}
      />

      {before}
      {data.title}
      {after}

      <IconButton
        size="small"
        onClick={() => onTodoDelete(data.id)}
        sx={{
          ml: 'auto',
        }}
      >
        <RiCloseLine />
      </IconButton>
    </Box>
  );
};
