import { RightArrowIcon } from '@src/assets/icons/profile-module-icons';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import {
  PeopleSearchState,
  ResellerSearchState,
  SupplierSearchState,
  searchTextAtom,
} from '../../home-store/atom';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useSearch } from '../hooks';
import { defaultImages } from '@src/core-constant/constants';

const SuppliersTab = () => {
  const suppliers = useRecoilValue(SupplierSearchState);
  const { getSupplierSearch } = useSearch();
  const debouncedSupplierssSearch = useMemo(
    () => debounce(getSupplierSearch, 200),
    [getSupplierSearch]
  );
  const searchText = useRecoilValue(searchTextAtom);
  useEffect(() => {
    if (searchText.length > 2) {
      debouncedSupplierssSearch(searchText);
    }
  }, [searchText]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={suppliers.data}
      renderItem={({ item: supplier }) => {
        return (
          <NavigationRow
            label={`${supplier.firstName} ${supplier.lastName}`}
            rightIcon={<RightArrowIcon />}
            subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
            leftImage={supplier.images?.profile || defaultImages.profilePic}
          />
        );
      }}
    ></FlatList>
  );
};

export default SuppliersTab;
