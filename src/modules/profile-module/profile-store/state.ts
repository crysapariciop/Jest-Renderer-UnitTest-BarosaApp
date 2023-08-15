import { IUserImages } from '@src/modules/auth-module/auth-store';
import { IQueryAtom } from '@src/modules/home-module/home-store/atom';
import { atom } from 'recoil';

interface IUserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  friendsCount: number;
  userType: string;
  scope: any;
  products: {
    _id: string;
    brand: any;
    brandId: string;
    condition: string;
    description: string;
    family: any;
    familyId: any;
    forSale: boolean;
    images: any[];
    isArchieve: boolean;
    isAuthenticated: boolean;
    isDeleted: boolean;
    model: any;
    originalBoxPaper: string;
    proofOfOwnership: boolean;
    sellingPrice: string | null;
    serialNumber: string;
    userId: string;
    video: any;
    year: string;
  }[];
  images: IUserImages;
}

export const AddedItemsList = atom<any>({
  key: 'items-state-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: [],
  },
});

export const AllDashboards = atom({
  key: 'all-dashboards-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: [],
  },
});
export const IndividualItem = atom<any>({
  key: 'individual-item-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: {},
  },
});

export const PeoplesList = atom<any>({
  key: 'peoples-list-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: [],
  },
});

export const SearchProductsList = atom<any>({
  key: 'search-products-list-key',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: [],
  },
});

export const OtherUserProfileAtom = atom<IQueryAtom<IUserProfile | null>>({
  key: 'other-user-profile',
  default: {
    isLoading: true,
    error: false,
    data: null,
  },
});
