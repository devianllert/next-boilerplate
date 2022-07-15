import locationFromUrl from './locationFromUrl';
import { LocationState } from './types';

const createInitialRouterState = (url = '/'): LocationState => {
  const initialState = locationFromUrl(url);
  return initialState;
};

export default createInitialRouterState;
