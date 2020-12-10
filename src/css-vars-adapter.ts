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
const setVariable = (key: string, variable: string): void => MAIN_ELEMENT.style.setProperty(key, variable);
const runTry = <T>(fn: (args: T) => any) => (args: T) => {
  try {
    return fn(args)
  } catch (e) {
  }
}

const getVariables = () => {
  const styleSheets: TStyleSheet[] = Array.from(document.styleSheets)
    .map(runTry(e => e.cssRules))
    .filter(Boolean);

  const names = styleSheets.reduce((acc, cssRules) => {
    if (cssRules.length) Array.from(cssRules as any)
      .forEach(({style}) => {
        if (style) Array.from(style)
          .forEach((name: string) => name && name.startsWith('--') && !acc.includes(name) && acc.push(name))
      })

    return acc;
  }, [])


  //
}

export const setVariables = <T extends TVariables = {}>(values: T, options: TOptions = {}): void => {
  const isReplace = options?.replace ?? false;

  const val = Object.entries(values);
  const variables: [string, string][] = val.map(([key, value]) => [formatVar(key), String(value)]);

  if (isReplace) variables.forEach(style => setVariable(...style));

}


export default {
  setVariables,
  getVariables
};