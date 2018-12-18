module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: false,
  },
  settings: {
    'import/resolver': {
      'babel-plugin-relative-import': {
        rootPathSuffix: 'src',
      },
    },
  },
  plugins: ['jest', 'import', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'function-paren-newline': 0,
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
