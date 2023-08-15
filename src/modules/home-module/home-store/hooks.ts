import { useNetwork } from '@src/core-hooks/network';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { FeaturedResellerState, PopularCollectorState, TrendingProductState } from './atom';

export const useHome = () => {
  const { get } = useNetwork();
  const setPopularCollectors = useSetRecoilState(PopularCollectorState);
  const getPopularCollectors = useRecoilCallback(
    ({ set }) =>
      () => {
        get('/popular-users?page=0&limit=10').then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };
            setPopularCollectors(payload);
          }
        });
      },
    []
  );

  const setFeaturedResellers = useSetRecoilState(FeaturedResellerState);
  const getFeaturedResellers = useRecoilCallback(
    ({ set }) =>
      () => {
        get('/popular-resellers?page=0&limit=5').then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };
            setFeaturedResellers(payload);
          }
        });
      },
    []
  );

  const setTrendingProducts = useSetRecoilState(TrendingProductState);
  const getTrendingProducts = useRecoilCallback(
    ({ set }) =>
      () => {
        get('/popular-products?page=0&limit=10').then((res) => {
          const { message, data } = res;
          if (message === 'ok' && data.length) {
            const payload = {
              isLoading: false,
              error: false,
              data,
            };
            setTrendingProducts(payload);
          }
        });
      },
    []
  );

  return { getPopularCollectors, getFeaturedResellers, getTrendingProducts };
};
