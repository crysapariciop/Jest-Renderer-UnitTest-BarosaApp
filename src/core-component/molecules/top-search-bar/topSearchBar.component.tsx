import { useIsFocused } from '@react-navigation/native';
import { MagicText, MagicTextInput } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface SeachBarTypes extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  placeholder?: string | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (e: string) => void;
  value?: string;
  showWarning?: boolean;
  warningMsg?: string;
}

const SearchBar = ({
  rightIcon,
  onLeftIconPress = () => {},
  onRightIconPress = () => {},
  placeholder = '',
  containerStyle,
  onChangeText = () => {},
  value,
  showWarning,
  warningMsg,
  ...TextInputProps
}: SeachBarTypes) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftIconStyle} onPress={onLeftIconPress}>
          <RemixIcon
            name={'ri-arrow-left-s-line'}
            size={MetricsSizes.ms24}
            color={Colors.goldColor}
          />
        </TouchableOpacity>
        <MagicTextInput
          style={styles.textinput}
          placeholder={placeholder}
          containerStyle={[containerStyle]}
          rightIcon={rightIcon}
          onChangeText={onChangeText}
          onRightIconPress={onRightIconPress}
          value={value}
          {...TextInputProps}
        />
      </View>
      {showWarning && warningMsg ? (
        <MagicText style={styles.warningMsgStyle}>{warningMsg}</MagicText>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: { flex: 1 },
  leftIconStyle: { marginRight: MetricsSizes.hs8 },
  warningMsgStyle: {
    fontSize: MetricsSizes.ms10,
    marginLeft: MetricsSizes.hs32,
    color: Colors.greyText,
  },
});

export default SearchBar;
