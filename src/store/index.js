import { combineReducers } from 'redux';

/* Reducers */
import navReducer from 'navigation/reducer';
import { reducer as userReducer } from 'store/ducks/user';

import configureStore from './configureStore';
import rootSaga from './sagas';

export default () => {
  const rootReducer = combineReducers({
    nav: navReducer,
    user: userReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
