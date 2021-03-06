import * as Sentry from '@sentry/nextjs';

import { createLogger } from '@/shared/lib/logging/logger';

import { isBrowser } from '@/shared/lib/is-browser';

const fileLabel = 'common/lib/mobile';
const logger = createLogger(fileLabel);

/**
 * Returns whether running on a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (e: unknown) {
      logger.error((e as Error).message);
      Sentry.captureException(e);

      return false;
    }
  } else {
    return false;
  }
};
