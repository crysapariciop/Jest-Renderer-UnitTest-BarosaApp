import { TextStyle, ViewStyle } from 'react-native/types';

export interface LighbuttonProps {
  title: string;
  onPress?: () => void;
  titleStyle?: ViewStyle | TextStyle;
  buttonStyle?: ViewStyle | undefined[];
  isDot?: boolean;
  disabled?: boolean;
}
