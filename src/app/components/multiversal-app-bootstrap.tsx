import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import Head from 'next/head';
import { ThemeProvider } from 'theme-ui';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as EffectorProvider } from 'effector-react/scope';

import { configureSentryI18n } from '@/shared/lib/sentry';
import { isBrowser } from '@/shared/lib/is-browser';
import { DefaultErrorLayout } from '@/shared/components/error-handling';
import { GlobalStyles } from '@/shared/design/global-styles';
import { ResetStyles } from '@/shared/design/reset-styles';
import { theme } from '@/shared/design/themes';
import { createLogger } from '@/shared/lib/logging/logger';
import { REACT_QUERY_STATE_PROP_NAME } from '@/shared/types/react-query';
import { NProgressRoot } from '@/modules/nprogress';
import { isEmpty } from '@/shared/lib/assertion';
import { getLinksAlternateHref } from '@/shared/lib/meta';
import { MultiversalAppBootstrapProps } from '../types/multiversal-app-bootstrap-props';
import BrowserPageBootstrap, { BrowserPageBootstrapProps } from './browser-page-bootstrap';
import ServerPageBootstrap, { ServerPageBootstrapProps } from './server-page-bootstrap';
import { SSRPageProps } from '@/shared/types/ssr-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import ErrorPage from '@/pages/_error';
import { EffectorRouter } from '@/shared/lib/next-effector/router/router';
import { EFFECTOR_STATE_PROP_NAME } from '@/shared/types/app-props';
import { useScope } from '@/shared/lib/next-effector/scope';

export type Props = MultiversalAppBootstrapProps<SSGPageProps> | MultiversalAppBootstrapProps<SSRPageProps>;

const fileLabel = 'app/components/MultiversalAppBootstrap';
const logger = createLogger(fileLabel);

/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const MultiversalAppBootstrap = (props: Props): JSX.Element => {
  const {
    pageProps,
    router,
    err,
  } = props;

  const [isSSGFallbackInitialBuild] = React.useState<boolean>(isEmpty(pageProps) && router?.isFallback === true);
  const [queryClient] = React.useState(() => new QueryClient());
  const scope = useScope(pageProps[EFFECTOR_STATE_PROP_NAME]);
  const { i18n } = useTranslation();

  Sentry.addBreadcrumb({
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: 'debug',
  });

  if (isBrowser() && process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    // Avoids log clutter on server
    logger.debug('MultiversalAppBootstrap.props', props);
  }

  // Display a loader (we could use a skeleton too) when this happens, so that the user doesn't face a white page until the page is generated and displayed
  // When router.isFallback becomes "false", then it'll mean the page has been generated and rendered and we can display it, instead of the loader
  if (isSSGFallbackInitialBuild && router?.isFallback) {
    return (
      // <Loader />
      <div>...Loading</div>
    );
  }

  // Avoids noise when building the whole app
  if (!process.env.IS_SERVER_INITIAL_BUILD) {
    logger.info('App is ready, rendering...');
  }

  configureSentryI18n(i18n.language);

  if (err) {
    const error = new Error(`Fatal error - A top-level error was thrown by the application, which caused the Page.props to be lost. \n
    The page cannot be shown to the end-user, an error page will be displayed.`);
    logger.error(error);

    return (
      <ErrorPage err={err} statusCode={500} isReadyToRender>
        <DefaultErrorLayout error={err} context={pageProps} />
      </ErrorPage>
    );
  }

  /*
   * We split the rendering between server and browser
   * There are actually 3 rendering modes, each of them has its own set of limitations
   *  1. SSR (doesn't have access to browser-related features (LocalStorage), but it does have access to request-related data (cookies, HTTP headers))
   *  2. Server during SSG (doesn't have access to browser-related features (LocalStorage), nor to request-related data (cookies, localStorage, HTTP headers))
   *  3. Static rendering (doesn't have access to server-related features (HTTP headers), but does have access to request-related data (cookie) and browser-related features (LocalStorage))
   *
   * What we do here, is to avoid rendering browser-related stuff if we're not running in a browser, because it cannot work properly.
   * (e.g: Generating cookies will work, but they won't be stored on the end-user device, and it would create "Text content did not match" warnings, if generated from the server during SSG)
   *
   * So, the BrowserPageBootstrap does browser-related stuff and then call the PageBootstrap which takes care of stuff that is universal (identical between browser and server)
   *
   * Note: If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
   *  https://twitter.com/Vadorequest/status/1257658553361408002
   *
   * Note: There may be more rendering modes - See https://github.com/vercel/next.js/discussions/12558#discussioncomment-12303
   */
  const multiversalPageBootstrapProps: ServerPageBootstrapProps & BrowserPageBootstrapProps = {
    ...props,
    router,
    pageProps: {
      ...pageProps,
      isSSGFallbackInitialBuild,
    },
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {getLinksAlternateHref(router.asPath, router.locales)}
      </Head>

      <EffectorProvider value={scope}>
        <EffectorRouter />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps[REACT_QUERY_STATE_PROP_NAME]}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <ResetStyles />

              <NProgressRoot showAfterMs={200} />

              {isBrowser() ? (
                <BrowserPageBootstrap {...multiversalPageBootstrapProps} />
              ) : (
                <ServerPageBootstrap {...multiversalPageBootstrapProps} />
              )}
            </ThemeProvider>
          </Hydrate>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </EffectorProvider>
    </>
  );
};

// We should use React memo here because `appWithTranslation` HOC cause too many re-renders
export default React.memo(appWithTranslation(MultiversalAppBootstrap));
