import { atom } from 'recoil';

export const individualMssg = atom<{
  loading: boolean;
  isLoaded: boolean;
  error: boolean;
  data: any[];
}>({
  key: 'individual-mssg-key',
  default: {
    loading: false,
    isLoaded: true,
    error: true,
    data: [],
  },
});

export const indiConversation = atom<any>({
  key: 'individual-conversation-key',
  default: {
    loading: false,
    isLoaded: true,
    error: true,
    data: {
      exclude: [],
      _id: '',
      name: '',
      type: 'P',
      members: [],
      createdAt: '',
      updatedAt: '',
      __v: 0,
    },
  },
});

export const UserConversationsState = atom<any[]>({
  key: 'user-conversation-state',
  default: [],
});

export const ItemSpecificConversationsState = atom<string | null>({
  key: 'item-specific-conversation-state',
  default: null,
});

export const SearchState = atom<string | null>({
  key: 'search-state',
  default: null,
});

export const ActiveMessageTab = atom<string>({
  key: 'active-message-tab',
  default: 'messages',
});

export const ConversationItemTransactionState = atom<Record<string, any>>({
  key: 'conversation-item-transaction-state',
  default: {},
});

export const IndividualItem = atom<any>({
  key: 'individual-item-key1',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: {},
  },
});

export const AddedItemsList = atom<any>({
  key: 'items-state-key1',
  default: {
    loading: false,
    isLoaded: true,
    error: false,
    data: [],
  },
});
