import { useList } from 'effector-react';

import { Box } from '@/shared/components/system/box';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/display-on-browser-mount';

import { model, TodoItem } from '@/entities/todo';

export const TodoList = () => {
  return (
    <DisplayOnBrowserMount>
      <Box>
        {useList(model.$todosFiltered, (todo) => (
          <TodoItem
            data={todo}
          />
        ))}
      </Box>
    </DisplayOnBrowserMount>
  );
};
