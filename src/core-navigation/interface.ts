import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppScreen } from '@src/core-constant/navigation';

export type RootStackParamList = {
  SignUpScreen: undefined;
  AccountSelectionScreen: undefined;
  EmailVerificationScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  WebViewModal: { title?: string; url?: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Messages: undefined;
  Settings: undefined;
};

export type MainStackParamList = {
  BottomTabStack: BottomTabScreenProps<BottomTabParamList>;
  HomeSearchScreen: undefined;
  ProductDetailsScreen: { productId: any };
  MyFriendsScreen: undefined;
  TransactionHistoryScreen: undefined;
  ContractScreen: undefined;
  EditProfileScreen: undefined;
  ProductShareScreen: undefined;
  AddNewProductScreen: { item?: any };
  ProductSearchScreen: undefined;
  OtherUserProfileScreen: { id: string };
  PersonalChat: { item?: any };
  WebViewModal: { title?: string; url?: string };
  SettingsScreen: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppScreen.SIGN_IN_SCREEN
>;

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<BottomTabParamList>
>;

export type ProductShareScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.PRODUCT_SHARE_SCREEN
>;

export type ProductSearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.PRODUCT_SEARCH_SCREEN
>;

export type AddNewProductScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, AppScreen.ADD_NEW_PRODUCT_SCREEN>,
  BottomTabScreenProps<BottomTabParamList>
>;

export type ProductDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<BottomTabParamList>
>;

export type MyFriendsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.MY_FRIENDS_SCREEN
>;

export type TransactionHistoryScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.TRANSACTION_HISTORY_SCREEN
>;

export type ContractScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.CONTRACT_SCREEN
>;

export type EditProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.EDIT_PROFILE_SCREEN
>;

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<BottomTabParamList>
>;

export type HomeSearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  AppScreen.HOME_SEARCH_SCREEN
>;

export type MessagingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList>,
  BottomTabScreenProps<BottomTabParamList>
>;
