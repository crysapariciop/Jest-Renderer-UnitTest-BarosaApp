import {
  StackActions,
  CommonActions,
  NavigationContainerRef,
  Route,
} from '@react-navigation/native';
import {
  RootStackParamList,
  BottomTabParamList,
  MessagingStackParamList,
  ProfileStackParamList,
} from './interface';

export const config: {
  navigator?: NavigationContainerRef<RootStackParamList>;
} = {
  navigator: undefined,
};

// sets the navigator reference
const setNavigatorRef = (nav: any) => {
  if (nav) {
    config.navigator = nav;
  }
};

const getCurrentRoute = () => {
  if (config.navigator) {
    return config.navigator.getCurrentRoute();
  }
};

export const navigateReplace = (name: string, params?: any) => {
  if (config.navigator) {
    config.navigator.dispatch(StackActions.replace(name, params));
  }
};

const navigate = <
  RouteName extends keyof (
    | RootStackParamList
    | BottomTabParamList
    | MessagingStackParamList
    | ProfileStackParamList
  )
>(
  name: RouteName | string,
  params?:
    | (RootStackParamList | BottomTabParamList | ProfileStackParamList)[RouteName]
    | {
        screen: string;
        params: any;
      },
  key?: string
) => {
  if (config && config.navigator) {
    const options: any = { name };
    if (params) {
      options.params = params;
    }
    if (key) {
      options.key = key;
    }
    config.navigator.dispatch(CommonActions.navigate(options));
  }
};

const push = (routeName: string, params?: object) => {
  if (config && config.navigator) {
    config.navigator.dispatch(StackActions.push(routeName, params));
  }
};

const goBack = () => {
  if (config && config.navigator) {
    config.navigator?.goBack();
  }
};

// const reset = resetObj => {
//   _navigator.reset(resetObj);
// };

const navigateAndReset = (name: string, params?: object) => {
  if (config && config.navigator) {
    config.navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      })
    );
  }
};

const navigateAndResetAllRoutes = (routes: Omit<Route<string>, 'key'>[]) => {
  if (config && config.navigator) {
    config.navigator.dispatch(
      CommonActions.reset({
        routes,
        stale: true,
      })
    );
  }
};

const getNavigator = () => {
  return config.navigator;
};

export {
  setNavigatorRef,
  navigate,
  push,
  goBack,
  navigateAndReset,
  navigateAndResetAllRoutes,
  getCurrentRoute,
  getNavigator,
};
