import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export default (rootReducer, rootSaga) => {
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['nav'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = [];
  const enhancers = [];

  /* Saga */
  const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  /* Navigation */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
  );

  middleware.push(navigationMiddleware);

  enhancers.push(applyMiddleware(...middleware));

  /* Store */
  const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
  const store = createAppropriateStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);
  // To purge store.
  // persistor.purge();

  /* Run Saga */
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
