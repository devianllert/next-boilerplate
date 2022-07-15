import * as React from 'react';
import { fork, serialize, Scope } from 'effector';
import { isBrowser } from '@/shared/lib/is-browser';

let clientScope: Scope;

const initializeScope = (initialData: Record<string, unknown>) => {
  const scope = fork({
    values: {
      ...(clientScope ? serialize(clientScope) : {}),
      ...initialData,
    },
  });

  if (isBrowser()) {
    clientScope = scope;
  }

  return scope;
};

export const useScope = (initialData: Record<string, unknown> = {}) => React.useMemo(() => initializeScope(initialData), [initialData]);

export const getClientScope = (): Scope | undefined => clientScope;
