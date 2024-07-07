import React, {useCallback} from 'react';

import TimeAgo from 'react-timeago';
import {Text} from 'react-native-paper';

interface Props {
  timestamp: number;
  prefix?: string;
  [key: string]: unknown;
}

function TimeAgoText({timestamp, prefix, ...props}: Props): React.JSX.Element {
  const formatter = useCallback(
    (value: number, _unit: string, suffix: string) => {
      let unit = value !== 1 ? _unit + 's' : _unit;
      return (prefix || '') + value + ' ' + unit + ' ' + suffix;
    },
    [prefix],
  );

  return (
    <TimeAgo
      formatter={formatter}
      date={timestamp}
      //@ts-ignore - react-timeago doesn't accept Text as a component
      component={Text}
      key={timestamp}
      {...props}
    />
  );
}

export default TimeAgoText;
