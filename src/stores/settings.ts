import {Action, action, createContextStore} from 'easy-peasy';
import persist from './persist';

interface SettingsModel {
  bannerServerURL: string;
  setBannerServerURL: Action<SettingsModel, string>;
}

const settingsStore = createContextStore<SettingsModel>(
  persist({
    bannerServerURL: '',
    setBannerServerURL: action((state, payload) => {
      state.bannerServerURL = payload;
    }),
  }),
);

export default settingsStore;
