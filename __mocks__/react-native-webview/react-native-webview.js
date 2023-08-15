// TODO: If there is no intention of the use of a webview, we should delete this dependency instead.
jest.mock('react-native-webview', () => ({
    default: () => jest.fn()
  }))