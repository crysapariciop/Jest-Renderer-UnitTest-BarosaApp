import Colors from '../../../theme/colors';
import { DEVICE_WIDTH, MetricsSizes } from '../../../theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainCardView: {
    borderWidth: MetricsSizes.ms1,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.9,
    padding: MetricsSizes.ms12,
    borderRadius: MetricsSizes.ms10,
    marginBottom: MetricsSizes.vs10,
    elevation: 5,
  },
  textContainer: {
    marginLeft: MetricsSizes.hs8,
  },
  title: {
    fontSize: MetricsSizes.hs16,
  },
  subtitle: {
    fontSize: MetricsSizes.hs12,
    marginTop: -MetricsSizes.vs5,
  },
  dot: {
    position: 'absolute',
    right: MetricsSizes.hs10,
    top: MetricsSizes.vs12,
    height: MetricsSizes.ms30,
    width: MetricsSizes.ms30,
  },
  avtarImg: {
    borderRadius: MetricsSizes.ms20,
    height: MetricsSizes.ms40,
    width: MetricsSizes.ms40,
  },
});
