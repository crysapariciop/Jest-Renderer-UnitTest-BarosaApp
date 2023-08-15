import { atom } from 'recoil';
import { ISendFriendRequest } from './types';

export interface SearchBarAtom {
  searchText?: string;
  isSearchPrev?: boolean;
  isSearchPeople?: boolean;
  isUserInvite?: boolean;
}

export interface SocketMessagesAtom {
  loading: boolean;
  isLoaded: boolean;
  error: boolean;
  pastConvo: [];
}
export interface AllChatAtom {
  isLoaded: boolean;
  error: boolean;
  loaded?: boolean;
  data: any;
}

export const MessagingSearchData = atom<SearchBarAtom>({
  key: 'messaging-header-data',
  default: {
    searchText: '',
    isSearchPrev: false,
    isSearchPeople: false,
    isUserInvite: false,
  },
});

export const SocketMessagesData = atom<SocketMessagesAtom>({
  key: 'messaging-header-key',
  default: {
    loading: false,
    isLoaded: true,
    error: true,
    pastConvo: [],
  },
});

export const AllChat = atom<AllChatAtom>({
  key: 'get-all-messages--key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: [],
  },
});

export const PersonalChatAtom = atom<AllChatAtom>({
  key: 'get-all-personal-messages--key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: [],
  },
});

export const SendFriendRequestAtom = atom<ISendFriendRequest>({
  key: 'Send-Friend-Request-key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: {},
  },
});
export const FriendsListAtom = atom<ISendFriendRequest>({
  key: 'Friend-List-key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: [],
  },
});

export const AllReceivedFriendRequestAtom = atom<ISendFriendRequest>({
  key: 'All-Received-Friend-Request-key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: [],
  },
});
export const AllSentFriendRequestAtom = atom<ISendFriendRequest>({
  key: 'All-Sent-Friend-Request-key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: [],
  },
});
