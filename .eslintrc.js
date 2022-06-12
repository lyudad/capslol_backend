module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
      
    ],
    'class-methods-use-this': "off",
    'import/no-unresolved': [0, { caseSensitive: false }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
          "allowExpressions": true
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    '@typescript-eslint/no-explicit-any': 'error',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  },
}
