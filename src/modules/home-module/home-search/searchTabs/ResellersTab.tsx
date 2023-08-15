import { RightArrowIcon } from '@src/assets/icons/profile-module-icons';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ResellerSearchState, searchTextAtom } from '../../home-store/atom';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useSearch } from '../hooks';
import { defaultImages } from '@src/core-constant/constants';
import { ProfileScreenProps } from '@src/core-navigation/interface';
import { AppScreen } from '@src/core-constant/navigation';

const ResellersTab = ({ navigation }: ProfileScreenProps) => {
  const resellers = useRecoilValue(ResellerSearchState);
  const { getResellerSearch } = useSearch();
  const debouncedResellersSearch = useMemo(
    () => debounce(getResellerSearch, 200),
    [getResellerSearch]
  );
  const searchText = useRecoilValue(searchTextAtom);
  useEffect(() => {
    if (searchText.length > 2) {
      debouncedResellersSearch(searchText);
    }
  }, [searchText]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={resellers.data}
      renderItem={({ item: resellers }) => {
        return (
          <NavigationRow
            label={`${resellers.firstName} ${resellers.lastName}`}
            rightIcon={<RightArrowIcon />}
            subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
            leftImage={resellers.images?.profile || defaultImages.profilePic}
            onPress={() => {
              navigation.navigate(AppScreen.OTHER_USER_PROFILE_SCREEN, { id: resellers._id });
            }}
          />
        );
      }}
    ></FlatList>
  );
};

export default ResellersTab;
