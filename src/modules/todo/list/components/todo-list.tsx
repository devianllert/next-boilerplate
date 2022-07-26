import { useList, useStore } from 'effector-react/scope';

import { Box } from '@/shared/components/system/box';
import { Stack } from '@/shared/components/system/stack';

import { todoModel, TodoItem } from '@/entities/todo';

export const TodoList = () => {
  const isTodoListEmpty = useStore(todoModel.$isTodoListEmpty);

  return (
    <Box mt={4}>
      {isTodoListEmpty && (
        <Box>
          There is no tasks
        </Box>
      )}

      <Stack space={3}>
        {useList(todoModel.$todosFilteredList, (todo) => (
          <TodoItem data={todo} />
        ))}
      </Stack>
    </Box>
  );
};
