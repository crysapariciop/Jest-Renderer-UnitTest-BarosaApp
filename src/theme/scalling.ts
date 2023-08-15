import { Dimensions } from 'react-native';
import { IS_IOS } from '../core-utils/utils';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

const guidelineBaseWidth = IS_IOS ? 375 : 360;
const guidelineBaseHeight = IS_IOS ? 812 : 800;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

export default {
  hs: (value: number) => {
    return scale(value);
  },
  vs: (value: number) => {
    return verticalScale(value);
  },
  ms: (value: number, factor = 0.5) => {
    return moderateScale(value, factor);
  },
};
