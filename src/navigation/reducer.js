import { NavigationActions } from 'react-navigation';
/* Types */
import { Types as UserTypes } from 'store/ducks/user';

import Routes from './routes';

const ActionForLoggedOut = Routes.router.getActionForPathAndParams('LoggedOut');
const ActionForLoggedIn = Routes.router.getActionForPathAndParams('LoggedIn');

const stateForLoggedOut = Routes.router.getStateForAction(ActionForLoggedOut);
const stateForLoggedIn = Routes.router.getStateForAction(ActionForLoggedIn);

// const initialState = Routes.router.getStateForAction(Routes.router.getActionForPathAndParams('LoggedOut'));
const initialState = { stateForLoggedOut, stateForLoggedIn };

// const navReducer = (state = initialState, action) => {
//   const nextState = Routes.router.getStateForAction(action, state);
//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return {
        ...state,
        stateForLoggedIn: Routes.router.getStateForAction(ActionForLoggedIn),
      };
    case UserTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        stateForLoggedIn: Routes.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut),
      };
    case UserTypes.USER_LOGOUT:
      return {
        ...state,
        stateForLoggedOut: Routes.router.getStateForAction(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'LoggedOut' })],
        })),
      };
    default:
      return {
        ...state,
        stateForLoggedIn: Routes.router.getStateForAction(action, state.stateForLoggedIn),
        stateForLoggedOut: Routes.router.getStateForAction(action, state.stateForLoggedOut),
      };
  }
}

export default navReducer;
