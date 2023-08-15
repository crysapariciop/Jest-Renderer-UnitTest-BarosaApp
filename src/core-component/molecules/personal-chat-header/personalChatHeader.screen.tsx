//import liraries
import React, { Component } from 'react';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageSourcePropType,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useTheme } from '@src/theme/themeProvider';
import Avatar from '@src/core-component/molecules/user-avtar';
import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';

interface PersonalTypes {
  userName: string;
  onPressBackAction: () => void;
  userAvtar?: ImageSourcePropType | undefined | null;
}

const PersonalChatHeader = (props: PersonalTypes) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.searchMainContainer,
        {
          backgroundColor: theme?.background,
        },
      ]}
    >
      <TouchableOpacity onPress={props.onPressBackAction}>
        <RemixIcon
          name="arrow-left-line"
          size={MetricsSizes.ms22}
          color={theme?.darkGreyBottomTab}
        />
      </TouchableOpacity>
      <View style={styles.avtarSubView}>
        <Avatar imageURL={props?.userAvtar} />

        <MagicText style={[styles.userNameStyle, { color: theme?.blackText }]} type="SEMI_BOLD">
          {props.userName}
        </MagicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MetricsSizes.vs12,
    paddingHorizontal: MetricsSizes.hs16,
    width: DEVICE_WIDTH,
    top: DEVICE_HEIGHT * 0,
    borderBottomWidth: 0.6,
    borderColor: Colors.greyText,
  },
  userNameStyle: {
    fontSize: MetricsSizes.ms14,
    maxWidth: DEVICE_WIDTH * 0.7,
    marginLeft: MetricsSizes.hs8,
  },
  avtarSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: MetricsSizes.hs8,
  },
});

export default PersonalChatHeader;
