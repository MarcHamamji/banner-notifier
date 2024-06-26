import React from 'react';

import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import logsStore from './src/stores/logs';
import settingsStore from './src/stores/settings';
import Main from './src/Main';
import filtersStore from './src/stores/filter';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <logsStore.Provider>
          <settingsStore.Provider>
            <filtersStore.Provider>
              <Main />
            </filtersStore.Provider>
          </settingsStore.Provider>
        </logsStore.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
