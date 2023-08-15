import { useTheme } from '@react-navigation/native';
import { DefaultUserAvatar } from '@src/assets/icons/profile-module-icons';
import { MagicText, MagicTextInput } from '@src/core-component/atoms';
import Button from '@src/core-component/atoms/button';
import CommonPageHeader from '@src/core-component/atoms/commonPageHeader';
import CustomBottomSheet from '@src/core-component/atoms/customBottomSheet';
import ImageUploadModal from '@src/core-component/atoms/imageUploadModal';
import { useUploadToGCP } from '@src/modules/add-item';
import { UserState, useDeleteProfileImg } from '@src/modules/auth-module/auth-store';
import Colors from '@src/theme/colors';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import RemixIcon from 'react-native-remix-icon';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useProfileDetails } from '../profile-store';
import { useTranslation } from 'react-i18next';
import { EditProfileScreenProps } from '@src/core-navigation/interface';
import { styles } from './editProfile.styles';

const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  const { t: translate } = useTranslation();

  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { data: loginUser } = userStateContents;
  const { userId, token, userType, firstName, lastName, bio, images } = loginUser;
  const { editProfileDetails } = useProfileDetails();

  const [profile, setProfile] = useState<string>(images?.profile);
  const [cover, setCover] = useState<string>(images.cover);
  const [scaledCoverHeight, setScaledCoverHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCoverModal, setShowCoverModal] = useState<boolean>(false);

  const { getProfileImgDeleted } = useDeleteProfileImg();
  const theme = useTheme();

  const { uploadToGCP } = useUploadToGCP();

  const [newFirstName, setNewFirstName] = useState<string>(firstName);
  const [newLastName, setNewLastName] = useState<string>(lastName);
  const [newBio, setNewBio] = useState<string>(bio);

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
  }, [images.cover]);

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
  }, [images.profile]);

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
    //     const scaledWidth = (MetricsSizes.hs96 * width) / height;
    //     const scaledHeight = (MetricsSizes.vs96 * height) / width;
    //   },
    //   (error) => {
    //     console.log('Error retrieving image dimensions:', error);
    //   }
    // );
  }, [images]);

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

  const onSave = () => {
    const payload = {
      firstName: newFirstName,
      lastName: newLastName,
      bio: newBio,
    };
    editProfileDetails(userId, payload);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.whiteBg }]}>
      <MenuProvider skipInstanceCheck={true}>
        <CommonPageHeader
          pageName="Edit Profile"
          onRightIconPress={() => {
            navigation.goBack();
          }}
          rightIcon={<RemixIcon name={'ri-close-fill'} size={MetricsSizes.ms24} color={'red'} />}
        />
        <View style={[styles.backgroundImage]}>
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: cover }}
              style={{ width: DEVICE_WIDTH, height: scaledCoverHeight }}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={styles.editCoverIcon}
            onPress={() => {
              setShowCoverModal(true);
            }}
          >
            <RemixIcon name={'image-add-line'} size={MetricsSizes.ms20} color={Colors.whiteBg} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileDataConatiner}>
          <View style={styles.imageContainer}>
            {profile?.length > 1 || profile != null ? (
              <>
                {isLoading && (
                  <ActivityIndicator
                    style={styles.profileActivityIndicator}
                    size="small"
                    color={Colors.green}
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
          <Menu>
            <MenuTrigger
              children={
                <View style={styles.editIconContainer}>
                  <RemixIcon
                    name={'image-add-fill'}
                    size={MetricsSizes.ms20}
                    color={Colors.whiteBg}
                  />
                </View>
              }
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                onSelect={() => {
                  setShowModal(true);
                }}
                children={
                  <View style={styles.profilePopUpContent}>
                    <RemixIcon
                      name={'image-add-line'}
                      size={MetricsSizes.ms20}
                      color={theme?.colors.text}
                    />
                    <MagicText style={styles.menuOptionText}>{translate('uploadPhoto')}</MagicText>
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
                    <MagicText style={[styles.menuOptionText, { color: Colors.red }]}>
                      {translate('removePhoto')}
                    </MagicText>
                  </View>
                }
              />
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.formContainer}>
          <MagicText style={styles.profileEditModalText}>{translate('firstName')}</MagicText>
          <MagicTextInput
            placeholder={translate('firstName')}
            containerStyle={styles.profileEditModalTextInputStyle}
            onChangeText={(e) => {
              setNewFirstName(e);
            }}
            value={newFirstName}
          />

          <MagicText style={styles.profileEditModalText}>{translate('lastName')}</MagicText>
          <MagicTextInput
            placeholder={translate('lastName')}
            containerStyle={styles.profileEditModalTextInputStyle}
            value={newLastName}
            onChangeText={(e) => {
              setNewLastName(e);
            }}
          />
          <MagicText style={styles.profileEditModalText}>{translate('bio')}</MagicText>
          <MagicTextInput
            placeholder={translate('bio')}
            containerStyle={[styles.profileEditModalTextInputStyle, {}]}
            value={newBio}
            onChangeText={(e) => {
              setNewBio(e);
            }}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button
            type="SECONDARY"
            onPress={() => {
              navigation.goBack();
            }}
            label={translate('Cancel')}
            style={styles.buttonStyle}
          />
          <Button label={translate('Save')} onPress={onSave} style={styles.buttonStyle} />
        </View>
        <CustomBottomSheet
          visible={showModal}
          title={translate('selectOption')}
          hrLineStyle={styles.hrline}
          onDismiss={() => setShowModal(false)}
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
          title={translate('selectOption')}
          hrLineStyle={styles.hrline}
          onDismiss={() => setShowCoverModal(false)}
        >
          <ImageUploadModal
            onSelect={(res: any) => {
              if (res) {
                imageInputCb('cover', res);
              }
            }}
          />
        </CustomBottomSheet>
      </MenuProvider>
    </SafeAreaView>
  );
};

const optionsStyles = {
  optionsContainer: {
    width: MetricsSizes.hs140,
    padding: MetricsSizes.ms5,
    marginTop: MetricsSizes.vs16, // Adjust this value to position the popup below the header
    marginLeft: MetricsSizes.hs_18,
  },
  optionText: {
    color: Colors.blackText,
  },
};

export default EditProfileScreen;
