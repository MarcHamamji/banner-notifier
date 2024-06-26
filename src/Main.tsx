import React, {useMemo} from 'react';

import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Appbar,
  BottomNavigation,
  PaperProvider,
} from 'react-native-paper';
import {BaseRoute} from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';

import HomeRoute from '../src/routes/HomeRoute';
import LogsRoute from '../src/routes/LogsRoute';
import SettingsRoute from '../src/routes/SettingsRoute';
import logsStore from './stores/logs';
import settingsStore from './stores/settings';
import filtersStore from './stores/filter';

function Main(): React.JSX.Element {
  const badgeNeeded = logsStore.useStoreState(state => state.badgeNeeded);
  const markAllAsSeen = logsStore.useStoreActions(state => state.markAllAsSeen);

  const [index, setIndex] = useState(0);
  const [routes] = useState<BaseRoute[]>([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
    },
    {
      key: 'logs',
      title: 'Logs',
      focusedIcon: 'list-status',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
    },
  ]);

  const getBadges = useCallback(
    ({route}: {route: BaseRoute}) => {
      if (route.key !== 'logs') {
        return false;
      }
      return badgeNeeded;
    },
    [badgeNeeded],
  );

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    logs: LogsRoute,
    settings: SettingsRoute,
  });

  const onIndexChange = useCallback(
    (newIndex: number) => {
      if (index === 1) {
        markAllAsSeen();
      }
      setIndex(newIndex);
    },
    [index, markAllAsSeen],
  );

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
        <Appbar.Content title={routes[index].title} />
      </Appbar.Header>
      {isRehydrated ? (
        <BottomNavigation
          navigationState={{
            index,
            routes,
          }}
          onIndexChange={onIndexChange}
          renderScene={renderScene}
          getBadge={getBadges}
        />
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
