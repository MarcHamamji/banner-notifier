import React from 'react';

import {TextInput} from 'react-native-paper';
import settingsStore from '../../stores/settings';
import {View} from 'react-native';

function SettingsRoute(): React.JSX.Element {
  const bannerServerURL = settingsStore.useStoreState(
    state => state.bannerServerURL,
  );
  const setBannerServerURL = settingsStore.useStoreActions(
    state => state.setBannerServerURL,
  );

  return (
    <View
      style={{
        marginHorizontal: 16,
      }}>
      <TextInput
        label="Banner Server URL"
        value={bannerServerURL}
        onChangeText={text => setBannerServerURL(text)}
      />
    </View>
  );
}

export default SettingsRoute;
