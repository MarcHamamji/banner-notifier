import React, {useMemo} from 'react';

import {useCallback} from 'react';
import {ActivityIndicator, Appbar, PaperProvider} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import HomeRoute from '../src/routes/HomeRoute';
import LogsRoute from '../src/routes/LogsRoute';
import SettingsRoute from '../src/routes/SettingsRoute';
import logsStore from './stores/logs';
import settingsStore from './stores/settings';
import filtersStore from './stores/filter';

const Tab = createMaterialBottomTabNavigator();

function Main(): React.JSX.Element {
  const badgeNeeded = logsStore.useStoreState(state => state.badgeNeeded);
  const markAllAsSeen = logsStore.useStoreActions(state => state.markAllAsSeen);

  const onLogsBlur = useCallback(() => {
    markAllAsSeen();
  }, [markAllAsSeen]);

  const logsIsRehydrated = logsStore.useStoreRehydrated();
  const settingsIsRehydrated = settingsStore.useStoreRehydrated();
  const filtersIsRehydrated = filtersStore.useStoreRehydrated();

  const isRehydrated = useMemo(
    () => logsIsRehydrated && settingsIsRehydrated && filtersIsRehydrated,
    [logsIsRehydrated, settingsIsRehydrated, filtersIsRehydrated],
  );

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title={'Title'} />
      </Appbar.Header>
      {isRehydrated ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeRoute}
            options={{
              tabBarIcon: 'home',
            }}
          />
          <Tab.Screen
            name="Logs"
            component={LogsRoute}
            options={{
              tabBarIcon: 'list-status',
              tabBarBadge: badgeNeeded,
            }}
            listeners={{
              blur: onLogsBlur,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsRoute}
            options={{
              tabBarIcon: 'cog',
            }}
          />
        </Tab.Navigator>
      ) : (
        <ActivityIndicator
          style={{
            marginVertical: 'auto',
          }}
          animating={true}
          size={'large'}
        />
      )}
    </PaperProvider>
  );
}

export default Main;
