import React, {useCallback, useState} from 'react';
import {IconButton, Menu, Portal, Snackbar} from 'react-native-paper';
import useFiltersStore from '../../stores/filter';
import useSettingsStore from '../../stores/settings';
import useLogsStore, {LogStatus} from '../../stores/logs';
import {searchCourseAndCreateLog} from '../../courseSearch';
import {Vibration} from 'react-native';

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
    if (loading) {
      return;
    }

    setLoading(true);

    const filter = filters[filterIndex];
    const log = await searchCourseAndCreateLog(
      bannerServerURL,
      filter.termCode,
      filter.courseSearchParameters,
      filter.id,
    );
    if (log.status === LogStatus.NetworkError) {
      setSnackbarVisible(true);
    } else if (log.status === LogStatus.NotFull) {
      //Vibration.vibrate([0, 100, 100, 500]);
      Vibration.vibrate();
    }

    addLog(log);
    setLastChecked({index: filterIndex, time: Date.now()});

    setLoading(false);
  }, [loading, filters, filterIndex, bannerServerURL, addLog, setLastChecked]);

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const onDelete = useCallback(() => {
    closeMenu();
    setTimeout(() => {
      deleteFilter(filterIndex);
    }, 200);
  }, [deleteFilter, filterIndex]);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <>
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onIconPress={() => {
            setSnackbarVisible(false);
          }}
          onDismiss={() => setSnackbarVisible(false)}>
          Network Error. Please make sure the Banner server is reachable and try
          again.
        </Snackbar>
      </Portal>
      <IconButton
        {...props}
        icon="play"
        onPress={onPress}
        loading={loading}
        disabled={loading}
      />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<IconButton onPress={openMenu} icon="dots-vertical" />}>
        <Menu.Item onPress={onDelete} title="Delete" />
      </Menu>
    </>
  );
}
