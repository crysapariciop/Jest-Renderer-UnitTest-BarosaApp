import { MetricsSizes } from '@src/theme/metrics';
import React, { ReactElement, ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MagicText from '../MagicText';
import { styles } from './style';

type CommonPageHeaderTypes = {
  pageName?: string | null;
  onPress?: () => void;
  onRightIconPress?: () => void;
  leftIcon?: ReactNode | ReactElement;
  rightIcon?: ReactNode | ReactElement;
};
const CommonPageHeader = ({
  pageName,
  onPress = () => {},
  onRightIconPress = () => {},
  leftIcon,
  rightIcon,
}: CommonPageHeaderTypes) => {
  return (
    <View style={[styles.rowStyle]}>
      {leftIcon ? (
        <TouchableOpacity style={styles.leftIconStyle} onPress={onPress}>
          {leftIcon}
        </TouchableOpacity>
      ) : null}
      <MagicText
        type="SEMI_BOLD"
        style={[
          styles.pageName,
          leftIcon ? { marginLeft: MetricsSizes.hs0 } : { marginLeft: MetricsSizes.hs12 },
        ]}>
        {pageName}
      </MagicText>
      {rightIcon ? (
        <TouchableOpacity style={[styles.rightIconStyle]} onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommonPageHeader;
