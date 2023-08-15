import { StyleSheet } from 'react-native';
import { MetricsSizes } from '@src/theme/metrics';

export const styles = StyleSheet.create({
  tabIconStyle: {
    height: MetricsSizes.ms5,
    width: MetricsSizes.ms5,
  },
  hitslop: {
    top: MetricsSizes.hs15,
    left: MetricsSizes.hs15,
    right: MetricsSizes.hs15,
    bottom: MetricsSizes.hs15,
  },
  tabItemViewStyle: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
  },
  dummyViewStyle: {
    height: MetricsSizes.ms2,
  },
  imageViewStyle: {
    paddingTop: MetricsSizes.hs10,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: MetricsSizes.hs10,
    fontWeight: '600',
  },
  badgeStyle: {
    position: 'absolute',
    bottom: '50%',
  },
  incomingContainer: {
    position: 'absolute',
    top: -MetricsSizes.vs16,
  },
});
