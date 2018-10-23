module.exports = {
  extends: ['standard', 'standard-react'],
  rules: {
    // Opinionated rule, you can disable it if you want
    'string-quotes': 'single',

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // CSS Modules composition
          // https://github.com/css-modules/css-modules#composition
          'composes'
        ]
      }
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // CSS Modules :global scope
          // https://github.com/css-modules/css-modules#exceptions
          'global',
          'local'
        ]
      }
    ]
  }
};
