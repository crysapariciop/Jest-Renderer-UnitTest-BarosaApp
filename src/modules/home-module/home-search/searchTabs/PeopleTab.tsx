import { RightArrowIcon } from '@src/assets/icons/profile-module-icons';
import NavigationRow from '@src/core-component/atoms/navigationRow';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { PeopleSearchState, searchTextAtom } from '../../home-store/atom';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useSearch } from '../hooks';
import { defaultImages } from '@src/core-constant/constants';
import { ProfileScreenProps } from '@src/core-navigation/interface';
import { AppScreen } from '@src/core-constant/navigation';

const PeopleTab = ({ navigation }: ProfileScreenProps) => {
  const people = useRecoilValue(PeopleSearchState);
  const { getPeopleSearch } = useSearch();
  const debouncedPeopleSearch = useMemo(() => debounce(getPeopleSearch, 200), [getPeopleSearch]);
  const searchText = useRecoilValue(searchTextAtom);
  useEffect(() => {
    if (searchText.length > 2) {
      debouncedPeopleSearch(searchText);
    }
  }, [searchText]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={people.data}
      renderItem={({ item: people }) => {
        return (
          <NavigationRow
            label={`${people.firstName} ${people.lastName}`}
            rightIcon={<RightArrowIcon />}
            subLabelStyle={{ fontSize: MetricsSizes.hs10, color: Colors.greyText }}
            leftImage={people.images?.profile || defaultImages.profilePic}
            onPress={() => {
              navigation.navigate(AppScreen.OTHER_USER_PROFILE_SCREEN, { id: people._id });
            }}
          />
        );
      }}
    ></FlatList>
  );
};

export default PeopleTab;
