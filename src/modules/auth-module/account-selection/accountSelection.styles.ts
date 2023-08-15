import { StyleSheet } from 'react-native';

import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    marginLeft: DEVICE_WIDTH * 0.05,
    marginTop: DEVICE_HEIGHT * 0.05,
  },
  selectionContainer: {
    marginTop: DEVICE_HEIGHT * 0.4,
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  selectionTitle: {
    fontSize: MetricsSizes.ms24,
    lineHeight: MetricsSizes.ms36,
  },
  selectionSubtitle: {
    fontSize: MetricsSizes.ms12,
    marginBottom: MetricsSizes.vs24,
    marginTop: -2.5,
  },
});
