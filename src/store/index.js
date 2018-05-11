import { combineReducers } from 'redux';

/* Reducers */
import navReducer from 'navigation/reducer';
import { reducer as userReducer } from 'store/ducks/user';
import { reducer as eventReducer } from 'store/ducks/event';
import { reducer as notificationReducer } from 'store/ducks/notification';

import configureStore from './configureStore';
import rootSaga from './sagas';

export default () => {
  const rootReducer = combineReducers({
    nav: navReducer,
    user: userReducer,
    event: eventReducer,
    notification: notificationReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
