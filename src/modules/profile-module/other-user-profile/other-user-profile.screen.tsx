import { ProfileScreenProps } from '@src/core-navigation/interface';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './other-user-profile.styles';
import { useTheme } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { OtherUserProfileAtom, useProfileDetails } from '../profile-store';
import ProfileHeader from '@src/core-component/molecules/profile-header/profileHeader.screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEVICE_HEIGHT, MetricsSizes } from '@src/theme/metrics';
import RemixIcon from 'react-native-remix-icon';
import Colors from '@src/theme/colors';
import HorizontalLine from '@src/core-component/atoms/horizontalLine';
import ProductCardGrid from '@src/core-component/molecules/product-card-grid/productCardGrid.screen';
import ProductCardRow from '@src/core-component/molecules/product-card-row/productCardRow.screen';
import { AppScreen } from '@src/core-constant/navigation';

const OtherUserProfile = ({ navigation, route }: ProfileScreenProps) => {
  const { id }: any = route.params;
  const { getUserDetails } = useProfileDetails();
  const { data: userData, isLoading } = useRecoilValue(OtherUserProfileAtom);
  const setOtherUser = useSetRecoilState(OtherUserProfileAtom);
  const [isGridViewSelected, setIsGridViewSelected] = useState<boolean>(true);
  const [isColViewSelected, setIsColViewSelected] = useState<boolean>(false);
  useEffect(() => {
    getUserDetails(id);
    return () => {
      setOtherUser({
        isLoading: true,
        error: false,
        data: null,
      });
    };
  }, []);
  const handleGridPress = () => {
    setIsColViewSelected(true);
    setIsGridViewSelected(false);
  };

  const handleListPress = () => {
    setIsColViewSelected(false);
    setIsGridViewSelected(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <ProfileHeader
            profileFirstName={userData?.firstName}
            profileLastName={userData?.lastName}
            profileBio=""
            profileUrl={userData?.images}
            isOwnProfile={false}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: MetricsSizes.hs10,
            }}
          >
            <TouchableOpacity style={styles.gridIconStyle} onPress={handleListPress}>
              <RemixIcon
                name={isGridViewSelected ? 'function-fill' : 'function-line'}
                size={MetricsSizes.ms20}
                color={isGridViewSelected ? Colors.blackText : Colors.greyText}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGridPress}>
              <RemixIcon
                name={'list-check'}
                size={MetricsSizes.ms20}
                color={isColViewSelected ? Colors.blackText : Colors.greyText}
              />
            </TouchableOpacity>
          </View>
          <HorizontalLine style={styles.horizontalLineStyle} />
          <View style={{ paddingHorizontal: 10, maxHeight: '70%' }}>
            {isGridViewSelected ? (
              isLoading ? (
                <ActivityIndicator size={'large'} style={styles.activityIndicatorStyle} />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{
                    marginBottom: DEVICE_HEIGHT * 0.12,
                  }}
                  numColumns={2}
                  data={userData?.products}
                  keyExtractor={(item) => item?._id}
                  renderItem={({ item, index }) => {
                    if (!item._id) {
                      return <View style={styles.emptyCardView} />;
                    }
                    return (
                      <ProductCardGrid
                        key={item._id}
                        item={item}
                        index={index}
                        onSharePress={() => {
                          navigation.navigate(AppScreen.PRODUCT_SHARE_SCREEN);
                        }}
                        onItemPress={(id) => {
                          console.log(id);
                          navigation.navigate(AppScreen.PRODUCT_DETAILS_SCREEN, {
                            productId: id,
                          });
                        }}
                      />
                    );
                  }}
                />
              )
            ) : null}
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            {isColViewSelected ? (
              isLoading ? (
                <ActivityIndicator size={'large'} style={styles.activityIndicatorStyle} />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ marginBottom: DEVICE_HEIGHT * 0.4 }}
                  data={userData?.products}
                  keyExtractor={(item) => item?._id}
                  renderItem={({ item, index }) => {
                    if (!item?._id) {
                      return null;
                    }
                    return (
                      <ProductCardRow
                        item={item}
                        index={index}
                        onItemPress={(id) => {
                          navigation.navigate(AppScreen.PRODUCT_DETAILS_SCREEN, {
                            productId: id,
                          });
                        }}
                      />
                    );
                  }}
                />
              )
            ) : null}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OtherUserProfile;
