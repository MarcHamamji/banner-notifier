import React from 'react';

import {List, MD3Theme, useTheme} from 'react-native-paper';
import {Log, LogStatus} from '../../stores/logs';
import {useMemo} from 'react';
import {useTimeAgo} from '../../timeAgo';

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

function LogBadge(props: any, theme: MD3Theme): React.ReactNode {
  return (
    <List.Icon {...props} icon="circle-medium" color={theme.colors.error} />
  );
}

function LogIcon(props: any, log: Log): React.ReactNode {
  return <List.Icon {...props} icon={icons[log.status]} />;
}

function LogElement({log}: LogProps): React.JSX.Element {
  const theme = useTheme();

  const formattedTime = useTimeAgo(log.timestamp);

  const hasBadge = useMemo(
    () => log.status === LogStatus.NotFull && !log.seen,
    [log.status, log.seen],
  );

  return (
    <>
      <List.Item
        key={log.timestamp}
        title={labels[log.status]}
        description={formattedTime}
        left={props => LogIcon(props, log)}
        right={props => hasBadge && LogBadge(props, theme)}
      />
    </>
  );
}

export default LogElement;
