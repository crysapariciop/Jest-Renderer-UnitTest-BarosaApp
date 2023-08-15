import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

const CustomModalStyle = StyleSheet.create({
  modalParent: {
    flex: 1,
    backgroundColor: Colors.lightBlack,
    justifyContent: 'center',
  },
  modalContentContainer: {
    width: '90%',
    backgroundColor: Colors.whiteBg,
    padding: MetricsSizes.ms16,
    justifyContent: 'flex-start',
    borderWidth: MetricsSizes.ms1,
    borderColor: Colors.greyText,
    alignSelf: 'center',
    borderRadius: MetricsSizes.ms16,
  },
});

export default CustomModalStyle;
