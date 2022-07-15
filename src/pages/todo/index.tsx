import * as React from 'react';

import { useRouter } from 'next/router';
import { Box } from '@/shared/components/system/box';
import { PageSEO } from '@/shared/lib/meta';

import { Container } from '@/shared/components/system/container';
import { TodoAdd } from '@/modules/todo/add';
import { TodosFilters } from '@/modules/todo/filters';
import { TodoList } from '@/modules/todo/list';

import { TodoPageGate } from './_todo.model';
import { getTranslationsStaticProps } from '@/shared/lib/ssg';

const TodoPage = () => {
  const router = useRouter();

  return (
    <>
      <PageSEO title="Todo" />
      <TodoPageGate query={router.query} />

      <Container>
        <Box py={3}>
          <TodoAdd />
          <TodosFilters />
          <TodoList />
        </Box>
      </Container>
    </>
  );
};

// export const getServerSideProps = async (ctx) => {
//   const scope = fork({
//     values: [[$todosFilter, ctx.query.filter ?? 'all']],
//   });

//   await allSettled(todoPageOpened, { scope, params: ctx });

//   return {
//     props: {
//       [EFFECTOR_STATE_PROP_NAME]: serialize(scope),
//     },
//   };
// };

// export const getServerSideProps = todoPageGSSP;

export const getStaticProps = getTranslationsStaticProps();

export default TodoPage;
