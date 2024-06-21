import React, {useCallback, useState} from 'react';
import {IconButton, Menu} from 'react-native-paper';
import useFiltersStore from '../../stores/filter';
import useSettingsStore from '../../stores/settings';
import useLogsStore from '../../stores/logs';
import {searchCourseAndCreateLog} from '../../courseSearch';

export function FilterIcons(
  props: any,
  filterIndex: number,
): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const bannerServerURL = useSettingsStore.useStoreState(
    state => state.bannerServerURL,
  );
  const filters = useFiltersStore.useStoreState(state => state.filters);
  const deleteFilter = useFiltersStore.useStoreActions(
    state => state.deleteFilter,
  );
  const addLog = useLogsStore.useStoreActions(state => state.addLog);

  const setLastChecked = useFiltersStore.useStoreActions(
    state => state.setLastChecked,
  );

  const onPress = useCallback(async () => {
    setLoading(true);

    const filter = filters[filterIndex];
    const log = await searchCourseAndCreateLog(
      bannerServerURL,
      filter.termCode,
      filter.courseSearchParameters,
      filter.id,
    );
    addLog(log);
    setLastChecked({index: filterIndex, time: Date.now()});

    setLoading(false);
  }, [filters, filterIndex, setLastChecked, bannerServerURL, addLog]);

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const onDelete = useCallback(() => {
    closeMenu();
    setTimeout(() => {
      deleteFilter(filterIndex);
    }, 200);
  }, [deleteFilter, filterIndex]);

  return (
    <>
      <IconButton {...props} icon="play" onPress={onPress} loading={loading} />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<IconButton onPress={openMenu} icon="dots-vertical" />}>
        <Menu.Item onPress={onDelete} title="Delete" />
      </Menu>
    </>
  );
}
