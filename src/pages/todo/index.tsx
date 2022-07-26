import * as React from 'react';
import NextLink from 'next/link';
import { fork, allSettled, serialize } from 'effector';

import { Box } from '@/shared/components/system/box';
import * as Text from '@/shared/components/system/text';
import { APP_TITLE, PageSEO } from '@/shared/lib/meta';

import { Container } from '@/shared/components/system/container';
import { TodoAdd } from '@/modules/todo/add';
import { TodosFilters } from '@/modules/todo/filters';
import { TodoList } from '@/modules/todo/list';

import { TodoPageGate, todoPageOpened } from './_todo.model';
import { $todosFilter } from '@/entities/todo/model';
import { EFFECTOR_STATE_PROP_NAME } from '@/shared/types/app-props';
import { getTranslationsConfig } from '@/shared/lib/i18n/translations';
import { LocaleToggler } from '@/modules/locale-toggler';
import { SettingsButton } from '@/modules/settings-button';
import { Stack } from '@/shared/components/system/stack';
import { Flex } from '@/shared/components/system/flex';

const TodoPage = () => {
  return (
    <>
      <PageSEO title="Todo" />
      <TodoPageGate />

      <Container>
        <Flex alignItems="center" justifyContent="space-between" height={64}>
          <NextLink href="/" passHref>
            <Text.Heading color="text.primary" variant="h6" component="a">{APP_TITLE}</Text.Heading>
          </NextLink>

          <Stack direction="row" alignItems="center">
            <LocaleToggler />

            <SettingsButton />
          </Stack>
        </Flex>

        <Box py={3}>
          <TodoAdd />
          <TodosFilters />
          <TodoList />
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const scope = fork({
    values: [[$todosFilter, ctx.query.filter ?? 'all']],
  });

  await allSettled(todoPageOpened, { scope, params: ctx });

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await getTranslationsConfig(ctx)),
      [EFFECTOR_STATE_PROP_NAME]: serialize(scope),
    },
  };
};

// export const getServerSideProps = todoPageGSSP;

// export const getStaticProps = getTranslationsStaticProps();

export default TodoPage;
