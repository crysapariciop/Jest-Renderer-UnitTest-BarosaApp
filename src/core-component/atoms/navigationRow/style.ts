import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.navRowBackground,
  },
  parentRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: MetricsSizes.vs8,
  },
  childRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rightIconStyle: { margin: MetricsSizes.ms8 },
  labelsContainer: {
    marginLeft: MetricsSizes.hs8,
    marginTop: MetricsSizes.vs4,
    flex: 1,
  },
  labelTextStyle: {
    fontSize: MetricsSizes.ms14,
    lineHeight: MetricsSizes.ms20,
    color: Colors.semiBoldBlack,
    textTransform: 'capitalize',
  },
  subLabelStyle: {
    fontSize: MetricsSizes.ms12,
    lineHeight: MetricsSizes.ms16,
  },
});
