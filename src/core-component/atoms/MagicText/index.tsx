// @flow
import React from 'react';
import { TextProps, Text, View } from 'react-native';
import { getFontMegicStyle } from './utils';
import Colors from '@src/theme/colors';

type MagicTextPropType = {
  type?: 'REGULAR' | 'MEDIUM' | 'SEMI_BOLD' | 'LIGHT' | 'BLACK' | 'BOLD';
  isRequired?: boolean;
} & TextProps;

const MagicText = ({
  type = 'REGULAR',
  style,
  isRequired = false,
  ...props
}: MagicTextPropType) => {
  let newStyle = getFontMegicStyle(type);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[newStyle, style]} {...props}>
        {props.children}
      </Text>
      {isRequired ? <Text style={{ color: Colors.red }}> *</Text> : null}
    </View>
  );
};

export default MagicText;
