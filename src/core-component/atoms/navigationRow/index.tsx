import React, { SVGProps } from 'react';
import { View, TouchableOpacity, Image, StyleProp, TextStyle } from 'react-native';
import MagicText from '../MagicText';
import { styles } from './style';
import { DealLogo } from '@src/assets/icons/home-module-icons';
import { MetricsSizes } from '@src/theme/metrics';
import Colors from '@src/theme/colors';

interface MyComponentProps<T extends React.ReactElement<SVGProps<T>>> {
  leftIcon?: T;
  rightIcon?: T;
  label?: string | null;
  subLabel?: string | null;
  subLabelIcon?: T;
  onPress?: () => void;
  leftImage?: string;
  subLabelStyle?: StyleProp<TextStyle>;
}

const NavigationRow = <T extends React.ReactElement<SVGProps<T>>>({
  leftIcon,
  rightIcon,
  leftImage,
  label,
  subLabel,
  subLabelStyle,
  subLabelIcon,
  onPress = () => {},
}: MyComponentProps<T>) => {
  return (
    <TouchableOpacity style={[styles.parentRowContainer]} onPress={onPress}>
      <View style={styles.childRow}>
        {leftIcon ? (
          leftIcon
        ) : leftImage ? (
          <Image
            source={{ uri: leftImage }}
            style={{
              height: MetricsSizes.ms40,
              width: MetricsSizes.ms40,
              borderRadius: MetricsSizes.ms20,
              borderColor: Colors.chatCardBG,
              borderWidth: 1,
            }}
          />
        ) : null}
        <View style={styles.labelsContainer}>
          <MagicText type="SEMI_BOLD" style={styles.labelTextStyle}>
            {label}
          </MagicText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {subLabelIcon ? <View style={{ marginRight: 4 }}>{subLabelIcon}</View> : null}
            {subLabel ? (
              <MagicText type="MEDIUM" style={(styles.subLabelStyle, subLabelStyle)}>
                {subLabel}
              </MagicText>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.rightIconStyle}>{rightIcon ? rightIcon : null}</View>
    </TouchableOpacity>
  );
};

export default NavigationRow;
