import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MagicTextInputStyle from './style';
import Colors, { COLOR } from '../../../theme/colors';
import MagicText from '../MagicText';

export type MagicTextInputType = {
  placeholder: string;
  onRightIconPress?: () => void;
  rightIcon?: ReactNode;
  isValid?: boolean;
  mainViewStyle?: ViewStyle;
  errorMessage?: string | null;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<Text>;
  inputHeaderLabel?: string | null;
  isRequired?: boolean;
} & TextInputProps;

const MagicTextInput = ({
  placeholder,
  onRightIconPress = () => {},
  rightIcon,
  errorMessage = '',
  mainViewStyle,
  isValid = true,
  style,
  containerStyle,
  errorStyle,
  inputHeaderLabel,
  isRequired,
  ...TextInputProps
}: MagicTextInputType) => {
  return (
    <>
      {inputHeaderLabel ? (
        <View style={{ flexDirection: 'row' }}>
          <MagicText isRequired={isRequired}>{inputHeaderLabel}</MagicText>
        </View>
      ) : null}
      <View style={[style, mainViewStyle]}>
        <View style={[MagicTextInputStyle.inputContainer, containerStyle]}>
          <TextInput
            style={MagicTextInputStyle.input}
            placeholder={placeholder}
            placeholderTextColor={COLOR.PLACEHOLDER_TEXT_GREY}
            {...TextInputProps}
          />
          {rightIcon ? (
            <TouchableOpacity style={MagicTextInputStyle.iconStyle} onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          ) : null}
        </View>
        {!isValid && errorMessage ? (
          <MagicText style={[MagicTextInputStyle.errStyle, errorStyle]}>{errorMessage}</MagicText>
        ) : null}
      </View>
    </>
  );
};

export default MagicTextInput;
