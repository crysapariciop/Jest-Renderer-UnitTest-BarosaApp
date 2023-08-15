import { useNetwork } from '@src/core-hooks/network';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import {
  AllSearchState,
  SupplierSearchState,
  PeopleSearchState,
  ProductSearchState,
  ResellerSearchState,
} from '../home-store/atom';

export const useSearch = () => {
  const { get } = useNetwork();
  const setSearchItems = useSetRecoilState(AllSearchState);
  const getAllSearch = useRecoilCallback(
    ({ set }) =>
      (userInput) => {
        get(`/search-all?searchQuery=${userInput}`).then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };
            console.log('ALL SEARCH', data);

            setSearchItems(payload);
          } else if (message === 'ok' && !data.length) {
            const payload = {
              isLoading: false,
              error: true,
              data: {
                Brands: [],
                Families: [],
                Deals: [],
                Resellers: [],
                Users: [],
              },
            };
            setSearchItems(payload);
          }
        });
      },
    []
  );

  const setProductSearch = useSetRecoilState(ProductSearchState);
  const getProductSearch = useRecoilCallback(
    ({ set }) =>
      (userInput) => {
        get(`/brand-family?page=0&limit=30&searchQuery=${userInput}`).then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };
            setProductSearch(payload);
          } else if (message === 'ok' && !data.length) {
            const payload = {
              isLoading: false,
              error: true,
              data: [],
            };
            setProductSearch(payload);
          }
        });
      },
    []
  );

  const setPeopleSearch = useSetRecoilState(PeopleSearchState);
  const getPeopleSearch = useRecoilCallback(
    ({ set }) =>
      (userInput) => {
        get(`/popular-users?searchQuery=${userInput}`).then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };

            setPeopleSearch(payload);
          } else if (message === 'ok' && !data.length) {
            const payload = {
              isLoading: false,
              error: true,
              data: [],
            };
            setPeopleSearch(payload);
          }
        });
      },
    []
  );

  const setResellerSearch = useSetRecoilState(ResellerSearchState);
  const getResellerSearch = useRecoilCallback(
    ({ set }) =>
      (userInput) => {
        get(`/popular-resellers?searchQuery=${userInput}`).then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };

            setResellerSearch(payload);
          } else if (message === 'ok' && !data.length) {
            const payload = {
              isLoading: false,
              error: true,
              data: [],
            };
            setResellerSearch(payload);
          }
        });
      },
    []
  );

  const setSupplierSearch = useSetRecoilState(SupplierSearchState);
  const getSupplierSearch = useRecoilCallback(
    ({ set }) =>
      (userInput) => {
        get(`/reseller?page=0&limit=20&searchQuery=${userInput}`).then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };

            setSupplierSearch(payload);
          } else if (message === 'ok' && !data.length) {
            const payload = {
              isLoading: false,
              error: true,
              data: [],
            };
            setSupplierSearch(payload);
          }
        });
      },
    []
  );

  return {
    getAllSearch,
    getProductSearch,
    getPeopleSearch,
    getResellerSearch,
    getSupplierSearch,
  };
};
