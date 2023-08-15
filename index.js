import { AppRegistry } from 'react-native';
import { RecoilRoot } from 'recoil';
import App from './App';
import { name as appName } from './app.json';
import i18n from './src/i18n/i18n';

const Root = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

AppRegistry.registerComponent(appName, () => Root);
