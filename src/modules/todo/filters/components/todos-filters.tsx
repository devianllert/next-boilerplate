import { useStore } from 'effector-react';
import { useEvent } from 'effector-react/scope';

import { model, TodoFilters } from '@/entities/todo';

export const TodosFilters = () => {
  const currentFilter = useStore(model.$todosFilter);
  const updateFilter = useEvent(model.setFilterEvent);

  return (
    <div>123</div>
    // <NativeSelect
    //   value={currentFilter}
    //   onChange={(event) => updateFilter(event.target.value as TodoFilters)}
    // >
    //   <option value="all">All</option>
    //   <option value="active">Active</option>
    //   <option value="completed">Completed</option>
    // </NativeSelect>
  );
};
