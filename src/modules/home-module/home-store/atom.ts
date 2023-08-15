import { atom } from 'recoil';

export interface IQueryAtom<T> {
  isLoading: boolean;
  error: boolean;
  data: T;
}

interface IFeaturedReseller {
  _id: string;
  firstName: string;
  lastName: string;
}

interface ITrendingProducts {
  _id: string;
  brand: {
    id: string;
    _id: string;
    name: string;
  };
  brandId: string;
  family: {
    _id: string;
    id: string;
    name: string;
  };
  familyId: string;
  images: any[];
  modelId: string | null;
  userId: string;
  video: string | null;
}

interface IBrand {
  _id: string;
  name: string;
  logo: string;
}

interface IPeople {
  _id: string;
  firstName: string;
  lastName: string;
  images: {
    _id: string;
    cover: string | null;
    profile: string | null;
  };
}

interface IProducts {
  _id: string;
  brandId: string;
  brandName: string;
  familyName: string;
  modelCount: number;
  image?: string;
}

interface ISuppliers extends IPeople {
  brandsIds: string[];
  familyIds: string[];
  modelIds: string[];
}

interface IAllSearch {
  Brands: IBrand[];
  Families: IProducts[];
  Deals: ISuppliers[];
  Resellers: ISuppliers[];
  Users: IPeople[];
}

//! any for now, will type this when I fix the bug on the popular-collector get
export const PopularCollectorState = atom<IQueryAtom<any>>({
  key: 'popular-collector-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const FeaturedResellerState = atom<IQueryAtom<IFeaturedReseller[]>>({
  key: 'featured-reseller-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const TrendingProductState = atom<IQueryAtom<ITrendingProducts[]>>({
  key: 'trending-product-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const AllSearchState = atom<IQueryAtom<IAllSearch>>({
  key: 'search-item-state',
  default: {
    isLoading: true,
    error: false,
    data: {
      Brands: [],
      Families: [],
      Deals: [],
      Resellers: [],
      Users: [],
    },
  },
});

export const PeopleSearchState = atom<IQueryAtom<IPeople[]>>({
  key: 'people-search-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const ResellerSearchState = atom<IQueryAtom<IPeople[]>>({
  key: 'reseller-search-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const ProductSearchState = atom<IQueryAtom<IProducts[]>>({
  key: 'product-search-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const SupplierSearchState = atom<IQueryAtom<ISuppliers[]>>({
  key: 'supplier-search-state',
  default: {
    isLoading: true,
    error: false,
    data: [],
  },
});

export const searchTextAtom = atom({
  key: 'search-text',
  default: '',
});
