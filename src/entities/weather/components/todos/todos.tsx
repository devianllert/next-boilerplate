import * as React from 'react';
import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';

import { Box } from '@/shared/components/system/box';
import { Button } from '@/shared/components/system/button';
import { Divider } from '@/shared/components/system/divider';
import { IconButton } from '@/shared/components/system/icon-button';
import * as Text from '@/shared/components/system/text';
import * as Modal from '@/shared/components/system/modal';

const initialTodos = [
  {
    date: '16:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '17:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '18:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '19:30h',
    title: 'Stay at Bohem Art Hotel',
  },
];

export const Todos = (): JSX.Element => {
  const [todos] = React.useState(initialTodos);

  return (
    <Box width={['100%', null, 'auto']}>
      <Modal.Root>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            color="primary"
            sx={{ ml: '-12px' }}
          >
            Next
          </Button>

          <Modal.Trigger asChild>
            <IconButton
              edge="end"
              label="Open Popup"
            >
              <RiMenu3Line />
            </IconButton>
          </Modal.Trigger>

          <Modal.Portal>
            <Modal.StyledOverlay />

            <Modal.StyledContent asChild>
              <Box
                borderRadius="4px"
                backgroundColor="background.primary"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={4}
                >
                  <Modal.Title asChild>
                    <Text.Heading variant="h4" component="span">Edit todos</Text.Heading>
                  </Modal.Title>

                  <Modal.Close asChild>
                    <IconButton color="gray" label="Close">
                      <RiCloseFill />
                    </IconButton>
                  </Modal.Close>
                </Box>

                <Divider space={0} />

                <Box padding={4}>
                  {todos.map((item) => (
                    <Box mb={3} key={item.date}>
                      <Text.Heading variant="subtitle1" component="span" sx={{ mr: 2 }}>16:30h</Text.Heading>

                      <Text.Paragraph variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Text.Paragraph>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Modal.StyledContent>
          </Modal.Portal>
        </Box>

        <Divider decorative />

        <Box>
          {todos.slice(0, 2).map((item) => (
            <Box mb={3} key={item.date}>
              <Text.Heading variant="subtitle1" component="span" sx={{ mr: 2 }}>16:30h</Text.Heading>

              <Text.Paragraph variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Text.Paragraph>
            </Box>
          ))}
        </Box>
      </Modal.Root>
    </Box>
  );
};
