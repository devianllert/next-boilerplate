import { useList } from 'effector-react/scope';

import { Box } from '@/shared/components/system/box';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/display-on-browser-mount';

import { todoModel, TodoItem } from '@/entities/todo';
import { Stack } from '@/shared/components/system/stack';

export const TodoList = () => {
  return (
    <DisplayOnBrowserMount>
      <Box mt={4}>
        <Stack space={3}>
          {useList(todoModel.$todosFilteredList, (todo) => (
            <TodoItem data={todo} />
          ))}
        </Stack>
      </Box>
    </DisplayOnBrowserMount>
  );
};
