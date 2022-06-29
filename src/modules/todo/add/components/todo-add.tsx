import * as React from 'react';
import { useStore, useEvent } from 'effector-react/scope';

import { Input } from '@/shared/components/system/input';
import { Box } from '@/shared/components/system/box';

import { model } from '@/entities/todo';
import { Button } from '@/shared/components/system/button';

export const TodoAdd = () => {
  const title = useStore(model.$todoTitle);
  const onTitleChange = useEvent(model.todoTitleChangeEvent);
  const onTodoAdd = useEvent(model.submit);

  return (
    <Box
      component="form"
      display="flex"
      width="100%"
      onSubmit={onTodoAdd}
    >
      <Input
        fullWidth
        type="text"
        value={title}
        allowClear
        onChange={(event) => onTitleChange(event.target.value)}
      />

      <Button variant="contained" sx={{ ml: 3 }}>Add</Button>
    </Box>
  );
};
