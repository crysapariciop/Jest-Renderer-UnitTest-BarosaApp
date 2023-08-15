//import liraries
import HeaderTop from '@src/core-component/molecules/header-top-bar/topHeader.screen';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';

import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import Avatar from '@src/core-component/molecules/user-avtar';
import { MagicText } from '@src/core-component/atoms';
import { useTheme } from '@src/theme/themeProvider';
import RemixIcon from 'react-native-remix-icon';
import Colors from '@src/theme/colors';

interface ChatPropTypes {
  userName: string;
  type?: string;
  userMessage?: string;
  msgCount?: number | null | string;
  imageUrl?: ImageSourcePropType | null;
  secondImageUrl?: ImageSourcePropType | null;
  isDeal?: boolean;
  isSigned?: boolean;
  onPressCard: () => void;
  CardStyle?: ViewStyle;
  userNameStyleProp?: ViewStyle;
  greyTextStyle?: ViewStyle;
  signStatus?: string;
}

const ChatCard = (props: ChatPropTypes) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPressCard}
      activeOpacity={0.5}
      style={[styles.chatCard, props?.CardStyle]}
    >
      <View style={styles.centeredRow}>
        <View style={styles.centeredRow}>
          <Avatar imageURL={props?.imageUrl ? props?.imageUrl : null} msgCount={props?.msgCount} />
          {props?.type === 'D' ? (
            <Avatar
              style={styles.secondaryAvtar}
              imageURL={props?.secondImageUrl ? props?.secondImageUrl : null}
            />
          ) : null}
        </View>
        <View style={{ marginLeft: MetricsSizes.hs6 }}>
          <View style={styles.userNameView}>
            <MagicText
              style={[
                styles.userNameStyle,

                {
                  color: theme?.blackText,
                  maxWidth: props?.isSigned ? DEVICE_WIDTH * 0.45 : DEVICE_WIDTH * 0.7,
                },
                props?.userNameStyleProp,
              ]}
              type="SEMI_BOLD"
            >
              {props.userName}
            </MagicText>
            <View
              style={[
                styles.dealButtonView,
                {
                  backgroundColor: theme?.greenButton,
                },
              ]}
            >
              {props.isDeal ? (
                <MagicText
                  style={[
                    styles.dealLogo,
                    {
                      color: theme?.background,
                    },
                  ]}
                  type="REGULAR"
                >
                  {'DEAL'}
                </MagicText>
              ) : null}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <MagicText
              numberOfLines={props?.isSigned ? 5 : 1}
              style={[
                styles.userMessageStyle,
                props?.greyTextStyle,
                { color: theme?.darkGreyChat },
              ]}
              type="REGULAR"
            >
              {props.userMessage}
            </MagicText>
          </View>
        </View>
      </View>

      {props?.isSigned ? (
        <View style={styles.signersLogoView}>
          <RemixIcon
            name={
              props?.signStatus === 'Signed'
                ? 'ri-checkbox-circle-fill'
                : 'ri-checkbox-blank-circle-line'
            }
            size={MetricsSizes.ms15}
            color={Colors.mainThemeBg}
          />
          <MagicText
            style={[
              styles.userMessageStyle,
              {
                color: theme?.darkGreyChat,
                marginTop: MetricsSizes.vs2,
                marginLeft: MetricsSizes.hs5,
              },
            ]}
            type="MEDIUM"
          >
            {props?.signStatus}
          </MagicText>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: 'row',
    width: DEVICE_WIDTH,
    paddingHorizontal: MetricsSizes.hs16,
    paddingVertical: MetricsSizes.vs12,
  },
  dealButtonView: {
    marginLeft: MetricsSizes.hs12,
    borderRadius: MetricsSizes.ms10,
    paddingHorizontal: MetricsSizes.hs5,
    marginBottom: MetricsSizes.vs5,
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userNameStyle: {
    fontSize: MetricsSizes.ms14,
    maxWidth: DEVICE_WIDTH * 0.7,
  },
  userMessageStyle: {
    fontSize: MetricsSizes.ms12,
  },
  dealLogo: {
    fontSize: MetricsSizes.ms8,
  },
  signersLogoView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: MetricsSizes.hs12,
  },
  secondaryAvtar: {
    marginLeft: -MetricsSizes.hs10,
    borderWidth: MetricsSizes.ms2,
    borderColor: Colors.whiteBg,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatCard;
