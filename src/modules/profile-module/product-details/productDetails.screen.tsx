import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
} from 'react-native';
import CommonPageHeader from '@src/core-component/atoms/commonPageHeader';
import { MetricsSizes } from '@src/theme/metrics';
import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import RemixIcon from 'react-native-remix-icon';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import {
  BlockChainCertificateIcon,
  ContractIcon,
  MessageIcon,
  RightArrowIcon,
  ShippingHistoryIcon,
} from '@src/assets/icons/profile-module-icons';
import { ProductDetailsScreenProps } from '@src/core-navigation/interface';
import { IndividualItem, useIndiItemList } from '../profile-store';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import Button from '@src/core-component/atoms/button';
import CustomModal from '@src/core-component/atoms/customModal';
import { useTheme } from '@src/theme/themeProvider';
import { styles } from './productDetails.styles';
import ImageSlider from '@src/core-component/molecules/image-slider/imageSlider.screen';
import { useTranslation } from 'react-i18next';
import { AppScreen } from '@src/core-constant/navigation';

const ProductDetailsScreen = ({ navigation, route }: ProductDetailsScreenProps) => {
  const { getIndividualItem, editItemsDiscription } = useIndiItemList();
  const { data: IndProductDeatils, loading } = useRecoilValue(IndividualItem);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [newDiscription, setNewDiscription] = useState<string>('');
  const resetIndItem = useResetRecoilState(IndividualItem);

  const { theme } = useTheme();
  const { t: translate } = useTranslation();
  const { productId }: any = route.params;

  console.log('navigation route', route);

  useEffect(() => {
    getIndividualItem(productId);
    return () => {
      resetIndItem();
    };
  }, []);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      {loading ? (
        <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
      ) : (
        <ScrollView>
          <CommonPageHeader
            pageName={translate('productDetailsScreen.productDetails')}
            onPress={() => {
              navigation.goBack();
            }}
            leftIcon={
              <RemixIcon
                name={'arrow-left-line'}
                size={MetricsSizes.ms24}
                color={Colors.greyText}
              />
            }
          />
          <ImageSlider images={IndProductDeatils?.images} video={IndProductDeatils?.video} />
          <View style={{ marginHorizontal: MetricsSizes.hs16 }}>
            <View style={styles.brandNameRow}>
              <MagicText style={styles.brandNameText}>
                {IndProductDeatils?.familyId?.brandId?.name}
              </MagicText>
              <TouchableOpacity
                onPress={() => {
                  setShowEditModal(true);
                }}
              >
                <RemixIcon name={'edit-line'} size={MetricsSizes.ms20} color={Colors.blackText} />
              </TouchableOpacity>
            </View>
            <MagicText type="SEMI_BOLD" style={styles.brandFamilyText}>
              {IndProductDeatils?.familyId?.name}
            </MagicText>
            <MagicText style={styles.descriptionText}>
              {IndProductDeatils?.description ||
                translate('productDetailsScreen.noDescriptionFound')}
            </MagicText>
            <NavigationRow
              label={translate('productDetailsScreen.messages')}
              leftIcon={<MessageIcon />}
              rightIcon={<RightArrowIcon />}
              onPress={() => {
                navigation.navigate(AppScreen.MESSAGES_SCREEN);
              }}
            />
            <NavigationRow
              label={translate('productDetailsScreen.blockchainCertificate')}
              subLabel={translate('productDetailsScreen.getCertificate')}
              leftIcon={<BlockChainCertificateIcon />}
              rightIcon={<RightArrowIcon />}
            />
            <NavigationRow
              onPress={() => {
                navigation.navigate(AppScreen.TRANSACTION_HISTORY_SCREEN);
              }}
              label={translate('productDetailsScreen.transactionHistory')}
              leftIcon={<ShippingHistoryIcon />}
              rightIcon={<RightArrowIcon />}
            />
            <NavigationRow
              onPress={() => {
                navigation.navigate(AppScreen.CONTRACT_SCREEN);
              }}
              label={translate('productDetailsScreen.contract')}
              leftIcon={<ContractIcon />}
              rightIcon={<RightArrowIcon />}
            />
          </View>

          <CustomModal
            visible={showEditModal}
            showModal={showEditModal}
            title={translate('productDetailsScreen.selectOption')}
            onRequestClose={() => setShowEditModal(false)}
          >
            <View>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', padding: MetricsSizes.ms4 }}
                onPress={() => {
                  setShowEditModal(false);
                }}
              >
                <RemixIcon name={'close-line'} size={MetricsSizes.ms20} color={Colors.blackText} />
              </TouchableOpacity>
              <MagicText type="SEMI_BOLD" style={styles.modalBoldTexts}>
                {IndProductDeatils?.brand?.name}
              </MagicText>
              <MagicText type="SEMI_BOLD" style={styles.modalBoldTexts}>
                {IndProductDeatils?.family?.name}
              </MagicText>
              <MagicText style={styles.modalInputHeader}>
                {translate('productDetailsScreen.description')}
              </MagicText>
              <TextInput
                numberOfLines={5}
                placeholder={IndProductDeatils?.description}
                style={styles.modalInputStyle}
                onChangeText={(e) => {
                  setNewDiscription(e);
                }}
              />
              <Button
                style={styles.modalButton}
                label={'Save'}
                onPress={() => {
                  editItemsDiscription(route?.params?.productId, newDiscription, IndProductDeatils);
                  setShowEditModal(false);
                }}
              />
            </View>
          </CustomModal>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
