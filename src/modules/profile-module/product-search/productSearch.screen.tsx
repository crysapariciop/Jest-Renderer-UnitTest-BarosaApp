import { MagicText } from '@src/core-component/atoms';
import HorizontalLine from '@src/core-component/atoms/horizontalLine';
import SearchBar from '@src/core-component/molecules/top-search-bar/topSearchBar.component';
import { ProductSearchScreenProps } from '@src/core-navigation/interface';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Pressable, FlatList, Image } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { SearchProductsList, useSearchProductsList } from '../profile-store';
import { useRecoilValue } from 'recoil';
import { styles } from './productSearch.styles';
import { useTranslation } from 'react-i18next';
import { Img } from '@src/assets/images/image-constants/Images';
import { AppScreen } from '@src/core-constant/navigation';

const ProductSearchScreen = ({ navigation }: ProductSearchScreenProps) => {
  const { getSearchProductsList } = useSearchProductsList();
  const { data: productsList, isLoaded: isProductsListLoaded } = useRecoilValue(SearchProductsList);
  const [searchText, setSearchText] = useState<string>('');

  const { t: translate } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarRow}>
        <SearchBar
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          autoFocus={true}
          placeholder={translate('productSearchScreen.refNumBrandModel')}
          onRightIconPress={() => {
            setSearchText('');
          }}
          value={searchText}
          onChangeText={(e) => {
            getSearchProductsList(e);
            setSearchText(e);
          }}
          containerStyle={styles.searchBoxContainerStyle}
          rightIcon={
            <RemixIcon name={'ri-close-line'} size={MetricsSizes.ms24} color={Colors.greyText} />
          }
        />
      </View>
      <MagicText style={styles.impTextStyle}>
        {translate('productSearchScreen.moreThanThreeLettersAreNeeded')}
      </MagicText>

      <HorizontalLine />
      <TouchableOpacity style={styles.rowStyle}>
        <View style={styles.customEntryContainer}>
          <MagicText type="MEDIUM" style={styles.customEntryText}>
            {translate('productSearchScreen.customEntry')}
          </MagicText>
          <MagicText>{translate('productSearchScreen.cantFindYourWatch')}</MagicText>
        </View>
        <View style={styles.arrowContainer}>
          <RemixIcon
            name={'ri-arrow-right-s-line'}
            size={MetricsSizes.ms24}
            color={Colors.greyText}
          />
        </View>
      </TouchableOpacity>
      <HorizontalLine />
      {searchText.length > 0 ? (
        <FlatList
          data={searchText.length > 0 ? productsList : []}
          keyExtractor={(item: any) => item?._id}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(AppScreen.ADD_NEW_PRODUCT_SCREEN, {
                      item: item,
                    });
                  }}
                  style={styles.productRowContainer}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.imageStyle}
                      source={{ uri: item?.data?.images[0] }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.container}>
                    <MagicText>{item?.data?.brand}</MagicText>
                    <MagicText>{item?.data?.watchName}</MagicText>
                    <MagicText>{item?.data?.model}</MagicText>
                  </View>
                  <View>
                    <RemixIcon
                      name={'ri-arrow-right-s-line'}
                      size={MetricsSizes.ms24}
                      color={Colors.greyText}
                    />
                  </View>
                </TouchableOpacity>
                <HorizontalLine />
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.NoResultContainer}>
          <Image
            style={styles.searchBarosaImage}
            source={{
              uri: Img.searchBarosaImage,
            }}
          />
          <MagicText type="SEMI_BOLD" style={styles.searchBarosaText}>
            {translate('productSearchScreen.searchBarosa')}
          </MagicText>
          <MagicText style={styles.searchBarosaSubText}>
            {translate('productSearchScreen.searchForProductPeople')}
          </MagicText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductSearchScreen;
