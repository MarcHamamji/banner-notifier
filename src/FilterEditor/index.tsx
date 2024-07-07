import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useState} from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {StackParamList} from '../Main';
import {ScrollView} from 'react-native';
import searchFields from './fields';
import FieldEditor from './FieldEditor';
import settingsStore from '../stores/settings';
import BannerAPI from '../BannerAPI';
import filtersStore from '../stores/filter';

type Props = NativeStackScreenProps<StackParamList, 'Filter Editor'>;

function FilterEditor({
  navigation,
  route: {
    params: {filterID},
  },
}: Props): React.JSX.Element {
  const bannerServerURL = settingsStore.useStoreState(
    state => state.bannerServerURL,
  );
  const theme = useTheme();

  const filters = filtersStore.useStoreState(state => state.filters);
  const filter = useMemo(() => {
    return filters.find(f => f.id === filterID);
  }, [filters, filterID]);

  const bannerAPI = new BannerAPI(bannerServerURL);
  const [termCode, setTermCode] = useState(filter?.termCode);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={goBack} />
        <Appbar.Content title={filter?.name} />
      </Appbar.Header>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          height: '100%',
          paddingHorizontal: 16,
        }}>
        {searchFields.map(field => (
          <FieldEditor
            field={field}
            bannerAPI={bannerAPI}
            termCode={termCode}
            key={field.id}
          />
        ))}
      </ScrollView>
    </>
  );
}

export default FilterEditor;
