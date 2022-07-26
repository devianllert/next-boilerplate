import {
  createEffect,
  createEvent,
  createStore,
  restore,
} from 'effector';
import { useStore, useEvent } from 'effector-react/scope';
import NextRouter, { SingletonRouter, NextRouter as NextRouterType } from 'next/router';
import React from 'react';
import { UrlObject } from 'url';

import createInitialRouterState from './createInitialRouterState';
import locationFromUrl from './locationFromUrl';
import { LocationState } from './types';

type EffectorRouterProps = {
  children?: React.ReactNode;
  key?: string;
  Router?: SingletonRouter;
};

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}

export const onLocationChange = createEvent<LocationState>();
export const $routerLocation = createStore(createInitialRouterState()).on(onLocationChange, (_, payload) => payload);

export const routerReady = createEvent<NextRouterType>();
export const $router = restore(routerReady, NextRouter);

export const push = createEvent<{ url: UrlObject | string, as: UrlObject | string, options: TransitionOptions }>();
export const pushFx = createEffect<{ url: UrlObject | string, as: UrlObject | string, options: TransitionOptions }, void>();

export const replace = createEvent<{ url: UrlObject | string, as: UrlObject | string, options: TransitionOptions }>();
export const replaceFx = createEffect<{ url: UrlObject | string, as: UrlObject | string, options: TransitionOptions }, void>();

export const EffectorRouter = (props: EffectorRouterProps) => {
  const { key = 'router', children, Router: PropsRouter } = props;

  const Router = PropsRouter || NextRouter;

  const routerStore = useStore($routerLocation);
  const onLocationChangedEvent = useEvent(onLocationChange);
  const onRouterReady = useEvent(routerReady);

  // React.useEffect(() => {
  //   const listenStoreChanges = () => {
  //     const {
  //       pathname: pathnameInStore,
  //       search: searchInStore,
  //       hash: hashInStore,
  //       href,
  //     } = routerStore;
  //     const historyLocation = locationFromUrl(Router.asPath);
  //     const { pathname: pathnameInHistory, search: searchInHistory, hash: hashInHistory } = historyLocation;

  //     const locationMismatch = pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory;

  //     // console.debug(NextRouter.asPath, routerStore, locationMismatch);
  //     // console.debug('pathname', pathnameInHistory, pathnameInStore, pathnameInHistory !== pathnameInStore);
  //     // console.debug('search', searchInHistory, searchInStore, searchInHistory !== searchInStore);
  //     // console.debug('pathname', hashInHistory, hashInStore, hashInStore !== hashInHistory);

  //     if (locationMismatch) {
  //       const as = `${pathnameInStore}${searchInStore}${hashInStore}`;
  //       // Update Router's location to match store's location
  //       Router.replace(href, as);
  //     }
  //   };

  //   const subscribtion = $routerStore.watch(listenStoreChanges);

  //   return () => subscribtion.unsubscribe();
  // }, [Router, routerStore, key]);

  React.useEffect(() => {
    function onRouteChangeFinish(url: string): void {
      if (url !== routerStore.href) {
        onLocationChangedEvent(locationFromUrl(url));
      }
    }

    Router.ready(() => {
      // Router.ready ensures that Router.router is defined
      const router: NextRouterType = Router.router!;

      onRouterReady(router);
      // unpatchRouter = patchRouter(Router, store);
      // Router.events.on('routeChangeStart', trackRouteStart);
      // Router.events.on('routeChangeError', trackRouteComplete);
      Router.events.on('routeChangeComplete', onRouteChangeFinish);
      // Router.events.on('hashChangeStart', trackRouteStart);
      Router.events.on('hashChangeComplete', onRouteChangeFinish);

      pushFx.use(async ({ url, as, options }) => {
        await router.push(url, as, options);
      });

      replaceFx.use(async ({ url, as, options }) => {
        await router.replace(url, as, options);
      });
    });

    return () => {
      // unpatchRouter();
      // Router.events.off('routeChangeStart', trackRouteStart);
      // Router.events.off('routeChangeError', trackRouteComplete);
      Router.events.off('routeChangeComplete', onRouteChangeFinish);
      // Router.events.off('hashChangeStart', trackRouteStart);
      Router.events.off('hashChangeComplete', onRouteChangeFinish);
    };
  }, [Router, key, routerStore]);

  return React.createElement(React.Fragment, {}, children);
};
