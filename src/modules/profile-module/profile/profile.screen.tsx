import ProfileHeader from '@src/core-component/molecules/profile-header/profileHeader.screen';
import { useTheme } from '@src/theme/themeProvider';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import HorizontalLine from '@src/core-component/atoms/horizontalLine';
import Colors from '@src/theme/colors';
import RemixIcon from 'react-native-remix-icon';
import { DEVICE_HEIGHT, MetricsSizes } from '@src/theme/metrics';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { UserState, useAuth } from '@src/modules/auth-module/auth-store';
import { AddedItemsList, useIndiItemList, useProfileDetails } from '../profile-store';
import PopUpMenu from '@src/core-component/atoms/popUpMenu';
import { styles } from './profile.styles';
import ProductCardRow from '@src/core-component/molecules/product-card-row/productCardRow.screen';
import ProductCardGrid from '@src/core-component/molecules/product-card-grid/productCardGrid.screen';
import { ProfileScreenProps } from '@src/core-navigation/interface';
import { useIsFocused } from '@react-navigation/native';
import Button from '@src/core-component/atoms/button';
import { AppScreen } from '@src/core-constant/navigation';

export type myItemType = {
  _id: any;
  nota: boolean;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { theme }: any = useTheme();
  const [isGridViewSelected, setIsGridViewSelected] = useState<boolean>(true);
  const [isColViewSelected, setIsColViewSelected] = useState<boolean>(false);
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { data: loginUser } = userStateContents;
  const { token, firstName, lastName, bio, images } = loginUser;
  const { getUserDetails } = useAuth();
  const { getItemsList } = useIndiItemList();
  const { data: addedItemList, isLoaded: isAddedItemloaded } = useRecoilValue(AddedItemsList);
  const [productList, setProductList] = useState<myItemType[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (token) {
      getUserDetails(token, true);
      getItemsList();
    }
  }, [token, isFocused]);

  useEffect(() => {
    const list = JSON.parse(JSON.stringify(addedItemList));
    console.log('list', addedItemList.length);
    let newArray: any = [];
    if (addedItemList.length % 2 == 0) {
      newArray = [...list];
    } else {
      newArray = [...list, { nota: true }];
    }
    setProductList(newArray);
  }, [addedItemList, isFocused]);

  const handleGridPress = () => {
    setIsColViewSelected(true);
    setIsGridViewSelected(false);
  };

  const handleListPress = () => {
    setIsColViewSelected(false);
    setIsGridViewSelected(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.container}>
        <ProfileHeader
          profileUrl={images}
          profileFirstName={firstName}
          profileLastName={lastName}
          profileBio={bio}
          onEditProfilePress={() => {
            navigation.navigate(AppScreen.EDIT_PROFILE_SCREEN);
          }}
        />
        <View style={styles.rowStyle}>
          <PopUpMenu
            onPress={() => {
              navigation.navigate(AppScreen.MY_FRIENDS_SCREEN);
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.gridIconStyle} onPress={handleListPress}>
              <RemixIcon
                name={isGridViewSelected ? 'function-fill' : 'function-line'}
                size={MetricsSizes.ms20}
                color={isGridViewSelected ? Colors.blackText : Colors.greyText}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGridPress}>
              <RemixIcon
                name={isColViewSelected ? 'list-check' : 'list-check'}
                size={MetricsSizes.ms20}
                color={isColViewSelected ? Colors.blackText : Colors.greyText}
              />
            </TouchableOpacity>
          </View>
        </View>
        <HorizontalLine style={styles.horizontalLineStyle} />

        <View
          style={[
            styles.commonHorizontalMargin,
            isGridViewSelected ? { paddingBottom: MetricsSizes.vs240 } : {},
          ]}
        >
          <View>
            {isGridViewSelected ? (
              !isAddedItemloaded ? (
                <ActivityIndicator size={'large'} style={styles.activityIndicatorStyle} />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ marginBottom: DEVICE_HEIGHT * 0.12 }}
                  bounces={false}
                  numColumns={2}
                  data={productList}
                  keyExtractor={(item: myItemType) => item?._id}
                  renderItem={({ item, index }) => {
                    if (item?.nota) {
                      return <View style={styles.emptyCardView} />;
                    }
                    return (
                      <ProductCardGrid
                        item={item}
                        index={index}
                        onSharePress={() => {
                          navigation.navigate(AppScreen.PRODUCT_SHARE_SCREEN);
                        }}
                        onItemPress={(id) => {
                          navigation.navigate(AppScreen.PRODUCT_DETAILS_SCREEN, { productId: id });
                        }}
                      />
                    );
                  }}
                />
              )
            ) : null}
          </View>
          <View>
            {isColViewSelected ? (
              !isAddedItemloaded ? (
                <ActivityIndicator size={'large'} style={{ marginTop: MetricsSizes.vs20 }} />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ marginBottom: DEVICE_HEIGHT * 0.4 }}
                  bounces={false}
                  data={productList}
                  keyExtractor={(item) => item?._id}
                  renderItem={({ item, index }) => {
                    if (item?.nota) {
                      return null;
                    }
                    return (
                      <ProductCardRow
                        item={item}
                        index={index}
                        onItemPress={(id) => {
                          navigation.navigate(AppScreen.PRODUCT_DETAILS_SCREEN, {
                            productId: id,
                          });
                        }}
                      />
                    );
                  }}
                />
              )
            ) : null}
          </View>
        </View>
        <Button
          onPress={() => {
            navigation.navigate(AppScreen.ADD_NEW_PRODUCT_SCREEN, {});
          }}
          style={styles.addNewProductButton}
          type="ICON"
          centerIcon={
            <RemixIcon name={'add-fill'} size={MetricsSizes.ms20} color={Colors.whiteBg} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
