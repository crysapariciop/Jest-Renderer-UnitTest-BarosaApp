import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './interface';
import ProfileScreen from '@src/modules/profile-module/profile/profile.screen';
import MessagingScreen from '@src/modules/messaging-module/main-chat-module/messagingChat.screen';
import HomeScreen from '@src/modules/home-module/home/home.screen';
import SettingsScreen from '@src/modules/settings-module/settings/settings.screen';
import Colors from '@src/theme/colors';
import {
  Home,
  HomeSelected,
  Messages,
  MessagesSelected,
  Settings,
  User,
  UserSelected,
} from '@src/assets/icons/tab-bar-icons';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';
import { FONTS } from '@src/assets/fonts';
import { AppScreen } from '@src/core-constant/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTab() {
  const TabBarIcon = (activeIcon: JSX.Element, inactiveIcon: JSX.Element, isActive: boolean) => {
    const memoizedIcon = useMemo(() => {
      return isActive ? activeIcon : inactiveIcon;
    }, [isActive]);

    return memoizedIcon;
  };

  return (
    <Tab.Navigator
      initialRouteName={AppScreen.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.goldColor,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={AppScreen.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabelStyle: styles.tabBarText,
          tabBarIcon: ({ focused }) => TabBarIcon(<HomeSelected />, <Home />, focused),
        }}
      />
      <Tab.Screen
        name={AppScreen.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabelStyle: styles.tabBarText,
          tabBarIcon: ({ focused }) => TabBarIcon(<UserSelected />, <User />, focused),
        }}
      />
      <Tab.Screen
        name={AppScreen.MESSAGES_SCREEN}
        component={MessagingScreen}
        options={{
          tabBarLabelStyle: styles.tabBarText,
          tabBarIcon: ({ focused }) => TabBarIcon(<MessagesSelected />, <Messages />, focused),
        }}
      />
      <Tab.Screen
        name={AppScreen.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabelStyle: styles.tabBarText,
          tabBarIcon: ({ focused }) => TabBarIcon(<Settings />, <Settings />, focused),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: MetricsSizes.vs65,
    paddingTop: MetricsSizes.vs15,
    paddingBottom: MetricsSizes.vs12,
    gap: 5,
  },
  tabBarText: {
    fontFamily: FONTS.BAROSA.REGULAR,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 12,
  },
});
