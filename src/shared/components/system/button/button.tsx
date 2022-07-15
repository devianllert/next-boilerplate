/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { PolymorphicComponent } from '@/shared/types/polymorphic';
import { AnimatedSpinner } from '@/shared/components/animations/animated-spinner';
import { ButtonBaseProps } from '@/shared/components/system/button-base';
import { Sizes } from '@/shared/design/tokens/size';

import * as S from './button.styled';

export interface ButtonProps extends ButtonBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, no elevation is used.
   *
   * @default false
   */
  disableElevation?: boolean;

  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;

  /**
   * If `true`, the button will take up the full width of its container.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string;

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   *
   * @default 'medium'
   */
  size?: Exclude<Sizes, 'xsmall'>;

  /**
   * If `true`, the button will show loading spinner.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * The loader component.
   */
  loader?: React.ReactNode;

  /**
   * The text that will be shown when button in loading state.
   *
   * @default ''
   */
  loadingText?: string;

  /**
   * The placement of the loader.
   *
   * @default 'start'
   */
  loadingIconPlacement?: 'start' | 'end';

  /**
   * If `true`, the button will show uppercase text.
   *
   * @default true
   */
  uppercase?: boolean;

  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;

  /**
   * The variant to use.
   *
   * @default 'text'
   */
  variant?: 'text' | 'outlined' | 'contained';

  /**
   * The color of the button.
   *
   * @default 'primary'
   */
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonProps;
  defaultComponent: D
}

/**
 * The `Button` component is used to trigger an action or event.
 */
export const Button: PolymorphicComponent<ButtonProps, 'button'> = React.forwardRef(function Button(props, ref) {
  const {
    children,
    component: Component,
    color = 'primary',
    variant = 'text',
    disableElevation,
    disabled,
    startIcon: startIconProp,
    endIcon: endIconProp,
    fullWidth = false,
    uppercase = true,
    loading = false,
    loadingText,
    loadingIconPlacement = 'start',
    loader = <AnimatedSpinner fontSize="1.5em" />,
    ...other
  } = props;

  const startIcon = startIconProp && (
    <S.ButtonStartIcon>
      {startIconProp}
    </S.ButtonStartIcon>
  );

  const endIcon = endIconProp && (
    <S.ButtonEndIcon>
      {endIconProp}
    </S.ButtonEndIcon>
  );

  return (
    <S.ButtonRoot
      component={Component}
      disableElevation={disableElevation}
      ref={ref}
      variant={variant}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      uppercase={uppercase}
      aria-busy={loading}
      {...other}
    >
      {loading && (
        <S.ButtonLoader hasChildren={Boolean(loadingText)}>
          {loadingIconPlacement === 'start' && (loadingText ? (
            <S.ButtonStartIcon>
              {loader}
            </S.ButtonStartIcon>
          ) : (
            loader
          ))}

          {loadingText}

          {loadingIconPlacement === 'end' && (loadingText ? (
            <S.ButtonEndIcon>
              {loader}
            </S.ButtonEndIcon>
          ) : (
            loader
          ))}
        </S.ButtonLoader>
      )}

      {!(loadingText && loading) && (
        <S.ButtonContent $loading={loading}>
          {startIcon}

          {children}

          {endIcon}
        </S.ButtonContent>
      )}
    </S.ButtonRoot>
  );
});
