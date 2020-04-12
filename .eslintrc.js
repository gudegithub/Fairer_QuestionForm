module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  root: true,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      version: '16.8.6',
    },
  },
  rules: {
    // eslint official
    'newline-before-return': 'off',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'no-unused-vars': ['warn', { "argsIgnorePattern": "^_" }],
    'require-yield': 'error',
    'semi': ['error', 'always', { "omitLastInOneLineBlock": true}],
    'indent': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': 'off',
    'quotes': 'off',
    'operator-linebreak': 'off',
    'arrow-body-style': 'off',
    // 'no-extra-parens': ['error', 'functions', { "conditionalAssign": false, "returnAssign": false, "nestedBinaryExpressions": false }],
    'no-shadow': ['warn', { builtinGlobals: false, hoist: 'all', allow: [] }],
    'complexity': ['warn', { max: 13 }],
    'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
    'max-depth': ['warn', 4],
    // 'max-statements': ['warn', 10],
    'max-len': ['warn', { code: 240 }],

    // react
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'off',

    // react hooks
    'react-hooks/rules-of-hooks': 'error',

    // import
    'import/extensions': [
      'error',
      'never',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': ['error', { ignore: ['^react$', '^react-dom$'] }],
  },
};
