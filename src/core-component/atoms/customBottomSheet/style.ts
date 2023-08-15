import Colors, { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

const CustomBottomSheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bottomSheetBackground,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: Colors.whiteBg,
    paddingHorizontal: MetricsSizes.hs16,
    paddingTop: MetricsSizes.vs39,
    paddingBottom: MetricsSizes.vs27,
    borderTopLeftRadius: MetricsSizes.hs20,
    borderTopRightRadius: MetricsSizes.hs20,
  },
  headerView: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: { fontSize: MetricsSizes.ms20 },
  horizontalLine: {
    height: MetricsSizes.ms1,
    backgroundColor: Colors.greyText,
    marginTop: MetricsSizes.vs27,
    marginBottom: MetricsSizes.vs35,
  },
});

export default CustomBottomSheetStyle;
