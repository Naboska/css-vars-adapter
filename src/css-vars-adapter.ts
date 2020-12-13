export type TVariables = {
  [key: string]: TVariables | string | number;
};

type TParseVariables = {
  [key: string]: string;
};

type TOptions = {
  replace?: boolean;
};

type TStyleSheet = CSSStyleSheet & { length?: number };

const CSS_VAR_PREFIX = '--';
const MAIN_ELEMENT = document.documentElement;

const formatVar = (key: string): string =>
  key.startsWith(CSS_VAR_PREFIX) ? key : `${CSS_VAR_PREFIX}${key}`;

const mergeVar = (variables: TVariables, initial?: string) => {
  return Object.entries(variables).reduce((curr, [key, value]) => {
    const currentKey = initial ? `${initial}-${key}` : formatVar(key);

    if (typeof value === 'object') curr = { ...curr, ...mergeVar(value, currentKey) };
    else curr[currentKey] = String(value);

    return curr;
  }, {});
};

const getVariable = (key: string) => getComputedStyle(MAIN_ELEMENT).getPropertyValue(key);

const setVariable = (key: string, variable: string): void =>
  MAIN_ELEMENT.style.setProperty(key, variable);

const runTry = <T>(fn: (args: T) => any) => (args: T) => {
  try {
    return fn(args);
  } catch (e) {}
};

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
