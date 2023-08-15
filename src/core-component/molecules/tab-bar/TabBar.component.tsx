import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Home,
  HomeSelected,
  User,
  UserSelected,
  Messages,
  MessagesSelected,
  Settings,
} from '@src/assets/icons/tab-bar-icons';

import { MagicText } from '@src/core-component/atoms';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import { useTranslation } from 'react-i18next';
import Colors from '@src/theme/colors';

const emptyIconNames: SVGElement[] = [<Home />, <User />, <Messages />, <Settings />];
const fillIconNames: SVGElement[] = [
  <HomeSelected />,
  <UserSelected />,
  <MessagesSelected />,
  <Settings />,
];

/**
 * @deprecated Using react navigation provided tabBar instead.
 */
const MyTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme }: any = useTheme();
  const { t } = useTranslation();
  const [tabStyle, setTabStyle] = useState({});

  const tabNames: string[] = [
    t('bottomTab.home'),
    t('bottomTab.profile'),
    t('bottomTab.messages'),
    t('bottomTab.settings'),
  ];

  return (
    <View style={[styles.bottomRow, { backgroundColor: theme?.background }, tabStyle]}>
      {state?.routes?.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string = tabNames[index];
        const iconEmpty: any = emptyIconNames[index];
        const iconFill: any = fillIconNames[index];
        const isFocused: boolean = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress: () => void = () => {
          return onLongPress();
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.buttonStyle}
          >
            {isFocused ? iconFill : iconEmpty}
            <MagicText
              style={{ color: isFocused ? Colors.goldColor : theme?.darkGreyBottomTab }}
              type="REGULAR"
            >
              {label}
            </MagicText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: MetricsSizes.vs0,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    width: DEVICE_WIDTH,
    borderColor: Colors.tabBarBorder,
    paddingVertical: DEVICE_HEIGHT * 0.02,
  },
});
