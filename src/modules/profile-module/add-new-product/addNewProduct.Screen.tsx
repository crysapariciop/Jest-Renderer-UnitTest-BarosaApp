import { useIsFocused } from '@react-navigation/native';
import { MagicText, MagicTextInput } from '@src/core-component/atoms';
import Button from '@src/core-component/atoms/button';
import ImageCard from '@src/core-component/atoms/imageCard';
import DropDown from '@src/core-component/molecules/dropdown/dropDown.screen';
import { AddNewProductScreenProps } from '@src/core-navigation/interface';
import {
  SelectedBrandInfo,
  addedItemMedia,
  useSaveIndividualItem,
  useUploadToGCP,
} from '@src/modules/add-item';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styles } from './addNewProduct.styles';
import { useTranslation } from 'react-i18next';
import { boxAndPaperArray, conditionArray } from '@src/core-constant/constants';
import { AppScreen } from '@src/core-constant/navigation';

const AddNewProductScreen = ({ navigation, route }: AddNewProductScreenProps) => {
  const [originalBoxAndPaperValue, setOriginalBoxAndPaperValue] = useState('select');
  const [conditionValue, setConditionValue] = useState('select');
  const [brandName, setBrandName] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');
  const [refNumber, setRefNumber] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isBrandNameValid, setIsBrandNameValid] = useState<boolean>(true);
  const [isModelNameValid, setIsModelNameValid] = useState<boolean>(true);
  const [isRefNumberValid, setIsRefNumberValid] = useState<boolean>(true);
  const [isSerialNumberValid, setIsSerialNumberValid] = useState<boolean>(true);
  const [isOriginalBoxValid, setIsOriginalBoxValid] = useState<boolean>(true);
  const [isConditionValid, setIsConditionValid] = useState<boolean>(true);
  const [uploadedImgs, setUploadedImg] = useState<string[]>([]);
  const [atleastOneImgAvailable, setAtleastOneImgAvailable] = useState(false);
  const { data, productId } = useRecoilValue(SelectedBrandInfo);
  const setAddedItemMedia = useSetRecoilState(addedItemMedia);
  const { t: translate } = useTranslation();

  const { theme } = useTheme();
  const { uploadToGCP } = useUploadToGCP();
  const { addIndividualItem } = useSaveIndividualItem();
  const { data: uploadedItemMediaData } = useRecoilValue(addedItemMedia);

  const imageInputCb = (imageUrl: string, file: any) => {
    const formData = new FormData();
    if (uploadedImgs.indexOf(imageUrl) > -1) {
      setUploadedImg((prev) => {
        let newState = prev.filter((ele, i) => ele !== imageUrl);
        return [...newState];
      });
      // code to upload selected image to GCP
      formData.append('type', 'image');
      formData.append('productId', productId);
      formData.append('imageAndVideo', file);
    } else {
      setUploadedImg((prev) => [...prev, imageUrl]);
      // code to upload selected image to GCP
      formData.append('type', 'image');
      formData.append('productId', productId);
      formData.append('imageAndVideo', file);
    }
    //call to upload image to GCP
    uploadToGCP(formData, 'image', setAtleastOneImgAvailable);
  };
  useEffect(() => {
    setBrandName(route?.params?.item?.data?.brand);
    setModelName(route?.params?.item?.data?.family);
    setRefNumber(route?.params?.item?.data?.model);
  }, [route]);

  const createProduct = () => {
    if (brandName) {
      setIsBrandNameValid(true);
    } else {
      setIsBrandNameValid(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    if (modelName) {
      setIsModelNameValid(true);
    } else {
      setIsModelNameValid(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    if (refNumber) {
      setIsRefNumberValid(true);
    } else {
      setIsRefNumberValid(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    if (serialNumber) {
      setIsSerialNumberValid(true);
    } else {
      setIsSerialNumberValid(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    if (originalBoxAndPaperValue !== 'select') {
      setIsOriginalBoxValid(true);
    } else {
      setIsOriginalBoxValid(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    if (conditionValue !== 'select') {
      setIsConditionValid(true);
    } else {
      setIsConditionValid(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    if (
      isBrandNameValid &&
      isModelNameValid &&
      isRefNumberValid &&
      isSerialNumberValid &&
      isOriginalBoxValid &&
      isConditionValid
    ) {
      const payload = {
        brandId: route?.params?.item?.brandId,
        condition: conditionValue,
        description: description,
        familyId: route?.params?.item?.familyId,
        modelId: route?.params?.item?.modelId,
        originalBoxPaper: originalBoxAndPaperValue,
        productId: productId,
        serialNumber: serialNumber,
        year: year,
      };
      addIndividualItem(payload);
      navigation.navigate(AppScreen.PROFILE_SCREEN);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  useEffect(() => {
    setAddedItemMedia((prev: any) => ({
      loading: false,
      isLoaded: true,
      error: true,
      data: {
        images: [],
        video: '',
      },
    }));
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
        <View style={[styles.row, { marginTop: MetricsSizes.vs20 }]}>
          <MagicText isRequired={true}>
            {translate('addNewProductScreen.refNumBrandModel')}
          </MagicText>
        </View>
        <Button
          onPress={() => {
            navigation.navigate(AppScreen.PRODUCT_SEARCH_SCREEN);
          }}
          style={styles.searchButtonContainer}
          contentStyle={styles.searchButtonContent}
          type="PRIMARY"
          labelStyle={{ color: Colors.profileBioGrey }}
          label={translate('addNewProductScreen.refNumBrandModel')}
          rightIcon={
            <RemixIcon name={'search-line'} size={MetricsSizes.ms20} color={Colors.greyText} />
          }
        />
        <View style={styles.row}>
          <MagicText isRequired={true} type="MEDIUM">
            {translate('addNewProductScreen.productPhotos')}
          </MagicText>
        </View>
        <MagicText style={{ marginBottom: MetricsSizes.vs16 }}>
          {translate('addNewProductScreen.pleaseAddAtLeastOnePhotoOfYourItem')}
        </MagicText>
        <View style={styles.imagesCardRow}>
          <ImageCard
            image={uploadedItemMediaData?.images[0]}
            onSelect={(res) => {
              imageInputCb('image', res);
            }}
          />
          <ImageCard
            image={uploadedItemMediaData?.images[1]}
            onSelect={(res) => {
              imageInputCb('image', res);
            }}
          />
          <ImageCard
            image={uploadedItemMediaData?.images[2]}
            onSelect={(res) => {
              imageInputCb('image', res);
            }}
          />
          <ImageCard
            image={uploadedItemMediaData?.images[3]}
            onSelect={(res) => {
              imageInputCb('image', res);
            }}
          />
        </View>
        <View style={styles.videoRow}>
          <View style={styles.videoTextContainer}>
            <MagicText type="MEDIUM">{translate('addNewProductScreen.shortVideo')}</MagicText>
            <MagicText>{translate('addNewProductScreen.pleaseAddShortVideoClip')}</MagicText>
          </View>
          <ImageCard
            isVideo={true}
            containerStyle={styles.videoCard}
            onSelect={(res) => {
              console.log('res', res);
            }}
          />
        </View>
        <View style={styles.rowStyle}>
          <View style={[styles.container, { marginRight: MetricsSizes.hs16 }]}>
            <MagicTextInput
              isRequired={true}
              value={brandName}
              placeholder={translate('Brand')}
              onChangeText={(e) => {
                setBrandName(e);
              }}
              containerStyle={styles.textInputContainerStyle}
              inputHeaderLabel={translate('Brand')}
              isValid={isBrandNameValid}
              errorMessage={translate('addNewProductScreen.brandCanNotBeEmpty')}
              errorStyle={styles.errStyle}
            />
          </View>
          <View style={[styles.container, { marginLeft: MetricsSizes.hs16 }]}>
            <MagicTextInput
              isRequired={true}
              value={modelName}
              placeholder={translate('addNewProductScreen.model')}
              onChangeText={(e) => {
                setModelName(e);
              }}
              containerStyle={styles.textInputContainerStyle}
              inputHeaderLabel={translate('addNewProductScreen.model')}
              isValid={isModelNameValid}
              errorMessage={translate('addNewProductScreen.modelCanNotBeEmpty')}
              errorStyle={styles.errStyle}
            />
          </View>
        </View>
        <MagicTextInput
          isRequired={isRefNumberValid}
          value={refNumber}
          inputHeaderLabel={translate('addNewProductScreen.referenceNumber')}
          placeholder={translate('addNewProductScreen.referenceNumber')}
          onChangeText={(e) => {
            setRefNumber(e);
          }}
          containerStyle={styles.textInputContainerStyle}
          isValid={isRefNumberValid}
          errorMessage={translate('addNewProductScreen.refNumberCanNotBeEmpty')}
          errorStyle={styles.errStyle}
        />
        <MagicTextInput
          isRequired={true}
          inputHeaderLabel={translate('addNewProductScreen.serialNumber')}
          placeholder={translate('addNewProductScreen.serialNumber')}
          containerStyle={styles.textInputContainerStyle}
          onChangeText={(e) => {
            setSerialNumber(e);
          }}
          isValid={isSerialNumberValid}
          errorMessage={translate('addNewProductScreen.serialNumberCanNotBeEmpty')}
          errorStyle={styles.errStyle}
        />

        <DropDown
          dropDownHeaderLabel={translate('addNewProductScreen.originalBoxAndPapers')}
          isRequired={true}
          data={boxAndPaperArray}
          selectedValue={originalBoxAndPaperValue}
          onSelect={(item) => {
            setOriginalBoxAndPaperValue(item);
          }}
          isValid={isOriginalBoxValid}
          errorMessage={translate('addNewProductScreen.originalBoxAndPaperCanNotBeEmpty')}
          errorStyle={styles.errStyle}
        />

        <MagicTextInput
          inputHeaderLabel={translate('addNewProductScreen.year')}
          placeholder={translate('addNewProductScreen.enterYear')}
          onChangeText={(e) => {
            setYear(e);
          }}
          containerStyle={styles.textInputContainerStyle}
          keyboardType="number-pad"
          maxLength={43}
        />

        <DropDown
          dropDownHeaderLabel={translate('addNewProductScreen.condition')}
          isRequired={true}
          data={conditionArray}
          selectedValue={conditionValue}
          onSelect={(item) => {
            setConditionValue(item);
          }}
          isValid={isConditionValid}
          errorMessage={translate('addNewProductScreen.conditionCanNotBeEmpty')}
          errorStyle={styles.errStyle}
        />

        <MagicTextInput
          inputHeaderLabel={translate('addNewProductScreen.description')}
          onChangeText={(e) => {
            setDescription(e);
          }}
          placeholder={translate('addNewProductScreen.description')}
          containerStyle={[styles.textInputContainerStyle, { paddingBottom: MetricsSizes.vs30 }]}
        />
        <Button
          label={translate('addNewProductScreen.addItem')}
          onPress={() => {
            createProduct();
          }}
          style={styles.addItemButton}
        />
        <Button
          type="SECONDARY"
          label={translate('addNewProductScreen.cancel')}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewProductScreen;
