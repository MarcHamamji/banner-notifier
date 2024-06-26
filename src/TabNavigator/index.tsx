import React, {useCallback} from 'react';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import HomeRoute from './routes/HomeRoute';
import LogsRoute from './routes/LogsRoute';
import SettingsRoute from './routes/SettingsRoute';
import logsStore from '../stores/logs';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator({}) {
  const badgeNeeded = logsStore.useStoreState(state => state.badgeNeeded);
  const markAllAsSeen = logsStore.useStoreActions(state => state.markAllAsSeen);

  const onLogsBlur = useCallback(() => {
    markAllAsSeen();
  }, [markAllAsSeen]);

  return (
    <>
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
    </>
  );
}

export default TabNavigator;
