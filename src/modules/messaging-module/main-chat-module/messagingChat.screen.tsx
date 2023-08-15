import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text, Linking } from 'react-native';

import HeaderTop from '@src/core-component/molecules/header-top-bar/topHeader.screen';
import ChatCard from '@src/core-component/organisms/chat-card/chat-card.screen';
import { useTheme } from '@src/theme/themeProvider';
import { useNetwork } from '@src/core-hooks/network';
import ChatUserCard from '@src/core-component/organisms/chat-user-card/chat-user-card.screen';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AllChat, SocketMessagesAtom, SocketMessagesData } from '../messaging-store/atom';
import { COLOR } from '@src/theme/colors';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { MagicText } from '@src/core-component/atoms';
import DarkRoundButton from '@src/core-component/molecules/chat-screen-molecules/darkRoundButton';
import { IUserAtom, UserState } from '@src/modules/auth-module/auth-store';
import { socketNew } from '@src/core-navigation';
import { SOCKET_EVENT } from '@src/core-hooks/socket';
import { useTranslation } from 'react-i18next';
import { sortDataByLastChatDate } from '@src/core-utils/utils';
import { MessagingScreenProps } from '@src/core-navigation/interface';
import { AppScreen } from '@src/core-constant/navigation';

const MessagingScreen = ({ navigation }: MessagingScreenProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchData, setSearchData] = useState<[]>([]);
  const [searchPeople, setSearchPeople] = useState<boolean>(false);
  const [searchMessages, setSearchMessages] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInviteUser, setIsInvite] = useState<boolean>(false);
  const [allChat, setAllChat] = useRecoilState(AllChat);
  const { data: ChatData } = useRecoilValue(AllChat);
  const { data: userData }: any = useRecoilValue<IUserAtom>(UserState);
  const { pastConvo } = useRecoilValue<SocketMessagesAtom>(SocketMessagesData);

  const { token: loginUserToken } = userData;

  const { theme } = useTheme();
  const { t } = useTranslation();
  const { get } = useNetwork();

  const configHeader = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + loginUserToken,
    },
  };

  useEffect(() => {
    getUserChats();
    return () => {
      socketNew.current?.off(SOCKET_EVENT.GET_CONVERSATION_LIST);
      socketNew.current?.off(SOCKET_EVENT.GET_CONVERSATION_LIST_RESPONSE);
    };
  }, [userData?._id]);

  const getUserChats = () => {
    if (
      (searchPeople && searchText?.length > 2) ||
      (searchMessages && searchText?.length > 2) ||
      searchData?.length === 0
    ) {
      setIsLoading(true);
    }
    socketNew.current?.emit(SOCKET_EVENT.GET_CONVERSATION_LIST, {
      roomname: userData?._id,
    });
    socketNew?.current?.on(userData?._id, (data: any) => {
      if (data?.event === SOCKET_EVENT.GET_CONVERSATION_LIST_RESPONSE) {
        const myData = [...data?.data];
        const sortedData: any = sortDataByLastChatDate(myData);
        setAllChat((prev) => {
          return { ...prev, data: sortedData };
        });
        setSearchData(searchData?.length === 0 ? data?.data : sortedData);
        setIsLoading(false);
      }
    });
  };

  const SearchApiData = async (val: string) => {
    const Resp = await get(`/searches?query=${val}&sort=users`, configHeader);
    setSearchData(val.length > 1 ? Resp?.data : ChatData);
    setIsLoading(false);
  };

  const handleSearch = (args?: string) => {
    const result: any = ChatData?.filter((item: any) =>
      item?.name?.toLowerCase().includes(args?.toLowerCase())
    );
    setSearchData(result);
    setIsLoading(false);
  };

  function displayContent(chat: any) {
    for (const chatMessage of chat?.chats) {
      if (typeof chatMessage?.content === 'string') {
        try {
          const parsedContent = JSON.parse(chatMessage?.content);
          if (typeof parsedContent === 'object' && parsedContent?.content) {
            return parsedContent?.content;
          } else {
            return chatMessage?.content;
          }
        } catch {
          return chatMessage?.content;
        }
      } else {
        return chatMessage?.content?.content;
      }
    }
  }

  const unreadCount = useCallback(
    (item: any) =>
      (item?.chats ?? []).reduce((acc: any, curr: any) => {
        if (curr?.status !== 'read' && curr?.creator !== userData?._id) {
          acc += 1;
        }
        return acc === 0 ? null : acc;
      }, 0),
    [pastConvo]
  );

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchText?.length > 1 && searchPeople) {
        setIsLoading(true);
        SearchApiData(searchText);
      } else if (searchText?.length > 1 && searchMessages) {
        setIsLoading(true);
        handleSearch(searchText);
      } else if (!searchPeople && !searchMessages && !isInviteUser) getUserChats();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchText, searchPeople, searchMessages]);

  return (
    <>
      <HeaderTop
        isInvite={isInviteUser}
        isPeople={searchPeople}
        isMessages={searchMessages}
        onPressEditAction={() => {
          setSearchPeople(true);
        }}
        onPressSearchAction={() => {
          setSearchMessages(true);
        }}
        onPressCrossAction={() => {
          setSearchText('');
        }}
        onPressInviteBackAction={() => {
          setSearchText('');
          setSearchPeople(false);
          setSearchMessages(false);
          setIsInvite(false);
        }}
        onPressBackAction={() => {
          setSearchText('');
          setSearchPeople(false);
          setSearchMessages(false);
        }}
        value={searchText}
        onChangeText={(value) => {
          setSearchText(value);
        }}
        headerText="Messages"
      />

      <View style={{ flex: 1, backgroundColor: theme?.background }}>
        {isLoading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size={40} />
          </View>
        ) : searchData?.length === 0 && !searchPeople && !isInviteUser ? (
          <View style={styles.norDataContainer}>
            <Text> {t('chatScreen.noResult')}</Text>
          </View>
        ) : isInviteUser ? (
          <View style={styles.shareTextView}>
            <MagicText type="SEMI_BOLD" style={styles.shareText}>
              {t('chatScreen.shareVia')}
            </MagicText>
            <View style={styles.buttonsRow}>
              <DarkRoundButton
                onPress={() => {
                  Linking.openURL('mailto:support@example.com');
                }}
                title="Email"
                IconName="ri-mail-add-line"
              />
              <DarkRoundButton
                onPress={() => {
                  Linking.openURL('sms:');
                }}
                buttonStyle={{ marginLeft: MetricsSizes.hs10 }}
                title="Text"
                IconName="ri-chat-new-line"
              />
            </View>
          </View>
        ) : searchData.length === 0 && searchPeople && searchText.length > 2 ? (
          <>
            <MagicText style={styles.inviteText}> {t('chatScreen.invitePeople')}</MagicText>
            <ChatUserCard
              onPressInviteAction={() => {
                setIsInvite(true);
                setSearchPeople(false);
              }}
              isInvite
              userName={searchText}
            />
          </>
        ) : (
          <FlatList
            data={searchText.length > 2 && (searchMessages || searchPeople) ? searchData : ChatData}
            keyExtractor={(item: any) => {
              return item?._id.toString();
            }}
            renderItem={({ item }: any) => {
              const filteredProfileObj = item?.members?.filter((item: any) => {
                return item?._id !== userData?._id ?? [];
              });
              return filteredProfileObj?.length > 0 || searchPeople ? (
                item?.type === 'P' && item?.chats?.length > 0 ? (
                  <ChatCard
                    msgCount={unreadCount(item) > 9 ? '9+' : unreadCount(item)}
                    imageUrl={
                      filteredProfileObj?.[0]?.images
                        ? { uri: filteredProfileObj?.[0]?.images }
                        : null
                    }
                    onPressCard={() => {
                      navigation.navigate(AppScreen.PERSONAL_CHAT_SCREEN, { item });
                    }}
                    userMessage={displayContent(item)}
                    userName={
                      searchText.length > 2 && searchPeople
                        ? `${item?.firstName} ${item?.lastName}`
                        : `${filteredProfileObj?.[0]?.firstName} ${filteredProfileObj?.[0]?.lastName}`
                    }
                  />
                ) : item?.type === 'D' && item?.chats.length > 0 ? (
                  <ChatCard
                    msgCount={unreadCount(item) > 9 ? '9+' : unreadCount(item)}
                    type={item?.type}
                    imageUrl={
                      filteredProfileObj?.[0]?.images
                        ? { uri: filteredProfileObj?.[0]?.images }
                        : null
                    }
                    secondImageUrl={
                      item?.item?.[0]?.images?.[0]?.url
                        ? { uri: item.item[0].images?.[0]?.url }
                        : null
                    }
                    onPressCard={() => {
                      navigation.navigate(AppScreen.PERSONAL_CHAT_SCREEN, { item });
                    }}
                    userMessage={`${item?.name}`}
                    userName={
                      searchText.length > 2 && searchPeople
                        ? `${item?.firstName} ${item?.lastName}`
                        : `${item?.item?.[0]?.brand?.name} ${item?.item?.[0]?.family?.name}`
                    }
                  />
                ) : (
                  <ChatUserCard
                    onPressInviteAction={() => {
                      setIsInvite(true);
                      setSearchPeople(false);
                    }}
                    onPressCard={() => {
                      navigation.navigate(AppScreen.PERSONAL_CHAT_SCREEN, { item });
                    }}
                    imageUrl={
                      filteredProfileObj?.[0]?.images
                        ? { uri: filteredProfileObj?.[0]?.images }
                        : null
                    }
                    userName={
                      searchText.length > 2 && searchPeople
                        ? `${item?.firstName} ${item?.lastName}`
                        : `${filteredProfileObj?.[0]?.firstName} ${filteredProfileObj?.[0]?.lastName}`
                    }
                  />
                )
              ) : null;
            }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loaderView: {
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteText: {
    color: COLOR.SUB_HEADING_GREY,
    marginTop: MetricsSizes.vs4,
    width: DEVICE_WIDTH * 0.9,
    alignSelf: 'center',
  },
  norDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    color: COLOR.SUB_HEADING_GREY,
    marginTop: MetricsSizes.vs15,
    fontSize: MetricsSizes.ms15,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: MetricsSizes.vs5,
  },
  shareTextView: {
    flex: 1,
    width: DEVICE_WIDTH * 0.9,
    alignSelf: 'center',
  },
});

export default MessagingScreen;
