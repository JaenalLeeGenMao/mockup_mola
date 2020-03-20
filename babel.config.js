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
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',

    // Optional chaining obj?.foo?.bar ?? 'unavailable'
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
}
