import React from 'react';
import { FlatList, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import Colors, { COLOR } from '@src/theme/colors';
import { PaymentReqDetails } from '../Constants';
import { Img } from '@src/assets/images/image-constants/Images';
import { useTranslation } from 'react-i18next';
import Button from '@src/core-component/atoms/button';

interface brandPropTypes {
  brandBanner: ImageSourcePropType;
  brandHeader: string;
  brandTitle?: string;
  brandText?: string;
  yearValue?: number | string;
  isNormal?: boolean;
  isDelivery?: boolean;
  isYear?: boolean;
  buttonTitle?: string | null;
  payoutData?: [];
  year?: string;
  onPressSendAction: () => void;
  onPressDeclineAction: () => void;
}

export const PaymentReqCard = (props: brandPropTypes) => {
  interface itemProps {
    title: string;
    brand: string;
    text: string;
  }

  interface mainItemProps {
    item: itemProps;
    index: number;
  }

  const number = 21123.45;
  const wholeNumber = Math.floor(number);
  const decimalPart = (number - wholeNumber).toFixed(2).substring(2);

  const BrandDetails = ({ item, index }: mainItemProps) => {
    return (
      <>
        <View style={styles.content}>
          <MagicText
            style={[styles.label, { marginBottom: index === 0 ? MetricsSizes.vs8 : 0 }]}
            type="REGULAR"
          >
            {item?.title}
          </MagicText>
          <MagicText style={styles.trackingId} type="MEDIUM">
            {item?.text}
          </MagicText>
        </View>
      </>
    );
  };

  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View>
      <View
        style={[
          styles.brandDataCard,
          {
            backgroundColor: theme?.background,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={[props?.isNormal ? styles.normalbrandDataView : styles.brandDataView]}>
            <Image style={styles.brandBanner} source={Img.DollarSign} />
          </View>
          <MagicText
            style={[styles.brandHeaderText, { marginLeft: MetricsSizes.hs10 }]}
            type="SEMI_BOLD"
          >
            {t('personalChat.paymentReq')}
          </MagicText>
        </View>
        <>
          <View style={styles.separator} />
          <FlatList data={PaymentReqDetails} renderItem={BrandDetails} />
        </>
        <View style={styles.separator} />
        <MagicText style={styles.label} type="REGULAR">
          {t('personalChat.totalAmount')}
        </MagicText>

        <View style={styles.row}>
          <MagicText style={styles.productAmountWhole} type="BOLD">
            {wholeNumber.toLocaleString()}
          </MagicText>
          <MagicText style={styles.productAmountDecimal} type="BOLD">
            {`.${decimalPart}`}
          </MagicText>
          <MagicText style={styles.priceTypeTag} type="REGULAR">
            {'USD'}
          </MagicText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={props?.onPressSendAction}
          style={[styles.button]}
          label={t('personalChat.sendPayment')}
        />
        <Button
          onPress={props?.onPressDeclineAction}
          style={[styles.button, { backgroundColor: Colors.lightGrey }]}
          labelStyle={{ color: Colors.greyText }}
          label={t('personalChat.decline')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  brandDataCard: {
    width: '95%',
    alignSelf: 'center',
    margin: '2.5%',
    borderRadius: MetricsSizes.ms10,
    padding: '2.5%',
  },
  brandDataView: {
    height: MetricsSizes.ms50,
    width: MetricsSizes.ms50,
    borderRadius: MetricsSizes.ms10,
  },
  normalbrandDataView: {
    height: MetricsSizes.ms75,
    width: MetricsSizes.ms75,
    borderRadius: MetricsSizes.ms10,
  },
  brandTextView: {
    marginLeft: MetricsSizes.hs8,
    width: '80%',
  },
  payoutTitleText: {
    fontSize: MetricsSizes.ms14,
    fontWeight: '600',
    color: Colors.lightGreyText,
  },
  brandHeaderText: {
    flex: 1,
    fontSize: MetricsSizes.ms16,
    marginBottom: MetricsSizes.vs5,
  },
  priceTypeTag: {
    color: Colors.greyText,
    fontSize: MetricsSizes.ms16,
    paddingTop: MetricsSizes.vs10,
    marginLeft: MetricsSizes.hs5,
  },
  brandHeaderTitleText: {
    fontSize: MetricsSizes.ms14,
    marginBottom: MetricsSizes.vs5,
  },

  productAmountWhole: {
    fontSize: MetricsSizes.ms24,
    marginBottom: MetricsSizes.vs5,
    paddingTop: MetricsSizes.vs10,
  },
  productAmountDecimal: {
    fontSize: MetricsSizes.ms16,
    marginBottom: MetricsSizes.vs5,
    paddingTop: MetricsSizes.vs10,
  },
  brandTitleText: {
    fontSize: MetricsSizes.ms12,
    marginBottom: MetricsSizes.vs5,
  },
  brandText: {
    fontSize: MetricsSizes.ms12,
    marginBottom: MetricsSizes.vs5,
  },
  brandBanner: { height: '100%', width: '100%' },
  separator: {
    height: 0.4,
    width: '100%',
    marginVertical: MetricsSizes.vs10,
    backgroundColor: Colors.greyText,
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
    color: COLOR.OUTLINE_BUTTON_TEXT,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: MetricsSizes.vs5,
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: MetricsSizes.hs25,
    borderRadius: MetricsSizes.ms30,
    paddingVertical: MetricsSizes.vs12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
});
