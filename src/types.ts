export type TVariables = {
  [key: string]: TVariables | string | number;
};

export type TParseVariables = {
  [key: string]: string;
};

export type TOptions = {
  replace?: boolean;
};

export type TStyleSheet = CSSStyleSheet & { length?: number };
