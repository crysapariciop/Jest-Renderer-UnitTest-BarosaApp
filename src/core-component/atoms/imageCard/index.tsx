import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import CustomBottomSheet from '../customBottomSheet';
import ImageUploadModal from '../imageUploadModal';
import Video from 'react-native-video';

interface ImageCardProps {
  image?: string;
  video?: string;
  isVideo?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onSelect?: (res: any) => void;
}

const ImageCard = ({
  image,
  video,
  isVideo,
  containerStyle,
  onSelect = () => {},
}: ImageCardProps) => {
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowImageModal(true);
        }}
        style={[
          styles.containerStyle,
          { backgroundColor: image ? Colors.whiteBg : Colors.bgGrey },
          containerStyle,
        ]}>
        {image || video ? (
          <>
            {image ? (
              <Image
                style={styles.imageAndVideoStyle}
                resizeMode="contain"
                source={{
                  uri: image,
                }}
              />
            ) : null}
            {video ? (
              <Video
                style={styles.imageAndVideoStyle}
                resizeMode="contain"
                source={{
                  uri: video,
                }}
              />
            ) : null}
          </>
        ) : (
          <RemixIcon
            name={isVideo ? 'video-add-line' : 'image-add-line'}
            size={MetricsSizes.ms20}
            color={Colors.greyText}
          />
        )}
      </TouchableOpacity>
      <CustomBottomSheet
        visible={showImageModal}
        title="Select option"
        onDismiss={() => setShowImageModal(false)}>
        <ImageUploadModal
          onSelect={(res: any) => {
            if (res) {
              onSelect(res);
            }
          }}
        />
      </CustomBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    height: MetricsSizes.ms72,
    width: MetricsSizes.ms72,
    borderRadius: MetricsSizes.ms8,

    borderWidth: MetricsSizes.ms1,
    borderStyle: 'dashed',
    borderColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAndVideoStyle: { height: '100%', width: '100%' },
});

export default ImageCard;
