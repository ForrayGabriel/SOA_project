import { NameContextProvider } from '@shared-context/shared-library';
import React from 'react';
import SharedTopBar from './SharedTopBar';

const App = () => (
  <div>
    <h1>Context Provider</h1>
    <h2>App 2</h2>
    <NameContextProvider.Provider value="Susan">
      <SharedTopBar />
    </NameContextProvider.Provider>
  </div>
);

export default App;
