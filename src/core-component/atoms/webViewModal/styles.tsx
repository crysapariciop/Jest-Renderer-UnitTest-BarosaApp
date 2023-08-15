import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, MetricsSizes } from '@theme/metrics';
import { IS_ANDROID } from '@src/core-utils/utils';

export const styles = StyleSheet.create({
  webContainer: { paddingLeft: MetricsSizes.hs10, width: '95%', fontSize: MetricsSizes.ms18 },
  webViewStyle: { height: '95%' },
  headerView: {
    marginTop: IS_ANDROID ? MetricsSizes.vs20 : MetricsSizes.vs10,
    marginBottom: MetricsSizes.vs20,
    paddingHorizontal: MetricsSizes.hs16,
  },
  subContainer: { flex: 0.2, marginTop: MetricsSizes.vs20 },
});
