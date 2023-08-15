import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: MetricsSizes.ms40,
    width: MetricsSizes.ms40,
    borderRadius: MetricsSizes.ms20,
    marginRight: MetricsSizes.hs16,
  },
  imageStyle: { height: '100%', width: '100%', borderRadius: MetricsSizes.ms20 },
  searchBarRow: {
    marginHorizontal: MetricsSizes.hs16,
    marginBottom: MetricsSizes.vs12,
  },
  leftIconStyle: { marginRight: MetricsSizes.hs8 },
  searchBoxContainerStyle: {
    borderBottomWidth: MetricsSizes.ms0,
    backgroundColor: Colors.buttonGreyBg,
    borderRadius: MetricsSizes.ms8,
  },
  impTextStyle: { marginHorizontal: MetricsSizes.hs16 },
  productRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: MetricsSizes.ms16,
  },
  NoResultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchBarosaImage: { height: MetricsSizes.ms98, width: MetricsSizes.ms98 },
  searchBarosaText: { marginTop: MetricsSizes.vs8 },
  searchBarosaSubText: { color: Colors.greyText },
  customEntryContainer: { flexDirection: 'column', flex: 1, padding: MetricsSizes.ms16 },
  customEntryText: { marginBottom: MetricsSizes.vs6 },
  arrowContainer: { marginRight: MetricsSizes.hs16, marginLeft: MetricsSizes.hs36 },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
