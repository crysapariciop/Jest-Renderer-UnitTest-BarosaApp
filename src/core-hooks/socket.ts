import { useState, useCallback, useEffect } from 'react';
import {
  ConversationItemTransactionState,
  UserConversationsState,
} from '@modules/messaging-module/messaging-store/state';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { UserState } from '@src/modules/auth-module/auth-store';
import {
  AllChat,
  AllReceivedFriendRequestAtom,
  AllSentFriendRequestAtom,
  FriendsListAtom,
  SendFriendRequestAtom,
  SocketMessagesAtom,
  SocketMessagesData,
} from '@src/modules/messaging-module/messaging-store/atom';
import { socketNew } from '@src/core-navigation';

export enum SOCKET_EVENT {
  JOIN = 'join',
  CONNECTION = 'connection',
  MESSAGE = 'message',
  MESSAGE_RESPONSE = 'message_response',
  TYPING = 'typing',
  TYPING_RESPONSE = 'typing_response',
  UPDATE_UNREAD_MESSAGE_STATUS = 'update_unread_message_status',
  UPDATE_UNREAD_MESSAGE_STATUS_RESPONSE = 'update_unread_message_status_response',
  CREATE_ONGOING_DEAL_CONVERSATION = 'create_ongoing_deal_conversation',
  CREATE_ONGOING_DEAL_CONVERSATION_RESPONSE = 'create_ongoing_deal_conversation_response',
  GET_CONVERSATION_LIST = 'get_conversation_list',
  GET_CONVERSATION_LIST_RESPONSE = 'get_conversation_list_response',
  GET_PAST_CONVERSATION = 'get_past_conversation',
  GET_PAST_CONVERSATION_RESPONSE = 'get_past_conversation_response',
  ITEM_TRANSACTION = 'item_transaction',
  ITEM_TRANSACTION_RESPONSE = 'item_transaction_response',
  GET_FRIEND_REQUEST = 'get_friend_request',
  GET_FRIEND_REQUEST_RESPONSE = 'get_friend_request_response',
  GET_SENT_FRIEND_REQUEST = 'get_sent_friend_request',
  GET_SENT_FRIEND_REQUEST_RESPONSE = 'get_sent_friend_request_RESPONSE',
  ACCEPT_FRIEND_REQUEST = 'accept_friend_request',
  ACCEPT_FRIEND_REQUEST_RESPONSE = 'accept_friend_request_response',
  SEND_FRIEND_REQUEST = 'send_friend_request',
  SEND_FRIEND_REQUEST_RESPONSE = 'send_friend_request_response',
  WITHDRAW_FRIEND_REQUEST = 'withdraw_friend_request',
  WITHDRAW_FRIEND_REQUEST_RESPONSE = 'withdraw_friend_request_response',
  DECLINE_FRIEND_REQUEST = 'decline_friend_request',
  DECLINE_FRIEND_REQUEST_RESPONSE = 'decline_friend_request_response',
  GET_FRIEND_LIST = 'get_friend_list',
  GET_FRIEND_LIST_RESPONSE = 'get_friend_list_response',
  DELETE_FROM_WITHDRAW_ADD_TO_FRIEND_LIST_RESPONSE = 'delete_from_withdraw_add_to_friend_list_response',
  GET_CONVERSATION_ITEM_TRANSACTION = 'get_conversation_item_transaction',
  GET_CONVERSATION_ITEM_TRANSACTION_RESPONSE = 'get_conversation_item_transaction_response',
  UPDATE_TRANSACTION_MESSAGE = 'update_transaction_message',
  UPDATE_TRANSACTION_MESSAGE_RESPONSE = 'update_transaction_message_response',
  UPDATE_MESSAGE_TYPE = 'update_message_type',
  UPDATE_MESSAGE_TYPE_RESPONSE = 'update_message_type_response',
  CREATE_ITEM_SIGN_AGREEMENT = 'create_item_sign_agreement',
  CREATE_ITEM_SIGN_AGREEMENT_RESPONSE = 'create_item_sign_agreement_response',
  GET_LATEST_AGREEMENT = 'get_latest_agreement',
  GET_LATEST_AGREEMENT_RESPONSE = 'get_latest_agreement_response',
}

