import React from 'react';

import RemixIcon from 'react-native-remix-icon';
import { MagicText } from '@src/core-component/atoms';

import { useTheme } from '../../../theme/themeProvider';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Colors from '@src/theme/colors';

interface DarkButtonProps {
  title: string;
  IconName?: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
}

const DarkRoundButton = (props: DarkButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={props?.onPress}
      {...props}
      activeOpacity={0.65}
      style={[styles.mainView, props?.buttonStyle]}
    >
      {props?.IconName ? (
        <RemixIcon name={props?.IconName} color={Colors.whiteBg} size={MetricsSizes.ms21} />
      ) : null}
      <MagicText
        type="SEMI_BOLD"
        style={[
          styles.titleText,
          {
            color: theme?.background,
          },
        ]}
      >
        {props?.title}
      </MagicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkRoundButtonBG,
    borderRadius: MetricsSizes.ms30,
    padding: MetricsSizes.ms10,
    paddingHorizontal: MetricsSizes.hs17,
    minWidth: DEVICE_WIDTH * 0.275,
    justifyContent: 'center',
  },
  titleText: {
    paddingTop: MetricsSizes.vs3,
    fontSize: MetricsSizes.ms14,
    marginLeft: MetricsSizes.hs5,
  },
});

export default DarkRoundButton;
