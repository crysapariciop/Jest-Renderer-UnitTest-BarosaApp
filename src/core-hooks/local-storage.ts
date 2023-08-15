import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export const useLocalStorage = () => {
  const get = useCallback((key: string) => {
    try {
      let localData = AsyncStorage.getItem(key);
      if (localData) {
        try {
          localData = JSON.parse(localData);
        } catch (err) {
          // do nothing
        }
      }
      return localData;
    } catch (err) {
      return null;
    }
  }, []);

  const set = useCallback(
    (key: string, value: any) => {
      try {
        const localData: any = get(key);
        let localValue = {
          ...localData,
          ...value,
        };
        if (typeof value === 'object') {
          localValue = JSON.stringify(localValue);
        }
        AsyncStorage.setItem(key, localValue);
      } catch (err) {
        // do nothing
      }
    },
    [get]
  );

  return { get, set };
};
