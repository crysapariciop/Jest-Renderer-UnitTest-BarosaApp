import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

interface DotType {
  index?: number;
  currentIndex?: number;
  onPress?: (index: number | undefined) => void;
}

const Dot = ({ index, currentIndex, onPress = () => {} }: DotType) => {
  const opacity = useRef(new Animated.Value(index === currentIndex ? 1 : 0.3)).current;

  const handleDotAnimation = () => {
    Animated.timing(opacity, {
      toValue: index === currentIndex ? 1 : 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleDotPress = () => {
    onPress(index);
  };

  handleDotAnimation();

  return (
    <TouchableOpacity style={styles.dotContainer} onPress={handleDotPress}>
      <Animated.View style={[styles.dot, { opacity }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    paddingHorizontal: MetricsSizes.hs5,
  },
  dot: {
    width: MetricsSizes.ms8,
    height: MetricsSizes.ms8,
    borderRadius: MetricsSizes.ms4,
    backgroundColor: Colors.darkGrey,
  },
});
export default Dot;
