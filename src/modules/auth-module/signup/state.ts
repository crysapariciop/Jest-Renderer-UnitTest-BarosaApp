import { atom } from 'recoil';

export const AddedItemsList = atom<any>({
  key: 'Added-Items2-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: [],
  },
});
export const SearchedUserData = atom<any>({
  key: 'Searched-User-Data-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: {},
  },
});
