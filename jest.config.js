module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Dependencies that should be mocked beforehand to be recognized by jest
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    '<rootDir>/__mocks__/@react-native-clipboard/react-native-clipboard.js',
    '<rootDir>/__mocks__/react-native-webview/react-native-webview.js'
  ],
  // Dependencies that doesn't bundle into ES6 by default
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@miblanchard/react-native-slider|react-native-image-crop-picker)',
  ],
  // Dependencies that multiples dependencies might user that are out of the scope of react-native
  // Dependencies with specific features that are undefined by the jest context
  moduleNameMapper: {
    '^react-dom$': '<rootDir>/__mocks__/react-dom/react-dom.js',
    'react-native-image-crop-picker':
      '<rootDir>/__mocks__/react-native-image-crop-picker/react-native-image-crop-picker.js',
  },
};
