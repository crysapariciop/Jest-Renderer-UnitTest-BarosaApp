import { DefaultUserAvatar } from '@src/assets/icons/profile-module-icons';
import Colors, { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageRequireSource, ImageURISource, Image } from 'react-native';

interface UserProfileContainerType {
  imagePath?: ImageRequireSource | ImageURISource | null;
}

const UserProfileContainer = ({ imagePath }: UserProfileContainerType) => {
  return (
    <View style={styles.userProfileContainer}>
      {imagePath ? (
        <Image source={{ uri: imagePath }} style={styles.imageStyle} resizeMode="cover" />
      ) : (
        <DefaultUserAvatar />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userProfileContainer: {
    height: MetricsSizes.ms44,
    width: MetricsSizes.ms44,
    borderRadius: MetricsSizes.ms22,
    borderWidth: MetricsSizes.ms1,
    borderColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BUTTON_GREY_BACKGROUND,
  },
  imageStyle: { height: '100%', width: '100%', borderRadius: MetricsSizes.ms22 },
});

export default UserProfileContainer;
