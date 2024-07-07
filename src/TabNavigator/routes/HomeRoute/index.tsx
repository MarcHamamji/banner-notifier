import React, {useCallback, useState} from 'react';

import {ScrollView} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';

import {FilterElement} from './FilterElement';
import filtersStore from '../../../stores/filter';
import CreateFilterDialog from './CreateFilterDialog';

function HomeRoute(): React.JSX.Element {
  const filters = filtersStore.useStoreState(state => state.filters);

  const [dialogVisible, setDialogVisible] = useState(false);

  const openDialog = useCallback(() => setDialogVisible(true), []);

  return (
    <>
      <CreateFilterDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
      />
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
        onPress={openDialog}
      />

      <Appbar.Header>
        <Appbar.Content title={'Home'} />
      </Appbar.Header>
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
