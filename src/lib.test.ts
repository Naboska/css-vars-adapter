import { setVariables, getVariables } from './index';

const __MOCK_THEME__ = {
  colors: {
    primary: '#000000',
    secondary: {
      '100': '#FFFFFF',
      '200': '#F1F1F1',
    },
  },
  media: {
    mobile: '300px',
    desktop: '1280px',
  },
  borderRadius: '8px',
};

const __MOCK_VARS__ = {
  '--colors-primary': __MOCK_THEME__.colors.primary,
  '--colors-secondary-100': __MOCK_THEME__.colors.secondary['100'],
  '--colors-secondary-200': __MOCK_THEME__.colors.secondary['200'],
  '--media-mobile': __MOCK_THEME__.media.mobile,
  '--media-desktop': __MOCK_THEME__.media.desktop,
  '--borderRadius': __MOCK_THEME__.borderRadius,
};

const REPLACE_RADIUS = '3px';

type TTheme = typeof __MOCK_THEME__;
type TParseTheme = typeof __MOCK_VARS__;

describe('Adapter tests', () => {
  test('Parse without error', () => {
    setVariables<{ borderRadius: string }>({ borderRadius: REPLACE_RADIUS });
    setVariables<TTheme>(__MOCK_THEME__, { replace: true });

    const globalVariables = getVariables<typeof __MOCK_VARS__>();

    expect(globalVariables).toStrictEqual(__MOCK_VARS__);
  });

  test('Parse without replace', () => {
    setVariables<{ borderRadius: string }>({ borderRadius: REPLACE_RADIUS });
    setVariables<TTheme>(__MOCK_THEME__, { replace: false });

    const globalVariables = getVariables<TParseTheme>();

    expect(globalVariables).toStrictEqual({
      ...__MOCK_VARS__,
      '--borderRadius': REPLACE_RADIUS,
    });
  });
});
