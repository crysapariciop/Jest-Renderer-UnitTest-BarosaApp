import { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import RemixIcon from 'react-native-remix-icon';
import Video from 'react-native-video';
import { runOnUI, useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { IS_IOS } from '@src/core-utils/utils';
import Dot from '@src/core-component/atoms/dot';
import { default as ReAnimated } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface itemType {
  path?: string;
  url?: string;
  type?: string;
}
interface imageType {
  path?: string;
  url?: string;
}
interface ImageSliderProps {
  images?: imageType[];
  video?: imageType;
  item?: { type: string; uri: string };
}

const ImageSlider = ({ images = [], video = {} }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidingArr, setSlidingArr] = useState<itemType[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const flatListRef = useRef(null);
  const videoRef = useRef(null);
  const x = useSharedValue(0);
  const gestureRef = useRef();
  const [finalX, setFinalX] = useState(0);
  const [temp, setTemp] = useState(0);
  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleDotPress = (index: number) => {
    flatListRef?.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };
  const updateAnimatedValue = runOnUI((value) => {
    setFinalX(value);
  });

  const _onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      let finalTranslation = ctx.x + translationX;

      console.log({ translationX, finalTranslation }, x.value);
      if (finalTranslation < 0) {
        x.value = 0;
      } else if (finalTranslation > width - 15) {
        x.value = width - 15;
      } else {
        x.value = finalTranslation;
      }
    },
    onEnd: (_, ctx) => {
      const updatedFinalX = x.value;
      updateAnimatedValue(updatedFinalX);
    },
  });

  useEffect(() => {
    const newArr = [];
    if (images?.length > 0) {
      for (let i = 0; i < images.length; i++) {
        newArr.push({ type: 'image', uri: images[i] });
      }
    }
    if (video) {
      newArr.push({ type: 'video', uri: video });
    }

    setSlidingArr(newArr);
  }, [images, video]);

  const onVideoPress = () => {
    setIsPlaying(!isPlaying);
  };

  const onProgress = (data: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    setCurrentTime(data.currentTime);
    const value = data.currentTime / data.playableDuration;
    setSliderValue(data.currentTime);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={slidingArr}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              {item?.type == 'video' && (
                <>
                  {true && (
                    <ActivityIndicator
                      size={'large'}
                      color={COLOR.GREEN}
                      style={{
                        position: 'absolute',
                      }}
                    />
                  )}

                  {video && (
                    <Video
                      ref={(ref) => {
                        videoRef.current = ref;
                      }}
                      source={{
                        uri: item?.uri?.url,
                      }}
                      style={[styles.image, { backgroundColor: 'transparent' }]}
                      repeat={true}
                      paused={!isPlaying}
                      onProgress={onProgress}
                      onLoad={onLoad}
                      resizeMode="cover"
                    />
                  )}

                  <View style={styles.videoTimerRow}>
                    <TouchableOpacity onPress={onVideoPress}>
                      <RemixIcon
                        name={isPlaying ? 'pause-line' : 'play-line'}
                        size={MetricsSizes.ms24}
                        color={COLOR.WHITE}
                      />
                    </TouchableOpacity>
                    <Text style={styles.timer}>{`${formatTime(currentTime)} / ${formatTime(
                      duration
                    )}`}</Text>
                  </View>
                  <View style={styles.slider}>
                    <Slider
                      animateTransitions={false}
                      maximumValue={duration}
                      value={sliderValue}
                      onSlidingComplete={(val): any => {
                        setIsPlaying(false);
                        videoRef?.current?.seek(val[0]);
                        setCurrentTime(val[0]);
                        setSliderValue(val[0]);
                        setIsPlaying(true);
                      }}
                    />
                  </View>
                </>
              )}
              {item.type == 'image' && (
                <Image source={{ uri: item?.uri?.url }} style={styles.image} resizeMode="cover" />
              )}
            </View>
          )}
          keyExtractor={(item, index) => `${item} + ${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
      {slidingArr?.length > 1 && (
        <View style={styles.pagination}>
          {slidingArr?.map((item, index) => (
            <Dot
              key={index}
              index={index}
              currentIndex={currentIndex}
              onPress={(index: number) => {
                flatListRef?.current?.scrollToIndex({ index, animated: true });
                setCurrentIndex(index);
              }}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MetricsSizes.ms356,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: MetricsSizes.vs0,
    marginTop: MetricsSizes.vs8,
  },
  dotContainer: {
    paddingHorizontal: MetricsSizes.hs5,
  },
  dot: {
    width: MetricsSizes.ms8,
    height: MetricsSizes.ms8,
    borderRadius: MetricsSizes.ms4,
    backgroundColor: COLOR.WHITE,
  },
  imageContainer: {
    flex: 1,
    height: MetricsSizes.ms356,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: MetricsSizes.ms356,
  },
  timer: {
    color: COLOR.WHITE,
    fontSize: MetricsSizes.ms16,
    marginLeft: MetricsSizes.hs6,
  },
  slider: {
    position: 'absolute',
    zIndex: 600,
    width: '100%',
    bottom: IS_IOS ? -MetricsSizes.vs6 : MetricsSizes.vs2,
  },
  videoTimerRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: MetricsSizes.vs0,
    left: MetricsSizes.vs0,
    marginBottom: MetricsSizes.vs28,
    marginLeft: MetricsSizes.hs12,
    zIndex: 90,
  },
});

export default ImageSlider;
