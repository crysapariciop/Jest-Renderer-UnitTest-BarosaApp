import { atom } from 'recoil';
// import { v4 as uuidv4 } from 'uuid';
// import {v4} from 'react-native-uuid'
import uuid from 'react-native-uuid';

const myuuid = uuid.v4();
export const AllBrandinfo = atom({
  key: 'all-brand-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    showSuggestionModel: false,
    data: {},
  },
});
export const SelectedBrandInfo = atom({
  key: 'selected-brand-key',
  default: {
    loading: false,
    isLoaded: true,
    productId: myuuid,
    data: {
      brand: 'brand',
      model: 'model',
      refNumber: 'Reference Number',
      serialNumber: 'Serial Number',
      brandId: '',
      familyId: '',
      year: '',
      condition: '',
      originalBox: '',
      description: '',
    },
  },
});
export const addedItemMedia = atom({
  key: 'added-individual-item-key',
  default: {
    loading: false,
    isLoaded: true,
    error: true,
    data: {
      images: [],
      video: '',
    },
  },
});
export const userProfileImages = atom({
  key: 'user-Profile-Images-key',
  default: {
    loading: false,
    isLoaded: true,
    error: true,
    data: {
      profileImages: '',
      // coverImage: "",
    },
  },
});
