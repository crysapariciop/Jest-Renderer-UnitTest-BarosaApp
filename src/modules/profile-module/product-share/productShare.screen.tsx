import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Share, Linking } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { PeoplesList, useSearchPeoplesList } from '../profile-store';
import { useRecoilValue } from 'recoil';
import { MagicText } from '@src/core-component/atoms';
import SearchBar from '@src/core-component/molecules/top-search-bar/topSearchBar.component';
import UserProfileContainer from '@src/core-component/atoms/userProfileContainer';
import Button from '@src/core-component/atoms/button';
import { useTheme } from '@src/theme/themeProvider';
import { ProductShareScreenProps } from '@src/core-navigation/interface';
import HorizontalLine from '@src/core-component/atoms/horizontalLine';
import { FONTS } from '@src/assets/fonts';
import Clipboard from '@react-native-clipboard/clipboard';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { styles } from './productShare.styles';

interface itemType {
  images?: any;
  firstName?: string;
  userType?: string;
}

const ProductShareScreen = ({ navigation }: ProductShareScreenProps) => {
  const { getPeoplesList } = useSearchPeoplesList();
  const { data: peoplesList, isLoaded: isPeopleListLoaded } = useRecoilValue(PeoplesList);
  const [peoplesListData, setPeoplesListData] = useState<itemType[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const { theme } = useTheme();
  const inputRef = useRef();

  useEffect(() => {
    const list = JSON.parse(JSON.stringify(peoplesList));

    setPeoplesListData(peoplesList);
  }, [peoplesList]);

  const onShare = () => {
    Share.share({ message: 'React Native | A framework for building native apps using React' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <SearchBar
        ref={inputRef}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        placeholder="Search for people"
        onRightIconPress={() => {
          setSearchText('');
        }}
        value={searchText}
        onChangeText={(e) => {
          getPeoplesList(e);
          setSearchText(e);
        }}
        containerStyle={styles.searchBarContainer}
        rightIcon={
          <RemixIcon name={'ri-close-line'} size={MetricsSizes.ms24} color={Colors.greyText} />
        }
      />
      <MagicText style={styles.peopleText}>People</MagicText>
      <View>
        <FlatList
          data={peoplesListData}
          keyExtractor={(item: any) => item?._id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.peopleRowParent}>
                <View style={styles.peopleRowContainer}>
                  <UserProfileContainer imagePath={item?.images?.profile} />
                  <View style={{ flex: 1, marginLeft: MetricsSizes.hs6 }}>
                    <MagicText type="SEMI_BOLD">{item?.firstName}</MagicText>
                    <MagicText>{item?.userType}</MagicText>
                  </View>
                  <Button
                    type="PRIMARY"
                    label={'Share'}
                    style={styles.shareButtonContainer}
                    labelStyle={styles.shareButtonLabelStyle}
                  />
                </View>
              </View>
            );
          }}
        />
        <HorizontalLine style={{ marginVertical: MetricsSizes.vs16 }} />
      </View>
      <View style={styles.bottomContainer}>
        <HorizontalLine style={styles.bottomHrLine} />
        <View style={styles.bottomRow}>
          <Button
            onPress={() => {
              Clipboard.setString('hello world');
              Toast.show({
                type: 'success',
                text1: 'Link Copied to clipboard',
                visibilityTime: 1000,
                position: 'bottom',
                bottomOffset: 140,
              });
            }}
            style={styles.bottomButtonStyle}
            type="ICON"
            centerIcon={
              <RemixIcon name={'ri-link-m'} size={MetricsSizes.ms24} color={Colors.greyText} />
            }
          />
          <Button
            onPress={onShare}
            style={styles.bottomButtonStyle}
            type="ICON"
            centerIcon={
              <RemixIcon name={'ri-share-line'} size={MetricsSizes.ms24} color={Colors.greyText} />
            }
          />
          <Button
            onPress={() => {
              Linking.openURL('sms:');
            }}
            style={styles.bottomButtonStyle}
            type="ICON"
            centerIcon={
              <RemixIcon
                name={'ri-message-line'}
                size={MetricsSizes.ms24}
                color={Colors.greyText}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductShareScreen;
