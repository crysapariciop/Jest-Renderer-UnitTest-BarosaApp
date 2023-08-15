import React from 'react';
import { FlatList, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import LightGreenButton from '@src/core-component/atoms/light-green-button/lightGreenButton';
import Colors, { COLOR } from '@src/theme/colors';
import { payoutDetails } from '../Constants';
import { Img } from '@src/assets/images/image-constants/Images';

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
}

export const PayoutCard = (props: brandPropTypes) => {
  interface itemProps {
    title: string;
    brand: string;
  }

  interface mainItemProps {
    item: itemProps;
  }

  const BrandDetails = ({ item, index }: mainItemProps | any) => {
    return (
      <>
        {index === payoutDetails.length - 1 ? (
          <View>
            <View style={[styles.separator, { marginVertical: MetricsSizes.vs5 }]} />
            <View style={[styles.content, { marginTop: MetricsSizes.vs8 }]}>
              <MagicText style={styles.payoutTitleText} type="SEMI_BOLD">
                {item?.title}
              </MagicText>
              <MagicText style={[styles.brandHeaderText, { marginBottom: 0 }]} type="SEMI_BOLD">
                {item?.text}
              </MagicText>
            </View>
          </View>
        ) : (
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
        )}
      </>
    );
  };

  const { theme } = useTheme();

  return (
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
        <View style={styles.brandTextView}>
          <MagicText
            numberOfLines={1}
            style={[
              styles.brandHeaderText,
              { marginBottom: props?.isNormal ? 0 : MetricsSizes.vs5 },
            ]}
            type="SEMI_BOLD"
          >
            {props?.brandHeader}
            {props?.isYear ? `| ${props?.yearValue}` : null}
          </MagicText>

          <MagicText
            style={[styles.label, { marginBottom: MetricsSizes.vs5, maxWidth: '90%' }]}
            type="REGULAR"
          >
            {props?.year}
          </MagicText>
          {props?.isDelivery || !props?.buttonTitle ? null : (
            <LightGreenButton
              buttonStyle={{ width: props?.isNormal ? '40%' : '60%', paddingHorizontal: 0 }}
              title={props?.buttonTitle || ''}
            />
          )}
        </View>
      </View>
      {props?.isNormal ? null : (
        <>
          <View style={styles.separator} />
          <FlatList
            data={payoutDetails ? payoutDetails : props?.payoutData}
            renderItem={BrandDetails}
          />
        </>
      )}
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
    fontSize: MetricsSizes.ms14,
    marginBottom: MetricsSizes.vs5,
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
  row: { flexDirection: 'row' },
});
