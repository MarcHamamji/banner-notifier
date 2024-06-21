import React from 'react';

import logsStore from './src/stores/logs';
import settingsStore from './src/stores/settings';
import Main from './src/Main';
import filtersStore from './src/stores/filter';

function App(): React.JSX.Element {
  return (
    <logsStore.Provider>
      <settingsStore.Provider>
        <filtersStore.Provider>
          <Main />
        </filtersStore.Provider>
      </settingsStore.Provider>
    </logsStore.Provider>
  );
}

export default App;
