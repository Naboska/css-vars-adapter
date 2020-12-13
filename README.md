# Css-Vars-Adapter

<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/css-vars-adapter">
    <img alt="" src="https://badgen.net/npm/v/css-vars-adapter">
  </a>
    <a aria-label="Package size" href="https://bundlephobia.com/result?p=css-vars-adapter">
      <img alt="" src="https://badgen.net/bundlephobia/minzip/css-vars-adapter">
    </a>
    <a aria-label="Hist" href="https://www.jsdelivr.com/package/npm/css-vars-adapter">
      <img alt="" src="https://data.jsdelivr.com/v1/package/npm/css-vars-adapter/badge">
    </a>
</p>

The library will help you manage the css variables through javascript. This is useful if you are developing a
microfront-end on different frameworks, and the theme may come from above.

## Menu

- [Usage](#Usage)
- [API](#API)
- [In microfrontend](#Microfrontend)

## Usage

Inside your project directory, run in terminal:

```
yarn add css-vars-adapter
```

Or with npm:

```
npm install css-vars-adapter
```

## API

- [setVariables](#setVariables)
- [getVariables](#getVariables)

### setVariables

Provides the ability to add a theme globally.

Takes 1 generic(TVariables) and 2 arguments.

```ts
type TVariables = {
  [key: string]: TVariables | string | number;
};

type TOptions = {
  replace?: boolean;
};

type TSetVariales = <T extends TVariables = {}>(values: T, options: TOptions = {}) => void
```

`Values` are your theme. You can transfer an object of any nesting, the library will parse it into a kebab-case.

`Options` specifies for adding a theme

1) `replace` - Checks globally for the presence of variables, and if a variable is present anywhere in the styles, skips
   it.
   
This will put the following styles object globally

```ts
import { setVariables } from 'css-vars-adapter';

const theme = {
  colors: {
    primary: {
      '100': '#000000',
      '200': {
        '0': '#020202',
        '1': '#030303',
      }
    },
    secondary: '#FFFFFF'
  },
  borderRadius: '8px'
}

type TTheme = typeof theme;

setVariables<TTheme>(theme, { replace: true });
```

### getVariables

Allows you to get absolutely all the variables that the current page processes (not only which you have set).

From the previous example, you get the following:

```ts
import { getVariables } from 'css-vars-adapter';

type TValues = 
   | '--colors-primary-100'
   | '--colors-primary-200-0'
   | '--colors-primary-200-1'
   | '--colors-secondary'
   | '--borderRadius';

const globalViriables = getVariables<Record<TValues, string>>();
//   {
//      '--colors-primary-100': '#000000',
//      '--colors-primary-200-0': '#020202', 
//      '--colors-primary-200-1': '#030303', 
//      '--colors-secondary': '#FFFFFF',
//      '--borderRadius': '8px'
//    }
```

##Microfrontend

