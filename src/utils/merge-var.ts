import type { TVariables } from '../types';
import { CSS_VAR_PREFIX } from '../constants';

const formatVar = (key: string): string =>
  key.startsWith(CSS_VAR_PREFIX) ? key : `${CSS_VAR_PREFIX}${key}`;

export const mergeVar = (variables: TVariables, initial?: string) => {
  return Object.entries(variables).reduce((curr, [key, value]) => {
    const currentKey = initial ? `${initial}-${key}` : formatVar(key);

    if (typeof value === 'object') curr = { ...curr, ...mergeVar(value, currentKey) };
    else curr[currentKey] = String(value);

    return curr;
  }, {});
};
