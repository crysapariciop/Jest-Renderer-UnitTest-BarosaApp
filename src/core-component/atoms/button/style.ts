import { StyleSheet } from 'react-native';
import Colors, { COLOR } from '../../../theme/colors';
import { FONTS } from '../../../assets/fonts';
import { MetricsSizes } from '../../../theme/metrics';

const ButtonStyle = StyleSheet.create({
  buttonContentStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerStyle: {
    paddingVertical: MetricsSizes.vs16,
    borderRadius: MetricsSizes.ms40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainerStyle: {
    backgroundColor: Colors.greenButton,
  },
  primaryLabelStyle: {
    color: Colors.whiteBg,
    fontSize: MetricsSizes.ms14,
    lineHeight: MetricsSizes.ms20,
    fontFamily: FONTS.BAROSA.MEDIUM,
  },
  secondaryConatinerStyle: {
    backgroundColor: Colors.buttonGreyBg,
  },
  secondaryLabelStyle: {
    color: Colors.greyText,
    fontSize: MetricsSizes.ms14,
    lineHeight: MetricsSizes.ms20,
    fontFamily: FONTS.BAROSA.MEDIUM,
  },
  outlineConatinerStyle: {
    backgroundColor: Colors.whiteBg,
    borderRadius: MetricsSizes.ms8,
    borderWidth: MetricsSizes.ms1,
    borderColor: Colors.outlineButtonBorder,
  },
  outlineLabelStyle: {
    color: Colors.outlineButtonText,
    fontSize: MetricsSizes.ms14,
    lineHeight: MetricsSizes.ms20,
    fontFamily: FONTS.BAROSA.MEDIUM,
  },
  textContainerStyle: {
    paddingVertical: MetricsSizes.vs0,
    borderRadius: MetricsSizes.ms0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabelStyle: {
    color: Colors.outlineButtonText,
    fontSize: MetricsSizes.ms12,
    fontFamily: FONTS.BAROSA.MEDIUM,
  },
  buttonLeftIconContainer: {
    marginRight: MetricsSizes.hs12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerStyle: {
    paddingVertical: MetricsSizes.vs0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgGrey,
  },
  iconStyle: {},
});

export default ButtonStyle;
