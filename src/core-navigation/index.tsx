import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { setNavigatorRef, getCurrentRoute } from './navigationServices';

import AuthStack from './authStack.navigation';
import { useRecoilValueLoadable } from 'recoil';
import { UserState } from '@src/modules/auth-module/auth-store';
import { Socket } from 'socket.io-client';
import MainScreenStack from './mainStack.navigation';
import { isNotEmptyorNull } from '@src/core-utils/utils';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Colors from '@src/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const socketNew: { current: Socket | null } = { current: null };

const AppNav = () => {
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const userData = userStateContents.data;
  let insets;
  if (Platform.OS === 'ios') {
    insets = useSafeAreaInsets();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={Colors.goldColor} barStyle="light-content" />
        {Platform.OS === 'ios' && (
          <View style={{ height: insets?.top, backgroundColor: Colors.goldColor }} />
        )}
        <View style={{ flex: 1 }}>
          <NavigationContainer ref={(ref) => setNavigatorRef(ref)}>
            {!isNotEmptyorNull(userData?.token) ? <AuthStack /> : <MainScreenStack />}
          </NavigationContainer>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
export default AppNav;
