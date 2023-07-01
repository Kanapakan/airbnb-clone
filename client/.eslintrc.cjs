// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "react/no-unescaped-entities": ["error", {"forbid": [">", "}", "/'"]}],
    "react/prop-types": "off",
    "no-unused-vars": "off",
    // enable additional rules
    "indent-size": [true, 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "semi"],
    "prettier/prettier": ["error", { "singleQuote": true }],

    // override default options for rules from base configurations
    "comma-dangle": ["error", "always"],
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off",


  },
}
