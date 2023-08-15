import { StyleSheet } from 'react-native';

import { FONTS } from '../../../assets/fonts';
import Colors from '../../../theme/colors';
import { MetricsSizes } from '../../../theme/metrics';
const MagicTextStyle = StyleSheet.create({
  regularFont: {
    fontFamily: FONTS.BAROSA.REGULAR,
    fontSize: MetricsSizes.ms12,
    color: Colors.blackText,
    lineHeight: MetricsSizes.ms16,
  },
  mediumFont: {
    fontFamily: FONTS.BAROSA.MEDIUM,
    fontSize: MetricsSizes.ms14,
    color: Colors.blackText,
  },
  semiBoldFont: {
    color: Colors.blackText,
    fontSize: MetricsSizes.ms16,
    fontFamily: FONTS.BAROSA.SEMI_BOLD,
    lineHeight: MetricsSizes.ms24,
  },
  boldFont: {
    color: Colors.blackText,
    fontSize: MetricsSizes.ms16,
    fontFamily: FONTS.BAROSA.BOLD,
    lineHeight: MetricsSizes.ms24,
  },
});

export default MagicTextStyle;
