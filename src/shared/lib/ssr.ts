import { IncomingMessage } from 'http';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import NextCookies from 'next-cookies';

import UniversalCookiesManager from '@/shared/lib/cookies-manager/universal-cookies-manager';
import { UserSemiPersistentSession } from '@/shared/lib/user-session/types/user-semi-persistent-session';
import { Cookies } from '@/shared/lib/cookies-manager/types/cookies';
import serializeSafe from '@/shared/lib/serialize-safe/serialize-safe';
import { getTranslationsConfig } from '@/shared/lib/i18n/translations';
import { CommonServerSideParams } from '@/app/types/common-server-side-params';
import { PublicHeaders } from '@/shared/types/public-headers';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

/**
 * getServerSideProps returns only part of the props expected in SSRPageProps
 * To avoid TS issue, we omit those that we don't return, and add those necessary to the getServerSideProps function
 */
export type GetCoreServerSidePropsResults = Omit<SSRPageProps, '__REACT_QUERY_STATE__'> & {
  headers: PublicHeaders;
};

/**
 * Returns a "getServerSideProps" function.
 *
 * @param namespaces
 */
export const getCoreServerSideProps = (namespaces: string[] = []): GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams> => {
  /**
   * Only executed on the server side, for every request.
   * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps
   *
   * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries
   * This improves performances, by only running one GQL query instead of many (consumer's choice)
   *
   * Meant to avoid code duplication
   *
   * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
   */
  const getServerSideProps: GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams> = async (context): Promise<GetServerSidePropsResult<GetCoreServerSidePropsResults>> => {
    const {
      req,
      res,
    } = context;

    // Parses Next.js cookies in a universal way (server + client)
    const readonlyCookies: Cookies = NextCookies(context);
    // Cannot be forwarded as pageProps, because contains circular refs
    const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res);
    const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
    const { headers }: IncomingMessage = req;
    const publicHeaders: PublicHeaders = {
      'accept-language': headers?.['accept-language'],
      'user-agent': headers?.['user-agent'],
      host: headers?.host,
    };

    return {
      props: {
        // We don't send the dataset yet (we don't have any because we haven't fetched the database yet), but it must be done by SSR pages in"getServerSideProps"
        serializedDataset: serializeSafe({}),
        userSession,
        isServerRendering: true,
        readonlyCookies,
        headers: publicHeaders,
        ...(await getTranslationsConfig(context, namespaces)),
      },
    };
  };

  return getServerSideProps;
};
