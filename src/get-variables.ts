import type { TParseVariables, TStyleSheet } from './types';
import { getVariable, runTry } from './utils';
import { CSS_VAR_PREFIX, MAIN_ELEMENT } from './constants';

const getStyleVariable = <T extends TParseVariables = {}>(
  style: CSSStyleDeclaration,
  vars: {}
): T => {
  Array.from(style).forEach((name: string) => {
    if (name && name.startsWith(CSS_VAR_PREFIX) && !vars[name]) vars[name] = getVariable(name);
  });

  return vars as T;
};

export const getVariables = <T extends TParseVariables = {}>(): T => {
  const styleSheets: TStyleSheet[] = Array.from(document.styleSheets)
    .map(runTry(e => e.cssRules))
    .filter(Boolean);

  let vars: T = getStyleVariable(MAIN_ELEMENT.style, {});

  styleSheets.forEach(cssRules => {
    if (cssRules.length)
      Array.from(cssRules as any).forEach(({ style }) => style && getStyleVariable(style, vars));

    return vars;
  });

  return vars;
};
