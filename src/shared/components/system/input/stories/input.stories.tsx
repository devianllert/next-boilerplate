import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { RiEyeCloseLine, RiEyeLine, RiUserLine } from 'react-icons/ri';

import { Divider } from '@/shared/components/system/divider';
import * as Text from '@/shared/components/system/text';
import { IconButton } from '@/shared/components/system/icon-button';

import { Input, InputProps } from '../input';

export default {
  title: 'Design System/Components/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  label: 'Name',
};

export const WithError = Template.bind({});

WithError.args = {
  label: 'Name',
  error: true,
};

export const WithHelperText = Template.bind({});

WithHelperText.args = {
  label: 'Name',
  helperText: 'Some helper text',
};

export const WithPrefixIcon = Template.bind({});

WithPrefixIcon.args = {
  label: 'Name',
  prefix: (
    <RiUserLine color="inherit" />
  ),
};

export const WithPrefixNumber = Template.bind({});

WithPrefixNumber.args = {
  label: 'Number',
  prefix: (
    <>
      <Text.Paragraph variant="body2" color="text.secondary">+61</Text.Paragraph>

      <Divider orientation="vertical" flexItem />
    </>
  ),
};

const TemplateWithPasswordAdornment: Story<InputProps> = (args) => {
  const {
    disabled,
  } = args;

  const [show, setShow] = React.useState(false);

  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      {...args}
      suffix={(
        <IconButton size="small" disabled={disabled} onClick={() => setShow((prevShow) => !prevShow)}>
          {show ? <RiEyeLine /> : <RiEyeCloseLine />}
        </IconButton>
      )}
    />
  );
};

export const WithPassword = TemplateWithPasswordAdornment.bind({});
