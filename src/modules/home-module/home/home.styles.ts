import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';
import { FONTS } from '@src/assets/fonts';
import Colors from '@src/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeaderText: {
    color: Colors.headingGreyText,
    marginTop: MetricsSizes.vs16,
    marginBottom: MetricsSizes.vs8,
    textTransform: 'uppercase',
  },
  dealerListHeader: {
    color: Colors.headingGreyText,
    marginBottom: MetricsSizes.vs8,
    textTransform: 'uppercase',
  },
  pageHeader: {
    height: MetricsSizes.ms60,
    width: '100%',
    backgroundColor: Colors.goldColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: MetricsSizes.hs16,
  },
  listViewContainer: { marginLeft: MetricsSizes.hs16 },
  homeText: {
    color: Colors.whiteBg,
    fontSize: MetricsSizes.ms14,
    fontFamily: FONTS.BAROSA.SEMI_BOLD,
    fontWeight: '600',
    lineHeight: MetricsSizes.ms20,
  },
  rowParent: { marginRight: MetricsSizes.hs32 },
  collectorListStyle: { paddingBottom: MetricsSizes.vs14 },
  brandListStyle: { marginRight: MetricsSizes.hs14 },
  trendingListParent: { width: '100%' },
  trendingImageStyle: { height: MetricsSizes.ms192, width: MetricsSizes.ms168 },
  trendingImageTextParent: {
    paddingHorizontal: MetricsSizes.hs8,
    paddingVertical: MetricsSizes.vs4,
  },
  trendingImageSerialNum: { color: Colors.lightGreyText },
  trendingImageBrandName: {
    marginTop: MetricsSizes.vs4,
    fontSize: MetricsSizes.ms14,
    color: Colors.lightGreyText,
  },
});
