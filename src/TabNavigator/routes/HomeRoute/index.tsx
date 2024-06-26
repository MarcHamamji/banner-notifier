import React from 'react';

import {ScrollView} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';

import {FilterElement} from './FilterElement';
import filtersStore from '../../../stores/filter';

function HomeRoute(): React.JSX.Element {
  const filters = filtersStore.useStoreState(state => state.filters);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={'Logs'} />
      </Appbar.Header>
      <FAB
        icon="plus"
        label="Create"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          zIndex: 100,
        }}
        onPress={() => {}}
      />
      <ScrollView
        style={{
          paddingLeft: 16,
        }}>
        {filters.map((filter, index) => (
          <FilterElement key={filter.id} filter={filter} filterIndex={index} />
        ))}
      </ScrollView>
    </>
  );
}

export default HomeRoute;
