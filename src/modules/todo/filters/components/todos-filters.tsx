import { useStore, useEvent } from 'effector-react/scope';

import { todoModel, TodoFilters } from '@/entities/todo';
import { NativeSelect } from '@/shared/components/system/native-select/native-select';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/display-on-browser-mount';
import { Box } from '@/shared/components/system/box';
import * as Text from '@/shared/components/system/text';

export const TodosFilters = () => {
  const todosFilter = useStore(todoModel.$todosFilter);
  const todosCount = useStore(todoModel.$todosCount);
  const filterChanged = useEvent(todoModel.filterChanged);

  return (
    <Box display="flex" alignItems="center">
      <DisplayOnBrowserMount>
        <Text.Paragraph variant="body2" sx={{ mr: 3 }}>{todosCount} tasks left</Text.Paragraph>
      </DisplayOnBrowserMount>

      <NativeSelect value={todosFilter} onChange={(event) => filterChanged(event.target.value as TodoFilters)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </NativeSelect>
    </Box>
  );
};
