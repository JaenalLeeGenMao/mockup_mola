/**
 * Babel configuration
 * https://babeljs.io/docs/usage/api
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
  ignore: ['node_modules', 'build'],
  env: {
    production: {
      plugins: ['emotion'],
    },
    staging: {
      plugins: [
        [
          'emotion',
          {
            sourceMap: true,
            autoLabel: true,
            labelFormat: '[filename]--[local]',
          },
        ],
      ],
    },
    development: {
      plugins: [
        [
          'emotion',
          {
            sourceMap: true,
            autoLabel: true,
            labelFormat: '[filename]--[local]',
          },
        ],
      ],
    },
  },
  plugins: [
    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',

    // Optional chaining obj?.foo?.bar ?? 'unavailable'
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
}
