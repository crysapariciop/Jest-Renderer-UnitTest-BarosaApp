import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';

import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import Avatar from '@src/core-component/molecules/user-avtar';
import { MagicText } from '@src/core-component/atoms';
import { useTheme } from '@src/theme/themeProvider';

// create a component
interface ChatUserPropTypes {
  userName: string;
  msgCount?: number;
  userMessage?: string;
  imageUrl?: ImageSourcePropType | undefined | null;
  isDeal?: boolean;
  isInvite?: boolean;
  onPressCard?: () => void;
  onPressInviteAction?: () => void;
}

const ChatUserCard = (props: ChatUserPropTypes) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={props.onPressCard} activeOpacity={0.5} style={styles.chatCard}>
      <View style={styles.avtarView}>
        <Avatar imageURL={props?.imageUrl ? props?.imageUrl : null} />
        <View style={{ marginLeft: MetricsSizes?.hs6 }}>
          <View style={styles.userNameView}>
            <MagicText style={[styles.userNameStyle, { color: theme?.blackText }]} type="SEMI_BOLD">
              {props?.userName}
            </MagicText>
          </View>
        </View>
      </View>
      {props.isInvite ? (
        <TouchableOpacity
          onPress={props?.onPressInviteAction}
          style={[
            styles.InviteButton,
            {
              borderColor: theme?.greenButton,
            },
          ]}
        >
          <MagicText
            style={[
              styles.userNameStyle,
              { color: theme?.greenButton, fontSize: MetricsSizes?.ms12 },
            ]}
            type="REGULAR"
          >
            Invite
          </MagicText>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: DEVICE_WIDTH,
    alignItems: 'center',
    paddingHorizontal: MetricsSizes.hs16,
    paddingVertical: MetricsSizes.vs12,
  },
  avtarView: {
    flexDirection: 'row',
    alignItems: 'center',
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
  InviteButton: {
    borderWidth: 1,
    padding: MetricsSizes.ms6,
    borderRadius: MetricsSizes.ms5,
  },
});

export default ChatUserCard;
