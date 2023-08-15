import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MagicText from '../MagicText';
import { openCamera, openLibrary } from '@src/core-utils/imagePicker.utils';
import RemixIcon from 'react-native-remix-icon';
import { MetricsSizes } from '@src/theme/metrics';
import Colors, { COLOR } from '@src/theme/colors';
import { useTranslation } from 'react-i18next';

type ImageUploadModalType = {
  onSelect: (res: Array<object>) => void;
};

const ImageUploadModal = ({ onSelect = () => {} }: ImageUploadModalType) => {
  const { t: translate } = useTranslation();
  const _uploadImage = (res: any) => {
    if (res) {
      onSelect(res[0]);
    }
  };

  const _handleOpenCamera = async () => {
    const result = await openCamera();
    if (result.length == 0) return;
    if (result.length !== 0) {
      _uploadImage(result);
    }
  };

  const _handleLibrarySelection = async () => {
    const res = await openLibrary();
    if (res.length == 0) return;
    if (res.length !== 0) {
      _uploadImage(res);
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            _handleOpenCamera();
          }}>
          <View style={styles.iconContainer}>
            <RemixIcon name={'camera-line'} size={MetricsSizes.ms20} color={COLOR.WHITE} />
          </View>
          <MagicText type="SEMI_BOLD" style={{ color: COLOR.BLACK_TEXT }}>
            {translate('imageUploadModal.camera')}
          </MagicText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            _handleLibrarySelection();
          }}>
          <View style={styles.iconContainer}>
            <RemixIcon name={'gallery-line'} size={MetricsSizes.ms20} color={COLOR.WHITE} />
          </View>
          <MagicText type="SEMI_BOLD" style={{ color: COLOR.BLACK_TEXT }}>
            {translate('imageUploadModal.gallery')}
          </MagicText>
        </TouchableOpacity>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: MetricsSizes.ms50,
    height: MetricsSizes.ms50,
    borderRadius: MetricsSizes.ms25,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: MetricsSizes.vs10,
  },
  container: { flex: 1, alignItems: 'center' },
});
export default ImageUploadModal;
