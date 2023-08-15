import { useCallback, useState } from 'react';
import {
  useResetRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil';

import { useNetwork } from '@src/core-hooks/network';
import { useLocalStorage } from '@src/core-hooks/local-storage';
import { UserState } from './atom';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '@src/core-navigation/navigationServices';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Linking } from 'react-native';
import { BottomTabParamList } from '@src/core-navigation/interface';
import { AppScreen } from '@src/core-constant/navigation';
//Complete Auth flow
export const useAuth = () => {
  const [userData, setUser] = useRecoilStateLoadable(UserState);
  const { token: loginUserToken } = userData.contents.data;
  const { post, get, patch } = useNetwork();
  const { set: setLocalStorage } = useLocalStorage();
  // const navigate = useNavigation<BottomTabParamList>();

  const getUserDetails = useCallback(
    async (token: string, confirmUserType?: boolean, redirUrl?: string, setIsVerified?: any) => {
      await get('/users')
        .then((resp: any) => {
          const {
            email,
            firstName,
            lastName,
            _id: userId,
            userType,
            isEmailVerified,
          } = resp?.data?.[0] ?? {};
          if (setIsVerified && isEmailVerified) {
            setIsVerified(true);
            setTimeout(() => {
              // navigate(RoutesUrl.PROFILE);
            }, 4000);
          }
          if (email) {
            setLocalStorage('user', {
              email,
              firstName,
              lastName,
              userType,
              userId,
              token,
            });
            setUser((prev: any) => ({
              ...prev,
              data: {
                ...prev.data,
                ...resp?.data?.[0],
                token,
                userId,
                isEmailVerified,
              },
            }));
            if (confirmUserType) {
              setTimeout(() => {
                // if (!userType) navigate(RoutesUrl.USER_PROFILE_SELECT);
                // else if (redirUrl) navigate(RoutesUrl.PROFILE);
              }, 500);
            }
          }
        })
        .finally(() => {});
    },
    [get, setLocalStorage, setUser]
  );

  const getSignedUp = useCallback(
    async (payload: any) => {
      setUser((prev) => ({ ...prev, isLoaded: false }));
      await post(`/users`, payload)
        .then((resp: any) => {
          if (resp) {
            const user = {
              email: resp.email,
              firstName: resp.firstName,
              lastName: resp.lastName,
              token: resp.token,
              userType: resp.userType ?? '',
              userId: resp._id,
            };
            setUser((prev: any) => ({ ...prev, data: user }));
            setLocalStorage('user', user);
            if (resp?.message) {
              Toast.show({
                type: 'error',
                text1: 'Sign Up',
                text2: resp?.message,
              });
            }
            if (resp?._id) {
              navigate(AppScreen.ACCOUNT_SELECTION_SCREEN);
            }
            return;
          }
          setUser((prev) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setUser((prev) => ({ ...prev, isLoaded: true }));
        });
    },
    [navigate, post, setLocalStorage, setUser]
  );

  const getSignedIn = useCallback(
    (payload: any) => {
      let accessToken = '';
      setUser((prev: any) => ({ ...prev, isLoaded: false }));
      post(`/login`, payload)
        .then(async (resp: any) => {
          if (resp?.message) {
            Toast.show({
              type: 'error',
              text1: 'Sign In',
              text2: resp?.message,
            });
          }
          // if (resp?.success) {
          //   navigate('HomeScreen');
          // }
          const { success, token, userId } = resp ?? {};
          if (success) {
            await AsyncStorage.setItem('user', JSON.stringify(userData.contents.data));
            setUser((prev: any) => ({
              ...prev,
              data: { ...prev.data, token },
            }));
            accessToken = token;
            setLocalStorage('user', {
              email: '',
              firstName: '',
              lastName: '',
              token,
              userType: '',
              userId,
            });
            return;
          }
          setUser((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          getUserDetails(accessToken, true, 'BottomTabBar');
          setUser((prev: any) => ({
            ...prev,
            isLoaded: true,
          }));
        });
    },
    [setUser, post, setLocalStorage, getUserDetails]
  );

  const getSignInWithProvider = useCallback(
    (accessToken: string) => {
      setLocalStorage('user', {
        email: '',
        firstName: '',
        lastName: '',
        token: accessToken,
        userType: '',
        userId: '',
      });
      getUserDetails(accessToken, true, RoutesUrl.PROFILE);
    },
    [getUserDetails]
  );

  const updateUserType = useCallback(
    (payload: any, userId: string, isNavigationEnabled?: boolean) => {
      patch(`/users/${userId}`, payload)
        .then((resp: any) => {
          getUserDetails(loginUserToken);
          if (resp) {
            setUser((prev: any) => {
              return { ...prev, data: { ...prev.data, ...resp } };
            });
            if (isNavigationEnabled) {
              navigate(AppScreen.EMAIL_VERIFICATION_SCREEN);
            }
            return;
          }
          setUser((prev) => ({ ...prev, error: true }));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setUser((prev) => ({ ...prev, isLoaded: true }));
        });
    },
    [patch, setUser, getUserDetails, loginUserToken]
  );

  //to get social logi redir url
  const getSocialLoginRedirUrl = useCallback(
    (type: string) => {
      get(`/social-login?type=${type}`)
        .then((resp: any) => {
          const redirUrl = resp?.data[0]?.url ?? '';

          if (redirUrl) {
            Linking.openURL(redirUrl);
            // window.location = redirUrl;
          }
        })
        .finally(() => {});
    },
    [get]
  );
  return {
    getSignedUp,
    getSignedIn,
    getUserDetails,
    updateUserType,
    getSignInWithProvider,
    getSocialLoginRedirUrl,
  };
};

//Log out flow
export const useLogOut = () => {
  const navigation = useNavigation();
  const resetUser = useResetRecoilState(UserState);
  const { contents: userState } = useRecoilValueLoadable(UserState);
  const { post } = useNetwork();
  const [isLoaded, setIsLoaded] = useState(true);

  const getLogedOut = useCallback(() => {
    setIsLoaded(false);
    post(`/logout`, { id: userState.data.userId })
      .then(async (resp: any) => {
        if (resp) {
          await AsyncStorage.removeItem('user');
          resetUser();
          return;
        }
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [navigate, resetUser]);

  return { getLogedOut, isLoaded };
};
//User profile image delete API
export const useDeleteProfileImg = () => {
  const [userData, setUser] = useRecoilStateLoadable(UserState);
  const { remove } = useNetwork();
  const [isLoaded, setIsLoaded] = useState(true);
  const getProfileImgDeleted = useCallback(
    (type: string) => {
      setIsLoaded(false);
      remove(`/users/${userData.contents.data.userId}?imageType=${type}`)
        .then((resp: any) => {
          console.log('profile delete', resp);

          if (resp.success) {
            setUser((prev: any) => {
              return {
                ...prev,
                data: {
                  ...prev.data,
                  images:
                    type === 'profile'
                      ? { ...prev.data.images, profile: '' }
                      : { ...prev.data.images, cover: '' },
                },
              };
            });
            return;
          }
        })
        .finally(() => {
          setIsLoaded(true);
        });
    },
    [remove]
  );
  return { getProfileImgDeleted, isLoaded };
};
