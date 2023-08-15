import {
  AddedItemsList,
  IndividualItem,
} from '@src/modules/messaging-module/messaging-store/state';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNetwork } from './network';

export const useIndiItemList = () => {
  const setAddedItemList = useSetRecoilState(AddedItemsList);
  const setIndiItem = useSetRecoilState(IndividualItem);
  const { get } = useNetwork();
  const getItemsList = useCallback(
    (apiSignal?: any) => {
      setAddedItemList((prev: any) => ({ ...prev, isLoaded: false }));
      get('/products')
        .then((resp: any) => {
          if (resp.data) {
            setAddedItemList((prev: any) => ({
              ...prev,
              data: resp.data,
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
      setIndiItem((prev: any) => ({ ...prev, isLoaded: false }));
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
              }));
            }
            return;
          }
          setIndiItem((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setIndiItem((prev: any) => ({ ...prev, isLoaded: true }));
        });
    },
    [get, setIndiItem]
  );
  return { getItemsList, getIndividualItem };
};
