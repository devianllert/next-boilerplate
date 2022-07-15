import { parse } from 'url';
import { LocationState } from './types';

const locationFromUrl = (url: string): LocationState => {
  const {
    hash,
    search,
    pathname,
  } = parse(url);

  return {
    href: url,
    pathname: pathname || '',
    search: decodeURIComponent(search || ''),
    query: search ? Object.fromEntries(new URLSearchParams(search)) : {},
    hash: hash || '',
  };
};

export default locationFromUrl;
