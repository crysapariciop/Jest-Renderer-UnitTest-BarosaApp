import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './interface';
import BottomTabStack from './bottomTab.navigation';
import {
  HomeGroup,
  UserGroup,
  MessagingGroup,
  SettingsGroup,
  AppScreen,
} from '@src/core-constant/navigation';

const MainScreenStack = () => {
  const MainStack = createNativeStackNavigator<MainStackParamList>();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name={AppScreen.BOTTOM_TAB_NAVIGATOR} component={BottomTabStack} />
      <MainStack.Group>
        {HomeGroup.map((screen: any) => (
          <MainStack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </MainStack.Group>
      <MainStack.Group>
        {UserGroup.map((screen: any) => (
          <MainStack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </MainStack.Group>
      <MainStack.Group>
        {MessagingGroup.map((screen: any) => (
          <MainStack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </MainStack.Group>
      <MainStack.Group>
        {SettingsGroup.map((screen: any) => (
          <MainStack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainScreenStack;
