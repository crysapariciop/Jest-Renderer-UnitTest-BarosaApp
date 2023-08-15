import React from 'react';
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import Colors from '@src/theme/colors';
import ProgressCircle from 'react-native-progress-circle';

interface brandPropTypes {
  brandHeader: string;
  brandTitle?: string;
  productPrice?: string;
  activePercentage?: number;
  daysCount?: number;
}

export const DaysCounterCard = (props: brandPropTypes) => {
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
        <View style={[styles.brandDataView]}>
          <ProgressCircle
            percent={props?.activePercentage || 0}
            radius={MetricsSizes.ms27}
            borderWidth={5}
            color={Colors.progressBarColor}
            shadowColor={Colors.whiteBg}
            bgColor={Colors.whiteBg}
            containerStyle={styles.progressContainer}
          >
            <MagicText style={styles.daysCountText} type="SEMI_BOLD">
              {props?.daysCount}
            </MagicText>
          </ProgressCircle>
        </View>
        <View style={styles.brandTextView}>
          <MagicText numberOfLines={1} style={[styles.brandHeaderText]} type="SEMI_BOLD">
            {props?.brandHeader}
          </MagicText>

          <MagicText style={styles.label} type="REGULAR">
            {props?.productPrice}
          </MagicText>
        </View>
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
    alignSelf: 'center',
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
  separator: {
    height: 0.6,
    width: '100%',
    marginVertical: MetricsSizes.vs15,
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
    marginBottom: MetricsSizes.vs5,
    maxWidth: '90%',
  },
  trackingId: {
    fontSize: MetricsSizes.ms12,
    fontWeight: '600',
    color: Colors.lightGreyText,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row' },
  daysCountText: {
    fontSize: MetricsSizes.ms24,
    paddingTop: MetricsSizes.vs12,
    alignSelf: 'center',
  },
});
