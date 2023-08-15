import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: { height: MetricsSizes.ms180, width: '100%', position: 'relative', zIndex: -1 },
  profileDataConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    top: MetricsSizes.vs_45,
  },
  imageContainer: {
    height: MetricsSizes.ms96,
    width: MetricsSizes.ms96,
    borderWidth: MetricsSizes.ms4,
    borderColor: Colors.whiteBg,
    borderRadius: MetricsSizes.ms48,
    backgroundColor: Colors.whiteBg,
    overflow: 'hidden',
  },
  profileActivityIndicator: {
    width: '100%',
    height: '100%',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: MetricsSizes.ms12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgGrey,
  },

  pageHeader: { color: Colors.whiteBg, fontSize: MetricsSizes.ms16, lineHeight: MetricsSizes.ms20 },

  profileName: {
    color: Colors.profileBlackText,
    textAlign: 'center',
  },
  profileBio: {
    fontSize: MetricsSizes.ms12,
    textAlign: 'center',
    lineHeight: MetricsSizes.ms16,
    marginTop: MetricsSizes.vs4,
    color: Colors.profileBioGrey,
    marginBottom: MetricsSizes.vs12,
    marginHorizontal: MetricsSizes.hs8,
  },
  editIconContainer: {
    height: MetricsSizes.ms40,
    width: MetricsSizes.ms40,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: MetricsSizes.ms20,
    borderWidth: MetricsSizes.ms2,
    borderColor: Colors.whiteBg,
    bottom: MetricsSizes.vs22,
    right: MetricsSizes.hs_22,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgGrey,
  },

  profileAndBioConatiner: {
    height: MetricsSizes.ms96,
    width: MetricsSizes.ms96,
  },
  profilePopUpContent: {
    flexDirection: 'row',
    marginTop: MetricsSizes.vs4,
    marginLeft: MetricsSizes.hs4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileEditModalText: {
    marginVertical: MetricsSizes.vs4,
    fontSize: MetricsSizes.ms12,
    color: Colors.greyText,
    marginLeft: MetricsSizes.hs2,
  },
  profileEditModalTextInputStyle: {
    borderColor: Colors.greyText,
    borderBottomWidth: MetricsSizes.ms0,
    borderBottomColor: Colors.greyText,
    backgroundColor: Colors.bgGrey,
    borderRadius: MetricsSizes.ms8,
    marginBottom: MetricsSizes.vs12,
  },
  buttonStyle: {
    flex: 1,
    paddingVertical: MetricsSizes.vs12,
    borderRadius: MetricsSizes.ms4,
    marginHorizontal: MetricsSizes.hs8,
  },
  coverContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.whiteBg,
    overflow: 'hidden',
  },
  editCoverIcon: {
    position: 'absolute',
    justifyContent: 'flex-end',
    right: MetricsSizes.hs12,
    top: MetricsSizes.vs12,
  },
  formContainer: {
    flex: 1,
    top: MetricsSizes.vs_60,
    marginHorizontal: MetricsSizes.hs12,
  },
  menuOptionText: { marginLeft: MetricsSizes.hs4 },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: MetricsSizes.vs8,
  },
  hrline: { marginTop: MetricsSizes.vs20, marginBottom: MetricsSizes.vs20 },
});
