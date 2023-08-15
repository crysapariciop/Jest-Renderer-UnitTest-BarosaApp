import { StarIcon } from '@src/assets/icons/home-module-icons';
import { RightArrowIcon } from '@src/assets/icons/profile-module-icons';
import { MagicText } from '@src/core-component/atoms';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import RoundBrandContainer from '@src/core-component/atoms/round-brand-container/roundBrandContainer';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useHome } from '../home-store/hooks';
import { useRecoilValue } from 'recoil';
import {
  FeaturedResellerState,
  PopularCollectorState,
  TrendingProductState,
} from '../home-store/atom';
import { styles } from './home.styles';
import { defaultImages } from '@src/core-constant/constants';
import { HomeScreenProps } from '@src/core-navigation/interface';
import { AppScreen } from '@src/core-constant/navigation';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { theme }: any = useTheme();
  const { t: translate } = useTranslation();
  const { getPopularCollectors, getFeaturedResellers, getTrendingProducts } = useHome();
  const popularCollectors = useRecoilValue(PopularCollectorState);
  const featuredResellers = useRecoilValue(FeaturedResellerState);
  const trendingProducts = useRecoilValue(TrendingProductState);

  const testNames = [
    { name: 'Rolex', id: 1 },
    { name: 'Audemars Piguet', id: 2 },
    { name: 'Patek Philippe', id: 3 },
    { name: 'Vacheron Constantin', id: 4 },
    { name: 'Omega', id: 5 },
    { name: 'Grand Seiko', id: 6 },
  ];
  useEffect(() => {
    getPopularCollectors();
    getFeaturedResellers();
    getTrendingProducts();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <ScrollView>
        <View style={styles.pageHeader}>
          <MagicText type="MEDIUM" style={styles.homeText}>
            {translate('homeScreen.home')}
          </MagicText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(AppScreen.HOME_SEARCH_SCREEN);
            }}
          >
            <RemixIcon name={'search-line'} size={MetricsSizes.ms20} color={Colors.searchWhite} />
          </TouchableOpacity>
        </View>
        <View style={styles.listViewContainer}>
          <MagicText style={styles.listHeaderText}>Top Brands</MagicText>
          <FlatList
            style={styles.collectorListStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            //   used hard coded data for design that will be remove while api integration
            data={testNames}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.brandListStyle} key={item.id}>
                  <RoundBrandContainer brandName={item.name} />
                </TouchableOpacity>
              );
            }}
          />
          <MagicText style={styles.dealerListHeader}>
            {translate('homeScreen.featuredDealers')}
          </MagicText>
          <View style={styles.rowParent}>
            {featuredResellers.isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={featuredResellers.data}
                renderItem={({ item: reseller }) => {
                  return (
                    <NavigationRow
                      label={`${reseller.firstName} ${reseller.lastName}`}
                      subLabel={'4.7 (3500+)'}
                      subLabelIcon={<StarIcon />}
                      subLabelStyle={{ color: Colors.greyText }}
                      leftImage={defaultImages.profilePic}
                      rightIcon={<RightArrowIcon />}
                      onPress={() => {
                        navigation.navigate(AppScreen.OTHER_USER_PROFILE_SCREEN, {
                          id: reseller._id,
                        });
                      }}
                    />
                  );
                }}
              ></FlatList>
            )}
          </View>
          <MagicText style={[styles.dealerListHeader, { marginTop: MetricsSizes.vs24 }]}>
            {translate('homeScreen.trendingProductsOnBarosa')}
          </MagicText>
          <View style={styles.trendingListParent}>
            {trendingProducts.isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                //   used hard coded data for design that will be remove while api integration
                data={trendingProducts.data}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={{ backgroundColor: Colors.bgGrey, marginRight: MetricsSizes.hs8 }}
                      onPress={() => {
                        console.log(item._id);
                        navigation.navigate(AppScreen.PRODUCT_DETAILS_SCREEN, {
                          productId: item._id,
                        });
                      }}
                    >
                      <Image
                        source={{
                          uri: item.images[0],
                        }}
                        style={styles.trendingImageStyle}
                        alt="img not found"
                      />
                      <View style={styles.trendingImageTextParent}>
                        <MagicText style={styles.trendingImageSerialNum}>
                          {item.brand?.name || translate('homeScreen.noBrand')}
                        </MagicText>
                        <MagicText type="SEMI_BOLD" style={styles.trendingImageBrandName}>
                          {item.family?.name || translate('homeScreen.noModel')}
                        </MagicText>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
