import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist as epPersist} from 'easy-peasy';

export default function persist<Model extends Object = {}>(
  model: Model,
): Model {
  return epPersist(model, {
    storage: {
      async getItem(key) {
        try {
          return JSON.parse((await AsyncStorage.getItem(key)) || '');
        } catch (error) {
          return null;
        }
      },
      setItem(key, data) {
        const jsonValue = JSON.stringify(data);
        AsyncStorage.setItem(key, jsonValue);
      },
      removeItem(key) {
        AsyncStorage.removeItem(key);
      },
    },
  });
}
