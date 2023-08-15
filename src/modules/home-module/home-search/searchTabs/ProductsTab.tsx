import { RightArrowIcon } from '@src/assets/icons/profile-module-icons';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ProductSearchState, searchTextAtom } from '../../home-store/atom';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useSearch } from '../hooks';
import { defaultImages } from '@src/core-constant/constants';

const ProductsTab = () => {
  const products = useRecoilValue(ProductSearchState);
  const { getProductSearch } = useSearch();
  const debouncedProductsSearch = useMemo(
    () => debounce(getProductSearch, 200),
    [getProductSearch]
  );
  const searchText = useRecoilValue(searchTextAtom);
  useEffect(() => {
    if (searchText.length > 2) {
      debouncedProductsSearch(searchText);
    }
  }, [searchText]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={products.data}
      renderItem={({ item: product }) => {
        return (
          <NavigationRow
            label={product.familyName}
            subLabel={product.brandName}
            rightIcon={<RightArrowIcon />}
            subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
            leftImage={product.image || defaultImages.noImage}
          />
        );
      }}
    ></FlatList>
  );
};

export default ProductsTab;
