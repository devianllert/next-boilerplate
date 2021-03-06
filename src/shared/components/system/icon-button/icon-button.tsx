import * as React from 'react';

import { PolymorphicComponent } from '@/shared/types/polymorphic';
import { ButtonBaseProps } from '@/shared/components/system/button-base';
import { VisuallyHidden } from '@/shared/components/system/visually-hidden';
import { Sizes } from '@/shared/design/tokens/size';

import * as S from './icon-button.styled';

export interface IconButtonProps extends ButtonBaseProps {
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   *
   * @default false
   */
  edge?: 'end' | 'start' | false;

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   *
   * @default 'medium'
   */
  size?: Sizes;

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   *
   * @default 'primary'
   */
  color?: string;

  /**
   * The accessible label for the icon. This label will be visually hidden but announced to screen
   * reader users, similar to `alt` text for `img` tags.
   */
  label?: string;

  /**
   * The shape to use.
   *
   * @default 'circle'
   */
  shape?: 'round' | 'circle';

  /**
   * The shape to use.
   *
   * @default 'ghost'
   */
  variant?: 'ghost' | 'solid';
}

/**
 * The `IconButton` component is like a Button except that it renders only an icon.
 */
export const IconButton: PolymorphicComponent<IconButtonProps, 'button'> = React.forwardRef((props, ref) => {
  const {
    children,
    edge = false,
    size = 'medium',
    color = 'gray',
    shape = 'circle',
    variant = 'ghost',
    label,
    ...other
  } = props;

  return (
    <S.IconButtonRoot
      edge={edge}
      size={size}
      color={color}
      shape={shape}
      variant={variant}
      {...other}
      ref={ref}
    >
      {React.cloneElement(children as React.ReactElement, {
        'aria-hidden': true,
        focusable: false,
      })}
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </S.IconButtonRoot>
  );
});
