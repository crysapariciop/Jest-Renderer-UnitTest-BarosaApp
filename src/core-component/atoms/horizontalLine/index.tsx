import { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface HorizontalLineProps {
  style?: StyleProp<ViewStyle>;
}

const HorizontalLine = ({ style }: HorizontalLineProps) => {
  return <View style={[styles.lineStyle, style]} />;
};

const styles = StyleSheet.create({
  lineStyle: {
    height: MetricsSizes.ms1,
    width: '100%',
    backgroundColor: COLOR.TEXTINPUT_BORDER_GREY,
  },
});

export default HorizontalLine;
