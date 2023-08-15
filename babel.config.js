module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@core-component': './src/core-component',
          '@core-constant': './src/core-constant',
          '@core-navigation': './src/core-navigation',
          '@services': './src/core-services',
          '@core-utils': './src/core-utils',
          '@graphql': './src/graphql',
          '@interfaces': './src/interfaces',
          '@modules': './src/modules',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
