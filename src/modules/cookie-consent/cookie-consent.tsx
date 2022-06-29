import useLocalStorageState from 'use-local-storage-state';

import { useTranslation, Trans } from 'next-i18next';
import { Box } from '@/shared/components/system/box';
import * as Text from '@/shared/components/system/text';
import { Button } from '@/shared/components/system/button';
import { Portal } from '@/shared/components/system/portal';
import { Link } from '@/shared/components/system/breadcrumbs';
import shape from '@/shared/design/tokens/shape';
import shadows from '@/shared/design/tokens/shadows';

import { COOKIE_CONSENT_KEY } from './constants';

export const CookieConsent = () => {
  const { t } = useTranslation('common');

  const [isAllowed, setIsAllowed] = useLocalStorageState(COOKIE_CONSENT_KEY, {
    defaultValue: false,
  });

  if (isAllowed) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        bottom={3}
        left={3}
      >
        <Box
          padding={3}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          borderRadius={shape.round}
          backgroundColor="background.secondary"
          maxWidth={320}
          boxShadow={shadows[4]}
        >
          <Text.Paragraph variant="body2" sx={{ mb: 2 }}>
            <Trans t={t} i18nKey="cookie_consent.title" components={[<Link target="_blank" href="https://www.cookiesandyou.com" />]} />
          </Text.Paragraph>

          <Button variant="outlined" onClick={() => setIsAllowed(true)}>{t('cookie_consent.action')}</Button>
        </Box>
      </Box>
    </Portal>
  );
};
