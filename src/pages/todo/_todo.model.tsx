import { ParsedUrlQuery } from 'querystring';
import { createEvent, sample } from 'effector';
import Router from 'next/router';

import { createGate } from 'effector-react/scope';
import { $todosFilter, filterChanged, todosLoadFx } from '@/entities/todo/model';
import { TodoFilters } from '@/entities/todo';
import { isBrowser } from '@/shared/lib/is-browser';
import { $routerLocation, pushFx } from '@/shared/lib/next-effector/router/router';

export const todoPageOpened = createEvent();

export const TodoPageGate = createGate({});

const $queryFilter = $routerLocation.map((state) => (state.query.filter ?? 'all') as TodoFilters);

sample({
  clock: [todoPageOpened, $queryFilter],
  target: todosLoadFx,
});

sample({
  clock: $todosFilter,
  filter: isBrowser,
  fn: (filter) => {
    const query = new URLSearchParams(window.location.search);

    if (filter === null || filter === undefined) {
      // Don't leave value-less keys hanging
      query.delete('filter');
    } else {
      query.set('filter', filter);
    }

    const [asPath] = Router.asPath.split(/\?|#/, 1);
    const search = query.toString();
    const { hash } = window.location;

    return {
      url: {
        pathname: Router.pathname,
        hash,
        search,
      },
      as: {
        pathname: asPath,
        hash,
        search,
      },
      options: {
        shallow: true,
        scroll: false,
      },
    };
  },
  target: pushFx,
});

sample({
  clock: $queryFilter,
  target: filterChanged,
});

/*
 * 2. Create GSSP factory
 * The place depends on your architecture
 */
// export const createGSSP = createGSSPFactory({
//   /*
//    * Will be called on each page visit (always server side)
//    */
//   sharedEvents: [appStarted],
// });

// /*
//  * 3. Create GSSP
//  * Usually, it's done inside "pages" directory
//  */
// export const todoPageGSSP = createGSSP({
//   /*
//    * Will be called on each page visit (always server side)
//    */
//   pageEvent: pageStarted,
// });
