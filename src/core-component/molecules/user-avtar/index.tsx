//import liraries
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import { useTheme } from '@src/theme/themeProvider';
import MagicText from '../../atoms/MagicText';
import Colors from '@src/theme/colors';
import RemixIcon from 'react-native-remix-icon';

interface AvtarProps {
  imageURL?: ImageSourcePropType | null;
  style?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  msgCount?: number | string | null;
  defaultUserStyle?: StyleProp<ImageStyle>;
  RemixIconSize?: number;
}

const Avatar = (props: AvtarProps) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, props.style]}>
      {props?.imageURL ? (
        <Image
          resizeMode="center"
          {...props}
          source={props?.imageURL}
          style={[styles.image, props.imgStyle]}
        />
      ) : (
        <View style={[styles.remixImage, props?.defaultUserStyle]}>
          <RemixIcon
            name="ri-user-fill"
            color={Colors.userAvtar}
            size={props?.RemixIconSize ? props?.RemixIconSize : MetricsSizes.ms45}
          />
        </View>
      )}

      {props.msgCount ? (
        <View style={styles.msgDotView}>
          <MagicText
            style={[{ color: theme?.background, fontSize: MetricsSizes.ms10 }]}
            type="REGULAR"
          >
            {props.msgCount}
          </MagicText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: MetricsSizes.ms40,
    height: MetricsSizes.ms40,
    borderRadius: MetricsSizes.ms25,
    backgroundColor: Colors.userAvtarBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: MetricsSizes.ms25,
    height: '100%',
    width: '100%',
  },
  msgDotView: {
    position: 'absolute',
    top: -MetricsSizes.vs5,
    left: MetricsSizes.hs0,
    backgroundColor: Colors.msgDot,
    borderRadius: MetricsSizes.ms25,
    width: MetricsSizes.ms20,
    height: MetricsSizes.ms20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remixImage: {
    borderRadius: MetricsSizes.ms25,
    overflow: 'hidden',
    width: MetricsSizes.ms40,
    height: MetricsSizes.ms40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: MetricsSizes.vs10,
    borderWidth: 0.5,
    borderColor: Colors.userAvtar,
  },
});

export default Avatar;
