import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import { View, StyleSheet, ImageRequireSource, ImageURISource, Image } from 'react-native';
import MagicText from '../MagicText';

interface RoundBrandContainerType {
  imagePath?: ImageRequireSource | ImageURISource | null | number;
  brandName?: string;
}

const RoundBrandContainer = ({ imagePath, brandName }: RoundBrandContainerType) => {
  return (
    <>
      <View style={styles.RoundBrandContainer}>
        {imagePath ? (
          <Image source={{ uri: imagePath }} style={styles.imageStyle} resizeMode="cover" />
        ) : (
          <View style={{ backgroundColor: Colors.buttonGreyBg }} />
        )}
      </View>
      {brandName ? (
        <MagicText numberOfLines={1} style={styles.textStyle} ellipsizeMode="tail">
          {brandName}
        </MagicText>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  RoundBrandContainer: {
    height: MetricsSizes.ms54,
    width: MetricsSizes.ms54,
    borderRadius: MetricsSizes.ms27,
    borderWidth: MetricsSizes.ms1,
    borderColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonGreyBg,
  },
  imageStyle: { height: '100%', width: '100%', borderRadius: MetricsSizes.ms22 },
  textStyle: {
    paddingTop: 5,
    textAlign: 'center',
    flexGrow: 1,
    width: 50,
    color: Colors.lightGreyText,
  },
});

export default RoundBrandContainer;
