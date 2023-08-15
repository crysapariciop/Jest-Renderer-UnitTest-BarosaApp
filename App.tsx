
import { SOCKET_PATH, SOCKET_URL } from '@src/config';
import { useSocket } from '@src/core-hooks/socket';
import { eventListeners } from '@src/core-utils/arrays';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserState } from '@src/modules/auth-module/auth-store';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import { useRecoilValueLoadable } from 'recoil';
import { connect } from 'socket.io-client';
import AppNav, { socketNew } from './src/core-navigation';
import ThemeProvider from './src/theme/themeProvider';
const App = () => {
  const { contents: userData, state: loadingState } = useRecoilValueLoadable(UserState);
  useEffect(() => {
    if (loadingState === 'hasValue') {
      const { token: loginUserToken } = userData.data;
      if (!loginUserToken) {
        return;
      }
      if (!socketNew.current) {
        socketNew.current = connect(SOCKET_URL, {
          extraHeaders: {
            Authorization: loginUserToken,
          },
          path: SOCKET_PATH,
        });
      }

      eventListeners.forEach(({ event, handler }) => {
        socketNew.current?.on(event, handler);
      });

      return () => {
        eventListeners.forEach(({ event, handler }) => {
          socketNew.current?.off(event, handler);
        });
      };
    }
  }, [userData, loadingState]);

  const SocketProvider = () => {
    if (loadingState === 'hasValue') {
      useSocket();
    }
    return null;
  };

  switch (loadingState) {
    case 'hasValue':
      return (
        <SafeAreaProvider>
          <ThemeProvider>
            <MenuProvider>
              <SocketProvider />
              <AppNav />
              <Toast />
            </MenuProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      );
    case 'loading':
      return <View></View>;
    case 'hasError':
      return <View></View>;
  }
};

export default App;
