import React, {useMemo} from 'react';
import {List, useTheme} from 'react-native-paper';

import {Log, LogStatus} from '../../../stores/logs';
import filtersStore from '../../../stores/filter';
import TimeAgoText from '../../../TimeAgoText';

const icons: Record<LogStatus, string> = {
  [LogStatus.Full]: 'account-group',
  [LogStatus.NotFull]: 'account-group-outline',
  [LogStatus.NetworkError]: 'wifi-strength-off',
  [LogStatus.ClassNotFound]: 'exclamation-thick',
};

const labels: Record<LogStatus, string> = {
  [LogStatus.Full]: 'Full',
  [LogStatus.NotFull]: 'Seats Available',
  [LogStatus.NetworkError]: 'Network Error',
  [LogStatus.ClassNotFound]: 'Class Not Found',
};

interface LogProps {
  log: Log;
}

function LogBadge(props: any, log: Log): React.ReactNode {
  const theme = useTheme();

  return (
    <List.Icon
      {...props}
      icon="circle-medium"
      color={log.seen ? theme.colors.secondary : theme.colors.error}
    />
  );
}

function LogIcon(props: any, log: Log): React.ReactNode {
  return <List.Icon {...props} icon={icons[log.status]} />;
}

function LogDescription(props: any, log: Log) {
  return <TimeAgoText timestamp={log.timestamp} {...props} />;
}

function LogElement({log}: LogProps): React.JSX.Element {
  const filters = filtersStore.useStoreState(state => state.filters);

  const hasBadge = useMemo(
    () => log.status === LogStatus.NotFull,
    [log.status],
  );

  const label = useMemo(() => {
    const filterName =
      log.oldFilterName ?? filters.find(f => f.id === log.filterID)?.name;
    return labels[log.status] + ' • ' + filterName;
  }, [filters, log]);

  return (
    <>
      <List.Item
        key={log.timestamp}
        title={label}
        description={props => LogDescription(props, log)}
        left={props => LogIcon(props, log)}
        right={props => hasBadge && LogBadge(props, log)}
      />
    </>
  );
}

export default LogElement;
