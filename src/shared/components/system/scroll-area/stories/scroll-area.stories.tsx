import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import * as Text from '@/shared/components/system/text';
import shadows from '@/shared/design/tokens/shadows';
import { Box } from '@/shared/components/system/box';
import { Stack } from '@/shared/components/system/stack';

import * as ScrollArea from '../scroll-area';

export default {
  title: 'Design System/Components/ScrollArea',
  component: ScrollArea.Root,
} as Meta;

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `item ${a.length - i}`,
);

export const Basic = () => (
  <ScrollArea.Root asChild>
    <Box
      width={200}
      height={225}
      borderRadius={4}
      overflow="hidden"
      backgroundColor="radix.gray4"
    >
      <ScrollArea.StyledViewport>
        <Box p={3}>
          <Text.Heading variant="h6">Tags</Text.Heading>

          <Stack>
            {TAGS.map((tag) => (
              <Box px={2} py={1} boxShadow={shadows[3]} backgroundColor="radix.gray6">
                <Text.Paragraph variant="body2" key={tag}>{tag}</Text.Paragraph>
              </Box>
            ))}
          </Stack>
        </Box>
      </ScrollArea.StyledViewport>

      <ScrollArea.StyledScrollbar orientation="vertical">
        <ScrollArea.StyledThumb />
      </ScrollArea.StyledScrollbar>
    </Box>
  </ScrollArea.Root>
);
