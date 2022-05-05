import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button } from '@/shared/components/system/button';

import { Flex, FlexProps } from '../flex';

export default {
  title: 'Design System/Layout/Flex',
  component: Flex,
} as Meta;

const Template: Story<FlexProps> = (args) => <Flex {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  width: '100%',
  justifyContent: 'space-around',
  children: (
    <>
      <Button variant="contained">1</Button>
      <Button variant="contained">2</Button>
    </>
  ),
};
