import SearchBar from '@src/core-component/molecules/top-search-bar/topSearchBar.component';
import { HomeSearchScreenProps } from '@src/core-navigation/interface';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, SafeAreaView, Image, Text, Dimensions } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useSearch } from './hooks';
import { Img } from '@src/assets/images/image-constants/Images';
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTab from './searchTabs/AllTab';
import ProductsTab from './searchTabs/ProductsTab';
import PeopleTab from './searchTabs/PeopleTab';
import ResellersTab from './searchTabs/ResellersTab';
import SuppliersTab from './searchTabs/SuppliersTab';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { AllSearchState, searchTextAtom } from '../home-store/atom';
import { debounce } from 'lodash';

const HomeSearchScreen = ({ navigation }: HomeSearchScreenProps) => {
  const { t: translate } = useTranslation();
  const { theme }: any = useTheme();
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);
  const resetAllSearch = useResetRecoilState(AllSearchState);
  const allSearch = useRecoilValue(AllSearchState);
  const { getAllSearch } = useSearch();
  const handleTextChange = (e: string) => {
    setSearchText(e);
  };

  const clearSearchText = () => {
    setSearchText('');
  };
  const debouncedAllSearch = useMemo(() => debounce(getAllSearch, 200), [getAllSearch]);

  useEffect(() => {
    if (searchText.length > 2) {
      debouncedAllSearch(searchText);
    }
    return () => {
      resetAllSearch();
    };
  }, [searchText]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.searchBarRow}>
        <SearchBar
          onLeftIconPress={() => {
            clearSearchText();
            navigation.goBack();
          }}
          autoFocus={true}
          placeholder={translate('productSearchScreen.refNumBrandModel') || ''}
          onRightIconPress={clearSearchText}
          value={searchText}
          onChangeText={handleTextChange}
          containerStyle={styles.searchBoxContainerStyle}
          rightIcon={
            <RemixIcon name={'ri-close-line'} size={MetricsSizes.ms24} color={Colors.greyText} />
          }
          showWarning={searchText.length < 3}
          warningMsg={'Note: Minimum 3 alphabets is required.'}
        />
      </View>
      <ScrollView style={styles.container}>
        {allSearch.isLoading ? (
          <View style={{ flex: 1, marginTop: 20 }}>
            <Image
              style={{ height: 210, width: 239, alignSelf: 'center' }}
              source={Img.searchBarosaImage}
            />
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: MetricsSizes.hs15,
                fontWeight: '600',
                lineHeight: MetricsSizes.hs20,
                alignSelf: 'center',
              }}
            >
              {translate('productSearchScreen.searchBarosa')}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: MetricsSizes.hs12,
                fontWeight: '400',
                lineHeight: MetricsSizes.hs20,
                color: Colors.greyText,
                alignSelf: 'center',
              }}
            >
              {translate('productSearchScreen.searchForProductPeople')}
            </Text>
          </View>
        ) : (
          <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
            <SearchTabs />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Tab = createMaterialTopTabNavigator();

const SearchTabs = () => {
  return (
    <Tab.Navigator
      style={{ height: Dimensions.get('window').height }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize', fontFamily: 'Poppins' },
        tabBarItemStyle: { padding: -20, marginVertical: -8 },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        tabBarActiveTintColor: Colors.goldColor,
        tabBarInactiveTintColor: Colors.greyText,
      }}
    >
      <Tab.Screen name="All" component={AllTab}></Tab.Screen>
      <Tab.Screen name="Products" component={ProductsTab}></Tab.Screen>
      <Tab.Screen name="People" component={PeopleTab}></Tab.Screen>
      <Tab.Screen name="Resellers" component={ResellersTab}></Tab.Screen>
      <Tab.Screen name="Suppliers" component={SuppliersTab}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainerStyle: {
    borderWidth: MetricsSizes.ms1,
    borderColor: '#d8d8d8',
  },
  searchBarRow: {
    paddingHorizontal: MetricsSizes.hs16,
    paddingVertical: MetricsSizes.vs8,
  },
});

export default HomeSearchScreen;
