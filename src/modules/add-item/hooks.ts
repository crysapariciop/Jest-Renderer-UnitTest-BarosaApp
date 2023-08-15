import { useCallback } from 'react';

import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { useNetwork } from '@src/core-hooks/network';
import { UserState, useAuth } from '../auth-module/auth-store';
import { AllBrandinfo, addedItemMedia, SelectedBrandInfo } from './state';

export const useAllBrandDetails = () => {
  const setAllBrandsDetails = useSetRecoilState(AllBrandinfo);
  const { get } = useNetwork();

  const getAllBrandDetails = useCallback(() => {
    setAllBrandsDetails((prev) => ({ ...prev, isLoaded: false }));
    get(`/watch-brands-families-models`)
      .then((resp: any) => {
        if (resp) {
          setAllBrandsDetails((prev) => ({
            ...prev,
            showSuggestionModel: true,
            data: resp,
          }));
        }
        setAllBrandsDetails((prev) => ({ ...prev, error: true }));
      })
      .finally(() => {
        setAllBrandsDetails((prev) => ({ ...prev, isLoaded: false }));
      });
  }, [get, setAllBrandsDetails]);

  return { getAllBrandDetails };
};
export const useSaveIndividualItem = () => {
  const setAddedItem = useSetRecoilState(SelectedBrandInfo);
  const { post } = useNetwork();
  //   const navigate = useNavigate();
  const addIndividualItem = useCallback(
    (payload: any) => {
      setAddedItem((prev) => ({ ...prev, isLoaded: false }));
      post(`/products`, payload)
        .then((resp: any) => {
          console.log('*********--->', resp);

          if (resp) {
            setAddedItem((prev) => ({ ...prev, data: resp.data }));
            // navigate(RoutesUrl.PROFILE);
            return;
          }
          setAddedItem((prev) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setAddedItem((prev) => ({ ...prev, isLoaded: true }));
        });
    },
    [post, setAddedItem]
  );

  return { addIndividualItem };
};
export const useUploadToGCP = () => {
  const { getUserDetails } = useAuth();

  const setAddedItemMedia = useSetRecoilState(addedItemMedia);
  const setUser = useSetRecoilState(UserState);
  const { formData } = useNetwork();
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { data: loginUser } = userStateContents;
  const { userId, token, userType, firstName, lastName, bio, images } = loginUser;
  const uploadToGCP = useCallback(
    (
      payload: any,
      mediaType: string,
      setAtleastOneImgAvailable?: any,
      isProfileUpload?: boolean,
      type?: string
    ) => {
      console.log('payload', payload);
      console.log('payload', mediaType);
      console.log('payload', setAtleastOneImgAvailable);
      console.log('payload', isProfileUpload);
      console.log('payload', type);

      setAddedItemMedia((prev) => ({ ...prev, isLoaded: false }));
      let endPointUrl = isProfileUpload ? '/upload/image' : '/upload/uploadimageandvideo';
      formData(endPointUrl, payload) //
        .then((resp: any) => {
          console.log('rrrreeeesssspppp--->', resp);

          if (resp) {
            if (type == 'profile') {
              setUser((prev: any) => {
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    images: { ...prev.data.images, profile: resp?.url },
                  },
                };
              });
            }
            if (type == 'cover') {
              setUser((prev: any) => {
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    images: { ...prev.data.images, cover: resp?.url },
                  },
                };
              });
            }

            if (mediaType === 'image') {
              setAddedItemMedia((prev: any) => ({
                ...prev,
                data: {
                  ...prev.data,
                  images: [...prev.data.images, resp.url],
                },
              }));
              if (setAtleastOneImgAvailable) {
                setAtleastOneImgAvailable(true);
              }
            } else if (mediaType === 'video') {
              setAddedItemMedia((prev: any) => ({
                ...prev,
                data: {
                  ...prev.data,
                  video: resp.url,
                },
              }));
            }
            return;
          }
          setAddedItemMedia((prev) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setAddedItemMedia((prev) => ({ ...prev, isLoaded: true }));
        });
    },
    [formData]
  );

  return { uploadToGCP };
};
