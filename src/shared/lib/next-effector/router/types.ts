import { ParsedUrlQuery } from 'querystring';

export type LocationState = {
  href: string;
  pathname: string;
  hash: string;
  search: string;
  query: ParsedUrlQuery;
};

export type RouterAction = 'POP' | 'PUSH' | 'REPLACE';

export type RouterState = {
  location: LocationState;
};
