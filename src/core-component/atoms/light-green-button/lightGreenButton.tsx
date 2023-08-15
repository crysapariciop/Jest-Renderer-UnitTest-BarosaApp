//import liraries
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MagicText from '../MagicText';
import Colors from '@src/theme/colors';
import { LighbuttonProps } from './type';

// create a component
const LightGreenButton = (props: LighbuttonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={props?.onPress}
      style={[styles.pressableView, props?.buttonStyle]}
    >
      {props?.isDot ? <View style={styles.greenDot} /> : null}
      <MagicText style={[styles.textStyle, props?.titleStyle]} type="REGULAR">
        {props?.title}
      </MagicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressableView: {
    backgroundColor: Colors.lightGreen,
    padding: MetricsSizes.ms5,
    paddingHorizontal: MetricsSizes.hs12,
    borderRadius: MetricsSizes.ms30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: MetricsSizes.ms12,
    color: Colors.mainThemeBg,
    marginTop: MetricsSizes.vs1,
  },
  greenDot: {
    height: MetricsSizes.ms8,
    width: MetricsSizes.ms8,
    backgroundColor: Colors.greenButton,
    borderRadius: MetricsSizes.ms25,
    marginRight: MetricsSizes.hs4,
  },
});

export default LightGreenButton;