export const useSocket = () => {
  const { contents: loginUserContent, state: userLoadingState } = useRecoilValueLoadable(UserState);
  const [messages, setMessages] = useState({});
  const [typing, setTyping] = useState();
  const setUserConversations = useSetRecoilState(UserConversationsState);
  const setFriendRequest = useSetRecoilState(SendFriendRequestAtom);
  const setConversationItemTransaction = useSetRecoilState(ConversationItemTransactionState);
  const setAllSentFriendRequest = useSetRecoilState(AllSentFriendRequestAtom);
  const setAllReceivedFriendRequest = useSetRecoilState(AllReceivedFriendRequestAtom);
  const setAllFriendlist = useSetRecoilState(FriendsListAtom);
  const setAllChat = useSetRecoilState(AllChat);
  const setChatData = useSetRecoilState<SocketMessagesAtom>(SocketMessagesData);
  const { data: ChatData } = useRecoilValue(AllChat);

  const UpdateMsgResponse = useCallback(
    (resp: any) => {
      if (resp) {
        const { conversationId } = resp ?? {};

        setChatData((prev: any) => {
          const data: any = [...prev?.pastConvo];
          const found = data.find((oldMessage: any) => (oldMessage as any)?._id === resp?._id);
          if (found) {
            return { ...prev };
          }
          return { ...prev, pastConvo: [resp, ...data] };
        });
        if (conversationId) {
          setAllChat((prev: any) => {
            const myData: any = [...prev?.data] ?? [...ChatData];

            const foundIdx = myData.findIndex((convo: any) => convo._id === conversationId);
            if (foundIdx === -1) {
              return { ...prev, data: myData };
            }
            const foundIfMessageExisting = myData[foundIdx].chats.find((chat: any) => {
              return chat._id === resp._id;
            });

            if (foundIfMessageExisting) {
              return { ...prev, data: myData };
            }

            const cloneResp = JSON.parse(JSON.stringify(resp));
            const creatorId = cloneResp.creator._id;
            cloneResp.creator = creatorId;
            const cloneConversation = JSON.parse(JSON.stringify(myData));
            cloneConversation[foundIdx].chats.push(cloneResp);
            const sortedData: any = cloneConversation.sort((a, b) => {
              if (a?.chats?.length === 0 && b?.chats?.length === 0) {
                return 0;
              } else if (a?.chats?.length === 0) {
                return 1;
              } else if (b?.chats?.length === 0) {
                return -1;
              }
              const lastChatA = a?.chats[a?.chats?.length - 1];
              const lastChatB = b?.chats[b?.chats?.length - 1];

              const createdAtA: any = new Date(lastChatA?.createdAt);
              const createdAtB: any = new Date(lastChatB?.createdAt);

              return createdAtB - createdAtA;
            });
            return { ...prev, data: sortedData };
          });
        }
      }
    },
    [setAllChat, setChatData]
  );

  const updateUnreadMessageResponse = useCallback(
    (resp: any) => {
      if (resp) {
        const data = { ...resp };
        data.unreadMessages.forEach((ele: any) => {
          if (ele) {
            ele.status = 'read';
          }
        });
        setMessages((prev: any) => {
          const allMessage = prev[data.to]?.map((msg: any) => {
            const foundMsg = data.unreadMessages.find((unmsg: any) => unmsg === msg.id);
            if (foundMsg) {
              return foundMsg;
            }
            return msg;
          });
          return {
            ...prev,
            [data.to]: allMessage,
          };
        });

        const conversationId = data.unreadMessages?.[0].conversationId;

        if (conversationId) {
          setAllChat((prevData: any) => {
            const prev: any = [...prevData?.data] ?? [...ChatData];
            const foundIdx = prev.findIndex((convo: any) => convo._id === conversationId);
            if (foundIdx === -1) {
              return { ...prevData, data: prev };
            }

            const unreadMessageIds = data.unreadMessages.map((unreadMsg: any) => unreadMsg._id);

            const foundIfMessageExistingIndexes: number[] = prev[foundIdx]?.chats
              .map((chat: any, idx: number) => {
                if (unreadMessageIds.includes(chat._id)) {
                  return idx;
                }
                return null;
              })
              .filter((a: any) => a);

            if (foundIfMessageExistingIndexes.length === 0) {
              return { ...prevData, data: prev };
            }
            const cloneConversation = JSON.parse(JSON.stringify(prev));
            foundIfMessageExistingIndexes.forEach((idx) => {
              cloneConversation[foundIdx].chats[idx].status = 'read';
            });
            const sortedData: any = cloneConversation.sort((a, b) => {
              if (a?.chats?.length === 0 && b?.chats?.length === 0) {
                return 0;
              } else if (a?.chats?.length === 0) {
                return 1;
              } else if (b?.chats?.length === 0) {
                return -1;
              }

              const lastChatA = a?.chats[a?.chats?.length - 1];
              const lastChatB = b?.chats[b?.chats?.length - 1];

              const createdAtA: any = new Date(lastChatA?.createdAt);
              const createdAtB: any = new Date(lastChatB?.createdAt);

              return createdAtB - createdAtA;
            });
            return { ...prevData, data: sortedData };
          });
        }
      }
    },
    [setMessages, setAllChat]
  );

  const updatePastConversations = useCallback(
    (res: any[]) => {
      setChatData((prev: any) => {
        return { ...prev, pastConvo: res, loading: false };
      });
    },
    [setChatData]
  );

  // ===========> This functions will be used in the future

  // const sendFriendRequest = useCallback(
  //   (payload: any) => {
  //     if (payload) {
  //       if (payload?.from?._id === loginUser.userId) {
  //         setAllSentFriendRequest((prev: any) => {
  //           const existingRequest = prev.data.find((prevData: any) => prevData._id === payload._id);
  //           if (existingRequest) {
  //             return prev;
  //           }
  //           return {
  //             ...prev,
  //             data: [...prev.data, payload],
  //           };
  //         });
  //       } else if (payload?.from?._id !== loginUser.userId) {
  //         setAllReceivedFriendRequest((prev: any) => ({
  //           ...prev,
  //           data: [...prev.data, payload],
  //         }));
  //       }
  //     }
  //   },
  //   [loginUser.userId, setAllReceivedFriendRequest, setAllSentFriendRequest]
  // );

  // const getAllSentFriendRequests = useCallback(
  //   (payload: any) => {
  //     if (payload) {
  //       setAllSentFriendRequest((prev: any) => ({
  //         ...prev,
  //         data: [...payload],
  //       }));
  //     }
  //   },
  //   [setAllSentFriendRequest]
  // );

  // const withdrawFriendRequest = useCallback(
  //   (payload: any) => {
  //     if (payload) {
  //       if (payload?.from?._id === loginUser.userId) {
  //         setAllSentFriendRequest((prev: any) => {
  //           const found = prev.data.findIndex((abcd: any) => abcd._id === payload._id);
  //           if (found !== -1) {
  //             const prevData = JSON.parse(JSON.stringify(prev.data));
  //             prevData.splice(found, 1);
  //             return { ...prev, data: prevData };
  //           }
  //           return { ...prev };
  //         });
  //       } else {
  //         // all received friend list update
  //         setAllReceivedFriendRequest((prev: any) => {
  //           const found = prev.data.findIndex((abcd: any) => abcd._id === payload._id);
  //           if (found !== -1) {
  //             const prevData = JSON.parse(JSON.stringify(prev.data));
  //             prevData.splice(found, 1);
  //             return { ...prev, data: prevData };
  //           }
  //           return { ...prev };
  //         });
  //       }
  //       return;
  //     }
  //   },
  //   [loginUser.userId, setAllReceivedFriendRequest, setAllSentFriendRequest]
  // );

  // const getAllFriendRequests = useCallback(
  //   (payload: any) => {
  //     if (payload) {
  //       setAllReceivedFriendRequest((prev: any) => ({
  //         ...prev,
  //         data: [...payload],
  //       }));
  //     }
  //   },
  //   [setAllReceivedFriendRequest]
  // );

  // const acceptFriendRequest = useCallback(
  //   (payload: any) => {
  //     // setAllFriendlist((prev: any) => ({
  //     //   ...prev,
  //     //   isLoaded: false,
  //     // }));
  //     if (payload) {
  //       setAllFriendlist((prev: any) => {
  //         const existingFriend = prev.data.find((prevData: any) => prevData._id === payload._id);

  //         if (existingFriend) {
  //           return prev;
  //         }

  //         return {
  //           ...prev,
  //           data: [...prev.data, payload],
  //         };
  //       });
  //       setAllReceivedFriendRequest((prev: any) => {
  //         const found = prev.data.findIndex((abcd: any) => abcd._id === payload._id);
  //         if (found !== -1) {
  //           const prevData = JSON.parse(JSON.stringify(prev.data));
  //           prevData.splice(found, 1);
  //           return { ...prev, data: prevData };
  //         }
  //         return { ...prev };
  //       });
  //     }
  //   },
  //   [setAllFriendlist, setAllReceivedFriendRequest]
  // );

  // const declineFriendRequest = useCallback(
  //   (payload: any) => {
  //     setAllReceivedFriendRequest((prev: any) => {
  //       const found = prev.data.findIndex((abcd: any) => abcd._id === payload._id);
  //       if (found !== -1) {
  //         const prevData = JSON.parse(JSON.stringify(prev.data));
  //         prevData.splice(found, 1);
  //         return { ...prev, data: prevData };
  //       }
  //       return { ...prev };
  //     });
  //   },
  //   [setAllReceivedFriendRequest]
  // );

  // const updateMySentRequest = useCallback(
  //   (payload: any) => {
  //     // setAllFriendlist((prev: any) => ({
  //     //   ...prev,
  //     //   isLoaded: false,
  //     // }));
  //     setAllFriendlist((prev: any) => ({
  //       ...prev,
  //       isLoaded: false,
  //     }));
  //     if (payload) {
  //       setAllFriendlist((prev: any) => {
  //         const existingFriend = prev.data.find((prevData: any) => prevData._id === payload._id);

  //         if (existingFriend) {
  //           return prev;
  //         }

  //         return {
  //           ...prev,
  //           data: [...prev.data, payload],
  //         };
  //       });
  //       setAllSentFriendRequest((prev: any) => {
  //         const found = prev.data.findIndex((abcd: any) => abcd._id === payload._id);
  //         if (found !== -1) {
  //           const prevData = JSON.parse(JSON.stringify(prev.data));
  //           prevData.splice(found, 1);
  //           return { ...prev, data: prevData };
  //         }
  //         return { ...prev };
  //       });
  //     }
  //   },
  //   [setAllFriendlist, setAllSentFriendRequest]
  // );

  // const getAllFriendsList = useCallback(
  //   (payload: any) => {
  //     if (payload) {
  //       setAllFriendlist((prev: any) => {
  //         const existingFriend = prev.data.find((prevData: any) => prevData._id === payload._id);

  //         if (existingFriend) {
  //           return prev;
  //         }

  //         return {
  //           ...prev,
  //           data: [...payload],
  //         };
  //       });
  //     }
  //   },
  //   [setAllFriendlist]
  // );

  // const updateTransactionConversationList = useCallback(
  //   (data: any) => {
  //     setUserConversations((prev) => {
  //       const found = prev.findIndex((convos) => convos._id === data._id);

  //       if (found !== -1) {
  //         return prev;
  //       }

  //       return [...prev, data];
  //     });
  //   },
  //   [setUserConversations]
  // );

  const updateConversationItemTransaction = useCallback(
    (data: any) => {
      if (data?.conversationId) {
        setConversationItemTransaction((prev) => ({
          ...prev,
          [data.conversationId]: data,
        }));
      }
    },
    [setConversationItemTransaction]
  );

  const updateMessage = useCallback(
    (data: any) => {
      setChatData((prev: any) => {
        const prevData: any = [...prev?.pastConvo];
        const foundIndex = prevData?.findIndex((msg: any) => {
          return (msg as any)?._id === (data?.messageId ?? data?.resp?._id);
        });
        if (foundIndex === -1) {
          return { ...prev, pastConvo: prevData };
        }
        const parsedMessage = JSON.parse(JSON.stringify(prevData));
        parsedMessage[foundIndex] = data?.resp ?? data;
        return { ...prev, pastConvo: parsedMessage };
      });
    },
    [setChatData]
  );

  // const updatePastConversations = useCallback(
  //   (res: any[]) => {
  //     setUserMssg((prev) => {
  //       const messageIds = res.map((re) => re._id);
  //       const prevIds = prev.data.map((da) => da._id);

  //       if (prevIds.length === 0) {
  //         return { ...prev, data: [...res, ...prev.data] };
  //       }

  //       const existingMessage = prev.data.filter((prevData) => !messageIds.includes(prevData._id));

  //       if (existingMessage.length === 0) {
  //         return { ...prev, data: res };
  //       }

  //       return { ...prev, data: [...existingMessage, ...prev.data] };
  //     });
  //   },
  //   [setUserMssg]
  // );

  // const updateMessageResponse = useCallback(
  //   (resp: any) => {
  //     if (resp) {
  //       const { conversationId } = resp ?? {};
  //       setUserMssg((prev) => {
  //         const found = prev.data.find((oldMessage) => (oldMessage as any)?._id === resp?._id);
  //         if (found) {
  //           return prev;
  //         }
  //         return { ...prev, data: [...prev.data, resp] };
  //       });

  //       if (conversationId) {
  //         setUserConversations((prev) => {
  //           const foundIdx = prev.findIndex((convo) => convo._id === conversationId);
  //           if (foundIdx === -1) {
  //             return prev;
  //           }

  //           const foundIfMessageExisting = prev[foundIdx].chats.find((chat: any) => {
  //             return chat._id === resp._id;
  //           });

  //           if (foundIfMessageExisting) {
  //             return prev;
  //           }

  //           const cloneResp = JSON.parse(JSON.stringify(resp));
  //           const creatorId = cloneResp.creator._id;
  //           cloneResp.creator = creatorId;
  //           const cloneConversation = JSON.parse(JSON.stringify(prev));
  //           cloneConversation[foundIdx].chats.push(cloneResp);
  //           return cloneConversation;
  //         });
  //       }
  //     }
  //   },
  //   [setUserConversations, setUserMssg]
  // );

  // const updateUnreadMessageResponse = useCallback(
  //   (resp: any) => {
  //     const data = { ...resp };
  //     data.unreadMessages.forEach((ele: any) => {
  //       if (ele) {
  //         ele.status = 'read';
  //       }
  //     });
  //     setMessages((prev: any) => {
  //       const allMessage = prev[data.to]?.map((msg: any) => {
  //         const foundMsg = data.unreadMessages.find((unmsg: any) => unmsg === msg.id);
  //         if (foundMsg) {
  //           return foundMsg;
  //         }
  //         return msg;
  //       });
  //       return {
  //         ...prev,
  //         //   [loggedInUser]: allMessage,
  //         [data.to]: allMessage,
  //       };
  //     });

  //     const conversationId = data.unreadMessages?.[0].conversationId;

  //     if (conversationId) {
  //       setUserConversations((prev) => {
  //         const foundIdx = prev.findIndex((convo) => convo._id === conversationId);
  //         if (foundIdx === -1) {
  //           return prev;
  //         }

  //         const unreadMessageIds = data.unreadMessages.map((unreadMsg: any) => unreadMsg._id);

  //         const foundIfMessageExistingIndexes: number[] = prev[foundIdx].chats
  //           .map((chat: any, idx: number) => {
  //             if (unreadMessageIds.includes(chat._id)) {
  //               return idx;
  //             }
  //             return null;
  //           })
  //           .filter((a: any) => a);

  //         if (foundIfMessageExistingIndexes.length === 0) {
  //           return prev;
  //         }
  //         const cloneConversation = JSON.parse(JSON.stringify(prev));
  //         foundIfMessageExistingIndexes.forEach((idx) => {
  //           cloneConversation[foundIdx].chats[idx].status = 'read';
  //         });
  //         return cloneConversation;
  //       });
  //     }
  //   },
  //   [setUserConversations]
  // );

  // ===========> This functions will be used in the future

  useEffect(() => {
    if (socketNew?.current && userLoadingState === 'hasValue') {
      socketNew?.current?.on(loginUserContent.data.userId, (data: any) => {
        switch (data?.event) {
          case SOCKET_EVENT.UPDATE_UNREAD_MESSAGE_STATUS_RESPONSE:
            updateUnreadMessageResponse(data?.data);
            // updateUnreadMessageResponse(data.data);
            break;
          case SOCKET_EVENT.MESSAGE_RESPONSE:
            UpdateMsgResponse(data?.data);
            break;
          case SOCKET_EVENT.SEND_FRIEND_REQUEST_RESPONSE:
            // sendFriendRequest(data.data.resp);
            break;
          case SOCKET_EVENT.GET_SENT_FRIEND_REQUEST_RESPONSE:
            // getAllSentFriendRequests(data.data.resp);
            break;
          case SOCKET_EVENT.WITHDRAW_FRIEND_REQUEST_RESPONSE:
            // withdrawFriendRequest(data.data.resp);
            break;
          case SOCKET_EVENT.GET_FRIEND_REQUEST_RESPONSE:
            // getAllFriendRequests(data.data.resp);
            break;
          case SOCKET_EVENT.ACCEPT_FRIEND_REQUEST_RESPONSE:
            // acceptFriendRequest(data.data.resp);
            break;
          case SOCKET_EVENT.DELETE_FROM_WITHDRAW_ADD_TO_FRIEND_LIST_RESPONSE:
            // updateMySentRequest(data.data.resp);
            break;
          case SOCKET_EVENT.GET_FRIEND_LIST_RESPONSE:
            // getAllFriendsList(data.data.resp);
            break;
          case SOCKET_EVENT.DECLINE_FRIEND_REQUEST_RESPONSE:
            // declineFriendRequest(data.data.resp);
            break;
          case SOCKET_EVENT.CREATE_ONGOING_DEAL_CONVERSATION_RESPONSE:
            // updateTransactionConversationList(data.data.resp);
            break;
          case SOCKET_EVENT.UPDATE_MESSAGE_TYPE_RESPONSE:
            updateMessage(data?.updatedmssg ?? data?.data);
            break;
          case SOCKET_EVENT.UPDATE_TRANSACTION_MESSAGE_RESPONSE:
          case SOCKET_EVENT.GET_CONVERSATION_ITEM_TRANSACTION_RESPONSE:
            updateConversationItemTransaction(data?.data?.resp);
            break;
          case SOCKET_EVENT.GET_PAST_CONVERSATION_RESPONSE:
            // updatePastConversations(data?.data);
            break;
          case SOCKET_EVENT.GET_CONVERSATION_LIST_RESPONSE:
            // const sortedData: any = sortDataByLastChatDate(data?.data);
            // setAllChat({ ...allChat, data: sortedData });
            break;
          case SOCKET_EVENT.GET_LATEST_AGREEMENT_RESPONSE:
            // get latest agreement
            break;
        }
      });
      socketNew.current?.on(SOCKET_EVENT.UPDATE_MESSAGE_TYPE_RESPONSE, (res: any) => {
        updateMessage(res);
      });

      socketNew.current?.on(SOCKET_EVENT.GET_CONVERSATION_LIST_RESPONSE, (res: any) => {
        // const sortedData: any = sortDataByLastChatDate(res);
        // setAllChat({ ...allChat, data: sortedData });
        // setUserConversations(res);
      });
      socketNew.current?.on(SOCKET_EVENT.MESSAGE_RESPONSE, (resp: any) => {
        UpdateMsgResponse(resp);
        // updateMessageResponse(resp);
        // if (resp) {
        //   setUserMssg((prev) => {
        //     const found = prev.data.find(
        //       (oldMessage) => (oldMessage as any)?._id === resp?._id
        //     );
        //     if (found) {
        //       return prev;
        //     }
        //     return { ...prev, data: [...prev.data, resp] };
        //   });
        // }
      });

      socketNew.current?.on('initiate_user_conversation_response', (data: any) => {
        // setConversation(prev => ([...prev, data]))
      });

      socketNew.current?.on(SOCKET_EVENT.UPDATE_UNREAD_MESSAGE_STATUS_RESPONSE, (data: any) => {
        updateUnreadMessageResponse(data);
        // data.unreadMessages.forEach((ele: any) => {
        //   if (ele) {
        //     ele.status = 'read';
        //   }
        // });
        // setMessages((prev: any) => {
        //   const allMessage = prev[data.to]?.map((msg: any) => {
        //     const foundMsg = data.unreadMessages.find((unmsg: any) => unmsg === msg.id);
        //     if (foundMsg) {
        //       return foundMsg;
        //     }
        //     return msg;
        //   });
        //   return {
        //     ...prev,
        //     //   [loggedInUser]: allMessage,
        //     [data.to]: allMessage,
        //   };
        // });
      });

      socketNew.current?.on('typing_response', (data: any) => {
        // console.log("typing-response", data);
        // setTyping(data);
      });

      socketNew.current?.on('conversations', (data: any) => {
        // console.log("data : ", data);
      });

      socketNew.current?.on(SOCKET_EVENT.SEND_FRIEND_REQUEST_RESPONSE, (data: any) => {
        // if (data.resp) {
        //   setFriendRequest((prev: any) => ({
        //     ...prev,
        //     data: { ...data.resp },
        //   }));
        //   return;
        // }}
      });

      // socketNew.current.on(
      //   SOCKET_EVENT.GET_FRIEND_REQUEST_RESPONSE,
      //   (data: any) => {
      //     console.log(SOCKET_EVENT.GET_FRIEND_REQUEST_RESPONSE, data);
      //   }
      // );

      socketNew.current?.on(
        SOCKET_EVENT.GET_CONVERSATION_ITEM_TRANSACTION_RESPONSE,
        (data: any) => {
          updateConversationItemTransaction(data.resp);
        }
      );
    }

    return () => {
      Object.values(SOCKET_EVENT).forEach((socketEvent) => {
        socketNew.current?.off(socketEvent);
      });
    };
  }, [userLoadingState]);

  return { messages, typing };
};
