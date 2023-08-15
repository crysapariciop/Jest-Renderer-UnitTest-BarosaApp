import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProfileStackParamList } from '../interface';
import ProductDetailsScreen from '@src/modules/profile-module/product-details/productDetails.screen';
import MyFriendsScreen from '@src/modules/profile-module/my-friends/myFriends.screen';
import TransactionHistoryScreen from '@src/modules/profile-module/transaction-history/transactionHistory.Screen';
import ContractScreen from '@src/modules/profile-module/contract/contract.Screen';
import EditProfileScreen from '@src/modules/profile-module/edit-profile/editProfile.Screen';
import ProductShareScreen from '@src/modules/profile-module/product-share/productShare.screen';
import AddNewProductScreen from '@src/modules/profile-module/add-new-product/addNewProduct.Screen';
import ProductSearchScreen from '@src/modules/profile-module/product-search/productSearch.screen';
import OtherUserProfile from '@src/modules/profile-module/other-user-profile/other-user-profile.screen';

/**
 *
 * @deprecated Using groups at MainStackNavigator instead.
 */
const ProfileStack = () => {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();

  const screens: any = [
    {
      name: 'ProductDetailsScreen',
      component: ProductDetailsScreen,
    },
    {
      name: 'MyFriendsScreen',
      component: MyFriendsScreen,
    },
    {
      name: 'TransactionHistoryScreen',
      component: TransactionHistoryScreen,
    },
    {
      name: 'ContractScreen',
      component: ContractScreen,
    },
    {
      name: 'EditProfileScreen',
      component: EditProfileScreen,
    },
    {
      name: 'ProductShareScreen',
      component: ProductShareScreen,
    },
    {
      name: 'AddNewProductScreen',
      component: AddNewProductScreen,
    },
    {
      name: 'ProductSearchScreen',
      component: ProductSearchScreen,
    },
    {
      name: 'OtherUserProfileScreen',
      component: OtherUserProfile,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((screen: any) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default ProfileStack;
