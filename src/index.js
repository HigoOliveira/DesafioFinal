import 'config/ReactotronConfig';

import React from 'react';

import Navigator from 'navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createStore from 'store';

const { persistor, store } = createStore();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Navigator />
    </PersistGate>
  </Provider>
);

export default App;
