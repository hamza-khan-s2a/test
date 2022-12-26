module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
    // es2022: true,
  },
  extends: ['airbnb-base', 'prettier'],

  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },

  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'no-use-before-define': 0,
    'linebreak-style': 0,
    'no-debugger': 0,
    'no-alert': 0,


  },
};
