import { MagicText } from '@src/core-component/atoms';
import { COLOR } from '@src/theme/colors';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './profileHeader.style';
import { DefaultUserAvatar } from '@src/assets/icons/profile-module-icons';
import RemixIcon from 'react-native-remix-icon';
import { useTheme } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { IUserImages, UserState, useDeleteProfileImg } from '@src/modules/auth-module/auth-store';
import CustomBottomSheet from '@src/core-component/atoms/customBottomSheet';
import ImageUploadModal from '@src/core-component/atoms/imageUploadModal';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useUploadToGCP } from '@src/modules/add-item';
import Button from '@src/core-component/atoms/button';
import { useTranslation } from 'react-i18next';

interface ProfileHeaderPropTypes {
  profileFirstName?: string;
  profileLastName?: string;
  profileBio?: string;
  profileUrl?: IUserImages;
  isOwnProfile?: boolean;
  onEditProfilePress?: () => void;
}

const ProfileHeader = ({
  profileFirstName,
  profileLastName,
  profileBio,
  profileUrl,
  isOwnProfile = true,
  onEditProfilePress = () => {},
}: ProfileHeaderPropTypes) => {
  const [profilePicUrl, setprofilePicUrl] = useState<IUserImages | any>({ profile: '', cover: '' });

  const { contents: loginUser } = useRecoilValueLoadable(UserState);
  const { images } = loginUser.data;
  const { getProfileImgDeleted } = useDeleteProfileImg();

  useEffect(() => {
    setprofilePicUrl(profileUrl);
  }, [profileUrl]);

  const theme = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCoverModal, setShowCoverModal] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>(images?.profile);
  const [cover, setCover] = useState<string>(images?.cover);
  const [isLoading, setIsLoading] = useState(true);
  const [scaledCoverHeight, setScaledCoverHeight] = useState<number>(0);
  const { uploadToGCP } = useUploadToGCP();
  const { t: translate } = useTranslation();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const closeCoverModal = () => {
    setShowCoverModal(false);
  };

  useEffect(() => {
    if (images?.profile?.length == 0) {
      setProfile('');
      setIsLoading(false);
      return;
    }
    if (images?.profile !== profile) {
      if (images?.profile?.length < 1 || images?.profile == null) return;

      const url = images?.profile + '&id=' + Math.random();
      setProfile(url);
    }
  }, [images?.profile]);

  useEffect(() => {
    if (images?.cover?.length == 0) {
      setCover('');
      return;
    }
    if (images?.cover !== cover) {
      if (images?.cover?.length < 1 || images?.cover == null) return;

      const url = images?.cover + '&id=' + Math.random();
      setCover(url);
    }
  }, [images?.cover]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleProfileImgDelete = (type: string) => {
    getProfileImgDeleted(type);
  };

  const imageInputCb = (imageUrl: string, file: any) => {
    const formData = new FormData();
    if (imageUrl == 'profile') {
      formData.append('type', 'profile');
      formData.append('profile', file);
      const url = uploadToGCP(formData, 'image', () => {}, true, 'profile');
    }
    if (imageUrl == 'cover') {
      formData.append('type', 'cover');
      formData.append('profile', file);
      const url = uploadToGCP(formData, 'image', () => {}, true, 'cover');
    }
  };
  useEffect(() => {
    if (images?.cover) {
      Image.getSize(
        images?.cover,
        (width: number, height: number) => {
          const scaledHeight = (DEVICE_WIDTH * height) / width;
          setScaledCoverHeight(scaledHeight);
        },
        (error) => {
          console.log('Error retrieving image dimensions:', error);
        }
      );
    }

    // Image.getSize(
    //   images?.profile,
    //   (width: number, height: number) => {
    //     const scaledWidth = (96 * width) / height;
    //     const scaledHeight = (96 * height) / width;
    //   },
    //   (error) => {
    //     console.log('Error retrieving image dimensions:', error);
    //   }
    // );
  }, [images]);
  console.log('COVER', cover);
  console.log('PROFILE', profile);
  return (
    <View>
      <View style={styles.profileHeaderRow}>
        <MagicText style={styles.pageHeader}>Profile</MagicText>
        <TouchableOpacity
          onPress={() => {
            setShowCoverModal(true);
          }}
        >
          {isOwnProfile && (
            <RemixIcon name={'image-add-line'} size={MetricsSizes.ms20} color={COLOR.WHITE} />
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.backgroundImage, { justifyContent: 'flex-start' }]}>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: cover,
            }}
            style={{ width: DEVICE_WIDTH, height: scaledCoverHeight }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.profileDataConatiner}>
        <View style={styles.imageContainer}>
          {profile?.length > 1 || profile == null ? (
            <>
              {isLoading && (
                <ActivityIndicator
                  style={styles.profileActivityIndicator}
                  size="small"
                  color={COLOR.GREEN}
                />
              )}

              <Image
                source={{
                  uri: profile,
                }}
                onLoad={handleImageLoad}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                style={[styles.profileImage]}
                resizeMode="contain"
              />
            </>
          ) : (
            <View style={styles.avatarImage}>
              <DefaultUserAvatar />
            </View>
          )}
        </View>
        {isOwnProfile && (
          <Menu style={styles.menuStyle}>
            <MenuTrigger
              children={
                <View style={styles.editIconContainer}>
                  <RemixIcon name={'image-add-fill'} size={MetricsSizes.ms20} color={COLOR.WHITE} />
                </View>
              }
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                onSelect={openModal}
                children={
                  <View style={styles.profilePopUpContent}>
                    <RemixIcon
                      name={'image-add-line'}
                      size={MetricsSizes.ms20}
                      color={theme?.colors.text}
                    />
                    <MagicText style={styles.menuOptionText}>Upload Photo</MagicText>
                  </View>
                }
              />
              <MenuOption
                onSelect={() => {
                  handleProfileImgDelete('profile');
                }}
                children={
                  <View style={styles.profilePopUpContent}>
                    <RemixIcon
                      name={'delete-bin-line'}
                      size={MetricsSizes.ms20}
                      color={theme?.colors.text}
                    />
                    <MagicText style={[styles.menuOptionText, { color: COLOR.RED_ERRMSG }]}>
                      Remove Photo
                    </MagicText>
                  </View>
                }
              />
            </MenuOptions>
          </Menu>
        )}
        <View style={isOwnProfile ? { marginTop: -MetricsSizes.vs18 } : {}}>
          <View style={styles.profileNameRow}>
            <MagicText type="SEMI_BOLD" style={styles.profileName}>
              {profileFirstName}
              {'  '}
            </MagicText>
            <MagicText type="SEMI_BOLD" style={styles.profileName}>
              {profileLastName}
            </MagicText>
          </View>

          <MagicText style={styles.profileBio}>{profileBio}</MagicText>
        </View>
        <Button
          labelStyle={styles.editButtonLableStyle}
          label={
            isOwnProfile
              ? translate('profileStack.editProfile')
              : translate('profileStack.addFriend')
          }
          onPress={onEditProfilePress}
          iconContainerStyle={styles.editButtonIconStyle}
          style={styles.editButtonStyle}
          leftIcon={
            <RemixIcon
              name={isOwnProfile ? 'image-add-fill' : 'user-add-line'}
              size={MetricsSizes.ms14}
              color={COLOR.WHITE}
            />
          }
        />
      </View>

      <CustomBottomSheet
        visible={showModal}
        title="Select option"
        hrLineStyle={styles.horizontalLineBottomSheet}
        onDismiss={closeModal}
      >
        <ImageUploadModal
          onSelect={(res: any) => {
            if (res) {
              imageInputCb('profile', res);
            }
          }}
        />
      </CustomBottomSheet>

      <CustomBottomSheet
        visible={showCoverModal}
        title="Select option"
        hrLineStyle={styles.horizontalLineBottomSheet}
        onDismiss={closeCoverModal}
      >
        <ImageUploadModal
          onSelect={(res: any) => {
            if (res) {
              imageInputCb('cover', res);
            }
          }}
        />
      </CustomBottomSheet>
    </View>
  );
};

const optionsStyles = {
  optionsContainer: {
    width: MetricsSizes.hs140,
    padding: MetricsSizes.ms5,
    marginTop: MetricsSizes.vs16,
    marginLeft: MetricsSizes.hs_18,
  },
  optionText: {
    color: COLOR.BLACK_TEXT,
  },
};

export default ProfileHeader;
