import React from 'react';

import logsStore from './src/stores/logs';
import settingsStore from './src/stores/settings';
import Main from './src/Main';
import filtersStore from './src/stores/filter';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <logsStore.Provider>
        <settingsStore.Provider>
          <filtersStore.Provider>
            <Main />
          </filtersStore.Provider>
        </settingsStore.Provider>
      </logsStore.Provider>
    </NavigationContainer>
  );
}

export default App;
