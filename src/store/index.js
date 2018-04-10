import { combineReducers } from 'redux';

/* Reducers */
import navReducer from 'navigation/reducer';
import { reducer as userReducer } from 'store/ducks/user';
import { reducer as eventReducer } from 'store/ducks/event';

import configureStore from './configureStore';
import rootSaga from './sagas';

export default () => {
  const rootReducer = combineReducers({
    nav: navReducer,
    user: userReducer,
    event: eventReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
