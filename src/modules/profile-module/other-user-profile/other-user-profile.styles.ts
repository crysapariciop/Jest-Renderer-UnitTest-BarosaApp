import Colors from '@src/theme/colors';
import { DEVICE_HEIGHT, MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: MetricsSizes.hs20,
  },

  horizontalLineStyle: { marginTop: MetricsSizes.vs8, marginBottom: MetricsSizes.vs16 },
  commonHorizontalMargin: {
    marginHorizontal: MetricsSizes.vs16,
  },
  gridIconStyle: { marginRight: MetricsSizes.hs4 },

  emptyCardView: { flex: 1, backgroundColor: 'transparent' },
  activityIndicatorStyle: { marginTop: MetricsSizes.vs20 },
  addNewProductButton: {
    backgroundColor: Colors.green,
    height: MetricsSizes.ms40,
    width: MetricsSizes.ms40,
    borderRadius: MetricsSizes.ms20,
    position: 'absolute',
    zIndex: 99,
    right: MetricsSizes.ms16,
    bottom: MetricsSizes.ms16,
  },
});
