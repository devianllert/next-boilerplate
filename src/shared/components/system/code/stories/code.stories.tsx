import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Code, CodeProps } from '../code';

export default {
  title: 'Design System/Components/Code',
  component: Code,
} as Meta;

const Template: Story<CodeProps> = (args) => <Code {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'React.createElement()',
};
