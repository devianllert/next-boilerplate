import styled from '@emotion/styled';

import { variants } from '@/shared/design/tokens/typography';
import shape from '@/shared/design/tokens/shape';

import { InputBase } from '../input-base';
import { InputBaseComponent } from '../input-base/input-base.styled';
import { getInputHeights, getInputTypography } from './input.tokens';

export interface InputRootProps {
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: string;
}

export const InputRoot = styled.div<InputRootProps>((props) => ({
  ...variants.body2,
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  maxWidth: '100%',
  color: props.theme.colors.text.secondary,

  ...(props.error && {
    color: props.theme.colors.radix.red11,
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
  }),

  ...(props.fullWidth && {
    width: '100%',
  }),
}));

export const InputComponent = styled(InputBase)<{ size?: string }>((props) => ({
  ...getInputTypography(props.size),
  lineHeight: 1.5,
  height: getInputHeights(props.size),
  borderRadius: shape.round,
  color: props.theme.colors.text.primary,
  background: props.theme.colors.radix.gray3,
  boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray7}`,

  [`& > ${InputBaseComponent}`]: {
    padding: '6px 4px',
  },

  '&:hover': {
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray8}`,
  },

  '&:focus-within': {
    boxShadow: `inset 0px 0px 0px 1px ${props.theme.colors.radix.primary8}, 0px 0px 0px 1px ${props.theme.colors.radix.primary8}`,
  },

  ...(props.error && {
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.red7}`,

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.red8}`,
    },
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray6}`,

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray6}`,
    },
  }),
}));
