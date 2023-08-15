import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import Button from '@src/core-component/atoms/button';
import { useTranslation } from 'react-i18next';

const RenderPrice = ({ title, value }: any) => {
  return (
    <View style={styles.content}>
      <MagicText style={styles.label} type="REGULAR">
        {title}
      </MagicText>
      <MagicText style={styles.trackingId} type="MEDIUM">
        {value}
      </MagicText>
    </View>
  );
};

interface PricePropsTypes {
  priceValue: string;
  daysValue: string;
  isSender?: boolean;
  isAccepted?: boolean;
  isUpdated?: boolean;
  onPressAcceptAction?: () => void;
  onPressRejectAction?: () => void;
}

const PricePendingCard = (props: PricePropsTypes) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.container}>
        {props?.isUpdated && !props?.isSender ? (
          <View
            style={[
              styles.thumbDot,
              {
                right: -MetricsSizes.ms20,
                alignSelf: 'flex-end',
                backgroundColor: props?.isAccepted ? Colors.mainThemeBg : Colors.msgDot,
              },
            ]}
          >
            <RemixIcon
              color={Colors.whiteBg}
              name={props?.isAccepted ? 'ri-thumb-up-fill' : 'ri-thumb-down-fill'}
              size={MetricsSizes.ms15}
            />
          </View>
        ) : props.isUpdated && props?.isSender ? (
          <View
            style={[
              styles.thumbDot,
              {
                left: -MetricsSizes.ms20,
                alignSelf: 'flex-start',
                backgroundColor: props?.isAccepted ? Colors.mainThemeBg : Colors.msgDot,
              },
            ]}
          >
            <RemixIcon
              color={Colors.whiteBg}
              name={props?.isAccepted ? 'ri-thumb-up-fill' : 'ri-thumb-down-fill'}
              size={MetricsSizes.ms15}
            />
          </View>
        ) : null}

        <View style={styles.header}>
          <RemixIcon name="ri-draft-line" size={MetricsSizes.ms26} color={Colors.mainThemeBg} />
          <MagicText style={styles.headerText} numberOfLines={1} type="SEMI_BOLD">
            {t('personalChat.shareDealTerms')}
          </MagicText>
        </View>
        <View style={styles.divider} />
        <RenderPrice
          title={'Price (individual User)'}
          value={props?.priceValue ? `$${props?.priceValue}` : ''}
        />
        <RenderPrice title={'Return Period - Number of days'} value={props?.daysValue || ''} />
        {props?.isSender || props?.isUpdated ? null : (
          <View style={styles.buttonContainer}>
            <Button
              onPress={props?.onPressRejectAction}
              style={styles.button}
              label={t('personalChat.reject')}
              type="SECONDARY"
            />
            <Button
              onPress={props?.onPressAcceptAction}
              style={styles.button}
              label={t('personalChat.accept')}
              type="PRIMARY"
            />
          </View>
        )}
      </View>
      <MagicText style={styles.senderChatText} type="REGULAR">
        {t('personalChat.proposalTerms')}
      </MagicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteBg,
    borderRadius: MetricsSizes.ms10,
    width: '95%',
    alignSelf: 'center',
    padding: MetricsSizes.ms10,
    marginTop: MetricsSizes.vs10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: MetricsSizes.ms14,
    marginLeft: MetricsSizes.hs10,
  },
  divider: {
    height: 0.8,
    backgroundColor: Colors.darkGrey,
    marginVertical: MetricsSizes.ms10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: MetricsSizes.ms12,
    color: Colors.greyText,
  },
  trackingId: {
    fontSize: MetricsSizes.ms12,
    fontWeight: '600',
    color: Colors.lightGreyText,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: MetricsSizes.vs12,
  },
  button: {
    minWidth: '35%',
    marginLeft: MetricsSizes.hs15,
  },
  thumbDot: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: MetricsSizes.ms25,
    padding: MetricsSizes.ms7,
    top: -MetricsSizes.ms20,
    position: 'absolute',
  },
  senderChatText: {
    marginTop: MetricsSizes.vs20,
    marginLeft: MetricsSizes.hs15,
    marginBottom: -MetricsSizes.vs20,
    fontSize: MetricsSizes.ms12,
  },
});

export default PricePendingCard;
