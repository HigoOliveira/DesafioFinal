import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

export default (rootReducer, rootSaga) => {
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
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  /* Run Saga */
  sagaMiddleware.run(rootSaga);

  return store;
};
