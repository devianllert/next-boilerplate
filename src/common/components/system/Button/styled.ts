import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import { ButtonBase } from '@/components/system/ButtonBase';

import { variants } from '@/common/design/tokens/typography';
import shape from '@/common/design/tokens/shape';
import { createTransition, duration } from '@/common/design/tokens/transitions';
import shadows from '@/common/design/tokens/shadows';
import { grey } from '@/common/design/tokens/colors';
import { getContrastText } from '@/common/design/utils/colorManipulator';

interface ButtonRootProps {
  /**
   * The variant to use.
   *
   * @default 'text'
   */
  variant?: 'text' | 'outlined' | 'contained';
  /**
   * The color to use.
   *
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'inherit';

  /**
  * If `true`, the button will take up the full width of its container.
  *
  * @default false
  */
  fullWidth?: boolean;
  /**
  * If `true`, no elevation is used.
  *
  * @default false
  */
  disableElevation?: boolean;
}

export const ButtonRoot = styled(ButtonBase)<ButtonRootProps>(({ theme, ...props }) => ({
  ...variants.button,
  minWidth: 64,
  padding: '6px 16px',
  borderRadius: shape.round,
  transition: createTransition(['background-color', 'box-shadow', 'border-color', 'color'], { duration: duration.short }),
  '&:hover, &:focus-visible': {
    textDecoration: 'none',
    backgroundColor: tinycolor(theme.palette.text.primary).setAlpha(theme.palette.action.hoverOpacity).toString(),

    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },

    ...(props.variant === 'text' && props.color !== 'inherit' && {
      backgroundColor: tinycolor(theme.palette.brand[props.color]).setAlpha(theme.palette.action.hoverOpacity).toString(),

      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }),

    ...(props.variant === 'outlined' && props.color !== 'inherit' && {
      border: `1px solid ${theme.palette.brand[props.color]}`,
      backgroundColor: tinycolor(theme.palette.brand[props.color]).setAlpha(theme.palette.action.hoverOpacity).toString(),

      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }),

    ...(props.variant === 'contained' && {
      backgroundColor: grey.A100,
      boxShadow: shadows[4],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: shadows[2],
        backgroundColor: grey[300],
      },

      ...(props.disableElevation && {
        boxShadow: 'none',
      }),

      ...(props.color !== 'inherit' && {
        backgroundColor: tinycolor(theme.palette.brand[props.color]).darken(10).toString(),

        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.brand[props.color],
        },
      }),
    }),
  },

  '&:active': {
    backgroundColor: tinycolor(theme.palette.text.primary).setAlpha(theme.palette.action.activatedOpacity).toString(),

    ...(props.variant === 'contained' && props.color !== 'inherit' && {
      boxShadow: shadows[8],
      backgroundColor: tinycolor(theme.palette.brand[props.color]).lighten(theme.palette.action.activatedOpacity * 100 / 2).toString(),

      ...(props.disableElevation && {
        boxShadow: 'none',
      }),
    }),

    ...((props.variant === 'text' || props.variant === 'outlined') && props.color !== 'inherit' && {
      backgroundColor: tinycolor(theme.palette.brand[props.color]).setAlpha(theme.palette.action.activatedOpacity).toString(),
    }),
  },

  ...(props.variant === 'text' && {
    padding: '6px 8px',

    ...(props.color !== 'inherit' && {
      color: theme.palette.brand[props.color],
    }),
  }),

  ...(props.variant === 'outlined' && {
    padding: '5px 15px',
    border: `1px solid ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,

    ...(props.color !== 'inherit' && {
      color: theme.palette.brand[props.color],
      border: '1px solid',
      borderColor: tinycolor(theme.palette.brand[props.color]).setAlpha(0.5).toString(),
    }),
  }),

  ...(props.variant === 'contained' && {
    color: getContrastText(grey[300]),
    backgroundColor: grey[300],
    boxShadow: shadows[2],
  }),

  ...(props.variant === 'contained'
    && props.color !== 'inherit' && {
    color: getContrastText(theme.palette.brand[props.color]),
    backgroundColor: theme.palette.brand[props.color],
  }),

  ...(props.color === 'inherit' && {
    color: 'inherit',
    borderColor: 'currentColor',
  }),

  ...(props.fullWidth && {
    width: '100%',
  }),

  ...(props.disableElevation && {
    boxShadow: 'none',
  }),

  ...(props.disabled && {
    color: theme.palette.action.disabled,

    ...(props.variant === 'text' && {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }),

    ...(props.variant === 'outlined' && {
      borderColor: theme.palette.action.disabledBackground,

      '&:hover': {
        borderColor: theme.palette.action.disabledBackground,
        backgroundColor: 'transparent',
      },
    }),

    ...(props.variant === 'contained' && {
      color: theme.palette.action.disabled,
      boxShadow: shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,

      '&:hover': {
        boxShadow: shadows[0],
        backgroundColor: theme.palette.action.disabledBackground,
      },
    }),
  }),
}));

export const ButtonStartIcon = styled.span({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
});

export const ButtonEndIcon = styled.span({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
});