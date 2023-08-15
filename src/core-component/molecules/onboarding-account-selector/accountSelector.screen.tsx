// Import dependencies
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';

import { GreenDot, GreyDot, SampleAvtar } from '@src/assets/icons/on-boarding-icons';
import MagicText from '../../atoms/MagicText';

import Colors from '../../../theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { styles } from './accountSelector.styles';
import Images from '../../../theme/images';
import { useTheme } from '@src/theme/themeProvider';

interface SelectorTypes {
  title: string;
  subtitle: string;
  userType: string;
}

interface SelectionTypes {
  data: SelectorTypes[];
  onUserTypeSelect: (e: any) => void;
}

interface ItemType {
  item: SelectorTypes;
}

const AccountSelector = (props: SelectionTypes) => {
  const [selection, setSelection] = useState<string>('Individual User');

  const { theme } = useTheme();

  const renderSelector = ({ item }: ItemType) => {
    const isSelected = selection === item.title;

    const handlePress = () => {
      setSelection(item.title);
      props.onUserTypeSelect(item.userType);
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.mainCardView,
          {
            shadowColor: theme?.background,
            borderColor: isSelected ? theme?.mainThemeBg : theme?.buttonBg,
            backgroundColor: isSelected ? theme?.lightGreenBg : theme?.background,
          },
        ]}
      >
        <Image
          source={Images.greyAvtar}
          style={[styles.avtarImg, { tintColor: theme?.buttonBg }]}
        />
        <View style={styles.textContainer}>
          <MagicText type="SEMI_BOLD" style={styles.title}>
            {item.title}
          </MagicText>

          <MagicText style={[styles.subtitle, { color: theme?.subTitleText }]} type="REGULAR">
            {item.subtitle}
          </MagicText>
        </View>
        {isSelected ? (
          <GreenDot height={MetricsSizes.ms16} width={MetricsSizes.ms16} style={styles.dot} />
        ) : (
          <GreyDot height={MetricsSizes.ms16} width={MetricsSizes.ms16} style={styles.dot} />
        )}
      </TouchableOpacity>
    );
  };

  return <FlatList data={props.data} renderItem={renderSelector} />;
};

export default AccountSelector;
