import React from 'react';

import {ScrollView} from 'react-native';
import logsStore from '../../stores/logs';
import LogElement from './LogElement';
import {FAB} from 'react-native-paper';

function LogsRoute(): React.JSX.Element {
  const logs = logsStore.useStoreState(state => state.logs);
  const clearLogs = logsStore.useStoreActions(state => state.clearLogs);

  return (
    <>
      <FAB
        icon="delete"
        label="Clear"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          zIndex: 100,
        }}
        onPress={() => clearLogs()}
      />
      <ScrollView
        style={{
          marginHorizontal: 16,
        }}>
        {logs.map((log, index) => (
          <LogElement key={index} log={log} />
        ))}
      </ScrollView>
    </>
  );
}

export default LogsRoute;
