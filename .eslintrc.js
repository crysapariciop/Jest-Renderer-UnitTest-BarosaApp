module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier',
  ],
  rules: {
    // General ESLint Rules
    'no-console': 'warn', // Avoid using console.log() and console.error()
    'no-unused-vars': 'warn', // Warn if variables are declared but not used
    'no-undef': 'error', // Error if variables are used without being defined

    // TypeScript ESLint Rules
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for functions and methods
    '@typescript-eslint/no-explicit-any': 'off', // Disable explicit "any" type
    '@typescript-eslint/no-unused-vars': 'warn', // Warn if TypeScript variables are declared but not used

    // React ESLint Rules
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }], // Allow JSX syntax in .jsx and .tsx files
    'react/jsx-props-no-spreading': 'off', // Allow spreading of props in JSX
    'react/prop-types': 'off', // Disable prop-types validation for TypeScript projects

    // React Hooks ESLint Rules
    'react-hooks/rules-of-hooks': 'error', // Enforce rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Warn if dependencies are missing in useEffect dependencies array
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
