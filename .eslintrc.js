module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-trailing-spaces': 'error',
    'keyword-spacing': 'error',
    'comma-spacing': 'error',
    'space-before-blocks': 'error',
    'object-curly-spacing': ['error', 'always'],
  },
};
