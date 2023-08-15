import HomeSearchScreen from '@src/modules/home-module/home-search/homeSearch.screen';
import ProductDetailsScreen from '@src/modules/profile-module/product-details/productDetails.screen';
import MyFriendsScreen from '@src/modules/profile-module/my-friends/myFriends.screen';
import TransactionHistoryScreen from '@src/modules/profile-module/transaction-history/transactionHistory.Screen';
import ContractScreen from '@src/modules/profile-module/contract/contract.Screen';
import EditProfileScreen from '@src/modules/profile-module/edit-profile/editProfile.Screen';
import ProductShareScreen from '@src/modules/profile-module/product-share/productShare.screen';
import AddNewProductScreen from '@src/modules/profile-module/add-new-product/addNewProduct.Screen';
import ProductSearchScreen from '@src/modules/profile-module/product-search/productSearch.screen';
import OtherUserProfile from '@src/modules/profile-module/other-user-profile/other-user-profile.screen';
import PersonalChat from '@src/modules/messaging-module/personal-chat-module/personalChatScreen';
import WebViewModal from '@src/core-component/atoms/webViewModal/webViewModal';
import SettingsScreen from '@src/modules/settings-module/settings/settings.screen';
import SignInScreen from '@src/modules/auth-module/signin/signIn.screen';
import AccountSelection from '@src/modules/auth-module/account-selection/accountSelection.screen';
import SignUpScreen from '@src/modules/auth-module/signup/signUp.screen';
import EmailVerification from '@src/modules/auth-module/email-verification/emailVerification.screen';
import ForgotPassword from '@src/modules/auth-module/forget-pass/forgetPass.screen';
import { ReactElement } from 'react';
import { HomeSearchScreenProps } from '@src/core-navigation/interface';

enum AppScreen {
  //Auth STACK
  SIGN_IN_SCREEN = 'SignInScreen',
  ACCOUNT_SELECTION_SCREEN = 'AccountSelectionScreen',
  SIGN_UP_SCREEN = 'SignUpScreen',
  EMAIL_VERIFICATION_SCREEN = 'EmailVerificationScreen',
  FORGOT_PASSWORD_SCREEN = 'ForgotPassword',

  //MainStack
  HOME_SCREEN = 'Home',
  PROFILE_SCREEN = 'Profile',
  MESSAGES_SCREEN = 'Messages',
  SETTINGS_SCREEN = 'Settings',
  BOTTOM_TAB_NAVIGATOR = 'BottomTabStack',
  HOME_SEARCH_SCREEN = 'HomeSearchScreen',
  PRODUCT_DETAILS_SCREEN = 'ProductDetailsScreen',
  MY_FRIENDS_SCREEN = 'MyFriendsScreen',
  TRANSACTION_HISTORY_SCREEN = 'TransactionHistoryScreen',
  CONTRACT_SCREEN = 'ContractScreen',
  EDIT_PROFILE_SCREEN = 'EditProfileScreen',
  PRODUCT_SHARE_SCREEN = 'ProductShareScreen',
  ADD_NEW_PRODUCT_SCREEN = 'AddNewProductScreen',
  PRODUCT_SEARCH_SCREEN = 'ProductSearchScreen',
  OTHER_USER_PROFILE_SCREEN = 'OtherUserProfileScreen',
  PERSONAL_CHAT_SCREEN = 'PersonalChat',

  //Common
  WEB_VIEW_MODAL = 'WebViewModal',
}

const AuthStack: { name: string; component: (() => ReactElement) | React.FC }[] = [
  {
    name: AppScreen.SIGN_IN_SCREEN,
    component: SignInScreen,
  },
  {
    name: AppScreen.ACCOUNT_SELECTION_SCREEN,
    component: AccountSelection,
  },
  {
    name: AppScreen.SIGN_UP_SCREEN,
    component: SignUpScreen,
  },
  {
    name: AppScreen.EMAIL_VERIFICATION_SCREEN,
    component: EmailVerification,
  },
  {
    name: AppScreen.WEB_VIEW_MODAL,
    component: WebViewModal,
  },
  {
    name: AppScreen.FORGOT_PASSWORD_SCREEN,
    component: ForgotPassword,
  },
];

const HomeGroup: {
  name: string;
  component: ({ navigation }: HomeSearchScreenProps) => ReactElement;
}[] = [{ name: AppScreen.HOME_SEARCH_SCREEN, component: HomeSearchScreen }];

const UserGroup: { name: string; component: ({ navigation }: any) => ReactElement }[] = [
  {
    name: AppScreen.PRODUCT_DETAILS_SCREEN,
    component: ProductDetailsScreen,
  },
  {
    name: AppScreen.MY_FRIENDS_SCREEN,
    component: MyFriendsScreen,
  },
  {
    name: AppScreen.TRANSACTION_HISTORY_SCREEN,
    component: TransactionHistoryScreen,
  },
  {
    name: AppScreen.CONTRACT_SCREEN,
    component: ContractScreen,
  },
  {
    name: AppScreen.EDIT_PROFILE_SCREEN,
    component: EditProfileScreen,
  },
  {
    name: AppScreen.PRODUCT_SHARE_SCREEN,
    component: ProductShareScreen,
  },
  {
    name: AppScreen.ADD_NEW_PRODUCT_SCREEN,
    component: AddNewProductScreen,
  },
  {
    name: AppScreen.PRODUCT_SEARCH_SCREEN,
    component: ProductSearchScreen,
  },
  {
    name: AppScreen.OTHER_USER_PROFILE_SCREEN,
    component: OtherUserProfile,
  },
];

const MessagingGroup: { name: string; component: ({ props, navigation }: any) => JSX.Element }[] = [
  {
    name: AppScreen.PERSONAL_CHAT_SCREEN,
    component: PersonalChat,
  },
  {
    name: AppScreen.WEB_VIEW_MODAL,
    component: WebViewModal,
  },
];

const SettingsGroup: { name: string; component: React.FC }[] = [
  {
    name: AppScreen.SETTINGS_SCREEN,
    component: SettingsScreen,
  },
];

export { AuthStack, HomeGroup, UserGroup, MessagingGroup, SettingsGroup, AppScreen };
