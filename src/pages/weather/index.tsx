import React from 'react';
import { RiMapPinLine, RiSearchLine } from 'react-icons/ri';

import { createLogger } from '@/shared/lib/logging/logger';
import * as Text from '@/shared/components/system/text';
import { Box } from '@/shared/components/system/box';
import { Input } from '@/shared/components/system/input';
import { IconButton } from '@/shared/components/system/icon-button';
import { PageSEO } from '@/shared/lib/meta';
import { WeatherLayout } from '@/layouts/weather';
import { getTranslationsStaticProps } from '@/shared/lib/ssg';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSRPageProps } from '@/shared/types/ssr-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';
import { useWeatherSearch } from '@/entities/weather';
import { staticPath } from '@/shared/lib/$path';

const logger = createLogger('Weather');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps();

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const WeatherSearchPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { onSearch, onChange } = useWeatherSearch();

  return (
    <>
      <PageSEO
        title="Weather"
        description="The right way to check the weather! This is a demo app intended to demonstrate the capabilities of this boilerplate"
        image={staticPath.static.images.apps.weather_png}
      />

      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="text.primary"
        background="linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)"
        px={2}
      >
        <Text.Heading variant="h1">Weather</Text.Heading>

        <Box
          component="form"
          maxWidth="440px"
          width="100%"
          mt={8}
          onSubmit={onSearch}
        >
          <Input
            onChange={onChange}
            prefix={(
              <RiMapPinLine />
            )}
            suffix={(
              <IconButton
                type="submit"
                size="small"
                edge="end"
                onClick={onSearch}
              >
                <RiSearchLine />
              </IconButton>
            )}
            color="black"
            fullWidth
            name="search"
            placeholder="City, Country"
          />
        </Box>
      </Box>
    </>
  );
};

WeatherSearchPage.Layout = WeatherLayout;

export default WeatherSearchPage;
