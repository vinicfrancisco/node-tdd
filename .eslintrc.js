module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off'
  },
  plugins: ['jest'],
};
