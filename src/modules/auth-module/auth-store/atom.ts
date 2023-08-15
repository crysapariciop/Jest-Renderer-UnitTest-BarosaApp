import { atom, selector } from 'recoil';

import { ISignUpDataSourcesAtom } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUserImages {
  cover: string;
  profile: string;
}
export interface Iuser {
  email: string;
  firstName: string;
  lastName: string;
  userType?: string;
  token: string;
  userId: string;
  bio: string;
  images: IUserImages;
  isEmailVerified: boolean;
}
export interface IUserAtom {
  isLoaded: boolean;
  error: boolean;
  data: Iuser;
}

export const formatUserData = (user?: Iuser): Iuser => ({
  email: user?.email ?? '',
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
  userType: user?.userType ?? '',
  token: user?.token ?? '',
  userId: user?.userId ?? '',
  images: user?.images ?? { cover: '', profile: '' },
  bio: user?.bio ?? '',
  isEmailVerified: user?.isEmailVerified ?? false,
});

export const userFromStorageSelector = selector<IUserAtom>({
  key: 'user-data-sources-key-AsyncStorage',
  get: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser: any = JSON.parse(user) as Iuser;
        return {
          isLoaded: true,
          error: false,
          data: formatUserData(parsedUser),
        };
      }
      return {
        isLoaded: true,
        error: false,
        data: formatUserData(),
      };
    } catch (error) {
      return {
        isLoaded: true,
        error: true,
        data: formatUserData(),
      };
    }
  },
});

export const UserState = atom<IUserAtom>({
  key: 'user-data-sources-key',
  default: userFromStorageSelector,
});

export const SignUpDataSourcesAtom = atom<ISignUpDataSourcesAtom>({
  key: 'SignUp-data-sources-key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: {},
  },
});
