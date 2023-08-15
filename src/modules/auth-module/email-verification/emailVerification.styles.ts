import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: DEVICE_WIDTH * 0.9,
    marginLeft: DEVICE_WIDTH * 0.05,
    marginVertical: DEVICE_HEIGHT * 0.04,
  },
  headerText: {
    fontSize: MetricsSizes.ms24,
    lineHeight: MetricsSizes.ms32,
  },
  subtitleText: {
    fontSize: MetricsSizes.ms12,
  },
  mailContainer: {
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.29,
    width: DEVICE_WIDTH * 0.9,
  },
  doubleTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: MetricsSizes.ms12,
  },
  bottomSpace: {
    marginTop: MetricsSizes.vs16,
    alignItems: 'center',
  },
});
