type TVariables = {
  [key: string]: string | number;
}

type TOptions = {
  replace?: boolean;
}

type TStyleSheet = CSSStyleSheet & { length?: number };

const CSS_VAR_PREFIX = '--';
const MAIN_ELEMENT = document.documentElement;

const formatVar = (key: string): string => key.startsWith(CSS_VAR_PREFIX) ? key : `${CSS_VAR_PREFIX}${key}`;
const getVariable = (key: string) => getComputedStyle(MAIN_ELEMENT).getPropertyValue(key);
const setVariable = (key: string, variable: string): void => MAIN_ELEMENT.style.setProperty(key, variable);

const runTry = <T>(fn: (args: T) => any) => (args: T) => {
  try {
    return fn(args)
  } catch (e) {
  }
}

const getStyleVariable = (style: CSSStyleDeclaration, vars = {}) => {
  Array.from(style).forEach((name: string) => {
    if (name && name.startsWith(CSS_VAR_PREFIX) && !vars[name])
      vars[name] = getVariable(name)
  });

  return vars;
};

export const getVariables = () => {
  const styleSheets: TStyleSheet[] = Array.from(document.styleSheets)
    .map(runTry(e => e.cssRules))
    .filter(Boolean);

  let vars = getStyleVariable(MAIN_ELEMENT.style, {});

  styleSheets.forEach(cssRules => {
    if (cssRules.length) Array.from(cssRules as any).forEach(({style}) => {
      if (style) getStyleVariable(style, vars);
    })

    return vars;
  });

  return vars;
}

export const setVariables = <T extends TVariables = {}>(values: T, options: TOptions = {}): void => {
  const isReplace = options?.replace ?? false;

  const val = Object.entries(values);
  const variables: [string, string][] = val.map(([key, value]) => [formatVar(key), String(value)]);

  variables.forEach(style => {
    if (isReplace) setVariable(...style)
    else {
      if (!getVariable(style[0])) setVariable(...style)
    }
  });
}