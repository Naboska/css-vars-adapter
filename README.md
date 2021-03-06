# Css-Vars-Adapter

<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/css-vars-adapter">
    <img alt="" src="https://badgen.net/npm/v/css-vars-adapter">
  </a>
    <a aria-label="Package size" href="https://bundlephobia.com/result?p=css-vars-adapter">
      <img alt="" src="https://badgen.net/bundlephobia/minzip/css-vars-adapter">
    </a>
    <a aria-label="Hist" href="https://www.jsdelivr.com/package/npm/css-vars-adapter">
      <img alt="" src="https://badgen.net/npm/dt/css-vars-adapter">
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

## Microfrontend

Use the recommended setting [single-spa-systemjs](https://single-spa.js.org/docs/recommended-setup/#systemjs)

1) Inside importmap your index.html describe the path to the dependency

```html
...
<head>
   <script type="systemjs-importmap">
      {
        "imports": {
          "css-vars-adapter": "https://unpkg.com/css-vars-adapter/dist/system/css-vars-adapter.production.js",
        }
      }
   </script>
</head>
...
```

2) Inside your webpack.config.js

```js
module.exports = {
   externals: ['css-vars-adapter'],
   //...
}
```

3) Inside your application, it is advisable to make changes to variables before the first mount.

React:

We give preference to [emotion](https://emotion.sh/) or [styled-components](https://styled-components.com/), then you can use the ThemeProvider with this approach and do without our library.

```tsx
import React from 'react';
import { ThemeProvider } from '@emotion/react'

export default function ({ theme }) {
  return (
    <ThemeProvider {...{ theme }}>
       {/* ... */}
    </ThemeProvider>
  )
}
```

But you can also use our library if you work with css...

```tsx
import { useLayoutEffect } from 'react';
import { setVariables } from 'css-vars-adapter';

type TTheme = {
   colors: {}
}

export const useGlobalVariables = (theme: TTheme) => {
   useLayoutEffect(() => {
      setVariables(theme, { replace: false });
   })
}
```

Vue:
```vue
<script lang='ts'>
import { onBeforeMount, PropType } from 'vue';
import { setVariables } from 'css-vars-adapter';

type TTheme = {
  colors: {
    primary: '#000000'
  }
}

export default {
  props: {
    theme: Object as PropType<TTheme>,
  },
  setup({ theme }) {
    onBeforeMount(() => {
       setVariables(theme, { replace: false });
    });
  },
};
</script>

<style>
  .main {
     background-color: var(--colors-primary);
  }
</style>

```