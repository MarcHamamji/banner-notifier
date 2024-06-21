import {useEffect, useMemo, useState} from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

export function useTimeAgo(date: number): string {
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedLastChecked = useMemo(() => {
    return timeAgo.format(date, 'round-minute');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, currentTimestamp]);

  return formattedLastChecked;
}

export default timeAgo;
