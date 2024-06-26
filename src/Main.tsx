import React, {useMemo} from 'react';

import {ActivityIndicator} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import logsStore from './stores/logs';
import settingsStore from './stores/settings';
import filtersStore from './stores/filter';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {
  const logsIsRehydrated = logsStore.useStoreRehydrated();
  const settingsIsRehydrated = settingsStore.useStoreRehydrated();
  const filtersIsRehydrated = filtersStore.useStoreRehydrated();

  const isRehydrated = useMemo(
    () => logsIsRehydrated && settingsIsRehydrated && filtersIsRehydrated,
    [logsIsRehydrated, settingsIsRehydrated, filtersIsRehydrated],
  );

  return isRehydrated ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab Navigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Filter Editor"
        component={TabNavigator} // MAKE THIS THE FILTER EDITOR
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <ActivityIndicator
      style={{
        marginVertical: 'auto',
      }}
      animating={true}
      size={'large'}
    />
  );
}

export default Main;
