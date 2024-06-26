import React from 'react';
import {List, Text} from 'react-native-paper';

import {Filter} from '../../stores/filter';
import {FilterIcons} from './FilterIcons';
import TimeAgoText from '../../TimeAgoText';

function FilterDescription(props: any, filter: Filter): React.ReactNode {
  if (filter.lastChecked === null) {
    return <Text>Never checked</Text>;
  } else {
    return (
      <TimeAgoText
        {...props}
        prefix={'Last checked '}
        timestamp={filter.lastChecked}
      />
    );
  }
}

export function FilterElement({
  filter,
  filterIndex,
}: {
  filter: Filter;
  filterIndex: number;
}): React.JSX.Element {
  return (
    <List.Item
      title={filter.name}
      description={props => FilterDescription(props, filter)}
      right={props => FilterIcons(props, filterIndex)}
    />
  );
}
