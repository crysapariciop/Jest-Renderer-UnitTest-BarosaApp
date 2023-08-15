import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '@src/modules/settings-module/settings/settings.screen';
import React from 'react';
import { SettingsStackParamList } from '../interface';

/**
 *
 * @deprecated Using groups at MainStackNavigator instead.
 */
const SettingsStack = () => {
  const Stack = createNativeStackNavigator<SettingsStackParamList>();

  const screens: any = [
    {
      name: 'SettingsScreen',
      component: SettingsScreen,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((screen: any) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default SettingsStack;
