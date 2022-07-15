import * as React from 'react';
import { useStore, useEvent } from 'effector-react/scope';

import { Input } from '@/shared/components/system/input';
import { Box } from '@/shared/components/system/box';
import { Button } from '@/shared/components/system/button';

import { todoModel } from '@/entities/todo';

export const TodoAdd = () => {
  const title = useStore(todoModel.$todoTitle);
  const onTitleChange = useEvent(todoModel.titleChanged);
  const onTodoAdd = useEvent(todoModel.submit);

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

      <Button type="submit" variant="contained" sx={{ ml: 3, width: 180 }}>Add</Button>
    </Box>
  );
};
