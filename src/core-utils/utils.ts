import { Platform } from 'react-native';

export function getKeyByValue(object: any, value: any) {
  for (const key in object) {
    if (object[key] === value) {
      return key;
    }
  }
}
export const formatTime = (exactTime?: string) => {
  let date;
  date = new Date();
  if (exactTime) {
    date = new Date(exactTime);
  }
  let hours: any = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let time = hours + ':' + minutes + ':' + seconds + ' ' + am_pm;
  return time;
};

export const sortDataByLastChatDate = (myData: any) => {
  const sortedData = myData.sort((a, b) => {
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

  return sortedData;
};

export const isNotEmptyorNull = (str: string | undefined | null): boolean => {
  return typeof str === 'string' && str.trim().length > 0;
}

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
