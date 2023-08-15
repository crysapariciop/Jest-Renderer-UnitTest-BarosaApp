import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeStackParamList } from '../interface';
import HomeScreen from '@src/modules/home-module/home/home.screen';
import HomeSearchScreen from '@src/modules/home-module/home-search/homeSearch.screen';

/**
 *
 * @deprecated Using groups at MainStackNavigator instead.
 */
const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();

  const screens: any = [
    {
      name: 'HomeScreen',
      component: HomeScreen,
    },
    {
      name: 'HomeSearchScreen',
      component: HomeSearchScreen,
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

export default HomeStack;
