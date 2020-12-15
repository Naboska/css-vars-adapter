import type { TVariables, TOptions } from './types';
import { getVariable, mergeVar } from './utils';
import { MAIN_ELEMENT } from './constants';

const setVariable = (key: string, variable: string): void =>
  MAIN_ELEMENT.style.setProperty(key, variable);

export const setVariables = <T extends TVariables = {}>(
  values: T,
  options: TOptions = {}
): void => {
  const isReplace = options?.replace ?? true;

  const variables = Object.entries<string>(mergeVar(values));

  variables.forEach(style => {
    if (isReplace) setVariable(...style);
    else !getVariable(style[0]) && setVariable(...style);
  });
};
