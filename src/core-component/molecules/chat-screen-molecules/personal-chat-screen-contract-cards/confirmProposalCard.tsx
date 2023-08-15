import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import Button from '@src/core-component/atoms/button';

interface ProposalCardPropTypes {
  onPressInfoAction?: () => void;
  onPressReviceAction?: () => void;
  onPressShareAction?: () => void;
  totalCost?: string;
  userName?: string;
  returnDays?: string;
  price?: string;
  barosaFee?: string;
  saleTax?: string;
  creditFee?: string;
  escrowFee?: string;
  shippingNInsurance?: string;
}

const ConfirmProposalCard: React.FC<ProposalCardPropTypes> = (props) => {
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
        {`${item.title} $${item.value}`}
      </MagicText>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <RemixIcon size={MetricsSizes.ms40} name="ri-information-line" />
      </View>

      <TouchableOpacity onPress={props?.onPressInfoAction} style={styles.infoIconContainer}>
        <RemixIcon size={MetricsSizes.ms25} name="ri-information-line" />
      </TouchableOpacity>

      <MagicText style={styles.defaultText} type="REGULAR">
        {`${t('personalChat.proposalSendText')}${props?.userName}`}
      </MagicText>

      <View style={styles.priceContainer}>{renderPriceData()}</View>

      <View style={styles.rowContainer}>
        <MagicText style={[styles.defaultText, { marginRight: MetricsSizes.hs5 }]} type="REGULAR">
          {t('personalChat.totalCost')}
        </MagicText>
        <MagicText style={[styles.defaultText, { color: Colors.black }]} type="SEMI_BOLD">
          {`$${totalPrice}`}
        </MagicText>
      </View>

      <MagicText style={[styles.defaultText, styles.returnPeriodText]} type="REGULAR">
        {`${t('personalChat.return_Period')} ${props?.returnDays}`}
      </MagicText>

      <MagicText style={[styles.defaultText, styles.confirmText]} type="REGULAR">
        {`${t('personalChat.iflooksCorrect')} ${props?.userName}`}
      </MagicText>

      <View style={styles.buttonContainer}>
        <Button
          onPress={props?.onPressReviceAction}
          style={[styles.button, { backgroundColor: Colors.greyText }]}
          label={t('personalChat.revise')}
        />
        <Button
          onPress={props?.onPressShareAction}
          style={styles.button}
          label={t('personalChat.shareProposal')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Colors.confirmationCardBG,
    borderRadius: MetricsSizes.ms20,
    alignSelf: 'center',
    marginTop: MetricsSizes.vs15,
    padding: MetricsSizes.hs20,
  },
  iconContainer: {
    position: 'absolute',
    left: -MetricsSizes.ms15,
    top: -MetricsSizes.ms15,
  },
  infoIconContainer: {
    position: 'absolute',
    right: MetricsSizes.hs10,
    top: MetricsSizes.vs10,
  },
  defaultText: {
    fontSize: MetricsSizes.ms14,
    textAlign: 'left',
    color: Colors.whiteBg,
    marginRight: MetricsSizes.hs20,
  },
  priceContainer: {
    marginTop: MetricsSizes.vs20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnPeriodText: {
    fontSize: MetricsSizes.ms14,
    paddingTop: MetricsSizes.vs15,
  },
  confirmText: {
    marginVertical: MetricsSizes.vs20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: MetricsSizes.hs30,
    borderRadius: MetricsSizes.ms10,
    paddingVertical: MetricsSizes.vs10,
  },
});

export default ConfirmProposalCard;
