// @flow
import React, { ReactElement, ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
  ActivityIndicator,
  ColorValue,
} from 'react-native';
import ButtonStyle from './style';
import MagicText from '../MagicText';
import { getButtonStyle } from './utils';
import Colors from '../../../theme/colors';

type ButtonPropType = {
  type?: 'PRIMARY' | 'SECONDARY' | 'OUTLINE' | 'TEXT' | 'ICON';
  label?: string | null;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode | ReactElement;
  rightIcon?: ReactNode | ReactElement;
  centerIcon?: ReactNode | ReactElement;
  loading?: boolean;
  loaderColor?: ColorValue;
  iconContainerStyle?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;

const Button = ({
  type = 'PRIMARY',
  label,
  onPress = () => {},
  disabled = false,
  style,
  labelStyle,
  contentStyle,
  leftIcon,
  rightIcon,
  centerIcon,
  loading = false,
  loaderColor = Colors.whiteBg,
  iconContainerStyle,
}: ButtonPropType) => {
  const newStyle = getButtonStyle(type);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[ButtonStyle.containerStyle, newStyle[0], style]}
      onPress={(e) => {
        if (disabled) return;
        onPress(e);
      }}>
      {loading && !disabled ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <View style={[ButtonStyle.buttonContentStyle, contentStyle]}>
          {leftIcon ? (
            <View style={[ButtonStyle.buttonLeftIconContainer, iconContainerStyle]}>
              {leftIcon}
            </View>
          ) : null}

          {type === 'ICON' && centerIcon ? (
            <View style={[newStyle[1], labelStyle]}>{centerIcon}</View>
          ) : null}
          {label ? <MagicText style={[newStyle[1], labelStyle]}>{label}</MagicText> : null}
          {rightIcon ? (
            <View style={[ButtonStyle.buttonRightIconContainer, iconContainerStyle]}>
              {rightIcon}
            </View>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
