import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import Button from '@src/core-component/atoms/button';
import { useTranslation } from 'react-i18next';

interface PricePropsTypes {
  userName?: string;
  returnDays?: string;
  price?: string;
  barosaFee?: string;
  saleTax?: string;
  creditFee?: string;
  escrowFee?: string;
  totalCost?: string;
  shippingNInsurance?: string;
  isSender?: boolean;
  isAccepted?: boolean;
  isUpdated?: boolean;
  onPressInfoAction?: () => void;
  onPressCounterAction?: () => void;
  onPressAcceptAction?: () => void;
}

const ProposalConfirmationCard = (props: PricePropsTypes) => {
  const { t } = useTranslation();

  const PriceData = [
    {
      title: t('personalChat.price'),
      value: Math.round(parseFloat(props?.price as string)),
    },
    {
      title: t('personalChat.barosaFee'),
      value: Math.round(parseFloat(props?.barosaFee as string)),
    },
    {
      title: t('personalChat.saleTax'),
      value: `${Math.round(parseInt(props?.price as string) * 0.095)}`,
    },
    {
      title: t('personalChat.creditFee'),
      value: `${Math.round(parseInt(props?.price as string) * 0.035)}`,
    },
    {
      title: t('personalChat.escrowFee'),
      value:
        parseInt(props?.escrowFee as string) === 0 || !props?.escrowFee
          ? `0 (covered by Barosa)`
          : Math.round(parseFloat(props?.escrowFee as string)),
    },
    {
      title: t('personalChat.shippingNInsurance'),
      value: Math.round(parseFloat(props?.shippingNInsurance as string)),
    },
  ];

  const totalPrice = PriceData.reduce((sum, item) => {
    const itemValue = parseFloat(item?.value as string);
    if (!isNaN(itemValue)) {
      return sum + itemValue;
    }
    return sum;
  }, 0);

  const renderPriceData = () => {
    return PriceData.map((item) => (
      <MagicText key={item.title} style={styles.defaultText} type="REGULAR">
        {`${item?.title} $${item?.value}`}
      </MagicText>
    ));
  };

  return (
    <View>
      {/* Imp Used in future=====> */}
      {/* <TouchableOpacity onPress={props?.onPressInfoAction} style={styles.infoIconContainer}>
        <RemixIcon size={MetricsSizes.ms25} name="ri-information-line" />
      </TouchableOpacity> */}
      {/* Imp Used in future=====> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <RemixIcon name="ri-draft-line" size={MetricsSizes.ms26} color={Colors.mainThemeBg} />
          <MagicText style={styles.headerText} type="SEMI_BOLD">
            {`${props?.userName} just sent you a proposal`}
          </MagicText>
        </View>
        <View style={styles.divider} />
        <View style={styles.priceContainer}>{renderPriceData()}</View>

        <MagicText style={styles.defaultText} type="SEMI_BOLD">
          {`Total Cost $${props?.totalCost ?? totalPrice}`}
        </MagicText>
      </View>
      {props?.isSender || props?.isUpdated ? null : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={props?.onPressCounterAction}
            style={[styles.button, { backgroundColor: Colors.greyText }]}
            label={t('personalChat.counter')}
          />
          <Button
            onPress={props?.onPressAcceptAction}
            style={styles.button}
            label={t('personalChat.accept')}
          />
        </View>
      )}
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
    flex: 0.9,
    fontSize: MetricsSizes.ms14,
    marginLeft: MetricsSizes.hs10,
  },
  divider: {
    height: 0.8,
    backgroundColor: Colors.darkGrey,
    marginVertical: MetricsSizes.ms10,
  },

  label: {
    fontSize: MetricsSizes.ms12,
    color: Colors.greyText,
  },
  infoIconContainer: {
    alignSelf: 'flex-end',
    paddingTop: MetricsSizes.ms10,
    paddingRight: MetricsSizes.hs5,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: MetricsSizes.vs15,
    width: '90%',
    alignSelf: 'center',
  },

  priceContainer: {
    marginVertical: MetricsSizes.vs20,
  },
  defaultText: {
    fontSize: MetricsSizes.ms14,
    textAlign: 'left',
    color: Colors.black,
    marginRight: MetricsSizes.hs20,
  },
  button: {
    width: '47%',
    borderRadius: MetricsSizes.ms10,
    paddingVertical: MetricsSizes.vs8,
  },
});

export default ProposalConfirmationCard;
