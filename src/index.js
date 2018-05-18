import 'config/ReactotronConfig';

import React from 'react';

import Notification from 'components/Notification';
import Navigator from 'navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createStore from 'store';

const { persistor, store } = createStore();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Navigator />
      <Notification />
    </PersistGate>
  </Provider>
);

export default App;
console.disableYellowBox = true;
