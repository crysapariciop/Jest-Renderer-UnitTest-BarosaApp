import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import { BrandCard } from './personal-chat-screen-contract-cards/brandDetailsCard';
import { Img } from '@src/assets/images/image-constants/Images';
import { useTranslation } from 'react-i18next';
import { PayoutCard } from './personal-chat-screen-contract-cards/payoutDetailsCard';
import { DaysCounterCard } from './personal-chat-screen-contract-cards/daysCounterCard';
import Button from '@src/core-component/atoms/button';

interface defaultPropTypes {
  defaultChatText?: string;
  imageUrl?: ImageSourcePropType;
  isLinkCard?: boolean;
  isSeen?: boolean;
  isDocCard?: boolean;
  isDocuSign?: boolean;
  isBrand?: boolean;
  isDaysCount?: boolean;
  isDeliveryCard?: boolean;
  isPayoutCard?: boolean;
  isTrack?: boolean;
  isAuthCard?: boolean;
  activePercentage?: number;
  daysCount?: number;
  timeStamp?: string;
  defaultAvtar?: ImageSourcePropType;
  onPressNoAction?: () => void;
  onPressYesAction?: () => void;
}

export const DefaultChatCard = (props: defaultPropTypes) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.defaultChatView,
        {
          backgroundColor: theme?.chatCard,
        },
      ]}
    >
      {props?.isDaysCount ? (
        <DaysCounterCard
          activePercentage={props?.activePercentage}
          daysCount={props?.daysCount}
          brandHeader={`${props?.daysCount} days remaining`}
          productPrice="For buyers return period to over"
        />
      ) : null}

      {props?.isBrand ? (
        <BrandCard
          buttonStyle={{ width: '30%' }}
          isNormal
          productPrice="$22,100"
          brandBanner={Img.sampleWatch}
          brandHeader={'Rolex Submariner | 2003'}
          buttonTitle={'See detail'}
        />
      ) : null}
      {props?.isDeliveryCard ? (
        <BrandCard
          isDelivery
          isNormal
          productPrice="Product has been to delivered to buyer.
                Buyer has now 5 days to return product."
          brandBanner={Img.FedXLogo}
          brandHeader={'Delivered to buyer'}
          buttonTitle={'See detail'}
        />
      ) : null}
      {props?.isPayoutCard ? (
        <PayoutCard brandHeader="Rolex Submariner" year="2023" brandBanner={Img.DollarSign} />
      ) : null}
      {props?.defaultChatText || props?.isAuthCard ? (
        <MagicText
          style={[
            styles.defaultChatText,
            { fontSize: props?.isAuthCard ? MetricsSizes.ms14 : MetricsSizes.ms12 },
          ]}
          type="REGULAR"
        >
          {props?.isAuthCard
            ? 'Product received do you want to create an authentication NFT?'
            : props?.defaultChatText}
        </MagicText>
      ) : null}
      {props?.isAuthCard ? (
        <View style={styles.buttonRow}>
          <Button
            onPress={props?.onPressNoAction}
            type="SECONDARY"
            label={'No'}
            style={styles.noButtonLable}
          />
          <Button
            onPress={props?.onPressYesAction}
            type="PRIMARY"
            label={'Yes'}
            style={styles.yesButtonLable}
          />
        </View>
      ) : null}

      <MagicText
        style={[
          styles.defaultTimeStamp,
          {
            color: theme?.darkestGreyText,
          },
        ]}
        type="REGULAR"
      >
        {props?.timeStamp}
      </MagicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultMainView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: MetricsSizes.vs30,
    marginHorizontal: MetricsSizes.hs10,
  },

  defaultChatView: {
    width: DEVICE_WIDTH * 0.925,
    borderRadius: MetricsSizes.ms15,
    alignSelf: 'center',
    marginTop: MetricsSizes.vs25,
  },

  defaultChatText: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: MetricsSizes.ms12,
    width: '95%',
    marginTop: MetricsSizes.vs8,
  },
  defaultAvtar: {
    marginTop: MetricsSizes.vs20,
    alignSelf: 'flex-start',
    top: -MetricsSizes.vs35,
  },

  defaultTimeStamp: {
    marginBottom: MetricsSizes.vs2,
    marginRight: MetricsSizes.hs10,
    alignSelf: 'flex-end',
    fontSize: MetricsSizes.ms10,
  },
  buttonRow: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: MetricsSizes.vs5,
  },
  yesButtonLable: {
    width: DEVICE_WIDTH * 0.25,
    paddingVertical: MetricsSizes.vs13,
    marginRight: MetricsSizes.ms8,
  },
  noButtonLable: {
    width: DEVICE_WIDTH * 0.25,
    paddingVertical: MetricsSizes.vs13,
    margin: MetricsSizes.ms8,
  },
});
