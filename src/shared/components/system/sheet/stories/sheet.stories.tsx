import * as React from 'react';
import { Meta } from '@storybook/react';
import styled from '@emotion/styled';

import shadows from '@/shared/design/tokens/shadows';

import { Sheet } from '../sheet';
import { SheetContent, SheetPortal, SheetTrigger } from '..';
import { Button } from '../../button';

export default {
  title: 'Design System/Atoms/Sheet',
  component: Sheet,
} as Meta;

const StyledContent = styled(SheetContent)({
  background: 'white',
  boxShadow: shadows[6],

  '&[data-direction=top], &[data-direction=bottom]': {
    height: 300,
  },

  '&[data-direction=left], &[data-direction=right]': {
    width: 300,
  },
});

export const Top = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="top">
          123
        </StyledContent>
      </SheetPortal>
    </Sheet>
  );
};

export const Left = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="left">
          123
        </StyledContent>
      </SheetPortal>
    </Sheet>
  );
};

export const Right = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="right">
          123
        </StyledContent>
      </SheetPortal>
    </Sheet>
  );
};

export const Bottom = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="bottom">
          123
        </StyledContent>
      </SheetPortal>
    </Sheet>
  );
};
