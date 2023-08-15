import { FONTS } from '@src/assets/fonts';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareButtonContainer: {
    borderRadius: MetricsSizes.ms4,
    backgroundColor: Colors.buttonLightGrey,
    paddingVertical: MetricsSizes.vs4,
    paddingHorizontal: MetricsSizes.hs8,
  },
  peopleText: { marginVertical: MetricsSizes.vs12, marginHorizontal: MetricsSizes.hs16 },
  searchBarContainer: {
    borderBottomWidth: MetricsSizes.ms0,
    backgroundColor: Colors.buttonGreyBg,
    borderRadius: MetricsSizes.ms8,
  },
  peopleRowParent: {
    marginBottom: MetricsSizes.vs8,
    paddingHorizontal: MetricsSizes.hs16,
  },
  peopleRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MetricsSizes.vs2,
  },
  bottomButtonStyle: {
    height: MetricsSizes.ms60,
    width: MetricsSizes.ms60,
    borderRadius: MetricsSizes.ms30,
  },
  bottomContainer: { flex: 1, justifyContent: 'flex-end' },
  shareButtonLabelStyle: {
    color: Colors.blackText,
    fontSize: MetricsSizes.ms14,
    fontFamily: FONTS.BAROSA.REGULAR,
  },
  bottomHrLine: { marginBottom: MetricsSizes.vs8 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
