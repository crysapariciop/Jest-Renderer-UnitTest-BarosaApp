import { StyleSheet } from 'react-native';
import { FONTS } from '../../../assets/fonts';
import { MetricsSizes } from '../../../theme/metrics';
import Colors from '../../../theme/colors';

const MagicTextInputStyle = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: MetricsSizes.ms14,
    paddingLeft: MetricsSizes.hs12,
    paddingVertical: MetricsSizes.vs14,
    fontFamily: FONTS.BAROSA.MEDIUM,
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: MetricsSizes.hs8,
    marginRight: MetricsSizes.hs12,
    marginVertical: MetricsSizes.vs14,
  },
  errStyle: {
    fontSize: MetricsSizes.ms12,
    fontFamily: FONTS.BAROSA.REGULAR,
    color: Colors?.red,
  },
});

export default MagicTextInputStyle;
