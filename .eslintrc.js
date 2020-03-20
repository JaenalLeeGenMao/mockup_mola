module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  extends: ['prettier', 'plugin:react/recommended'],
  rules: {
    indent: 'off',
    quotes: ['warn', 'single', 'avoid-escape'],
    commadangle: 0,
    'react/jsx-uses-vars': 1,
    'react/jsx-key': 0,
    'react/react-in-jsx-scope': 1,
    'react/display-name': 1,
    'react/prop-types': 0,
    'no-unused-vars': 'warn',
    // 'no-case-declarations': 'error',
    'no-unexpected-multiline': 'warn',
    'array-bracket-spacing': ['error', 'never'],

    // Shouldn't use console.*  use a proper logger instead, e.g.
    // https://www.npmjs.com/package/winston
    'no-console': ['warn'],
    'no-debugger': ['warn'],
    'no-cond-assign': ['error', 'always'],

    // No trailing spaces in code
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 200,
        ignoreUrls: true,
        ignoreComments: false,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.2.0',
    },
  },
}
