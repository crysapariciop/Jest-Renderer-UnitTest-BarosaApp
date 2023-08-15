import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { AllSearchState } from '../../home-store/atom';
import Colors from '@src/theme/colors';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import { RightArrowIcon } from '@src/assets/icons/profile-module-icons';
import { MetricsSizes } from '@src/theme/metrics';
import { defaultImages } from '@src/core-constant/constants';
import { ProfileScreenProps } from '@src/core-navigation/interface';
import { AppScreen } from '@src/core-constant/navigation';

const AllTab = ({ navigation }: ProfileScreenProps) => {
  const allSearchData = useRecoilValue(AllSearchState);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {allSearchData.data.Brands.length ? (
        <>
          <Text style={styles.title}>Top brands</Text>
          <FlatList
            scrollEnabled={false}
            style={{ flex: 1, maxHeight: 200 }}
            data={allSearchData.data.Brands}
            renderItem={({ item: brand }) => {
              return (
                <NavigationRow
                  label={brand.name}
                  rightIcon={<RightArrowIcon />}
                  subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
                  leftImage={brand.logo || defaultImages.profilePic}
                />
              );
            }}
          ></FlatList>
        </>
      ) : null}

      <View style={{ flex: 1 }}>
        {allSearchData.data.Families.length ? (
          <>
            <Text style={styles.title}>Models</Text>
            <FlatList
              style={{ flex: 1, backgroundColor: 'white' }}
              data={allSearchData.data.Families}
              renderItem={({ item: model }) => {
                return (
                  <NavigationRow
                    label={model.familyName}
                    subLabel={model.brandName}
                    rightIcon={<RightArrowIcon />}
                    subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
                    // ? The _id is not the one from a single product but of the whole brand family, so I can't redirect to the product detail screen with that id.
                    // ? When the user presses on this it should redirect to another screen that maps all the products within that model (not sure if this should be rendered
                    // ? on another screen or use the "Products" tab), and then when the user presses on that individual product navigate to the product detail screen.
                    // onPress={() => {
                    //   navigation.navigate(AppScreen.PRODUCT_DETAILS_SCREEN, {
                    //     productId: model._id,
                    //   });
                    // }}
                  />
                );
              }}
            ></FlatList>
          </>
        ) : null}
        <View style={{ flex: 1 }}>
          {allSearchData.data.Users.length ? (
            <>
              <Text style={styles.title}>People</Text>
              <FlatList
                style={{ flex: 1, backgroundColor: 'white' }}
                data={allSearchData.data.Users}
                renderItem={({ item: user }) => {
                  return (
                    <NavigationRow
                      label={`${user.firstName} ${user.lastName}`}
                      rightIcon={<RightArrowIcon />}
                      subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
                      leftImage={user.images?.profile || defaultImages.profilePic}
                      onPress={() => {
                        navigation.navigate(AppScreen.OTHER_USER_PROFILE_SCREEN, { id: user._id });
                      }}
                    />
                  );
                }}
              ></FlatList>
            </>
          ) : null}

          {allSearchData.data.Resellers.length ? (
            <>
              <Text style={styles.title}>Resellers</Text>
              <FlatList
                style={{ flex: 1, backgroundColor: 'white' }}
                data={allSearchData.data.Resellers}
                renderItem={({ item: reseller }) => {
                  return (
                    <NavigationRow
                      label={`${reseller.firstName} ${reseller.lastName}`}
                      rightIcon={<RightArrowIcon />}
                      subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
                      leftImage={reseller.images?.profile || defaultImages.profilePic}
                      onPress={() => {
                        navigation.navigate(AppScreen.OTHER_USER_PROFILE_SCREEN, {
                          id: reseller._id,
                        });
                      }}
                    />
                  );
                }}
              ></FlatList>
            </>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    color: Colors.greyText,
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default AllTab;
