import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconButtonStyle: {
    backgroundColor: Colors.iconButtonGrey,
    height: MetricsSizes.ms72,
    width: MetricsSizes.ms72,
    borderRadius: MetricsSizes.ms8,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.bgGrey,
    borderRadius: MetricsSizes.ms8,
    marginBottom: MetricsSizes.vs8,
  },
  row: { flexDirection: 'row' },
  errStyle: { marginVertical: MetricsSizes.vs4 },
  scrollViewStyle: { paddingHorizontal: MetricsSizes.hs12 },
  searchButtonContainer: {
    backgroundColor: Colors.buttonGreyBg,
    flexDirection: 'row',
    borderRadius: MetricsSizes.ms12,
    paddingVertical: MetricsSizes.vs0,
    marginBottom: MetricsSizes.vs16,
  },
  searchButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: MetricsSizes.ms12,
  },
  imagesCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: MetricsSizes.vs32,
  },
  videoRow: { flexDirection: 'row', marginBottom: MetricsSizes.vs32 },
  videoCard: { height: MetricsSizes.ms72, width: MetricsSizes.ms120 },
  videoTextContainer: { flex: 1, justifyContent: 'center' },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addItemButton: { marginVertical: MetricsSizes.vs12 },
});
