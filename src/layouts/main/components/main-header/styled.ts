import styled from '@emotion/styled';

export const MainHeaderRoot = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: 64,
});

export const MainHeaderContainer = styled.header({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  backdropFilter: 'blur(20px)',
  paddingRight: 'var(--removed-body-scroll-bar-size)',
});
