import React, {useCallback, useState} from 'react';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import FieldEditorSelect from '../../../FilterEditor/FieldEditor/FieldEditorSelect';
import settingsStore from '../../../stores/settings';
import BannerAPI from '../../../BannerAPI';
import filtersStore from '../../../stores/filter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../Main';

interface CreateFilterDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function CreateFilterDialog({
  visible,
  setVisible,
}: CreateFilterDialogProps): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'Tab Navigator'>>();

  const bannerServerURL = settingsStore.useStoreState(
    state => state.bannerServerURL,
  );
  const [bannerAPI] = useState(new BannerAPI(bannerServerURL));

  const createFilter = filtersStore.useStoreActions(
    state => state.createFilter,
  );

  const [newFilterName, setNewFilterName] = useState('');
  const [newTermCode, setNewTermCode] = useState('');

  const hideDialog = useCallback(() => setVisible(false), [setVisible]);

  const confirmAndCreateFilter = useCallback(async () => {
    setVisible(false);

    const filterID = Date.now();
    createFilter({
      id: filterID,
      name: newFilterName,
      termCode: newTermCode,
      lastChecked: null,
      courseSearchParameters: {},
    });

    setNewFilterName('');
    setNewTermCode('');

    navigation.navigate('Filter Editor', {filterID});
  }, [createFilter, navigation, newFilterName, newTermCode, setVisible]);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Create</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Name"
            value={newFilterName}
            onChangeText={text => setNewFilterName(text)}
            style={{
              marginBottom: 12,
            }}
          />
          <FieldEditorSelect
            padding={50}
            field={{
              name: 'Term',
              id: '',
              type: 'select',
              entries: async api => {
                const subjects = await api.searchTerms({
                  pagination: {
                    max: 20,
                    offset: 0,
                  },
                });
                return subjects.map(subject => ({
                  type: 'entry',
                  value: subject.code,
                  label: subject.description,
                  checked: false,
                }));
              },
              multiple: false,
              useValueInText: false,
            }}
            bannerAPI={bannerAPI}
            termCode={''}
            setValue={setNewTermCode}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={confirmAndCreateFilter}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default CreateFilterDialog;
