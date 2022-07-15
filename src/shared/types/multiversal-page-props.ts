import { SSRConfig } from 'next-i18next';

import { ReactQueryState } from '@/shared/types/react-query';
import { EffectorState } from './app-props';

/**
 * Page properties available on all pages, whether they're rendered statically, dynamically, from the server or the client
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type MultiversalPageProps<E extends {} = {}> = {
  serializedDataset: string; // Transferred from server to browser as JSON (using Flatten.stringify), then parsed on the browser/server within the MultiversalAppBootstrap
  error?: Error; // Only defined if there was an error
  statusCode?: number; // Provided by Next.js framework, sometimes
  _nextI18Next: SSRConfig['_nextI18Next'];
} & ReactQueryState & EffectorState & E;
