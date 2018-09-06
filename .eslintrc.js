module.exports = {
    'extends': 'google',
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'extends': ['plugin:react/recommended'],

    'rules': {
        'commadangle': 0,
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        'react/display-name': 1,
        'react/displayname': [true, { "ignoreTranspilerName": true }],
        'react/prop-types': 0,
        'no-unused-vars': 'warn',
        // 'no-unexpected-multiline': 'warn',
        'array-bracket-spacing': ['error', 'never'],

        // Use the one true brace style
        'brace-style': ['error', '1tbs'],

        // Enforce using camelCase
        'camelcase': ['error', { 'properties': 'always' }],

        // Shouldn't use console.*  use a proper logger instead, e.g.
        // https://www.npmjs.com/package/winston
        'no-console': ['warn'],
        'no-debugger': ['warn'],

        // Indent at 4 spaces
        'indent': ['error', 4],

        // No trailing spaces in code
        'no-trailing-spaces': ['error'],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', { 'code': 200 }]
    },
    'settings': {
        'react': {
            'pragma': 'React',
            'version': '16.2.0'
        }
    }
}
