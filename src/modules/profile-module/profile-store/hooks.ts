import { useCallback } from 'react';
import {
  AddedItemsList,
  IndividualItem,
  OtherUserProfileAtom,
  PeoplesList,
  SearchProductsList,
} from './state';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useNetwork } from '@src/core-hooks/network';
import { UserState } from '@src/modules/auth-module/auth-store';
import { useLocalStorage } from '@src/core-hooks/local-storage';

export const useIndiItemList = () => {
  const setAddedItemList = useSetRecoilState(AddedItemsList);
  const setIndiItem = useSetRecoilState(IndividualItem);
  const { get, patch } = useNetwork();

  const getItemsList = useCallback(
    (apiSignal?: any) => {
      setAddedItemList((prev: any) => ({ ...prev, isLoaded: false, loading: true }));
      get('/products')
        .then((resp: any) => {
          if (resp.data) {
            setAddedItemList((prev: any) => ({
              ...prev,
              data: resp.data.data,
              loading: false,
            }));
            return;
          }
          setAddedItemList((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setAddedItemList((prev: any) => ({ ...prev, isLoaded: true }));
        });
    },
    [get, setAddedItemList]
  );

  const getIndividualItem = useCallback(
    (productId: string, productUserId?: string, setStateFunc?: any) => {
      setIndiItem((prev: any) => ({ ...prev, isLoaded: false, loading: true }));
      let url = `/products/${productId}?from=transactions`;
      if (productUserId) {
        url = `${url}?from=feeds&productUserId=${productUserId}`;
      }
      get(url)
        .then((resp: any) => {
          if (resp.data) {
            if (setStateFunc) {
              setStateFunc({
                imgLink: resp.data?.images[0] || '',
                heading: `${resp.data?.familyId?.brandId?.name} | ${resp.data?.familyId?.name}`,
                description: resp.data.description || '',
              });
            } else {
              setIndiItem((prev: any) => ({
                data: resp.data,
                loading: false,
              }));
            }
            return;
          }
          setIndiItem((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setIndiItem((prev: any) => ({ ...prev, isLoaded: true, loading: false }));
        });
    },
    [get, setIndiItem]
  );

  const editItemsDiscription = useCallback(
    (productId?: any, newDiscription?: string, itemdata?: any) => {
      console.log('pppprrroduct id', productId, newDiscription, itemdata);

      const editedData = JSON.parse(JSON.stringify(itemdata));
      const newData = { ...editedData };
      let url = `/products/${productId}`;
      patch(url, { description: newDiscription })
        .then((resp: any) => {
          if (resp?.success) {
            newData.description = newDiscription;

            setIndiItem(() => ({ data: { ...newData }, loading: false }));
            return;
          }

          setIndiItem((prev: any) => ({ data: { ...newData }, error: true }));
        })
        .finally(() => {
          setIndiItem(() => ({ data: { ...newData }, loading: false }));
        });
    },
    [patch]
  );

  return { getItemsList, getIndividualItem, editItemsDiscription };
};

export const useProfileDetails = () => {
  const { patch, get } = useNetwork();
  const { set: setLocalStorage } = useLocalStorage();
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { data: loginUser } = userStateContents;
  const { userId, token, userType, firstName, lastName, bio, images } = loginUser;
  const setOtherProfile = useSetRecoilState(OtherUserProfileAtom);

  const setUser = useSetRecoilState(UserState);

  const editProfileDetails = useCallback(
    (userId?: any, payload?: any, setIsVerified?: any) => {
      console.log('userId payload', userId, payload);

      let url = `/users/${userId}`;
      patch(url, payload)
        .then((resp: any) => {
          console.log('%%%%%%%%%%resp%%%%%');

          const { email, firstName, lastName, _id: userId, userType, isEmailVerified } = resp ?? {};
          console.log(
            'email, firstName, lastName, _id: userId, userType, isEmailVerified',
            email,
            firstName,
            lastName,
            userId,
            userType,
            isEmailVerified
          );

          if (setIsVerified && isEmailVerified) {
            setIsVerified(true);
            setTimeout(() => {}, 4000);
          }
          if (email) {
            setLocalStorage('user', {
              email,
              firstName,
              lastName,
              userType,
              userId,
            });
            setUser((prev: any) => ({
              ...prev,
              data: {
                ...prev.data,
                firstName: resp?.firstName,
                lastName: resp?.lastName,
                bio: resp?.bio,
                token,
                userId,
                isEmailVerified,
              },
            }));
          }
        })
        .finally(() => {
          // imp code use later
          // setUser((prev: any) => {
          //   return {
          //     ...prev,
          //     loading: false,
          //   };
          // });
        });
    },
    [patch]
  );

  const getUserDetails = useCallback(
    (userId: string) => {
      get(`/user-profiles/${userId}`).then((resp) => {
        if (resp) {
          setOtherProfile(resp);
          return;
        }
      });
    },
    [get]
  );

  return { editProfileDetails, getUserDetails };
};

export const useSearchPeoplesList = () => {
  const { get } = useNetwork();

  const setPeoplesList = useSetRecoilState(PeoplesList);

  const getPeoplesList = useCallback(
    (searchText: string = '') => {
      setPeoplesList((prev: any) => ({ ...prev, isLoaded: false, loading: true }));
      let url = `/searches?query=${searchText}&sort=users`;
      get(url)
        .then((resp: any) => {
          console.log('rrrreeessspppp', resp);

          if (resp.data) {
            setPeoplesList((prev: any) => ({
              ...prev,
              data: resp.data,
              loading: false,
            }));
            return;
          }
          setPeoplesList((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setPeoplesList((prev: any) => ({ ...prev, isLoaded: true }));
        });
    },
    [get]
  );

  return { getPeoplesList };
};

export const useSearchProductsList = () => {
  const { get } = useNetwork();

  const setSearchProductsList = useSetRecoilState(SearchProductsList);

  const getSearchProductsList = useCallback(
    (searchText: string = '') => {
      console.log(searchText);

      setSearchProductsList((prev: any) => ({ ...prev, isLoaded: false, loading: true }));
      let url = `/search-watches?query=${searchText}&limit=15`;
      get(url)
        .then((resp: any) => {
          console.log('rrrreeessspppp', resp);

          if (resp.data) {
            setSearchProductsList((prev: any) => ({
              ...prev,
              data: resp.data,
              loading: false,
            }));
            return;
          }
          setSearchProductsList((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setSearchProductsList((prev: any) => ({ ...prev, isLoaded: true }));
        });
    },
    [get]
  );

  return { getSearchProductsList };
};
