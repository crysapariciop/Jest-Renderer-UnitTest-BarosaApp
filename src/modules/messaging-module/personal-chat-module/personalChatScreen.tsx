//import liraries
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useTheme } from '@src/theme/themeProvider';
import ChatInput from '@src/core-component/molecules/chat-screen-molecules/personal-chat-input/chatInput';
import PersonalChatHeader from '@src/core-component/molecules/personal-chat-header/personalChatHeader.screen';
import { socketNew } from '@src/core-navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IUserAtom, UserState } from '@src/modules/auth-module/auth-store';
import { SOCKET_EVENT } from '@src/core-hooks/socket';
import { AllChat, SocketMessagesAtom, SocketMessagesData } from '../messaging-store/atom';
import moment from 'moment';
import { PersonalChatCard } from '@src/core-component/organisms/personal-chat-card/personalChatCard';
import { formatTime } from '@src/core-utils/utils';
import { FONTS } from '@src/assets/fonts';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { useIsFocused } from '@react-navigation/native';
import AgreementAlertCard from '@src/core-component/molecules/chat-screen-molecules/personal-chat-screen-contract-cards/agreementAlertCard';

const PersonalChat = ({ props, navigation }: any) => {
  const { data: userData }: any = useRecoilValue<IUserAtom>(UserState);
  const [chatData, setChatData] = useRecoilState<SocketMessagesAtom>(SocketMessagesData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pastConvo } = useRecoilValue<SocketMessagesAtom>(SocketMessagesData);
  const [allChat, setAllChat] = useRecoilState(AllChat);
  const flatListRef = useRef<FlatList | null>(null);
  const { theme } = useTheme();
  const UserData = props?.route?.params;
  const fetchDataRef = useRef<boolean>(true);
  const chatHistory = useRef<any[]>([]);
  const isFocused = useIsFocused();

  const recieverProfile = UserData?.members?.filter((item: any) => {
    if (item?._id !== userData?._id) {
      return item;
    }
  });

  const senderProfile = UserData?.members?.filter((item: any) => {
    if (item?._id === userData?._id) {
      return item;
    }
  });

  const conversationUser =
    UserData?.members?.filter((member: any) => {
      return member?._id;
    }) ?? [];

  const fromId = userData?._id;
  const toId = conversationUser?.[0]?._id;

  useEffect(() => {
    setIsLoading(true);
    const conversationUser =
      UserData?.members?.filter((member: any) => {
        return member?._id;
      }) ?? [];

    const fromId = userData?._id;
    const toId = conversationUser[0]?._id;

    socketNew.current?.emit(SOCKET_EVENT.JOIN, { roomname: UserData?.conversationId });
    socketNew.current?.emit(SOCKET_EVENT.GET_PAST_CONVERSATION, {
      conversationId: UserData?.conversationId,
      fromId,
    });
    socketNew.current?.emit(SOCKET_EVENT.GET_CONVERSATION_ITEM_TRANSACTION, {
      conversationId: UserData?.conversationId,
      roomname: UserData?.conversationId,
      toId,
      fromId,
    });
    socketNew.current?.on(userData?._id, (data: any) => {
      if (data?.event === SOCKET_EVENT.GET_PAST_CONVERSATION_RESPONSE && fetchDataRef?.current) {
        chatHistory.current = data?.data;
        setChatData({ ...chatData, pastConvo: data?.data.reverse() });
        setIsLoading(false);
        fetchDataRef.current = false;
      }
    });
    return () => {
      socketNew.current?.off(SOCKET_EVENT.GET_PAST_CONVERSATION_RESPONSE);
    };
  }, [setAllChat, setChatData]);

  useEffect(() => {
    const unreadMessages = chatHistory.current.filter((msg) => {
      return msg?.creator?._id !== userData?._id && msg?.status !== 'read';
    });
    const conversationUser =
      UserData?.members?.filter((member: any) => {
        return member._id;
      }) ?? [];

    const fromId = userData?._id;
    const toId = conversationUser[0]?._id;

    if (unreadMessages.length > 0 && isFocused) {
      const unreadMessageObj = {
        name: userData.firstName || 'currentUser',
        to: 'currentUser',
        fromId,
        toId,
        id: `${socketNew.current?.id}${Math.random()}`,
        conversationId: UserData?.conversationId,
        socketId: socketNew.current?.id,
        roomname: UserData?.conversationId,
        unreadMessages,
      };
      socketNew.current?.emit(SOCKET_EVENT.UPDATE_UNREAD_MESSAGE_STATUS, unreadMessageObj);
    }
  }, [isFocused, pastConvo]);

  // Imp will be Used ======>
  // useEffect(() => {
  //   scrollToTop();
  // }, [pastConvo]);
  // Imp will be Used ======>

  const sendMessage = (message: string, automatedSteps = false) => {
    const msg = {
      text: message,
      name: userData?.firstName || 'currentUser',
      to: 'currentUser',
      fromId,
      toId,
      id: `${socketNew.current?.id}${Math.random()}`,
      conversationId: UserData?.conversationId,
      type: 'text',
      socketId: socketNew.current?.id,
      roomname: UserData?.conversationId,
      status: formatTime(),
    };

    if (automatedSteps) {
      socketNew.current?.emit(SOCKET_EVENT.CREATE_ITEM_SIGN_AGREEMENT, {
        roomname: UserData._id,
        conversationId: UserData._id,
        fromId,
        toId,
        type: 'text',
        text: message,
      });
      return;
    }
    if (message?.length > 0) {
      socketNew?.current?.emit(SOCKET_EVENT.MESSAGE, msg);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 200);
    }
  };

  const renderItem = ({ item, index }: any) => {
    let content = item?.content;
    if (typeof content === 'string') {
      try {
        content = JSON.parse(content);
        if (typeof content === 'string') {
          content = content;
        } else if (content?.type === 'text') {
          content = content?.content;
        } else {
          content = content;
        }
      } catch (error) {}
    }

    return (
      <View
        style={{
          paddingBottom: index === 0 ? MetricsSizes.vs30 : 0,
        }}
      >
        {content === '' || null ? null : item?.type === 'notification' ? (
          <AgreementAlertCard titleText={item?.content} />
        ) : (
          <PersonalChatCard
            isUser={userData?._id === item?.creator?._id ? 'sender' : 'reciever'}
            fromId={fromId}
            toId={toId}
            originalMessageObj={item}
            messageData={item?.content}
            isDocuSign={content?.type === 'docusign'}
            isSeen={item?.status === 'read'}
            recieverAvtar={
              recieverProfile?.[0]?.images ? { uri: recieverProfile?.[0]?.images } : null
            }
            senderAvtar={senderProfile?.[0]?.images ? { uri: senderProfile?.[0]?.images } : null}
            chatTime={moment(item?.createdAt, 'HH:mm:ss').format('hh:mm:ss A')}
            personalChatText={
              typeof content === 'string'
                ? content
                : typeof content === 'number'
                ? content
                : content?.type !== 'text'
                ? ''
                : null
            }
          />
        )}
        {/* Imp Code -----------> */}
        {/* {index === pastConvo.length - 1 ? (
          <>
            <DefaultChatCard isBrand timeStamp={'12:00:00 PM'} />
            <DefaultChatCard isDeliveryCard timeStamp={'12:00:00 PM'} />
            <FlatList
              data={DaysData}
              renderItem={({ item }: any) => (
                <DefaultChatCard
                  activePercentage={item?.percent}
                  daysCount={item?.days}
                  isDaysCount
                  timeStamp={'12:00:00 PM'}
                />
              )}
            />
            <DefaultChatCard isPayoutCard timeStamp={'12:00:00 PM'} />
          </>
        ) : null} */}
        {/* <DefaultChatCard isAuthCard timeStamp={'12:00:00 PM'} /> */}
        {/* Imp Code -----------> */}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: theme?.background }}>
        <PersonalChatHeader
          userAvtar={recieverProfile?.[0]?.images ? { uri: recieverProfile?.[0]?.images } : null}
          userName={
            `${recieverProfile?.[0]?.firstName} ${recieverProfile?.[0]?.lastName}` || 'Not Found'
          }
          onPressBackAction={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          {isLoading ? (
            <View style={styles.loaderView}>
              <ActivityIndicator size={40} />
            </View>
          ) : pastConvo?.length > 0 ? (
            <FlatList
              inverted
              ref={flatListRef}
              keyExtractor={(item: any) => {
                return item?._id;
              }}
              data={pastConvo}
              renderItem={renderItem}
            />
          ) : null}
        </View>

        <ChatInput
          sentBtnCb={(message: string, automated = false) => {
            sendMessage(message, automated);
          }}
          userConversation={UserData}
          type={UserData?.type}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: MetricsSizes.ms14,
    paddingLeft: MetricsSizes.hs15,
    fontFamily: FONTS.BAROSA.REGULAR,
  },
  bottomInputView: {
    margin: MetricsSizes.ms10,
    borderRadius: MetricsSizes.ms10,
    width: DEVICE_WIDTH * 0.95,
  },
  greenButton: {
    width: DEVICE_WIDTH * 0.27,
    height: DEVICE_HEIGHT * 0.065,
    margin: MetricsSizes.ms5,
  },
  greayBGView: {
    width: DEVICE_WIDTH,
  },
  loaderView: {
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonalChat;
