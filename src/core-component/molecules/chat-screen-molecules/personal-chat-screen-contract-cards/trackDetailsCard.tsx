import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Img } from '@src/assets/images/image-constants/Images';
import { MagicText } from '@src/core-component/atoms';
import LightGreenButton from '@src/core-component/atoms/light-green-button/lightGreenButton';
import Colors, { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import { TrackingInfo } from '../Constants';

interface TrackCardProps {
  trackId: number | string;
  onPressTrack?: () => void;
  isTracking?: boolean;
}

const TrackCard = (props: TrackCardProps) => {
  const { theme } = useTheme();

  const renderTrack = ({ item, index }: any) => {
    return (
      <View style={[styles.trackSubView, { marginTop: index > 0 ? -5 : 0 }]}>
        <View style={styles.greenDotMainView}>
          {item?.status === 'done' ? (
            <View style={styles.greenDot} />
          ) : item?.status === 'progress' ? (
            <View style={styles.whiteDot} />
          ) : (
            <View style={styles.greyDot} />
          )}
          {index === TrackingInfo.length - 1 ? null : item?.status === 'done' ? (
            <View style={styles.greenLine} />
          ) : (
            <View style={styles.greyLine} />
          )}
        </View>

        <MagicText style={styles.orderText} type="SEMI_BOLD">
          {item?.title}
        </MagicText>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.header}>
        <Image resizeMode="contain" source={Img.fedeXLogo} style={styles.logo} />
        <LightGreenButton
          onPress={props?.onPressTrack}
          title={props?.isTracking ? 'Live Track' : 'Track'}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.content}>
        <MagicText style={[styles.label, { color: theme?.darkGreyChat }]} type="REGULAR">
          Tracking ID:
        </MagicText>
        <MagicText style={styles.trackingId} type="SEMI_BOLD">
          {props?.trackId}
        </MagicText>
      </View>
      {props?.isTracking ? (
        <View style={styles.trackOrderContainer}>
          <FlatList data={TrackingInfo} renderItem={renderTrack} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: 0.6,
    borderRadius: MetricsSizes.ms10,
    borderColor: Colors.greyText,
    marginTop: MetricsSizes.vs10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: MetricsSizes.vs10,
  },
  logo: {
    height: MetricsSizes.vs32,
    width: MetricsSizes.hs60,
  },
  separator: {
    height: 0.6,
    width: '100%',
    backgroundColor: Colors.greyText,
  },
  greenDotMainView: { alignItems: 'center', marginTop: MetricsSizes.vs4 },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: MetricsSizes.vs10,
    paddingVertical: MetricsSizes.vs12,
  },
  label: {
    fontSize: MetricsSizes.ms14,
  },
  trackingId: {
    fontSize: MetricsSizes.ms14,
    fontWeight: '600',
    color: COLOR.OUTLINE_BUTTON_TEXT,
  },
  trackOrderContainer: {
    padding: MetricsSizes.vs10,
    paddingVertical: MetricsSizes.vs12,
    marginTop: -10,
  },
  trackSubView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  greenDot: {
    height: MetricsSizes.ms12,
    width: MetricsSizes.ms12,
    backgroundColor: Colors.greenButton,
    borderRadius: MetricsSizes.ms25,
    position: 'relative',
  },
  whiteDot: {
    height: MetricsSizes.ms12,
    width: MetricsSizes.ms12,
    borderWidth: 2,
    borderColor: Colors.greenButton,
    backgroundColor: Colors.whiteBg,
    borderRadius: MetricsSizes.ms25,
    position: 'relative',
  },
  greyDot: {
    height: MetricsSizes.ms12,
    width: MetricsSizes.ms12,
    backgroundColor: Colors.lightGrey,
    borderRadius: MetricsSizes.ms25,
  },
  greenLine: {
    height: MetricsSizes.vs32,
    width: MetricsSizes.hs2,
    backgroundColor: Colors.greenButton,
    marginTop: -1,
  },
  greyLine: {
    height: MetricsSizes.vs31,
    width: MetricsSizes.hs2,
    backgroundColor: Colors.lightGrey,
  },
  orderText: {
    color: COLOR.OUTLINE_BUTTON_TEXT,
    fontSize: MetricsSizes.ms12,
    marginLeft: MetricsSizes.hs5,
  },
});

export default TrackCard;
