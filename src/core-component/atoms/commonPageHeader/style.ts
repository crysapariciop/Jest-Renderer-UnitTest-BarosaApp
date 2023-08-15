import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: MetricsSizes.vs10,
  },
  leftIconStyle: { padding: MetricsSizes.ms8 },
  pageName: {
    flex: 1,
    marginLeft: MetricsSizes.ms8,
    fontSize: MetricsSizes.ms14,
    lineHeight: MetricsSizes.ms20,
  },
  rightIconStyle: {
    padding: MetricsSizes.ms8,
  },
});
