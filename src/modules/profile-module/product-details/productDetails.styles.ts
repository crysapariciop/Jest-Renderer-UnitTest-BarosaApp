import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorStyle: { flex: 1, alignSelf: 'center' },
  brandNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: MetricsSizes.vs16,
  },
  modalBoldTexts: {
    marginVertical: MetricsSizes.vs4,
    fontSize: MetricsSizes.ms16,
    color: Colors.blackText,
    lineHeight: MetricsSizes.ms20,
  },
  modalInputHeader: {
    marginTop: MetricsSizes.vs4,
    marginBottom: MetricsSizes.vs2,
    fontSize: MetricsSizes.ms12,
    color: Colors.profileBioGrey,
    lineHeight: MetricsSizes.ms20,
  },
  modalInputStyle: {
    borderWidth: MetricsSizes.ms1,
    borderColor: Colors.bgGrey,
    borderRadius: MetricsSizes.ms8,
    backgroundColor: Colors.bgGrey,
    height: MetricsSizes.ms100,
  },
  modalButton: { marginVertical: MetricsSizes.vs8 },
  brandNameText: {
    fontSize: MetricsSizes.ms12,
    lineHeight: MetricsSizes.ms16,
    color: Colors.profileBioGrey,
  },
  brandFamilyText: {
    fontSize: MetricsSizes.ms16,
    lineHeight: MetricsSizes.ms24,
    color: Colors.outlineButtonText,
    marginBottom: MetricsSizes.vs8,
  },
  descriptionText: {
    fontSize: MetricsSizes.ms12,
    lineHeight: MetricsSizes.ms16,
    color: Colors.greyText,
    marginBottom: MetricsSizes.vs16,
  },
});
