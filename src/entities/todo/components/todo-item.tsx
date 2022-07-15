import * as React from 'react';
import { useEvent } from 'effector-react/scope';
import { RiCloseLine } from 'react-icons/ri';

import { Box } from '@/shared/components/system/box';
import { Checkbox } from '@/shared/components/system/checkbox';
import { IconButton } from '@/shared/components/system/icon-button';

import shape from '@/shared/design/tokens/shape';

import { Todo } from '../types';
import { todoRemoved, todoUpdated } from '../model';

export interface TodoItemProps {
  data: Todo;
}

export const TodoItem = (props: TodoItemProps) => {
  const { data } = props;

  const onTodoUpdate = useEvent(todoUpdated);
  const onTodoDelete = useEvent(todoRemoved);

  return (
    <Box display="flex" alignItems="center" py={2} px={2} backgroundColor="background.secondary" borderRadius={shape.round}>
      <Checkbox
        label={data.title}
        checked={data.completed}
        onChange={(event) => onTodoUpdate({ ...data, completed: event.target.checked })}
      />

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
