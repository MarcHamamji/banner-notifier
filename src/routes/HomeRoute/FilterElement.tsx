import React, {useMemo} from 'react';
import {List} from 'react-native-paper';

import {Filter} from '../../stores/filter';
import {useTimeAgo} from '../../timeAgo';
import {FilterIcons} from './FilterIcons';

export function FilterElement({
  filter,
  filterIndex,
}: {
  filter: Filter;
  filterIndex: number;
}): React.JSX.Element {
  const formattedLastChecked = useTimeAgo(filter.lastChecked || 0);

  const formattedTime = useMemo(() => {
    if (filter.lastChecked === null) {
      return 'Never checked';
    }
    return `Last checked ${formattedLastChecked}`;
  }, [filter.lastChecked, formattedLastChecked]);

  return (
    <List.Item
      title={filter.name}
      description={formattedTime}
      right={props => FilterIcons(props, filterIndex)}
    />
  );
}
