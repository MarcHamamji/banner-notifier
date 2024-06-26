import React from 'react';

import {Appbar, TextInput} from 'react-native-paper';
import settingsStore from '../../../stores/settings';
import {ScrollView} from 'react-native';

function SettingsRoute(): React.JSX.Element {
  const bannerServerURL = settingsStore.useStoreState(
    state => state.bannerServerURL,
  );

  const setBannerServerURL = settingsStore.useStoreActions(
    state => state.setBannerServerURL,
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={'Settings'} />
      </Appbar.Header>
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}>
        <TextInput
          label="Banner Server URL"
          value={bannerServerURL}
          onChangeText={text => setBannerServerURL(text)}
        />
      </ScrollView>
    </>
  );
}

export default SettingsRoute;
